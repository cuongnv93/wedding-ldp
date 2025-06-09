export const GA_TRACKING_ID = "G-0X4F90SB0Q"; // Thay bằng mã của bạn

// Gửi pageview
export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};
