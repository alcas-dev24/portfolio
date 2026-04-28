const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const sliderButtons = document.querySelectorAll('.slider-btn');
const sliderTrack = document.querySelector('.portfolio__track');
const sliderCards = sliderTrack ? Array.from(sliderTrack.children) : [];
const toTopButton = document.querySelector('.to-top');
const accordionItems = document.querySelectorAll('.service-item');
const langButtons = document.querySelectorAll('.lang-btn');

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

const translations = {
  en: {
    lang: 'en',
    pageTitle: 'Alejandro Castaneda / Web Developer',
    menuAria: 'Open menu',
    scrollAria: 'Scroll down',
    prevAria: 'Previous',
    nextAria: 'Next',
    topAria: 'Back to top',
    nav: { about: 'About', services: 'Services', work: 'Work', contact: 'Contact' },
    hero: {
      eyebrow: 'I design and build websites that look sharp, feel effortless, and perform with purpose.',
      title: 'Personal Portfolio / Web Designer & Developer'
    },
    intro: {
      title: 'Design with clarity. Build with precision.',
      pill: 'I’M',
      lead: 'Alejandro Castaneda, a web designer and developer focused on creating websites that balance aesthetics, usability, and business goals. My work combines thoughtful design, structured content, and solid development to deliver digital experiences that feel polished, intuitive, and effective. I don’t just make pages look better. I help shape clearer messages, stronger online presence, and smoother user journeys.',
      cta: 'Contact me',
      features: [
        {
          title: 'Creative Direction',
          text: 'Every project starts with intention. I create visual systems and layouts that give brands a stronger, more professional digital presence.'
        },
        {
          title: 'Web Design',
          text: 'I design modern, clean, user-focused interfaces that make content easier to understand and brands easier to trust.'
        },
        {
          title: 'Web Development',
          text: 'I turn design into fast, responsive, and functional websites with attention to detail, performance, and scalability.'
        }
      ]
    },
    services: {
      title: 'What I can do for your brand online',
      lead: 'Whether you need a complete website, a redesign, or a stronger digital presence, I can help shape and build a solution that fits your goals.',
      cta: 'Contact me',
      items: [
        {
          title: 'Website Design',
          text: 'Strategic, modern website design focused on clear structure, strong branding, and a user journey that helps visitors trust your business faster.'
        },
        {
          title: 'Website Development',
          text: 'Fast, responsive front-end development with clean code, smooth interactions, and layouts that adapt properly across desktop, tablet, and mobile.'
        },
        {
          title: 'WordPress Development',
          text: 'Custom WordPress builds, theme integration, flexible content management, and scalable solutions that are easy for clients to update later.'
        },
        {
          title: 'Website Redesign',
          text: 'Complete redesigns that improve credibility, modernize the visual style, and create a clearer path toward inquiries, calls, or conversions.'
        },
        {
          title: 'UI / UX Improvement',
          text: 'Interface and experience improvements that make navigation feel easier, reduce friction, and help users find what they need with less effort.'
        },
        {
          title: 'SEO Foundations',
          text: 'Technical and on-page SEO basics including semantic structure, cleaner content hierarchy, and better page setup to support visibility on search engines.'
        },
        {
          title: 'Ongoing Website Support',
          text: 'Continued support for updates, fixes, performance checks, and content adjustments so the website stays current, functional, and aligned with your goals.'
        }
      ]
    },
    profile: {
      eyebrow: 'Experience & Capabilities',
      title: 'Design, development, and strategic thinking in one profile.',
      stats: ['Years of experience', 'Projects delivered', 'Main strengths: design, dev, strategy'],
      cards: [
        {
          title: 'What I do',
          text: 'I design and build websites with a strong focus on clarity, modern aesthetics, responsive behavior, and real business goals.'
        },
        {
          title: 'Core strengths',
          list: ['Web Design', 'Front-End Development', 'WordPress Development', 'Website Redesign', 'UI / UX Improvement', 'SEO Foundations']
        },
        {
          title: 'Tools & workflow',
          text: 'HTML, CSS, JavaScript, WordPress, responsive implementation, design systems, content structuring, conversion-focused layouts, and client-ready execution from concept to launch.'
        },
        {
          title: 'Open to',
          text: 'Freelance projects, redesign mandates, website development work, and selected remote opportunities where design and development need to work together seamlessly.'
        }
      ]
    },
    portfolio: {
      title: 'My Selected Work',
      pill: 'YOUR',
      tagline: 'Partner in Crafting Digital Experiences That Drive Results.',
      cardType: 'Website design'
    },
    cta: {
      title: 'Let’s build a website that reflects the value of your work',
      text: 'If you need a stronger online presence, a cleaner digital image, or a website designed to support real business goals, let’s talk.',
      button: 'Contact me'
    },
    footer: {
      title: 'Start your next project',
      lead: 'Looking for a designer and developer who can combine visual quality, technical execution, and strategic thinking? I’m available for selected freelance projects, redesigns, and custom website work.',
      promptStrong: 'Tell me about your project.',
      promptText: 'What are you building, improving, or rethinking?',
      labels: {
        fullName: 'Full Name',
        email: 'Email Address',
        company: 'Company / Brand',
        projectType: 'Project Type',
        budget: 'Budget Range',
        message: 'Message'
      },
      placeholders: {
        fullName: 'Your name',
        email: 'your@email.com',
        company: 'Your company or brand',
        message: 'Tell me a bit about your project'
      },
      projectOptions: {
        placeholder: 'Select project type',
        websiteDesign: 'Website Design',
        websiteDevelopment: 'Website Development',
        wordpress: 'WordPress Development',
        redesign: 'Website Redesign',
        other: 'Other'
      },
      budgetOptions: {
        placeholder: 'Select budget range',
        a: '$1,000 – $3,000',
        b: '$3,000 – $5,000',
        c: '$5,000 – $10,000',
        d: '$10,000+'
      },
      submit: 'Send Message',
      addressLabel: 'Address',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      copyright: '© AC Web Developer 2026.'
    }
  },
  fr: {
    lang: 'fr',
    pageTitle: 'Alejandro Castaneda / Développeur web',
    menuAria: 'Ouvrir le menu',
    scrollAria: 'Faire défiler vers le bas',
    prevAria: 'Précédent',
    nextAria: 'Suivant',
    topAria: 'Retour en haut',
    nav: { about: 'À propos', services: 'Services', work: 'Projets', contact: 'Contact' },
    hero: {
      eyebrow: 'Je conçois et développe des sites web soignés, fluides à utiliser et pensés pour performer.',
      title: 'Portfolio / Designer et développeur web'
    },
    intro: {
      title: 'Concevoir avec clarté. Développer avec précision.',
      pill: 'JE SUIS',
      lead: 'Alejandro Castaneda, designer et développeur web spécialisé dans la création de sites qui équilibrent esthétique, convivialité et objectifs d’affaires. Mon travail combine design réfléchi, contenu structuré et développement solide afin de livrer des expériences numériques soignées, intuitives et efficaces. Je ne me contente pas d’améliorer l’apparence d’une page. J’aide aussi à clarifier le message, renforcer la présence en ligne et fluidifier le parcours utilisateur.',
      cta: 'Me contacter',
      features: [
        {
          title: 'Direction créative',
          text: 'Chaque projet commence avec une intention claire. Je crée des systèmes visuels et des mises en page qui renforcent la présence numérique des marques.'
        },
        {
          title: 'Design web',
          text: 'Je conçois des interfaces modernes, épurées et centrées sur l’utilisateur pour rendre le contenu plus clair et la marque plus crédible.'
        },
        {
          title: 'Développement web',
          text: 'Je transforme le design en sites rapides, responsives et fonctionnels avec une grande attention aux détails, à la performance et à l’évolutivité.'
        }
      ]
    },
    services: {
      title: 'Ce que je peux faire pour votre présence en ligne',
      lead: 'Que vous ayez besoin d’un site complet, d’une refonte ou d’une présence numérique plus forte, je peux concevoir et développer une solution adaptée à vos objectifs.',
      cta: 'Me contacter',
      items: [
        {
          title: 'Conception de sites web',
          text: 'Conception stratégique et moderne axée sur une structure claire, une image de marque forte et un parcours qui inspire confiance plus rapidement.'
        },
        {
          title: 'Développement de sites web',
          text: 'Développement front-end rapide et responsive, avec du code propre, des interactions fluides et des interfaces adaptées au desktop, à la tablette et au mobile.'
        },
        {
          title: 'Développement WordPress',
          text: 'Création de sites WordPress sur mesure, intégration de thèmes, gestion de contenu flexible et solutions faciles à faire évoluer et à mettre à jour.'
        },
        {
          title: 'Refonte de site web',
          text: 'Refontes complètes visant à améliorer la crédibilité, moderniser l’apparence visuelle et clarifier le chemin vers une prise de contact ou une conversion.'
        },
        {
          title: 'Amélioration UI / UX',
          text: 'Améliorations de l’interface et de l’expérience utilisateur pour faciliter la navigation, réduire la friction et rendre l’information plus accessible.'
        },
        {
          title: 'Bases SEO',
          text: 'Mise en place des bases techniques et on-page du SEO : structure sémantique, hiérarchie de contenu et configuration plus saine pour la visibilité.'
        },
        {
          title: 'Support web continu',
          text: 'Support continu pour les mises à jour, correctifs, vérifications de performance et ajustements de contenu afin de garder le site actuel et efficace.'
        }
      ]
    },
    profile: {
      eyebrow: 'Expérience et compétences',
      title: 'Design, développement et vision stratégique réunis dans un même profil.',
      stats: ["Années d’expérience", 'Projets livrés', 'Forces principales : design, dev, stratégie'],
      cards: [
        {
          title: 'Ce que je fais',
          text: 'Je conçois et développe des sites web avec un fort accent sur la clarté, l’esthétique moderne, le responsive et les objectifs d’affaires concrets.'
        },
        {
          title: 'Forces clés',
          list: ['Design web', 'Développement front-end', 'Développement WordPress', 'Refonte de site', 'Amélioration UI / UX', 'Bases SEO']
        },
        {
          title: 'Outils et méthode',
          text: 'HTML, CSS, JavaScript, WordPress, implantation responsive, systèmes de design, structuration du contenu, maquettes orientées conversion et exécution complète du concept à la mise en ligne.'
        },
        {
          title: 'Disponible pour',
          text: 'Mandats freelance, refontes, développement web et certaines opportunités à distance où le design et le développement doivent travailler ensemble efficacement.'
        }
      ]
    },
    portfolio: {
      title: 'Une sélection de mes projets',
      pill: 'VOTRE',
      tagline: 'Partenaire dans la création d’expériences numériques orientées résultats.',
      cardType: 'Conception web'
    },
    cta: {
      title: 'Construisons un site web qui reflète vraiment la valeur de votre travail',
      text: 'Si vous avez besoin d’une présence en ligne plus forte, d’une image numérique plus soignée ou d’un site pensé pour des objectifs concrets, parlons-en.',
      button: 'Me contacter'
    },
    footer: {
      title: 'Démarrons votre prochain projet',
      lead: 'Vous cherchez un designer et développeur capable de réunir qualité visuelle, exécution technique et réflexion stratégique? Je suis disponible pour certains mandats freelance, refontes et projets web sur mesure.',
      promptStrong: 'Parlez-moi de votre projet.',
      promptText: 'Qu’êtes-vous en train de créer, d’améliorer ou de repenser?',
      labels: {
        fullName: 'Nom complet',
        email: 'Adresse courriel',
        company: 'Entreprise / Marque',
        projectType: 'Type de projet',
        budget: 'Budget',
        message: 'Message'
      },
      placeholders: {
        fullName: 'Votre nom',
        email: 'votre@courriel.com',
        company: 'Votre entreprise ou marque',
        message: 'Parlez-moi un peu de votre projet'
      },
      projectOptions: {
        placeholder: 'Choisir un type de projet',
        websiteDesign: 'Conception web',
        websiteDevelopment: 'Développement web',
        wordpress: 'Développement WordPress',
        redesign: 'Refonte de site',
        other: 'Autre'
      },
      budgetOptions: {
        placeholder: 'Choisir une plage budgétaire',
        a: '$1,000 – $3,000',
        b: '$3,000 – $5,000',
        c: '$5,000 – $10,000',
        d: '$10,000+'
      },
      submit: 'Envoyer le message',
      addressLabel: 'Adresse',
      emailLabel: 'Courriel',
      phoneLabel: 'Téléphone',
      copyright: '© AC Développeur Web 2026.'
    }
  }
};

const setText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element && typeof value === 'string') element.textContent = value;
};

const setTexts = (selector, values) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element, index) => {
    if (values[index] !== undefined) element.textContent = values[index];
  });
};

const setPlaceholder = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) element.placeholder = value;
};

const applyLanguage = (lang) => {
  const t = translations[lang] || translations.en;
  document.documentElement.lang = t.lang;
  document.title = t.pageTitle;

  if (menuToggle) menuToggle.setAttribute('aria-label', t.menuAria);
  const heroArrow = document.querySelector('.hero__arrow');
  if (heroArrow) heroArrow.setAttribute('aria-label', t.scrollAria);
  if (toTopButton) toTopButton.setAttribute('aria-label', t.topAria);
  const prevButton = document.querySelector('.slider-btn[data-dir="-1"]');
  const nextButton = document.querySelector('.slider-btn[data-dir="1"]');
  if (prevButton) prevButton.setAttribute('aria-label', t.prevAria);
  if (nextButton) nextButton.setAttribute('aria-label', t.nextAria);

  setText('.site-nav a[href="#about"]', t.nav.about);
  setText('.site-nav a[href="#services"]', t.nav.services);
  setText('.site-nav a[href="#work"]', t.nav.work);
  setText('.site-nav a[href="#contact"]', t.nav.contact);

  setText('.hero__eyebrow', t.hero.eyebrow);
  setText('.hero h1', t.hero.title);

  setText('.intro__content h2', t.intro.title);
  setText('.intro .pill', t.intro.pill);
  setText('.intro__lead-text', t.intro.lead);
  setText('.intro__content .cta-button', t.intro.cta);
  setTexts('.intro__features h3', t.intro.features.map((item) => item.title));
  setTexts('.intro__features p', t.intro.features.map((item) => item.text));

  setText('.services__intro h2', t.services.title);
  setText('.services__intro .pill-line', t.services.lead);
  setText('.services__intro .cta-button', t.services.cta);
  document.querySelectorAll('.service-item').forEach((item, index) => {
    const service = t.services.items[index];
    if (!service) return;
    const title = item.querySelector('.service-toggle span:first-child');
    const text = item.querySelector('.service-content p');
    if (title) title.textContent = service.title;
    if (text) text.textContent = service.text;
  });

  setText('.profile-section__eyebrow', t.profile.eyebrow);
  setText('.profile-section__intro h2', t.profile.title);
  setTexts('.profile-stat span', t.profile.stats);
  document.querySelectorAll('.profile-card').forEach((card, index) => {
    const config = t.profile.cards[index];
    if (!config) return;
    const title = card.querySelector('h3');
    if (title) title.textContent = config.title;
    const paragraph = card.querySelector('p');
    const listItems = card.querySelectorAll('.profile-list li');
    if (paragraph && config.text) paragraph.textContent = config.text;
    if (listItems.length && config.list) {
      listItems.forEach((item, listIndex) => {
        item.textContent = config.list[listIndex] || '';
      });
    }
  });

  setText('.portfolio__top h2', t.portfolio.title);
  setText('.portfolio .pill--dark', t.portfolio.pill);
  setText('.portfolio__tagline-text', t.portfolio.tagline);
  setTexts('.project-card p', Array.from(document.querySelectorAll('.project-card p')).map(() => t.portfolio.cardType));

  setText('.cta-panel h2', t.cta.title);
  setText('.cta-panel p', t.cta.text);
  setText('.cta-panel .cta-button', t.cta.button);

  setText('.footer-contact__intro h2', t.footer.title);
  setText('.footer-contact__lead', t.footer.lead);
  setText('.footer-contact__prompts strong', t.footer.promptStrong);
  const prompts = document.querySelectorAll('.footer-contact__prompts p');
  if (prompts[1]) prompts[1].textContent = t.footer.promptText;

  const fullNameField = document.querySelector('input[name="full-name"]');
  const emailField = document.querySelector('input[name="email"]');
  const companyField = document.querySelector('input[name="company"]');
  const projectField = document.querySelector('select[name="project-type"]');
  const budgetField = document.querySelector('select[name="budget-range"]');
  const messageField = document.querySelector('textarea[name="message"]');

  if (fullNameField) fullNameField.closest('.footer-field').querySelector('span').textContent = t.footer.labels.fullName;
  if (emailField) emailField.closest('.footer-field').querySelector('span').textContent = t.footer.labels.email;
  if (companyField) companyField.closest('.footer-field').querySelector('span').textContent = t.footer.labels.company;
  if (projectField) projectField.closest('.footer-field').querySelector('span').textContent = t.footer.labels.projectType;
  if (budgetField) budgetField.closest('.footer-field').querySelector('span').textContent = t.footer.labels.budget;
  if (messageField) messageField.closest('.footer-field').querySelector('span').textContent = t.footer.labels.message;

  setPlaceholder('input[name="full-name"]', t.footer.placeholders.fullName);
  setPlaceholder('input[name="email"]', t.footer.placeholders.email);
  setPlaceholder('input[name="company"]', t.footer.placeholders.company);
  setPlaceholder('textarea[name="message"]', t.footer.placeholders.message);

  if (projectField) {
    const options = projectField.querySelectorAll('option');
    if (options[0]) options[0].textContent = t.footer.projectOptions.placeholder;
    if (options[1]) options[1].textContent = t.footer.projectOptions.websiteDesign;
    if (options[2]) options[2].textContent = t.footer.projectOptions.websiteDevelopment;
    if (options[3]) options[3].textContent = t.footer.projectOptions.wordpress;
    if (options[4]) options[4].textContent = t.footer.projectOptions.redesign;
    if (options[5]) options[5].textContent = t.footer.projectOptions.other;
  }

  if (budgetField) {
    const options = budgetField.querySelectorAll('option');
    if (options[0]) options[0].textContent = t.footer.budgetOptions.placeholder;
    if (options[1]) options[1].textContent = t.footer.budgetOptions.a;
    if (options[2]) options[2].textContent = t.footer.budgetOptions.b;
    if (options[3]) options[3].textContent = t.footer.budgetOptions.c;
    if (options[4]) options[4].textContent = t.footer.budgetOptions.d;
  }

  setText('.footer-contact-form__submit', t.footer.submit);
  setText('.contact-meta:nth-child(1) h3', t.footer.addressLabel);
  setText('.contact-meta:nth-child(2) h3', t.footer.emailLabel);
  setText('.contact-meta:nth-child(3) h3', t.footer.phoneLabel);
  setText('.copyright', t.footer.copyright);

  langButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.lang === lang);
  });

  localStorage.setItem('site-language', lang);
};

langButtons.forEach((button) => {
  button.addEventListener('click', () => applyLanguage(button.dataset.lang));
});

const savedLanguage = localStorage.getItem('site-language');
const browserLanguage = (navigator.language || '').toLowerCase().startsWith('fr') ? 'fr' : 'en';
applyLanguage(savedLanguage || browserLanguage || 'en');
