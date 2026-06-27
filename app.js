document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. LUCIDE ICONS
     ========================================== */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ==========================================
     2. SCROLL PROGRESS BAR
     ========================================== */
  const progressBar = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }, { passive: true });

  /* ==========================================
     3. STICKY HEADER
     ========================================== */
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ==========================================
     4. CUSTOM CURSOR
     ========================================== */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');

  if (cursor && follower && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    // Smooth follower with RAF
    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .step-card, .pricing-card, .testimonial-card, select');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        follower.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
      });
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      follower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      follower.style.opacity = '1';
    });
  }

  /* ==========================================
     5. MOBILE HAMBURGER MENU
     ========================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
      menuToggle.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ==========================================
     6. GSAP SCROLL ANIMATIONS
     ========================================== */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // --- HERO entrance animations ---
    const heroItems = document.querySelectorAll('.hero-anim');
    gsap.fromTo(heroItems,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.14,
        ease: 'power3.out',
        delay: 0.1
      }
    );

    // Hero mockup card float animation
    gsap.to('.mockup-card', {
      y: -12,
      duration: 3.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    // --- Parallax on hero background ---
    gsap.to('.hero', {
      backgroundPositionY: '40%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      }
    });

    // --- Section reveal: .reveal-up elements ---
    document.querySelectorAll('.reveal-up').forEach(el => {
      gsap.fromTo(el,
        { y: 52, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
          }
        }
      );
    });

    // --- Cards stagger reveal ---
    // Steps
    gsap.fromTo('.step-card',
      { y: 48, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.75,
        stagger: 0.13,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.steps-grid',
          start: 'top 85%',
          once: true
        }
      }
    );

    // Pricing cards
    gsap.fromTo('.pricing-card',
      { y: 48, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.75,
        stagger: 0.13,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pricing-grid',
          start: 'top 85%',
          once: true,
          onComplete: () => {
            // Re-apply featured scale after animation
            const featured = document.querySelector('.pricing-card.featured');
            if (featured) featured.style.transform = 'scale(1.04)';
          }
        }
      }
    );

    // Testimonial cards
    gsap.fromTo('.testimonial-card',
      { y: 48, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.75,
        stagger: 0.13,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonials-grid',
          start: 'top 85%',
          once: true
        }
      }
    );

    // Calculator card
    gsap.fromTo('.calculator-card',
      { y: 48, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.calculator-card',
          start: 'top 88%',
          once: true
        }
      }
    );

    // CTA Banner
    gsap.fromTo('.cta-banner .cta-content',
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cta-banner',
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo('.cta-btn-wrapper',
      { x: 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cta-banner',
          start: 'top 85%',
          once: true
        }
      }
    );

    // Section titles word-by-word reveal
    document.querySelectorAll('.section-title').forEach(title => {
      const words = title.innerHTML.split(' ');
      title.innerHTML = words.map(w => `<span class="word-wrap" style="display:inline-block; overflow:hidden; vertical-align:bottom;"><span class="word" style="display:inline-block;">${w}</span></span>`).join(' ');

      gsap.fromTo(title.querySelectorAll('.word'),
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 88%',
            once: true
          }
        }
      );
    });

    // Footer reveal
    gsap.fromTo('.footer-grid > *',
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer-grid',
          start: 'top 90%',
          once: true
        }
      }
    );
  }

  /* ==========================================
     7. ANIMATED STAT COUNTERS
     ========================================== */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const countUp = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const isDecimal = target % 1 !== 0;
    const suffix = el.nextElementSibling; // .stat-suffix span
    const duration = 2000;
    const start = performance.now();

    // Hide suffix during animation, we draw it manually
    if (suffix) suffix.style.opacity = '0';

    // Animate stat-item with a pop scale
    const statItem = el.closest('.stat-item');
    if (statItem) {
      statItem.style.transform = 'scale(0.85)';
      statItem.style.opacity = '0';
      statItem.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease';
      requestAnimationFrame(() => {
        statItem.style.transform = 'scale(1)';
        statItem.style.opacity = '1';
      });
    }

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart for snappier feel
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = eased * target;

      // Only update the number, never the suffix
      el.textContent = isDecimal
        ? current.toFixed(1)
        : Math.floor(current).toString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Final value
        el.textContent = isDecimal ? target.toFixed(1) : target.toString();
        // Reveal suffix with a pop
        if (suffix) {
          suffix.style.transition = 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
          suffix.style.transform = 'scale(0.5)';
          suffix.style.opacity = '0';
          requestAnimationFrame(() => {
            suffix.style.opacity = '1';
            suffix.style.transform = 'scale(1)';
          });
        }
        // Flash the number color briefly
        el.style.transition = 'color 0.15s ease';
        el.style.color = 'var(--accent-color)';
        setTimeout(() => {
          el.style.color = 'var(--primary-color)';
        }, 300);
      }
    };

    requestAnimationFrame(update);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger each stat slightly
        const allStats = [...statNumbers];
        const index = allStats.indexOf(entry.target);
        setTimeout(() => countUp(entry.target), index * 180);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  statNumbers.forEach(el => statsObserver.observe(el));

  /* ==========================================
     8. MAGNETIC BUTTONS
     ========================================== */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px) scale(1.03)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0) scale(1)';
    });

    // Ripple on click
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.25);
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        transform: scale(0);
        animation: ripple-anim 0.55s ease-out forwards;
        pointer-events: none;
        z-index: 0;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Inject ripple keyframe
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes ripple-anim {
      to { transform: scale(2.5); opacity: 0; }
    }
  `;
  document.head.appendChild(rippleStyle);

  /* ==========================================
     9. CARD HOVER TILT EFFECT
     ========================================== */
  document.querySelectorAll('.step-card, .testimonial-card, .pricing-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      // Reset with correct default for featured
      if (card.classList.contains('featured')) {
        card.style.transform = 'scale(1.04)';
      } else {
        card.style.transform = '';
      }
      card.style.transition = 'transform 0.4s ease';
      setTimeout(() => card.style.transition = '', 400);
    });
  });

  /* ==========================================
     10. DAKAR TARIFF CALCULATOR
     ========================================== */
  const zoneCoords = {
    'plateau': { x: 2, y: 2, label: 'Dakar Plateau' },
    'medina': { x: 3, y: 3.5, label: 'Médina / Colobane' },
    'fann': { x: 4, y: 4.5, label: 'Fann / Point E / Amitié' },
    'mermoz': { x: 5, y: 5.5, label: 'Mermoz / Sacré-Cœur' },
    'yoff': { x: 6, y: 8, label: 'Yoff / Ouakam / Ngor' },
    'almadies': { x: 7, y: 9.5, label: 'Les Almadies' },
    'parcelles': { x: 9, y: 7.5, label: 'Parcelles Assainies' },
    'pikine': { x: 12, y: 6.5, label: 'Pikine' },
    'guediawaye': { x: 13, y: 7.5, label: 'Guédiawaye' },
    'rufisque': { x: 22, y: 4, label: 'Rufisque' }
  };

  const pickupSelect = document.getElementById('pickup-zone');
  const dropoffSelect = document.getElementById('dropoff-zone');
  const serviceSelect = document.getElementById('service-type');
  const priceDisplay = document.getElementById('estimated-price');
  const timeDisplay = document.getElementById('estimated-time');
  const orderButton = document.getElementById('btn-submit-order');

  function calculateTariff() {
    const pickup = pickupSelect.value;
    const dropoff = dropoffSelect.value;
    const service = serviceSelect.value;
    if (!pickup || !dropoff) return;

    const pC = zoneCoords[pickup];
    const dC = zoneCoords[dropoff];
    const dist = Math.sqrt(Math.pow(pC.x - dC.x, 2) + Math.pow(pC.y - dC.y, 2));

    let basePrice = 0, perUnit = 0, minPrice = 0, speed = 1;

    switch (service) {
      case 'standard': basePrice = 1200; perUnit = 150; minPrice = 1500; speed = 1.8; break;
      case 'express': basePrice = 2000; perUnit = 250; minPrice = 2500; speed = 1.0; break;
      case 'cargo': basePrice = 4000; perUnit = 400; minPrice = 5000; speed = 3.5; break;
    }

    const finalPrice = Math.max(Math.round((basePrice + dist * perUnit) / 100) * 100, minPrice);
    const timeMins = Math.round(15 + dist * 4 * speed);

    let timeString = '';
    if (service === 'standard') timeString = `Temps estimé : ~${timeMins + 30} min (Livraison sous 2h)`;
    else if (service === 'express') timeString = `Temps estimé : ~${Math.min(timeMins, 50)} min`;
    else timeString = `Livraison planifiée (~${Math.round(timeMins / 60) + 1}h)`;

    priceDisplay.textContent = `${finalPrice.toLocaleString('fr-FR')} FCFA`;
    timeDisplay.textContent = timeString;

    priceDisplay.style.animation = 'none';
    void priceDisplay.offsetWidth;
    priceDisplay.style.animation = 'scale-up 0.3s ease-out';
  }

  [pickupSelect, dropoffSelect, serviceSelect].forEach(el =>
    el.addEventListener('change', calculateTariff)
  );
  calculateTariff();

  /* ==========================================
     11. SYNC PRICING CARDS → CALCULATOR
     ========================================== */
  document.querySelectorAll('[data-plan]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const plan = e.currentTarget.getAttribute('data-plan');
      if (plan) {
        serviceSelect.value = plan;
        calculateTariff();
        serviceSelect.style.borderColor = 'var(--primary-color)';
        serviceSelect.style.boxShadow = '0 0 0 3px var(--primary-light)';
        setTimeout(() => {
          serviceSelect.style.borderColor = '';
          serviceSelect.style.boxShadow = '';
        }, 1800);
      }
    });
  });

  /* ==========================================
     12. ORDER MODAL
     ========================================== */
  orderButton.addEventListener('click', () => {
    const pickup = zoneCoords[pickupSelect.value].label;
    const dropoff = zoneCoords[dropoffSelect.value].label;
    const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
    const cost = priceDisplay.textContent;

    const overlay = document.createElement('div');
    overlay.id = 'order-modal';
    overlay.style.cssText = `
      position: fixed; inset: 0;
      background: rgba(15, 23, 42, 0.5);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      display: flex; align-items: center; justify-content: center;
      z-index: 2000; opacity: 0; transition: opacity 0.3s ease;
    `;

    overlay.innerHTML = `
      <div style="
        background: #fff;
        padding: 48px 40px;
        border-radius: 28px;
        max-width: 420px;
        width: 90%;
        box-shadow: 0 32px 64px rgba(0,0,0,0.15);
        text-align: center;
        transform: translateY(24px) scale(0.97);
        transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
        border: 1px solid rgba(30,64,175,0.08);
      " id="modal-box">
        <div style="
          width: 72px; height: 72px; border-radius: 50%;
          background: hsl(142, 71%, 95%);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 24px; color: hsl(142, 71%, 42%);
        ">
          <svg width="34" height="34" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3 style="font-size:1.5rem;font-weight:800;color:#0f172a;margin-bottom:12px;letter-spacing:-0.5px;">
          Commande Initiée !
        </h3>
        <p style="font-size:0.92rem;color:#64748b;line-height:1.65;margin-bottom:28px;">
          Votre livraison <strong style="color:#0f172a">${serviceName}</strong> de
          <strong style="color:#0f172a">${pickup}</strong> à
          <strong style="color:#0f172a">${dropoff}</strong> — estimée à
          <strong style="color:var(--primary-color,#2b4cb2)">${cost}</strong>.
          Un agent LivrExpress vous appellera dans 2 minutes.
        </p>
        <button id="close-modal" style="
          width: 100%; padding: 14px 28px;
          background: var(--primary-color, #2b4cb2);
          color: #fff; border: none; border-radius: 14px;
          font-family: inherit; font-size: 1rem; font-weight: 700;
          cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 16px rgba(43,76,178,0.35);
        ">
          Fermer
        </button>
      </div>
    `;

    document.body.appendChild(overlay);
    const box = overlay.querySelector('#modal-box');

    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      box.style.transform = 'translateY(0) scale(1)';
    });

    const close = () => {
      overlay.style.opacity = '0';
      box.style.transform = 'translateY(16px) scale(0.97)';
      setTimeout(() => overlay.remove(), 320);
    };

    overlay.querySelector('#close-modal').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    // Hover on close button
    const closeBtn = overlay.querySelector('#close-modal');
    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.transform = 'translateY(-2px)';
      closeBtn.style.boxShadow = '0 8px 24px rgba(43,76,178,0.45)';
    });
    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.transform = '';
      closeBtn.style.boxShadow = '0 4px 16px rgba(43,76,178,0.35)';
    });
  });

  /* ==========================================
     13. NAV ACTIVE LINK ON SCROLL
     ========================================== */
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        allNavLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--primary-color)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

});
document.getElementById('btn-submit-order').addEventListener('click', function() {
    // Récupération des valeurs
    const pickup = document.getElementById('pickup-zone').value;
    const dropoff = document.getElementById('dropoff-zone').value;
    const type = document.getElementById('service-type').value;
    const price = document.getElementById('estimated-price').innerText;

    // Construction du message
    const message = `Bonjour, je souhaite commander une course :
    - Départ : ${pickup}
    - Arrivée : ${dropoff}
    - Formule : ${type}
    - Tarif estimé : ${price}
    Merci de me confirmer.`;

    // Encodage pour URL
    const encodedMessage = encodeURIComponent(message);

    // Redirection vers WhatsApp
    window.open(`https://wa.me/221770000000?text=${encodedMessage}`, '_blank');
});