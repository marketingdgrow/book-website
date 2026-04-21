/* ============================================
   VARTHAMANAN — ANIMATION ENGINE
   animations.js — Link before </body>
   ============================================ */

(function () {
  'use strict';

  /* ────────────────────────────────────────
     1. PAGE LOADER
  ──────────────────────────────────────── */
  const loader = document.getElementById('va-page-loader');
  if (loader) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.classList.add('va-loaded');
        setTimeout(function () { loader.remove(); }, 450);
      }, 280);
    });
  }


  /* ────────────────────────────────────────
     2. CURSOR GLOW  (desktop only)
  ──────────────────────────────────────── */
  if (window.innerWidth > 900) {
    var glow = document.createElement('div');
    glow.id = 'va-cursor-glow';
    document.body.appendChild(glow);

    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      glow.style.left = mx + 'px';
      glow.style.top  = my + 'px';
    });
  }


  /* ────────────────────────────────────────
     3. SCROLL-REVEAL ENGINE
        Add .va-visible when element enters viewport
  ──────────────────────────────────────── */
  var revealTargets = [
    '.booklist-category-new-section',
    '.booklist-section',
    '.booklist-category-new-item',
    '.booklist-item',
    '.pds-section',
    '.aboutsection-main',
    '.statistics-section',
    '.why-section',
    '.publisher-story-section',
    '.final-cta-section',
    '.testimonials-section',
    '.testimonials-grid .testimonial-card',
    '.contact-section',
    '.site-footer',
    '.product-card',
    '.why-card'
  ];

  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      /* Fallback: show everything immediately */
      revealTargets.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
          el.classList.add('va-visible');
        });
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('va-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        observer.observe(el);
      });
    });
  }


  /* ────────────────────────────────────────
     4. STAGGERED CATEGORY ITEMS
        Each item gets a delay based on index
  ──────────────────────────────────────── */
  function initCategoryStagger() {
    var items = document.querySelectorAll('.booklist-category-new-item');
    items.forEach(function (item, i) {
      item.style.transitionDelay = (i * 0.07) + 's';
    });
  }


  /* ────────────────────────────────────────
     5. STAGGERED PRODUCT CARDS
  ──────────────────────────────────────── */
  function initProductStagger() {
    var cards = document.querySelectorAll('.product-card');
    cards.forEach(function (card, i) {
      card.style.transitionDelay = (i * 0.06) + 's';
    });
  }


  /* ────────────────────────────────────────
     6. HERO TYPED TEXT EFFECT
        Cycles through phrases in hero title
  ──────────────────────────────────────── */
  function initHeroTyped() {
    var titleEl = document.getElementById('title');
    if (!titleEl) return;

    var phrases = [
      'Your Shelf Finally Found Its Tamil Book Publisher.',
      'Tamil Books Written By Scholars.',
      'Crack Government Exams With Confidence.',
      'TNPSC · UPSC · SSC · Banking · Railway'
    ];

    var currentPhrase = 0;
    var currentChar   = 0;
    var isDeleting    = false;
    var typingSpeed   = 55;
    var deleteSpeed   = 28;
    var pauseTime     = 2400;

    /* Preserve original text from HTML as first phrase */
    phrases[0] = titleEl.innerText.trim() || phrases[0];

    /* Add cursor */
    titleEl.style.borderRight = '3px solid #b85b92';
    titleEl.style.whiteSpace  = 'nowrap';
    titleEl.style.overflow    = 'hidden';
    titleEl.style.display     = 'inline-block';

    function type() {
      var full = phrases[currentPhrase];

      if (!isDeleting) {
        currentChar++;
        titleEl.innerText = full.substring(0, currentChar);

        if (currentChar === full.length) {
          isDeleting = true;
          setTimeout(type, pauseTime);
          return;
        }
        setTimeout(type, typingSpeed);
      } else {
        currentChar--;
        titleEl.innerText = full.substring(0, currentChar);

        if (currentChar === 0) {
          isDeleting = false;
          currentPhrase = (currentPhrase + 1) % phrases.length;
          setTimeout(type, 400);
          return;
        }
        setTimeout(type, deleteSpeed);
      }
    }

    /* Start after hero animation settles */
    setTimeout(type, 2200);
  }


  /* ────────────────────────────────────────
     7. PARALLAX HERO BOOK
  ──────────────────────────────────────── */
  function initParallax() {
    if (window.innerWidth < 900) return;

    var bookCard = document.querySelector('.book-card');
    var heroRight = document.querySelector('.hero-right');
    if (!bookCard) return;

    window.addEventListener('scroll', function () {
      var scrollY = window.pageYOffset;
      bookCard.style.transform = 'translateY(' + (20 - scrollY * 0.06) + 'px)';
      if (heroRight) {
        heroRight.style.transform = 'translateY(' + (scrollY * 0.035) + 'px)';
      }
    }, { passive: true });
  }


  /* ────────────────────────────────────────
     8. NAV SCROLL SHRINK
  ──────────────────────────────────────── */
  function initNavShrink() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 60) {
        nav.style.padding    = '12px 60px';
        nav.style.boxShadow  = '0 4px 24px rgba(84,46,84,0.1)';
        nav.style.background = 'rgba(255,249,241,0.97)';
      } else {
        nav.style.padding    = '';
        nav.style.boxShadow  = '';
        nav.style.background = '';
      }
    }, { passive: true });
  }


  /* ────────────────────────────────────────
     9. RIPPLE EFFECT on Why Cards
  ──────────────────────────────────────── */
  function initRipple() {
    document.querySelectorAll('.why-card').forEach(function (card) {
      card.addEventListener('click', function (e) {
        var dot = document.createElement('div');
        dot.className = 'ripple-dot';
        var rect = card.getBoundingClientRect();
        dot.style.left = (e.clientX - rect.left) + 'px';
        dot.style.top  = (e.clientY - rect.top) + 'px';
        card.appendChild(dot);
        setTimeout(function () { dot.remove(); }, 620);
      });
    });
  }


  /* ────────────────────────────────────────
     10. SMOOTH COUNT-UP ANIMATION
         (replaces/enhances existing counter)
  ──────────────────────────────────────── */
  function initCounters() {
    var statsSection = document.querySelector('.statistics-section');
    if (!statsSection) return;

    var counters = statsSection.querySelectorAll('.stats-counter');
    if (!counters.length) return;

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function runCounter(el) {
      if (el.dataset.animated === 'true') return;
      el.dataset.animated = 'true';

      var target  = Number(el.dataset.target || 0);
      var suffix  = el.dataset.suffix || '';
      var duration = prefersReduced ? 0 : 1600;

      if (!Number.isFinite(target) || target <= 0) {
        el.textContent = target + suffix;
        el.classList.add('counted');
        return;
      }

      var startTime = null;
      function tick(now) {
        if (!startTime) startTime = now;
        var progress = Math.min((now - startTime) / duration, 1);
        var eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target + suffix;
          el.classList.add('counted');
        }
      }

      el.textContent = '0' + suffix;
      requestAnimationFrame(tick);
    }

    if (!('IntersectionObserver' in window)) {
      counters.forEach(runCounter);
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          counters.forEach(runCounter);
          obs.disconnect();
        }
      });
    }, { threshold: 0.35 });

    obs.observe(statsSection);
  }


  /* ────────────────────────────────────────
     11. BOOK FLOAT — random micro-jitter on hover
  ──────────────────────────────────────── */
  function initBookFloatHover() {
    document.querySelectorAll('.book-float').forEach(function (book) {
      book.addEventListener('mouseenter', function () {
        book.style.animationPlayState = 'paused';
      });
      book.addEventListener('mouseleave', function () {
        book.style.animationPlayState = 'running';
      });
    });
  }


  /* ────────────────────────────────────────
     12. PRODUCT BADGE ANIMATED ENTRY (products.html)
  ──────────────────────────────────────── */
  function initProductBadges() {
    document.querySelectorAll('.product-badge').forEach(function (badge, i) {
      badge.style.opacity   = '0';
      badge.style.transform = 'scale(0.6)';
      badge.style.transition = 'opacity 0.3s ease ' + (0.3 + i * 0.05) + 's, transform 0.3s cubic-bezier(0.34,1.56,0.64,1) ' + (0.3 + i * 0.05) + 's';
      setTimeout(function () {
        badge.style.opacity   = '1';
        badge.style.transform = 'scale(1)';
      }, 500 + i * 60);
    });
  }


  /* ────────────────────────────────────────
     13. SMOOTH ANCHOR SCROLL
  ──────────────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }


  /* ────────────────────────────────────────
     14. ACTIVE NAV HIGHLIGHT on scroll
  ──────────────────────────────────────── */
  function initActiveNav() {
    var sections = [
      { el: document.querySelector('.hero'), link: 'Home' },
      { el: document.querySelector('.booklist-category-new-section'), link: 'Products' },
      { el: document.querySelector('#contact-section'), link: 'About' }
    ];

    window.addEventListener('scroll', function () {
      var scrollY = window.pageYOffset + 120;
      sections.forEach(function (s) {
        if (!s.el) return;
        if (scrollY >= s.el.offsetTop &&
            scrollY < s.el.offsetTop + s.el.offsetHeight) {
          document.querySelectorAll('.nav-menu ul li a').forEach(function (a) {
            a.classList.toggle('nav-active', a.innerText.trim() === s.link);
          });
        }
      });
    }, { passive: true });
  }


  /* ────────────────────────────────────────
     15. INIT — run everything on DOMContentLoaded
  ──────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initCategoryStagger();
    initProductStagger();
    initScrollReveal();
    initParallax();
    initNavShrink();
    initRipple();
    initCounters();
    initBookFloatHover();
    initProductBadges();
    initSmoothScroll();
    initActiveNav();

    /* Typed effect only on homepage (has #title) */
    if (document.getElementById('title')) {
      initHeroTyped();
    }
  });

})();