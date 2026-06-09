document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.slide');
  let current = 0;

  function scrollTo(index) {
    if (index < 0 || index >= slides.length) return;
    current = index;
    slides[current].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
      scrollTo(current + 1);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
      scrollTo(current - 1);
    }
    if (e.key === 'Home') scrollTo(0);
    if (e.key === 'End') scrollTo(slides.length - 1);
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const index = Array.from(slides).indexOf(entry.target);
        if (index !== -1) current = index;
      }
    });
  }, { threshold: 0.5 });

  slides.forEach(function (slide) {
    observer.observe(slide);
  });
});
