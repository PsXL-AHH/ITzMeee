/**
 * PsXL Cinematic Engine: Dual Realm Controller
 * Vesperal Anime Evening (Default) vs. Tomoie Uchiha Throne Reality Realm
 * Static session backgrounds (changes only on refresh/reopen)
 */

const TOMOE_CHARACTERS = [
  {
    id: 'itachi',
    name: 'ITACHI UCHIHA',
    tag: 'UCHIHA CLAN // REALITY & ILLUSION',
    image: 'assets/images/itachi_chair.jpg',
    quote: 'People live their lives bound by what they accept as correct and true. That is how they define \u2018reality\u2019. But what does it mean to be \u2018correct\u2019 or \u2018true\u2019? Merely vague concepts... their \u2018reality\u2019 may all be a mirage.',
    author: 'Itachi Uchiha'
  },
  {
    id: 'madara',
    name: 'MADARA UCHIHA',
    tag: 'GHOST OF THE UCHIHA // WAKE UP TO REALITY',
    image: 'assets/images/madara_chair.jpg',
    quote: 'Wake up to reality. Nothing ever goes as planned in this world. The longer you live, the more you realize that the only things that truly exist in this reality are merely pain, suffering, and futility.',
    author: 'Madara Uchiha'
  },
  {
    id: 'sasuke',
    name: 'SASUKE UCHIHA',
    tag: 'AVENGER // PATH OF TRUTH',
    image: 'assets/images/sasuke_chair.jpg',
    quote: 'My dream doesn\u2019t exist in the future. It lies in the past. That\u2019s the only place it exists... I have long since closed my eyes. My only goal is in the darkness.',
    author: 'Sasuke Uchiha'
  },
  {
    id: 'kakashi',
    name: 'KAKASHI HATAKE',
    tag: 'COPY NINJA // BONDS & REALITY',
    image: 'assets/images/kakashi_chair.jpg',
    quote: 'In the ninja world, those who break the rules are scum, that\u2019s true... but those who abandon their friends are worse than scum.',
    author: 'Kakashi Hatake'
  }
];

const VESPER_SCENES = [
  {
    id: 'vesper1',
    name: 'VESPER',
    tag: 'TWILIGHT EMBRACE // SHOOTING STARS',
    image: 'assets/images/vesper1.png',
    quote: 'When twilight descends upon the quiet waters, each shooting star carries a wish across the celestial expanse.',
    author: 'Vesperal Evening'
  },
  {
    id: 'vesper2',
    name: 'VESPER',
    tag: 'COSMIC TWILIGHT // STARRY HORIZON',
    image: 'assets/images/vesper2.jpg',
    quote: 'In the stillness between day and night, the universe unveils its luminous tapestry to those who dare to dream.',
    author: 'Twilight Horizon'
  },
  {
    id: 'vesper3',
    name: 'VESPER',
    tag: 'CELESTIAL SERENITY // CRESCENT MOON',
    image: 'assets/images/vesper3.jpg',
    quote: 'Under the crescent moon and drifting clouds, tranquility reflects in the mirrored lake like eternal starlight.',
    author: 'Celestial Night'
  }
];

const DEFAULT_REALM_CONTENT = {
  vesper: {
    perfTag: "AURA HARVESTING PROTOCOL",
    perfSubtag: "JAWLINE COMPOSITION ENGINE",
    perfTitle1: "PERFORMANCE",
    perfTitle2: "WITHOUT COMPROMISE.",
    perfDesc: "PsXL extracts maximum spatial presence with zero jawline fatigue. It isn't a crutch. It's engineered to mog.",
    card1Stat: "+10M",
    card1Label: "AURA",
    card1Desc: "Passive aura accumulation running in background threads. Zero canthal degradation even during 24-hour eye contact.",
    card2Stat: "99.9%",
    card2Label: "MOG RATE",
    card2Desc: "Hardware-accelerated jawline realignment. Neutralized opposing presences across all spatial dimensions.",
    card3Stat: "MAX",
    card3Label: "STATUS",
    card3Desc: "Full-spectrum mewing telemetry and unmatched dominance. Unprecedented aura farming efficiency.",
    aboutTitle: "VESPERAL ARSENAL & PROFILE",
    aboutB1Title: "TWILIGHT MODEL ENGINEERING",
    aboutB1Desc: "Synthesizing deep theoretical learning with intuitive design. Crafting high-dimensional models and algorithms infused with celestial precision.",
    aboutB2Title: "LANGUAGES & SYSTEMS MASTERY",
    aboutB2Desc: "Strong foundation in systems programming and algorithmic efficiency across Python, C, and Java."
  },
  tomoe: {
    perfTag: "AURA HARVESTING PROTOCOL",
    perfSubtag: "JAWLINE COMPOSITION ENGINE",
    perfTitle1: "PERFORMANCE",
    perfTitle2: "WITHOUT COMPROMISE.",
    perfDesc: "PsXL extracts maximum spatial presence with zero jawline fatigue. It isn't a crutch. It's engineered to mog.",
    card1Stat: "+10M",
    card1Label: "AURA",
    card1Desc: "Passive aura accumulation running in background threads. Zero canthal degradation even during 24-hour eye contact.",
    card2Stat: "99.9%",
    card2Label: "MOG RATE",
    card2Desc: "Hardware-accelerated jawline realignment. Neutralized opposing presences across all spatial dimensions.",
    card3Stat: "MAX",
    card3Label: "STATUS",
    card3Desc: "Full-spectrum mewing telemetry and unmatched dominance. Unprecedented aura farming efficiency.",
    aboutTitle: "ABOUT & ARSENAL",
    aboutB1Title: "AI & MACHINE LEARNING ENGINEER",
    aboutB1Desc: "Focused on designing intelligent systems, deep neural models, and experimental machine learning pipelines. Grounded in the philosophy of Pensive Sunset Xperimental Learning (PsXL).",
    aboutB2Title: "LANGUAGES & TECHNICAL MASTERY",
    aboutB2Desc: "Strong foundation in systems programming, data structures, and algorithmic efficiency across Python, C, and Java."
  }
};

class AppController {
  constructor() {
    // Default realm is VESPER!
    this.isVesper = true;

    // Pick static random index per realm (static for the entire session!)
    // Only changes upon page refresh or reopening!
    this.selectedVesperIndex = Math.floor(Math.random() * VESPER_SCENES.length);
    this.selectedTomoeIndex = Math.floor(Math.random() * TOMOE_CHARACTERS.length);

    this.init();
  }

  init() {
    this.initRealmContent();
    this.applyCurrentRealmState();
    this.setupThemeToggle();
    this.setupCinematicMode();
    this.setupSocialActions();
    this.setupKeyboardShortcuts();
    this.setupScrollReveals();
    this.setupHomescreenScroll();
    this.setupRealmEditor();
  }

  applyCurrentRealmState() {
    const isVesper = this.isVesper;
    document.body.classList.toggle('theme-vesper', isVesper);
    document.body.classList.toggle('theme-tomoe', !isVesper);

    const activeItem = isVesper
      ? VESPER_SCENES[this.selectedVesperIndex]
      : TOMOE_CHARACTERS[this.selectedTomoeIndex];

    // Static background image: activate only the selected item
    const images = document.querySelectorAll('.eye-bg-image');
    images.forEach(img => {
      const imgId = img.getAttribute('data-id');
      if (imgId === activeItem.id) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });

    // Update hero character / scene showcase and reality quote
    const tagEl = document.getElementById('hero-char-tag');
    const nameEl = document.getElementById('hero-char-name');
    const quoteEl = document.getElementById('hero-char-quote');
    const authorEl = document.getElementById('hero-char-author');

    if (tagEl) tagEl.textContent = activeItem.tag;
    if (nameEl) nameEl.textContent = activeItem.name;
    if (quoteEl) quoteEl.innerHTML = `&ldquo;${activeItem.quote}&rdquo;`;
    if (authorEl) authorEl.innerHTML = `&mdash; ${activeItem.author}`;

    // Update navigation brand
    const navName = document.getElementById('nav-brand-name');
    const navSub = document.getElementById('nav-brand-meaning');
    if (navName) navName.textContent = isVesper ? 'VESPER' : 'TOMOIE';
    if (navSub) navSub.textContent = isVesper ? 'CELESTIAL TWILIGHT REALM' : 'UCHIHA LEGACY REALM';

    // Update HUD telemetry
    const hudTarget = document.getElementById('hud-target-eye');
    if (hudTarget) {
      hudTarget.textContent = isVesper
        ? `VESPER // ${activeItem.tag}`
        : `${activeItem.name} // THRONE REALITY`;
    }

    // Update footer credits
    const footerCredits = document.getElementById('footer-realm-credits');
    if (footerCredits) {
      footerCredits.textContent = isVesper
        ? 'CELESTIAL HORIZON // VESPER REALM'
        : 'NEURAL DOOJUTSU // TOMOIE REALM';
    }

    // Update realm switcher button tooltip
    const tooltipText = document.querySelector('.branch-tooltip .tooltip-text');
    if (tooltipText) {
      tooltipText.textContent = isVesper ? 'TOMOIE REALM' : 'VESPER REALM';
    }

    // Update canvas particle engine (true = Vesper anime starlight, false = Tomoe embers)
    if (window.particlesEngine) {
      window.particlesEngine.setTheme(isVesper);
    }

    // Apply content below wallpaper for active realm
    this.applyRealmContent(isVesper ? 'vesper' : 'tomoe');
  }

  setupThemeToggle() {
    const branchBtn = document.getElementById('sakura-theme-toggle') || document.getElementById('realm-theme-toggle');

    const toggle = () => {
      this.isVesper = !this.isVesper;
      this.applyCurrentRealmState();

      // Audio feedback if active
      if (window.audioEngine && window.audioEngine.isEnabled) {
        window.audioEngine.playAwaken();
      }

      // Toast feedback
      this.showToast(this.isVesper ? '✨ VESPER REALM AWAKENED' : '👁️ TOMOIE REALM AWAKENED');
    };

    if (branchBtn) {
      branchBtn.addEventListener('click', toggle);
      branchBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    }
  }

  setupCinematicMode() {
    const trigger = document.getElementById('hero-cinematic-trigger');
    const exitBtns = document.querySelectorAll('.exit-cinematic-btn');

    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.enterCinematic();
      });
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.enterCinematic();
        }
      });
    }

    exitBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.exitCinematic();
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isCinematic) {
        this.exitCinematic();
      }
      if (e.key.toLowerCase() === 'c' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        this.toggleCinematic();
      }
    });

    // Live coordinates telemetry for HUD
    window.addEventListener('mousemove', (e) => {
      if (!this.isCinematic) return;
      const coordsEl = document.getElementById('hud-coords');
      if (coordsEl) {
        const normX = (e.clientX / window.innerWidth).toFixed(3);
        const normY = (e.clientY / window.innerHeight).toFixed(3);
        coordsEl.textContent = `X: ${normX} | Y: ${normY}`;
      }
    });
  }

  enterCinematic() {
    this.isCinematic = true;
    const viewport = document.querySelector('.eye-background-viewport');
    if (viewport) viewport.style.transform = 'translate3d(0, 0, 0)';
    document.body.classList.add('cinematic-mode-active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.audioEngine && window.audioEngine.isEnabled) {
      window.audioEngine.playAwaken();
    }
  }

  exitCinematic() {
    this.isCinematic = false;
    document.body.classList.remove('cinematic-mode-active');
  }

  toggleCinematic() {
    if (this.isCinematic) {
      this.exitCinematic();
    } else {
      this.enterCinematic();
    }
  }

  setupSocialActions() {
    const discordCopyBtn = document.getElementById('discord-copy-action');

    if (discordCopyBtn) {
      discordCopyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const tag = 'psxl_uchiha';
        
        navigator.clipboard.writeText(tag).then(() => {
          this.showToast(`DISCORD: "${tag}" COPIED TO CLIPBOARD`);
        }).catch(() => {
          this.showToast(`DISCORD: psxl_uchiha`);
        });
      });
    }
  }

  showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastText = document.getElementById('toast-text');
    if (!toast) return;

    if (toastText) toastText.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  setupScrollReveals() {
    const items = document.querySelectorAll('.reveal-slide-item');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    items.forEach(item => {
      observer.observe(item);
    });
  }

  setupHomescreenScroll() {
    const viewport = document.querySelector('.eye-background-viewport');
    if (!viewport) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!this.isCinematic) {
            const scrollY = window.scrollY;
            // After scrolling down a bit (past ~40px), the background image moves up
            if (scrollY > 40) {
              const offset = (scrollY - 40) * 0.45;
              viewport.style.transform = `translate3d(0, -${offset}px, 0)`;
            } else {
              viewport.style.transform = 'translate3d(0, 0, 0)';
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  initRealmContent() {
    this.activeEditorRealm = 'vesper';
    try {
      const saved = localStorage.getItem('psxl_realm_content');
      if (saved) {
        this.realmContent = JSON.parse(saved);
        if (!this.realmContent.vesper) {
          this.realmContent.vesper = JSON.parse(JSON.stringify(this.realmContent.sakura || DEFAULT_REALM_CONTENT.vesper));
        }
        if (!this.realmContent.tomoe) {
          this.realmContent.tomoe = JSON.parse(JSON.stringify(DEFAULT_REALM_CONTENT.tomoe));
        }
      } else {
        this.realmContent = JSON.parse(JSON.stringify(DEFAULT_REALM_CONTENT));
      }
    } catch (e) {
      this.realmContent = JSON.parse(JSON.stringify(DEFAULT_REALM_CONTENT));
    }
  }

  applyRealmContent(realmName) {
    const rKey = (realmName === 'sakura' || realmName === 'vesper') ? 'vesper' : 'tomoe';
    const data = this.realmContent?.[rKey] || DEFAULT_REALM_CONTENT[rKey];
    if (!data) return;

    const setEl = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setEl('perf-tag-text', data.perfTag);
    setEl('perf-tag-sub', data.perfSubtag);

    const titleEl = document.getElementById('perf-title-text');
    if (titleEl) {
      titleEl.innerHTML = `${data.perfTitle1 || ''}<br>${data.perfTitle2 || ''}`;
    }

    setEl('perf-desc-text', data.perfDesc);

    setEl('perf-card1-stat', data.card1Stat);
    setEl('perf-card1-label', data.card1Label);
    setEl('perf-card1-desc', data.card1Desc);

    setEl('perf-card2-stat', data.card2Stat);
    setEl('perf-card2-label', data.card2Label);
    setEl('perf-card2-desc', data.card2Desc);

    setEl('perf-card3-stat', data.card3Stat);
    setEl('perf-card3-label', data.card3Label);
    setEl('perf-card3-desc', data.card3Desc);

    setEl('about-section-title', data.aboutTitle);
    setEl('about-b1-title', data.aboutB1Title);
    setEl('about-b1-desc', data.aboutB1Desc);
    setEl('about-b2-title', data.aboutB2Title);
    setEl('about-b2-desc', data.aboutB2Desc);
  }

  setupRealmEditor() {
    const modal = document.getElementById('realm-editor-modal');
    const openBtn = document.getElementById('open-editor-btn');
    const closeBtn = document.getElementById('close-editor-btn');
    const backdrop = document.getElementById('editor-backdrop');
    const cancelBtn = document.getElementById('btn-cancel-realm-content');
    const saveBtn = document.getElementById('btn-save-realm-content');
    const resetBtn = document.getElementById('btn-reset-realm-content');
    const tabVesper = document.getElementById('tab-btn-vesper');
    const tabTomoe = document.getElementById('tab-btn-tomoe');

    if (!modal) return;

    const openEditor = () => {
      this.activeEditorRealm = this.isVesper ? 'vesper' : 'tomoe';
      this.populateEditorForm(this.activeEditorRealm);
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('editor-open');
    };

    const closeEditor = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('editor-open');
    };

    if (openBtn) openBtn.addEventListener('click', openEditor);
    if (closeBtn) closeBtn.addEventListener('click', closeEditor);
    if (backdrop) backdrop.addEventListener('click', closeEditor);
    if (cancelBtn) cancelBtn.addEventListener('click', closeEditor);

    const switchTab = (realm) => {
      this.activeEditorRealm = realm;
      if (tabVesper) tabVesper.classList.toggle('active', realm === 'vesper');
      if (tabTomoe) tabTomoe.classList.toggle('active', realm === 'tomoe');
      this.populateEditorForm(realm);
    };

    if (tabVesper) tabVesper.addEventListener('click', () => switchTab('vesper'));
    if (tabTomoe) tabTomoe.addEventListener('click', () => switchTab('tomoe'));

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const r = this.activeEditorRealm;
        const currentData = this.realmContent[r] || {};

        const getVal = (id) => {
          const el = document.getElementById(id);
          return el ? el.value : '';
        };

        currentData.perfTitle1 = getVal('inp-perf-title1');
        currentData.perfTitle2 = getVal('inp-perf-title2');
        currentData.perfTag = getVal('inp-perf-tag');
        currentData.perfSubtag = getVal('inp-perf-subtag');
        currentData.perfDesc = getVal('inp-perf-desc');

        currentData.card1Stat = getVal('inp-card1-stat');
        currentData.card1Label = getVal('inp-card1-label');
        currentData.card1Desc = getVal('inp-card1-desc');

        currentData.card2Stat = getVal('inp-card2-stat');
        currentData.card2Label = getVal('inp-card2-label');
        currentData.card2Desc = getVal('inp-card2-desc');

        currentData.card3Stat = getVal('inp-card3-stat');
        currentData.card3Label = getVal('inp-card3-label');
        currentData.card3Desc = getVal('inp-card3-desc');

        currentData.aboutTitle = getVal('inp-about-title');
        currentData.aboutB1Title = getVal('inp-about-b1-title');
        currentData.aboutB1Desc = getVal('inp-about-b1-desc');
        currentData.aboutB2Title = getVal('inp-about-b2-title');
        currentData.aboutB2Desc = getVal('inp-about-b2-desc');

        this.realmContent[r] = currentData;
        try {
          localStorage.setItem('psxl_realm_content', JSON.stringify(this.realmContent));
        } catch (e) {
          console.warn('LocalStorage save error:', e);
        }

        const currentActivePageRealm = this.isVesper ? 'vesper' : 'tomoe';
        if (r === currentActivePageRealm) {
          this.applyRealmContent(r);
        }

        closeEditor();
        this.showToast(`✨ ${r.toUpperCase()} REALM CONTENT SAVED`);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const r = this.activeEditorRealm;
        this.realmContent[r] = JSON.parse(JSON.stringify(DEFAULT_REALM_CONTENT[r]));
        try {
          localStorage.setItem('psxl_realm_content', JSON.stringify(this.realmContent));
        } catch (e) {}

        this.populateEditorForm(r);
        const currentActivePageRealm = this.isVesper ? 'vesper' : 'tomoe';
        if (r === currentActivePageRealm) {
          this.applyRealmContent(r);
        }
        this.showToast(`↺ ${r.toUpperCase()} CONTENT RESET TO DEFAULT`);
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeEditor();
      }
    });
  }

  populateEditorForm(realm) {
    const data = this.realmContent?.[realm] || DEFAULT_REALM_CONTENT[realm];
    if (!data) return;

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('inp-perf-title1', data.perfTitle1);
    setVal('inp-perf-title2', data.perfTitle2);
    setVal('inp-perf-tag', data.perfTag);
    setVal('inp-perf-subtag', data.perfSubtag);
    setVal('inp-perf-desc', data.perfDesc);

    setVal('inp-card1-stat', data.card1Stat);
    setVal('inp-card1-label', data.card1Label);
    setVal('inp-card1-desc', data.card1Desc);

    setVal('inp-card2-stat', data.card2Stat);
    setVal('inp-card2-label', data.card2Label);
    setVal('inp-card2-desc', data.card2Desc);

    setVal('inp-card3-stat', data.card3Stat);
    setVal('inp-card3-label', data.card3Label);
    setVal('inp-card3-desc', data.card3Desc);

    setVal('inp-about-title', data.aboutTitle);
    setVal('inp-about-b1-title', data.aboutB1Title);
    setVal('inp-about-b1-desc', data.aboutB1Desc);
    setVal('inp-about-b2-title', data.aboutB2Title);
    setVal('inp-about-b2-desc', data.aboutB2Desc);

    const tabVesper = document.getElementById('tab-btn-vesper');
    const tabTomoe = document.getElementById('tab-btn-tomoe');
    if (tabVesper) tabVesper.classList.toggle('active', realm === 'vesper');
    if (tabTomoe) tabTomoe.classList.toggle('active', realm === 'tomoe');
  }

  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();
      // Press V or S to toggle realm
      if (key === 'v' || key === 's') {
        const branchBtn = document.getElementById('sakura-theme-toggle') || document.getElementById('realm-theme-toggle');
        if (branchBtn) branchBtn.click();
      }
    });
  }
}

// Global hookups
window.enterCinematic = () => window.app?.enterCinematic();
window.exitCinematic = () => window.app?.exitCinematic();
window.toggleCinematic = () => window.app?.toggleCinematic();

function initApp() {
  if (!window.app) {
    window.app = new AppController();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
