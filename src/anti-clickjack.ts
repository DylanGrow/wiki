if (self !== top) {
  try {
    if (window.top) {
      window.top.location.href = window.location.href;
    }
  } catch {
    // If cross-origin frame prevents access, perform direct top override
    window.location.href = "about:blank";
  }
} else {
  document.documentElement.classList.remove('clickjack-lock');
}
