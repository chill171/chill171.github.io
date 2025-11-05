document.addEventListener("DOMContentLoaded", () => {
  const viewer = document.querySelector(".media-viewer");
  if (!viewer) return;

  const viewerPanel = viewer.querySelector(".media-viewer-panel");
  const viewerImg = viewer.querySelector("img");
  const closeBtn = viewer.querySelector(".media-viewer-close");
  const galleryImages = document.querySelectorAll(".proj-row img, .proj-stack img");

  const openViewer = (img) => {
    if (!viewerImg) return;
    viewerImg.src = img.currentSrc || img.src;
    viewerImg.alt = img.alt || "";
    viewer.setAttribute("aria-hidden", "false");
    viewer.classList.add("is-open");
    viewerPanel?.focus();
  };

  const closeViewer = () => {
    viewer.classList.remove("is-open");
    viewer.setAttribute("aria-hidden", "true");
    if (viewerImg) {
      viewerImg.src = "";
      viewerImg.alt = "";
    }
  };

  galleryImages.forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openViewer(img));
  });

  closeBtn?.addEventListener("click", closeViewer);

  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) {
      closeViewer();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && viewer.classList.contains("is-open")) {
      closeViewer();
    }
  });
});
