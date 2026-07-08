/* -------------------------------------------------------------
 * Priyanshu Garg Developer Portfolio - Core Orchestrator v2.0
 * ------------------------------------------------------------- */

import { RESUME_DATA } from './data.js?v=1.0.1';
import { ThreeEngine } from './three-bg.js?v=1.0.1';
import { AnimationController } from './animations.js?v=1.0.1';
import { FormHandler } from './form.js?v=1.0.1';
import { TerminalController } from './terminal.js?v=1.0.1';

document.addEventListener("DOMContentLoaded", () => {
  // 1. Populate UI from Structured Data Provider
  populateUI();

  // 2. Initialize Three.js Network Scene
  const canvasEl = document.getElementById('three-canvas');
  if (canvasEl) {
    ThreeEngine.init(canvasEl);
  }

  // 3. Initialize GSAP & Scroll Interactions
  AnimationController.init();

  // Initialize Interactive Developer Terminal Console
  TerminalController.init();
  
  // Register reveals once layout is populated
  // AnimationController.initSectionReveals();

  // Bind Magnetic Actions
  AnimationController.initMagneticButtons('.magnetic');

  // Bind Project Card Tilts
  AnimationController.initCardTilts('.project-card');

  // 4. Initialize Contact Form validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    FormHandler.init(contactForm);
  }

  // 5. Initialize Mobile Menu Controller
  initMobileMenu();
});

function populateUI() {
  // About Info Panel Renderer
  const aboutInfoContainer = document.getElementById('about-info-container');
  if (aboutInfoContainer) {
    const currentJob = RESUME_DATA.experience[0];
    const eduHTML = RESUME_DATA.education.map((edu, idx) => `
      <div class="${idx > 0 ? 'mt-3 border-t border-slate-800/40 pt-3' : ''}">
        <span class="text-sm font-bold text-white block">${edu.degree}</span>
        <span class="text-xs text-slate-400 mt-1 block">${edu.institution} (${edu.year})</span>
        <span class="text-xs font-mono text-cyberCyan mt-0.5 block">${edu.score}</span>
      </div>
    `).join('');

    const certsHTML = RESUME_DATA.certifications.map(cert => `
      <span class="bg-slate-900/60 px-2 py-1 rounded text-[10px] text-slate-300 border border-white/5 hover:border-cyberCyan/10 transition-colors">${cert}</span>
    `).join('');

    const langsHTML = RESUME_DATA.languages.map(lang => `
      <span class="bg-slate-900/60 px-3 py-1.5 rounded-full text-xs text-cyberCyan border border-cyberCyan/20 font-mono font-medium">${lang}</span>
    `).join('');

    aboutInfoContainer.innerHTML = `
      <div class="glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col gap-6">
        <div class="absolute -right-12 -top-12 w-32 h-32 bg-cyberCyan/10 rounded-full blur-2xl"></div>
        
        <div>
          <span class="text-[10px] font-mono text-dim uppercase tracking-widest block">CURRENT WORKPLACE</span>
          <span class="text-lg font-bold text-white mt-1 block">${currentJob.company}</span>
          <span class="text-xs font-mono text-cyberCyan mt-0.5 block">${currentJob.role}</span>
        </div>
        
        <div>
          <span class="text-[10px] font-mono text-dim uppercase tracking-widest block">BASE LOCATION</span>
          <span class="text-base font-bold text-white mt-1 block">${RESUME_DATA.profile.location}</span>
        </div>
        
        <div>
          <span class="text-[10px] font-mono text-dim uppercase tracking-widest block mb-2">ACADEMIC FOUNDATION</span>
          ${eduHTML}
        </div>

        <div>
          <span class="text-[10px] font-mono text-dim uppercase tracking-widest block mb-2.5">CERTIFICATIONS & COURSES</span>
          <div class="flex flex-wrap gap-1.5">
            ${certsHTML}
          </div>
        </div>

        <div>
          <span class="text-[10px] font-mono text-dim uppercase tracking-widest block mb-2">LANGUAGES</span>
          <div class="flex flex-wrap gap-2">
            ${langsHTML}
          </div>
        </div>
      </div>
    `;
  }

  // A. Dynamic Skills Renderer
  const skillsContainer = document.getElementById('skills-container');
  console.log("DEBUG skillsContainer:", skillsContainer);
  console.log("DEBUG RESUME_DATA.skills:", RESUME_DATA ? RESUME_DATA.skills : "RESUME_DATA is undefined");
  if (skillsContainer) {
    let skillsHTML = '';
    RESUME_DATA.skills.forEach(cat => {
      skillsHTML += `
        <div class="glass-panel p-6 rounded-xl border border-white/5 backdrop-blur hover:border-cyberCyan/20 transition-all duration-300">
          <h3 class="text-base font-outfit font-semibold text-white mb-4 border-b border-slate-800 pb-2">${cat.category}</h3>
          <div class="flex flex-wrap gap-2">
            ${cat.list.map(skill => `
              <span class="skill-badge flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-md text-xs text-slate-300 border border-white/5 hover:border-cyberCyan/20 transition-colors">
                <i class="${skill.icon} text-cyberCyan text-[10px]"></i> ${skill.name}
              </span>
            `).join('')}
          </div>
        </div>
      `;
    });
    skillsContainer.innerHTML = skillsHTML;
    console.log("DEBUG skillsHTML length:", skillsHTML.length);
    console.log("DEBUG skillsHTML content:", skillsHTML);
    console.log("DEBUG skillsContainer.innerHTML after write:", skillsContainer.innerHTML);
  }

  // B. Dynamic Experience Renderer (Zig-zag timeline structure)
  const expContainer = document.getElementById('experience-container');
  if (expContainer) {
    let expHTML = '';
    RESUME_DATA.experience.forEach((exp, index) => {
      const isEven = index % 2 === 0;
      expHTML += `
        <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          <!-- Connective dot node -->
          <div class="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-voidBlack border-2 border-slate-700 rounded-full z-10 flex items-center justify-center">
            <div class="w-1.5 h-1.5 bg-cyberCyan rounded-full"></div>
          </div>
          
          <!-- Period date label for Desktop -->
          <div class="hidden md:block text-right pr-12 font-mono text-xs text-cyberCyan pt-2 ${isEven ? 'md:order-1' : 'md:order-2 md:text-left md:pl-12 md:pr-0'}">
            ${exp.period}
          </div>
          
          <!-- Experience content details card -->
          <div class="pl-12 md:pl-0 ${isEven ? 'md:order-2 md:text-left md:pl-12' : 'md:order-1 md:text-right md:pr-12'}">
            <div class="glass-panel p-6 rounded-xl border border-white/5 text-left hover:border-hyperPurple/20 transition-all duration-300">
              <span class="md:hidden block text-xs font-mono text-cyberCyan mb-2">${exp.period}</span>
              <h3 class="text-lg font-outfit font-bold text-white leading-tight">${exp.role}</h3>
              <span class="text-xs font-mono text-slate-400 mt-1 block">${exp.company} &bull; ${exp.location}</span>
              <ul class="list-none pl-0 mt-4 flex flex-col gap-2.5 text-xs text-slate-400">
                ${exp.highlights.map(pt => `
                  <li class="flex gap-2 items-start">
                    <i class="fa-solid fa-angle-right text-cyberCyan mt-1 text-[8px]"></i>
                    <span class="leading-relaxed">${pt}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
    });
    expContainer.innerHTML = expHTML;
  }

  // C. Dynamic Projects Renderer (Tilt Card Grid)
  const projContainer = document.getElementById('projects-container');
  if (projContainer) {
    let projHTML = '';
    RESUME_DATA.projects.forEach(proj => {
      projHTML += `
        <div class="project-card relative rounded-2xl overflow-hidden border border-white/5 bg-glass-dark backdrop-blur group transform-gpu transition-all duration-300 flex flex-col justify-between min-h-[360px]">
          <div class="aspect-video bg-slate-950/60 flex flex-col items-center justify-center overflow-hidden border-b border-slate-900 p-8 relative">
            <div class="absolute inset-0 bg-gradient-to-t from-voidBlack/80 to-transparent z-[2]"></div>
            <div class="relative z-10 flex flex-col items-center gap-4 text-center">
              <div class="w-16 h-16 rounded-full bg-cyberCyan/10 border border-cyberCyan/20 flex items-center justify-center text-cyberCyan text-2xl group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(0,240,255,0.05)]">
                <i class="${proj.icon}"></i>
              </div>
              <span class="text-[10px] font-mono text-cyberCyan uppercase tracking-widest bg-voidBlack/60 px-3 py-1 rounded-full border border-white/5">${proj.category}</span>
            </div>
          </div>
          <div class="p-6 relative z-10 flex-grow flex flex-col justify-between">
            <div>
              <h3 class="text-xl font-outfit font-bold text-white group-hover:text-cyberCyan transition-colors">${proj.title}</h3>
              <p class="text-xs text-slate-400 mt-2 mb-4 leading-relaxed">${proj.description}</p>
            </div>
            <div class="flex flex-wrap gap-1.5 mt-auto">
              ${proj.tags.map(tag => `
                <span class="bg-voidBlack px-2.5 py-1 rounded text-[10px] text-slate-400 border border-white/5">${tag}</span>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    });
    projContainer.innerHTML = projHTML;
  }

  // D. Dynamic Achievements Renderer (Metrics Grid)
  const achContainer = document.getElementById('achievements-container');
  if (achContainer) {
    let achHTML = '';
    RESUME_DATA.achievements.forEach(ach => {
      achHTML += `
        <div class="metric-card bg-glass-dark border border-white/5 rounded-2xl p-8 text-center hover:border-hyperPurple/20 transition-all duration-300">
          <div class="text-5xl md:text-6xl font-outfit font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyberCyan to-hyperPurple inline-block">${ach.metric}</div>
          <h3 class="text-base font-outfit font-semibold text-white mt-4 mb-2">${ach.label}</h3>
          <p class="text-xs text-slate-400 leading-relaxed">${ach.description}</p>
        </div>
      `;
    });
    achContainer.innerHTML = achHTML;
  }
}

function initMobileMenu() {
  const trigger = document.getElementById('mobile-nav-trigger');
  const overlay = document.getElementById('mobile-nav-overlay');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!trigger || !overlay) return;

  const toggleMenu = () => {
    const isOpened = overlay.classList.contains('translate-y-0');
    if (isOpened) {
      overlay.classList.remove('translate-y-0');
      overlay.classList.add('-translate-y-full');
      trigger.innerHTML = `<i class="fa-solid fa-bars-staggered text-lg"></i>`;
      document.body.classList.remove('overflow-hidden');
    } else {
      overlay.classList.remove('-translate-y-full');
      overlay.classList.add('translate-y-0');
      trigger.innerHTML = `<i class="fa-solid fa-xmark text-lg"></i>`;
      document.body.classList.add('overflow-hidden');
    }
  };

  trigger.addEventListener('click', toggleMenu);

  // Close overlays on links interaction
  links.forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('translate-y-0');
      overlay.classList.add('-translate-y-full');
      trigger.innerHTML = `<i class="fa-solid fa-bars-staggered text-lg"></i>`;
      document.body.classList.remove('overflow-hidden');
    });
  });
}
