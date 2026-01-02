document.addEventListener("DOMContentLoaded", () => {
  const viewer = document.querySelector(".media-viewer");
  if (!viewer) return;

  const viewerPanel = viewer.querySelector(".media-viewer-panel");
  const viewerImg = viewer.querySelector("img");
  const closeBtn = viewer.querySelector(".media-viewer-close");
  const prevBtn = viewer.querySelector(".media-viewer-prev");
  const nextBtn = viewer.querySelector(".media-viewer-next");

  let currentGallery = null;
  let currentIndex = -1;
  let currentImages = [];

  // Collect all images grouped by gallery
  const galleries = {};
  
  document.querySelectorAll("[data-gallery]").forEach((galleryContainer) => {
    const galleryName = galleryContainer.getAttribute("data-gallery");
    const images = Array.from(galleryContainer.querySelectorAll("img"));
    galleries[galleryName] = images;
    
    // Make images clickable
    images.forEach((img) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => {
        openViewer(galleryName, images.indexOf(img));
      });
    });
  });

  const openViewer = (galleryName, index) => {
    if (!viewerImg || !galleries[galleryName]) return;
    
    currentGallery = galleryName;
    currentImages = galleries[galleryName];
    currentIndex = index;
    
    updateViewerImage();
    updateNavigationButtons();
    
    viewer.setAttribute("aria-hidden", "false");
    viewer.classList.add("is-open");
    viewerPanel?.focus();
  };

  const updateViewerImage = () => {
    if (!viewerImg || currentIndex < 0 || !currentImages[currentIndex]) return;
    
    const img = currentImages[currentIndex];
    viewerImg.src = img.currentSrc || img.src;
    viewerImg.alt = img.alt || "";
  };

  const updateNavigationButtons = () => {
    if (!prevBtn || !nextBtn) return;
    
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < currentImages.length - 1;
    
    prevBtn.style.display = hasPrev ? "block" : "none";
    nextBtn.style.display = hasNext ? "block" : "none";
  };

  const showPrevious = () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateViewerImage();
      updateNavigationButtons();
    }
  };

  const showNext = () => {
    if (currentIndex < currentImages.length - 1) {
      currentIndex++;
      updateViewerImage();
      updateNavigationButtons();
    }
  };

  const closeViewer = () => {
    viewer.classList.remove("is-open");
    viewer.setAttribute("aria-hidden", "true");
    if (viewerImg) {
      viewerImg.src = "";
      viewerImg.alt = "";
    }
    currentGallery = null;
    currentIndex = -1;
    currentImages = [];
  };

  closeBtn?.addEventListener("click", closeViewer);
  prevBtn?.addEventListener("click", showPrevious);
  nextBtn?.addEventListener("click", showNext);

  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) {
      closeViewer();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!viewer.classList.contains("is-open")) return;
    
    if (event.key === "Escape") {
      closeViewer();
    } else if (event.key === "ArrowLeft") {
      showPrevious();
    } else if (event.key === "ArrowRight") {
      showNext();
    }
  });
});
