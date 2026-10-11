/**
 * PsXL Cursor & Micro-Interactions Engine
 * Custom Cursor, Card Spotlights, 3D Tilt & Audio Synthesis
 */

class CursorController {
  constructor() {
    this.dot = document.querySelector('.cursor-dot');
    this.ring = document.querySelector('.cursor-ring');
    this.tomoe = document.querySelector('.cursor-tomoe');
    this.label = document.querySelector('.cursor-label');

    this.mouse = { x: -100, y: -100 };
    this.ringPos = { x: -100, y: -100 };
    this.dotPos = { x: -100, y: -100 };
    this.tomoeRotation = 0;
    this.isHovering = false;

    this.init();
  }

  init() {
    if (!this.dot || !this.ring) return;

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    // Handle interactive hover targets
    const hoverTargets = document.querySelectorAll('a, button, .cursor-target, .clean-block, .social-card, .lang-pill');
    
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', (e) => {
        document.body.classList.add('cursor-hover');
        this.isHovering = true;
        
        const labelText = el.getAttribute('data-cursor-label') || 
                          (el.tagName === 'A' ? 'OPEN' : 
                           el.tagName === 'BUTTON' ? 'ACTIVATE' : 'INSPECT');
        if (this.label) {
          this.label.textContent = labelText;
        }

        // Play gentle interaction chime if audio active
        if (window.audioEngine && window.audioEngine.isEnabled) {
          window.audioEngine.playHover();
        }
      });

      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
        this.isHovering = false;
        if (this.label) this.label.textContent = '';
      });
    });

    // Magnetic effect on primary buttons
    const magneticElements = document.querySelectorAll('.primary-btn, .secondary-btn, .exit-cinematic-btn, .brand-badge');
    magneticElements.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.25;
        const deltaY = (e.clientY - centerY) * 0.25;
        btn.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });

    // Spotlight updates on cards
    const cards = document.querySelectorAll('.social-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Subtle 3D tilt
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = (y - centerY) / centerY * -4;
        const tiltY = (x - centerX) / centerX * 4;
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    this.render();
  }

  render() {
    // Sharp fast follow for inner dot
    this.dotPos.x += (this.mouse.x - this.dotPos.x) * 0.65;
    this.dotPos.y += (this.mouse.y - this.dotPos.y) * 0.65;

    // Smooth weight/inertia for outer ring
    this.ringPos.x += (this.mouse.x - this.ringPos.x) * 0.16;
    this.ringPos.y += (this.mouse.y - this.ringPos.y) * 0.16;

    if (this.isHovering) {
      this.tomoeRotation += 3;
    } else {
      this.tomoeRotation += 0.5;
    }

    if (this.dot) {
      this.dot.style.transform = `translate3d(${this.dotPos.x}px, ${this.dotPos.y}px, 0) translate(-50%, -50%)`;
    }

    if (this.ring) {
      this.ring.style.transform = `translate3d(${this.ringPos.x}px, ${this.ringPos.y}px, 0) translate(-50%, -50%)`;
    }

    if (this.tomoe) {
      this.tomoe.style.transform = `rotate(${this.tomoeRotation}deg)`;
    }

    requestAnimationFrame(() => this.render());
  }
}

/**
 * Procedural Web Audio Sound Synthesizer
 */
class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isEnabled = false;
  }

  toggle() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isEnabled = !this.isEnabled;
    if (this.isEnabled) {
      this.playAwaken();
    }
    return this.isEnabled;
  }

  playAwaken() {
    if (!this.ctx || !this.isEnabled) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.6);

    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.85);
  }

  playHover() {
    if (!this.ctx || !this.isEnabled) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(680, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playEyeSwitch() {
    if (!this.ctx || !this.isEnabled) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.45);
  }
}

function initCursor() {
  if (!window.cursorController) {
    window.cursorController = new CursorController();
    window.audioEngine = new AudioEngine();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCursor);
} else {
  initCursor();
}
