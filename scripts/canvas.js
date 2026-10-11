/**
 * PsXL Cinematic Engine: Dual-Realm Particle System (Embers vs. Sakura Petals)
 */

class ParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 75;
    this.isSakura = false;
    
    // Mouse state
    this.mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2,
      speed: 0,
      lastX: window.innerWidth / 2,
      lastY: window.innerHeight / 2,
      isActive: false
    };

    this.viewportEl = document.querySelector('.eye-background-viewport');

    this.init();
  }

  setTheme(isSakura) {
    this.isSakura = isSakura;
    // Repopulate particles for the new theme
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle(true));
    }
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Populate particles
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle(true));
    }

    // Track mouse
    window.addEventListener('mousemove', (e) => {
      this.mouse.isActive = true;
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;

      const dx = e.clientX - this.mouse.lastX;
      const dy = e.clientY - this.mouse.lastY;
      this.mouse.speed = Math.sqrt(dx * dx + dy * dy);
      this.mouse.lastX = e.clientX;
      this.mouse.lastY = e.clientY;

      if (this.mouse.speed > 25 && Math.random() < 0.4) {
        this.spawnBurst(e.clientX, e.clientY);
      }
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.isActive = false;
    });

    this.loop();
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
  }

  createParticle(randomY = false) {
    if (this.isSakura) {
      // Celestial Anime Vesper Starlight & Stardust
      const isStar = Math.random() > 0.35;
      return {
        x: Math.random() * (this.width + 100) - 50,
        y: randomY ? Math.random() * this.height : -20 - Math.random() * 50,
        size: isStar ? Math.random() * 4 + 2 : Math.random() * 6 + 3,
        speedY: Math.random() * 1.2 + 0.4,
        speedX: Math.random() * 1.0 - 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        wobbleSpeed: Math.random() * 0.03 + 0.015,
        wobbleAngle: Math.random() * Math.PI * 2,
        flipAngle: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.04 + 0.02,
        alpha: Math.random() * 0.7 + 0.3,
        color: Math.random() > 0.45 ? '#38bdf8' : (Math.random() > 0.5 ? '#ffffff' : '#60a5fa'),
        glow: Math.random() * 14 + 6,
        life: 1,
        decay: 0
      };
    } else {
      // Rising Fiery Ember
      const isEmber = Math.random() > 0.3;
      return {
        x: Math.random() * this.width,
        y: randomY ? Math.random() * this.height : this.height + Math.random() * 40,
        size: isEmber ? Math.random() * 2.5 + 1 : Math.random() * 4 + 2,
        speedY: -(Math.random() * 1.4 + 0.4),
        speedX: (Math.random() - 0.5) * 0.8,
        wobbleSpeed: Math.random() * 0.04 + 0.01,
        wobbleAngle: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.7 + 0.2,
        hue: Math.random() > 0.2 ? 350 + Math.random() * 15 : 15,
        glow: Math.random() * 12 + 6,
        life: 1,
        decay: Math.random() * 0.003 + 0.001
      };
    }
  }

  spawnBurst(x, y) {
    if (this.particles.length > this.maxParticles + 25) return;
    for (let i = 0; i < 4; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 3 + 1;
      if (this.isSakura) {
        this.particles.push({
          x: x + (Math.random() - 0.5) * 15,
          y: y + (Math.random() - 0.5) * 15,
          size: Math.random() * 6 + 3,
          speedX: Math.cos(angle) * velocity + 0.5,
          speedY: Math.sin(angle) * velocity + 0.5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: 0.05,
          wobbleSpeed: 0.04,
          wobbleAngle: 0,
          flipAngle: 0,
          flipSpeed: 0.05,
          alpha: 0.9,
          color: Math.random() > 0.5 ? '#38bdf8' : '#ffffff',
          life: 1,
          decay: 0.015
        });
      } else {
        this.particles.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          size: Math.random() * 3 + 1.5,
          speedX: Math.cos(angle) * velocity,
          speedY: Math.sin(angle) * velocity - 1,
          wobbleSpeed: 0.05,
          wobbleAngle: 0,
          alpha: 0.9,
          hue: 355,
          glow: 18,
          life: 1,
          decay: 0.015
        });
      }
    }
  }

  update() {
    // Smooth mouse lerp
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.1;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.1;

    // Subtle parallax of the eye background
    if (this.viewportEl) {
      const offsetX = ((this.mouse.x / this.width) - 0.5) * -26;
      const offsetY = ((this.mouse.y / this.height) - 0.5) * -20;
      this.viewportEl.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    }

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      if (this.isSakura) {
        p.wobbleAngle += p.wobbleSpeed;
        p.flipAngle += p.flipSpeed;
        p.rotation += p.rotationSpeed;
        p.x += p.speedX + Math.sin(p.wobbleAngle) * 0.8;
        p.y += p.speedY;

        // Mouse breeze repulsion on petals
        if (this.mouse.isActive) {
          const dx = p.x - this.mouse.x;
          const dy = p.y - this.mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 140;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 4;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
            p.rotationSpeed += 0.02;
          }
        }

        // Recycle petals that fall past bottom
        if (p.y > this.height + 30 || p.x > this.width + 60 || p.x < -60) {
          this.particles[i] = this.createParticle();
        }
      } else {
        // Red embers
        p.wobbleAngle += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobbleAngle) * 0.4;
        p.y += p.speedY;

        if (this.mouse.isActive) {
          const dx = p.x - this.mouse.x;
          const dy = p.y - this.mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 3;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
            p.alpha = Math.min(1, p.alpha + 0.1);
          }
        }

        p.life -= p.decay;

        if (p.y < -20 || p.x < -20 || p.x > this.width + 20 || p.life <= 0) {
          this.particles[i] = this.createParticle();
        }
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.isSakura) {
      // Draw falling Sakura Petals
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        
        // 3D flip effect via vertical scale
        const flip = Math.sin(p.flipAngle);
        this.ctx.scale(1, Math.max(0.15, Math.abs(flip)));

        this.ctx.globalAlpha = p.alpha;
        this.ctx.fillStyle = p.color;
        this.ctx.shadowBlur = p.glow || 12;
        this.ctx.shadowColor = p.color === '#ffffff' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(56, 189, 248, 0.75)';

        // Draw 4-point sparkling celestial anime star
        const s = p.size;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -s);
        this.ctx.quadraticCurveTo(0, 0, s, 0);
        this.ctx.quadraticCurveTo(0, 0, 0, s);
        this.ctx.quadraticCurveTo(0, 0, -s, 0);
        this.ctx.quadraticCurveTo(0, 0, 0, -s);
        this.ctx.closePath();
        this.ctx.fill();

        // Shimmering white star core
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, Math.max(0.8, s * 0.28), 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
      }
    } else {
      // Draw glowing fiery Embers
      if (this.mouse.isActive) {
        const radial = this.ctx.createRadialGradient(
          this.mouse.x, this.mouse.y, 0,
          this.mouse.x, this.mouse.y, 220
        );
        radial.addColorStop(0, 'rgba(255, 26, 60, 0.08)');
        radial.addColorStop(0.5, 'rgba(180, 0, 30, 0.03)');
        radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
        this.ctx.fillStyle = radial;
        this.ctx.fillRect(0, 0, this.width, this.height);
      }

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        const currentAlpha = p.alpha * p.life;

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.shadowBlur = p.glow;
        this.ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, ${currentAlpha * 0.9})`;
        this.ctx.fillStyle = `hsla(${p.hue}, 100%, 75%, ${currentAlpha})`;
        this.ctx.fill();
        this.ctx.restore();
      }
    }
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}

function initCanvas() {
  if (!window.particlesEngine) {
    window.particlesEngine = new ParticleEngine('particles-canvas');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCanvas);
} else {
  initCanvas();
}
