const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const sliderButtons = document.querySelectorAll('.slider-btn');
const sliderTrack = document.querySelector('.portfolio__track');
const sliderCards = sliderTrack ? Array.from(sliderTrack.children) : [];
const toTopButton = document.querySelector('.to-top');
const accordionItems = document.querySelectorAll('.service-item');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.classList.toggle('is-open');
    siteNav.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('is-open');
      siteNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

accordionItems.forEach((item) => {
  const button = item.querySelector('.service-toggle');
  const content = item.querySelector('.service-content');

  if (!button || !content) return;

  const syncAccordionHeight = () => {
    content.style.maxHeight = item.classList.contains('is-open') ? `${content.scrollHeight}px` : '0px';
  };

  syncAccordionHeight();

  button.addEventListener('click', () => {
    const willOpen = !item.classList.contains('is-open');

    accordionItems.forEach((otherItem) => {
      const otherButton = otherItem.querySelector('.service-toggle');
      const otherContent = otherItem.querySelector('.service-content');
      otherItem.classList.remove('is-open');
      if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
      if (otherContent) otherContent.style.maxHeight = '0px';
    });

    if (willOpen) {
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  });

  window.addEventListener('resize', syncAccordionHeight);
});

let currentSlide = 0;

const getVisibleSlides = () => {
  if (!sliderTrack) return 1;
  return window.innerWidth <= 1120 ? 1 : 3;
};

const getMaxSlide = () => Math.max(sliderCards.length - getVisibleSlides(), 0);

const updateSlider = () => {
  if (!sliderTrack || !sliderCards.length) return;

  const firstCard = sliderCards[0];
  const gap = parseFloat(window.getComputedStyle(sliderTrack).gap || '0');
  const cardWidth = firstCard.getBoundingClientRect().width;
  const maxSlide = getMaxSlide();

  currentSlide = Math.min(currentSlide, maxSlide);

  const offset = currentSlide * (cardWidth + gap);
  sliderTrack.style.transform = `translateX(-${offset}px)`;

  sliderButtons.forEach((button) => {
    const direction = Number(button.dataset.dir || 1);
    if (maxSlide === 0) {
      button.disabled = true;
      return;
    }
    button.disabled = direction < 0 ? currentSlide === 0 : currentSlide === maxSlide;
  });
};

sliderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const maxSlide = getMaxSlide();
    if (!sliderCards.length || maxSlide === 0) return;

    const direction = Number(button.dataset.dir || 1);
    currentSlide = Math.min(Math.max(currentSlide + direction, 0), maxSlide);
    updateSlider();
  });
});

window.addEventListener('resize', updateSlider);
window.addEventListener('load', updateSlider);
updateSlider();

if (toTopButton) {
  toTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
