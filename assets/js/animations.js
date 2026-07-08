/* -------------------------------------------------------------
 * Priyanshu Garg Developer Portfolio - GSAP Animation Engine v2.0
 * ------------------------------------------------------------- */

export const AnimationController = {
  lenis: null,
  preloaderTimeline: null,
  reducedMotion: false,

  init() {
    // 1. Accessibility Check: Prefers Reduced Motion
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // 2. Initialize Lenis Smooth Scroll (only if animations are enabled)
    if (!this.reducedMotion) {
      this.initSmoothScroll();
    } else {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    // 3. Initialize Page Preloader Counter & Curtains
    this.initPreloader();
  },

  initSmoothScroll() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2
    });

    // Update ScrollTrigger on scroll
    this.lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis scroll updates with the GSAP ticker
    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    // Disable lag smoothing to prevent visual jumpiness
    gsap.ticker.lagSmoothing(0);
  },

  initPreloader() {
    // Lock scroll on start
    document.body.classList.add('overflow-hidden');

    const counterObj = { value: 0 };
    const counterElement = document.getElementById('preloader-counter');

    this.preloaderTimeline = gsap.timeline({
      onComplete: () => {
        // Unlock scroll
        document.body.classList.remove('overflow-hidden');
        document.getElementById('preloader').style.display = 'none';

        // Play entrance animations
        this.playHeroEntrance();

        // Refresh ScrollTrigger with a slight delay to allow browser layout calculation to settle
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);
      }
    });

    if (this.reducedMotion) {
      // Instant transition for accessibility
      this.preloaderTimeline.to(counterObj, {
        value: 100,
        duration: 0.1,
        onUpdate: () => {
          if (counterElement) counterElement.textContent = "100%";
        }
      });
      this.preloaderTimeline.to('#preloader', { opacity: 0, duration: 0.1 });
      return;
    }

    // Awwwards progress count simulation
    this.preloaderTimeline.to(counterObj, {
      value: 100,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => {
        if (counterElement) {
          const rounded = Math.floor(counterObj.value).toString().padStart(2, '0');
          counterElement.textContent = `${rounded}%`;
        }
      }
    });

    // Vertical blinds slide-out sequence
    this.preloaderTimeline.to('#loader-c1', { translateY: '-100%', duration: 0.8, ease: "power4.inOut" }, "-=0.3")
                           .to('#loader-c2', { translateY: '-100%', duration: 0.8, ease: "power4.inOut" }, "-=0.65")
                           .to('#loader-c3', { translateY: '-100%', duration: 0.8, ease: "power4.inOut" }, "-=0.65")
                           .to('#preloader', { opacity: 0, duration: 0.4 }, "-=0.4");
  },

  playHeroEntrance() {
    if (this.reducedMotion) {
      gsap.set('.opacity-0-reveal', { opacity: 1, y: 0 });
      this.initTypewriter();
      return;
    }

    // Stagger reveal hero typography elements
    gsap.to('.opacity-0-reveal', {
      opacity: 1,
      y: 0,
      duration: 1.0,
      stagger: 0.12,
      ease: "power4.out",
      onComplete: () => {
        this.initTypewriter();
      }
    });
  },

  initTypewriter() {
    const textEl = document.getElementById('typewriter-text');
    if (!textEl) return;

    const roles = [
      "Senior Full-Stack Developer",
      "API Integration Specialist",
      "Workflow Automation Architect",
      "Database & Systems Engineer"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    const type = () => {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        textEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        textEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before typing next word
      }

      setTimeout(type, typingSpeed);
    };

    type();
  },

  initSectionReveals() {
    if (this.reducedMotion) return;

    // Bind ScrollTrigger to reveal content sections
    const sections = ['#about', '#skills', '#experience', '#projects', '#achievements', '#contact'];
    
    sections.forEach(secId => {
      const section = document.querySelector(secId);
      if (!section) return;

      // Extract only section headers, taglines, description, and high-level card containers.
      // Exclude nested children (spans, badges, and paragraphs inside cards) to prevent animation clutter.
      const revealTargets = Array.from(
        section.querySelectorAll('h2, span, p, .glass-panel, .project-card, .metric-card, #experience-container > div')
      ).filter(el => {
        // Exclude the inner glass-panel cards in the experience container
        if (el.classList.contains('glass-panel') && el.closest('#experience-container')) {
          return false;
        }

        const isCard = el.classList.contains('glass-panel') || 
                      el.classList.contains('project-card') || 
                      el.classList.contains('metric-card') || 
                      el.parentElement?.id === 'experience-container';
        if (isCard) return true;

        // Keep the element only if it does not reside inside another visual card/block
        return !el.closest('.glass-panel, .project-card, .metric-card, #experience-container > div');
      });
      
      gsap.from(revealTargets, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out"
      });
    });

    // Linked Timeline progress drawing
    gsap.to('#timeline-progress', {
      scrollTrigger: {
        trigger: '#experience',
        start: "top 30%",
        end: "bottom 70%",
        scrub: true
      },
      height: "100%",
      ease: "none"
    });
  },

  initMagneticButtons(selector) {
    if (this.reducedMotion) return;

    const elements = document.querySelectorAll(selector);
    elements.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        // Mouse distance relative to button center
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });
  },

  initCardTilts(selector) {
    if (this.reducedMotion) return;

    const cards = document.querySelectorAll(selector);
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        
        // Calculate degree offset, maximum 6 degrees tilt limit
        const angleX = (yc - y) / 18;
        const angleY = (x - xc) / 18;
        
        gsap.to(card, {
          rotateX: angleX,
          rotateY: angleY,
          transformPerspective: 1000,
          ease: "power1.out",
          duration: 0.4
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          ease: "power2.out",
          duration: 0.5
        });
      });
    });
  }
};
