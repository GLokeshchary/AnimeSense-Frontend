export const getSlidesPerView = (initialSlidesview, afterSlidesView) => {
  return window.innerWidth <= 768 ? afterSlidesView : initialSlidesview;
};
