const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const suffix = el.textContent.includes("+") ? "+" : "";
      const duration = 1100;
      const startTime = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        el.textContent = value.toLocaleString("zh-CN") + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.8 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const filterButtons = document.querySelectorAll(".filter-button");
const recapCards = document.querySelectorAll(".recap-card");
const galleryStore = window.HOMIESCAR_GALLERIES || { events: [], galleries: {} };
const galleryEvents = galleryStore.events || [];
const galleryMap = galleryStore.galleries || {};
let activeGallery = [];
let activePhotoIndex = 0;

const galleryModal = document.createElement("div");
galleryModal.className = "gallery-modal";
galleryModal.setAttribute("aria-hidden", "true");
galleryModal.innerHTML = `
  <div class="gallery-backdrop" data-gallery-close></div>
  <section class="gallery-dialog" role="dialog" aria-modal="true" aria-labelledby="gallery-title">
    <button class="gallery-close" type="button" aria-label="关闭相册" data-gallery-close>×</button>
    <div class="gallery-stage">
      <button class="gallery-nav prev" type="button" aria-label="上一张">‹</button>
      <img class="gallery-image" alt="" />
      <button class="gallery-nav next" type="button" aria-label="下一张">›</button>
    </div>
    <div class="gallery-info">
      <p class="eyebrow">Photo Archive</p>
      <h3 id="gallery-title"></h3>
      <p class="gallery-count"></p>
    </div>
    <div class="gallery-thumbs" aria-label="相册缩略图"></div>
  </section>
`;
document.body.appendChild(galleryModal);

const galleryImage = galleryModal.querySelector(".gallery-image");
const galleryTitle = galleryModal.querySelector("#gallery-title");
const galleryCount = galleryModal.querySelector(".gallery-count");
const galleryThumbs = galleryModal.querySelector(".gallery-thumbs");
const prevButton = galleryModal.querySelector(".gallery-nav.prev");
const nextButton = galleryModal.querySelector(".gallery-nav.next");

const setRecapCardStatus = (card, event, photos) => {
  card.dataset.eventId = event.id;

  const status = card.querySelector("div span:last-child");
  if (photos.length) {
    card.style.setProperty("--recap-photo", `url("${photos[0].src}")`);
    card.classList.add("has-gallery");
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `查看${event.title}活动相册，共${photos.length}张照片`);
    if (status) status.textContent = `${photos.length} 张照片`;
  } else {
    card.classList.remove("has-gallery");
    card.removeAttribute("style");
    card.removeAttribute("tabindex");
    card.removeAttribute("role");
    card.removeAttribute("aria-label");
    if (status) status.textContent = "相册整理中";
  }
};

const renderGalleryPhoto = () => {
  const photo = activeGallery[activePhotoIndex];
  if (!photo) return;

  galleryImage.src = photo.src;
  galleryImage.alt = photo.alt || galleryTitle.textContent;
  galleryCount.textContent = `${activePhotoIndex + 1} / ${activeGallery.length}`;
  galleryThumbs.querySelectorAll("button").forEach((button, index) => {
    button.classList.toggle("is-active", index === activePhotoIndex);
  });
};

const openGallery = (event, photos) => {
  if (!photos.length) return;
  activeGallery = photos;
  activePhotoIndex = 0;
  galleryTitle.textContent = event.title;
  galleryThumbs.innerHTML = photos
    .map(
      (photo, index) =>
        `<button type="button" data-index="${index}" aria-label="查看第${index + 1}张照片"><img src="${photo.src}" alt="" /></button>`
    )
    .join("");
  renderGalleryPhoto();
  galleryModal.classList.add("is-open");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeGallery = () => {
  galleryModal.classList.remove("is-open");
  galleryModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  galleryImage.removeAttribute("src");
};

const moveGallery = (direction) => {
  if (!activeGallery.length) return;
  activePhotoIndex = (activePhotoIndex + direction + activeGallery.length) % activeGallery.length;
  renderGalleryPhoto();
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    recapCards.forEach((card) => {
      const matchesYear = card.dataset.year === filter;
      const matchesType = card.dataset.type.split(" ").includes(filter);
      const visible = filter === "all" || matchesYear || matchesType;
      card.classList.toggle("is-hidden", !visible);
    });
  });
});

recapCards.forEach((card, index) => {
  const event = galleryEvents[index];
  if (!event) return;
  const photos = galleryMap[event.id] || [];
  setRecapCardStatus(card, event, photos);

  const open = () => openGallery(event, photos);
  card.addEventListener("click", open);
  card.addEventListener("keydown", (eventKey) => {
    if (eventKey.key === "Enter" || eventKey.key === " ") {
      eventKey.preventDefault();
      open();
    }
  });
});

galleryModal.addEventListener("click", (event) => {
  if (event.target.closest("[data-gallery-close]")) closeGallery();
  const thumb = event.target.closest(".gallery-thumbs button");
  if (thumb) {
    activePhotoIndex = Number(thumb.dataset.index);
    renderGalleryPhoto();
  }
});

prevButton.addEventListener("click", () => moveGallery(-1));
nextButton.addEventListener("click", () => moveGallery(1));

document.addEventListener("keydown", (event) => {
  if (!galleryModal.classList.contains("is-open")) return;
  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowLeft") moveGallery(-1);
  if (event.key === "ArrowRight") moveGallery(1);
});
