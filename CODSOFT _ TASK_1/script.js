/**
 * VIVEK SINGH - PERSONAL PORTFOLIO SCRIPT
 * CodSoft Frontend Development Internship • Task 1
 * Features: Typewriter, Theme Toggle, Smooth Scroll Spy, Mobile Drawer,
 * Filterable Skills & Projects, Interactive Modals & Demos, Real-Time Form Validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Theme Switcher (Dark / Light Mode)
     ========================================================================== */
  const htmlRoot = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggle');

  // Load saved theme or system preference
  const savedTheme = localStorage.getItem('vs_portfolio_theme');
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    htmlRoot.setAttribute('data-theme', 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('vs_portfolio_theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  }

  /* ==========================================================================
     2. Dynamic Hero Typewriter Effect
     ========================================================================== */
  const typewriterElement = document.getElementById('typewriterText');
  const roles = [
    'Frontend Developer',
    'BCA Tech Builder',
    'AI & Web Enthusiast',
    'UI/UX Craftsman'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const pauseBetween = 1800;

  function typeEffect() {
    if (!typewriterElement) return;

    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, pauseBetween);
        return;
      }
      setTimeout(typeEffect, typingSpeed);
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 400);
        return;
      }
      setTimeout(typeEffect, erasingSpeed);
    }
  }

  typeEffect();

  /* ==========================================================================
     3. Navbar Scroll Effect & Scroll-Spy Active Link
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTopBtn');

  function handleScroll() {
    const scrollY = window.pageYOffset;

    // Sticky glass navbar styling
    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scroll spy: Update active navigation link
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });

      mobileNavLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     4. Mobile Navigation Drawer
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileMenu);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeMobileMenu);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeAllModals();
    }
  });

  /* ==========================================================================
     5. Skill Progress Bars Animation & Category Filtering
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  // Trigger progress bar widths
  function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-bar-fill');
    progressFills.forEach((fill) => {
      const target = fill.style.getPropertyValue('--target-width');
      if (target) {
        fill.style.width = target;
      }
    });
  }

  // Trigger once in viewport or after a delay
  setTimeout(animateProgressBars, 600);

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     6. Projects Filter Tabs
     ========================================================================== */
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const pfilter = btn.getAttribute('data-pfilter');

      projectCards.forEach((card) => {
        const pcat = card.getAttribute('data-pcat');
        if (pfilter === 'all' || pcat === pfilter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     7. Project Details Modal Logic
     ========================================================================== */
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalTech = document.getElementById('modalTech');
  const modalBody = document.getElementById('modalBody');

  const projectDetailsDatabase = {
    aeropulse: {
      badge: 'AI • UAV DIGITAL TWIN • AEROSPACE',
      title: 'AEROPULSE AI — Engine Digital Twin',
      tech: 'React, TypeScript, Python AI, Three.js, Real-Time Telemetry',
      content: `
        <p><strong>Overview:</strong> AEROPULSE AI is an advanced telemetry monitoring and digital twin system engineered for aero-piston engines used in Medium-Altitude Long-Endurance (MALE) Unmanned Aerial Vehicles (UAVs).</p>
        <br>
        <p><strong>Key Highlights:</strong></p>
        <ul>
          <li>Physics-based engine simulation modeling temperature, cylinder pressure, fuel-air ratios, and vibration harmonics.</li>
          <li>Real-time telemetry stream processing over simulated websockets with <25ms response latency.</li>
          <li>Predictive anomaly detection calculating Remaining Useful Life (RUL) with ~96.4% testing accuracy.</li>
          <li>3D digital twin visualization for mission critical decision-making.</li>
        </ul>
      `
    },
    gramsathi: {
      badge: 'RURAL EMPOWERMENT • MULTILINGUAL AI',
      title: 'GRAMSATHI AI — Localized Intelligence Hub',
      tech: 'Next-Gen Frontend, Multilingual AI APIs, Speech Recognition, Responsive UI',
      content: `
        <p><strong>Overview:</strong> GramSathi AI bridges the digital divide for rural communities and agrarian citizens by translating complex governmental schemes, agricultural guidance, and village services into simple vernacular speech and text.</p>
        <br>
        <p><strong>Key Highlights:</strong></p>
        <ul>
          <li>Localized vernacular voice-assistant allowing users to speak their questions directly.</li>
          <li>Direct lookup for state and central citizen benefit schemes with automated eligibility checks.</li>
          <li>Offline-first caching and ultra-low bandwidth consumption for remote connectivity.</li>
        </ul>
      `
    },
    cyberhevix: {
      badge: 'CYBER DEFENSE • RECON PLATFORM',
      title: 'CYBERHEVIX TECHNOLOGY — Defense Architecture',
      tech: 'Modern Web, Linux Security, Wireshark, Threat Detection, Network Defense',
      content: `
        <p><strong>Overview:</strong> Cyberhevix Technology is a security-centric digital platform designed to demonstrate defense-in-depth security architectures, asset attack surface reconnaissance, and threat modeling workflows.</p>
        <br>
        <p><strong>Key Highlights:</strong></p>
        <ul>
          <li>Modular security dashboard visualizing network assets, ports, and risk exposures.</li>
          <li>Reconnaissance logging and defense analysis reporting templates.</li>
          <li>Hardened frontend architecture with zero client-side credential exposure and strict sanitization.</li>
        </ul>
      `
    },
    todo: {
      badge: 'FRONTEND • UTILITY • CODSOFT TASK',
      title: 'Interactive Task & To-Do Hub',
      tech: 'HTML5, CSS3, Modern JavaScript (ES6+), LocalStorage',
      content: `
        <p><strong>Overview:</strong> A responsive, high-performance task management application built using pure HTML, CSS, and JavaScript. Designed with smooth state transitions and browser persistence.</p>
        <br>
        <p><strong>Key Highlights:</strong></p>
        <ul>
          <li>Dynamic addition, status toggling, and deletion of custom tasks.</li>
          <li>Persistent storage in browser LocalStorage so data survives page refreshes.</li>
          <li>Real-time active vs completed task counter.</li>
        </ul>
      `
    },
    expense: {
      badge: 'FINTECH • CALCULATOR',
      title: 'Smart Expense Tracker',
      tech: 'Vanilla JavaScript, CSS3 Glassmorphism, Math Engine',
      content: `
        <p><strong>Overview:</strong> An interactive personal finance tracking interface that enables users to record income, categorize expenditures, and immediately compute their net financial position.</p>
        <br>
        <p><strong>Key Highlights:</strong></p>
        <ul>
          <li>Real-time budget ledger with income vs expenditure color-coding.</li>
          <li>Dynamic balance recalculation with every newly appended entry.</li>
          <li>Category tagging (Food, Travel, Bills, Project, etc.).</li>
        </ul>
      `
    },
    music: {
      badge: 'AUDIO • MULTIMEDIA API',
      title: 'Aura Sleek Music Streamer',
      tech: 'HTML5 Web Audio API, JavaScript, Keyframes CSS',
      content: `
        <p><strong>Overview:</strong> A modern audio player interface featuring playlist tracks, responsive scrub bar, animated equalizer visualizer, and dynamic track metadata rendering.</p>
        <br>
        <p><strong>Key Highlights:</strong></p>
        <ul>
          <li>Custom audio control interface with Play, Pause, Next, Prev, and Volume controls.</li>
          <li>Simulated live frequency visualizer bars that respond smoothly during active playback.</li>
          <li>Pure client-side implementation with zero heavy external libraries.</li>
        </ul>
      `
    }
  };

  const projectModalTriggers = document.querySelectorAll('.project-modal-trigger');

  projectModalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const projId = trigger.getAttribute('data-project');
      const data = projectDetailsDatabase[projId];
      if (data && projectModal) {
        modalBadge.textContent = data.badge;
        modalTitle.textContent = data.title;
        modalTech.textContent = data.tech;
        modalBody.innerHTML = data.content;
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeProjectModal() {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

  /* ==========================================================================
     8. Resume Preview Modal
     ========================================================================== */
  const resumeModal = document.getElementById('resumeModal');
  const previewResumeBtn = document.getElementById('previewResumeBtn');
  const resumeModalCloseBtn = document.getElementById('resumeModalCloseBtn');
  const resumeModalBackdrop = document.getElementById('resumeModalBackdrop');

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (previewResumeBtn) previewResumeBtn.addEventListener('click', openResumeModal);
  if (resumeModalCloseBtn) resumeModalCloseBtn.addEventListener('click', closeResumeModal);
  if (resumeModalBackdrop) resumeModalBackdrop.addEventListener('click', closeResumeModal);

  /* ==========================================================================
     9. Interactive Quick Play Demos (Task Hub, Expense, Music)
     ========================================================================== */
  const demoModal = document.getElementById('demoModal');
  const demoModalCloseBtn = document.getElementById('demoModalCloseBtn');
  const demoModalBackdrop = document.getElementById('demoModalBackdrop');
  const demoModalTitle = document.getElementById('demoModalTitle');
  const demoModalBody = document.getElementById('demoModalBody');
  const quickDemoBtns = document.querySelectorAll('.quick-demo-btn');

  function openDemoModal(type) {
    if (!demoModal) return;

    if (type === 'todo') {
      demoModalTitle.textContent = 'Quick Play: Task & To-Do Hub';
      demoModalBody.innerHTML = `
        <div class="demo-app-container">
          <p style="font-size: 0.9rem; color: var(--text-secondary);">Add and manage tasks in real time:</p>
          <div class="demo-input-row">
            <input type="text" id="demoTaskInput" placeholder="Add a new task..." />
            <button class="btn btn-sm btn-primary" id="demoAddTaskBtn">Add Task</button>
          </div>
          <ul class="demo-list" id="demoTaskList">
            <li class="demo-list-item">
              <span>Complete CodSoft Task 1 Presentation</span>
              <button class="btn btn-sm btn-ghost demo-del-btn"><i class="fa-solid fa-trash"></i></button>
            </li>
            <li class="demo-list-item done">
              <span>Design Soft Modern Glassmorphism Portfolio</span>
              <button class="btn btn-sm btn-ghost demo-del-btn"><i class="fa-solid fa-trash"></i></button>
            </li>
          </ul>
        </div>
      `;

      // Attach Demo Task Listeners
      const taskInput = document.getElementById('demoTaskInput');
      const addTaskBtn = document.getElementById('demoAddTaskBtn');
      const taskList = document.getElementById('demoTaskList');

      function addTask() {
        const val = taskInput.value.trim();
        if (!val) return;
        const li = document.createElement('li');
        li.className = 'demo-list-item';
        li.innerHTML = `
          <span>${val}</span>
          <button class="btn btn-sm btn-ghost demo-del-btn"><i class="fa-solid fa-trash"></i></button>
        `;
        taskList.prepend(li);
        taskInput.value = '';
        attachTaskItemEvents(li);
        showToast('Task added successfully!', 'success');
      }

      function attachTaskItemEvents(item) {
        item.querySelector('span').addEventListener('click', () => {
          item.classList.toggle('done');
        });
        item.querySelector('.demo-del-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          item.remove();
          showToast('Task removed', 'info');
        });
      }

      addTaskBtn.addEventListener('click', addTask);
      taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addTask();
      });

      taskList.querySelectorAll('.demo-list-item').forEach(attachTaskItemEvents);
    } 
    else if (type === 'expense') {
      demoModalTitle.textContent = 'Quick Play: Smart Expense Tracker';
      demoModalBody.innerHTML = `
        <div class="demo-app-container">
          <div style="display: flex; justify-content: space-between; padding: 14px; background: rgba(0,210,255,0.08); border-radius: var(--radius-md);">
            <div><span style="font-size: 0.78rem; text-transform: uppercase;">Net Balance:</span> <h3 id="demoBalance" style="color: var(--accent-cyan);">$1,450.00</h3></div>
            <div><span style="font-size: 0.78rem; text-transform: uppercase;">Spent:</span> <h3 id="demoSpent" style="color: var(--accent-rose);">-$350.00</h3></div>
          </div>
          <div class="demo-input-row">
            <input type="text" id="demoExpDesc" placeholder="Item (e.g. Hosting)" style="flex: 2;" />
            <input type="number" id="demoExpAmt" placeholder="Amount ($)" style="flex: 1;" />
            <button class="btn btn-sm btn-primary" id="demoAddExpBtn">Log</button>
          </div>
          <ul class="demo-list" id="demoExpList">
            <li class="demo-list-item"><span>Domain & Cloud Hosting</span> <strong style="color: var(--accent-rose);">-$45.00</strong></li>
            <li class="demo-list-item"><span>Internship Stipend</span> <strong style="color: var(--accent-emerald);">+$500.00</strong></li>
          </ul>
        </div>
      `;

      const descInput = document.getElementById('demoExpDesc');
      const amtInput = document.getElementById('demoExpAmt');
      const addExpBtn = document.getElementById('demoAddExpBtn');
      const expList = document.getElementById('demoExpList');

      addExpBtn.addEventListener('click', () => {
        const desc = descInput.value.trim();
        const amt = parseFloat(amtInput.value);
        if (!desc || isNaN(amt) || amt <= 0) {
          showToast('Please enter a valid item and positive amount', 'error');
          return;
        }

        const li = document.createElement('li');
        li.className = 'demo-list-item';
        li.innerHTML = `<span>${desc}</span> <strong style="color: var(--accent-rose);">-$${amt.toFixed(2)}</strong>`;
        expList.prepend(li);
        descInput.value = '';
        amtInput.value = '';
        showToast('Expense logged successfully!', 'success');
      });
    } 
    else if (type === 'music') {
      demoModalTitle.textContent = 'Quick Play: Aura Sleek Audio Player';
      demoModalBody.innerHTML = `
        <div class="audio-player-box">
          <div style="font-size: 2.4rem; color: var(--accent-cyan); margin-bottom: 8px;">
            <i class="fa-solid fa-music"></i>
          </div>
          <h4 id="demoSongTitle">Cybernetic Dreamscape</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">Vivek Singh • Ambient Lo-Fi</p>
          
          <div class="visualizer-bars">
            <div class="v-bar"></div>
            <div class="v-bar"></div>
            <div class="v-bar"></div>
            <div class="v-bar"></div>
            <div class="v-bar"></div>
            <div class="v-bar"></div>
          </div>

          <div style="display: flex; align-items: center; justify-content: center; gap: 18px; margin-top: 14px;">
            <button class="btn btn-sm btn-ghost" id="demoPrevTrack"><i class="fa-solid fa-backward-step"></i></button>
            <button class="btn btn-primary" id="demoPlayBtn" style="width: 48px; height: 48px; border-radius: 50%; padding: 0;">
              <i class="fa-solid fa-pause" id="demoPlayIcon"></i>
            </button>
            <button class="btn btn-sm btn-ghost" id="demoNextTrack"><i class="fa-solid fa-forward-step"></i></button>
          </div>
        </div>
      `;

      let isPlaying = true;
      const playBtn = document.getElementById('demoPlayBtn');
      const playIcon = document.getElementById('demoPlayIcon');
      const bars = document.querySelectorAll('.v-bar');

      playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
          playIcon.className = 'fa-solid fa-pause';
          bars.forEach((b) => (b.style.animationPlayState = 'running'));
          showToast('Resumed audio simulation', 'info');
        } else {
          playIcon.className = 'fa-solid fa-play';
          bars.forEach((b) => (b.style.animationPlayState = 'paused'));
          showToast('Paused audio', 'info');
        }
      });
    }

    demoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  quickDemoBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-demo');
      openDemoModal(type);
    });
  });

  function closeDemoModal() {
    if (demoModal) {
      demoModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (demoModalCloseBtn) demoModalCloseBtn.addEventListener('click', closeDemoModal);
  if (demoModalBackdrop) demoModalBackdrop.addEventListener('click', closeDemoModal);

  function closeAllModals() {
    closeProjectModal();
    closeResumeModal();
    closeDemoModal();
  }

  /* ==========================================================================
     10. Contact Form Validation (Strict, Accessible, Interactive)
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const subjectInput = document.getElementById('userSubject');
  const messageInput = document.getElementById('userMessage');
  const submitBtn = document.getElementById('submitBtn');

  // Input helper validators
  function validateName() {
    const group = document.getElementById('nameGroup');
    const val = nameInput.value.trim();
    if (val.length < 2) {
      group.classList.add('has-error');
      group.classList.remove('is-valid');
      return false;
    }
    group.classList.remove('has-error');
    group.classList.add('is-valid');
    return true;
  }

  function validateEmail() {
    const group = document.getElementById('emailGroup');
    const val = emailInput.value.trim();
    // Standard RFC-compliant email regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(val)) {
      group.classList.add('has-error');
      group.classList.remove('is-valid');
      return false;
    }
    group.classList.remove('has-error');
    group.classList.add('is-valid');
    return true;
  }

  function validateSubject() {
    const group = document.getElementById('subjectGroup');
    const val = subjectInput.value.trim();
    if (val.length < 2) {
      group.classList.add('has-error');
      group.classList.remove('is-valid');
      return false;
    }
    group.classList.remove('has-error');
    group.classList.add('is-valid');
    return true;
  }

  function validateMessage() {
    const group = document.getElementById('messageGroup');
    const val = messageInput.value.trim();
    if (val.length < 10) {
      group.classList.add('has-error');
      group.classList.remove('is-valid');
      return false;
    }
    group.classList.remove('has-error');
    group.classList.add('is-valid');
    return true;
  }

  // Real-time input listeners to clear error once user begins fixing
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim().length >= 2) validateName();
    });
    nameInput.addEventListener('blur', validateName);
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      if (emailInput.value.trim().includes('@')) validateEmail();
    });
    emailInput.addEventListener('blur', validateEmail);
  }

  if (subjectInput) {
    subjectInput.addEventListener('input', () => {
      if (subjectInput.value.trim().length >= 2) validateSubject();
    });
    subjectInput.addEventListener('blur', validateSubject);
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      if (messageInput.value.trim().length >= 10) validateMessage();
    });
    messageInput.addEventListener('blur', validateMessage);
  }

  // Handle Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isSubjectValid = validateSubject();
      const isMessageValid = validateMessage();

      if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
        showToast('Please correct the highlighted fields before sending.', 'error');
        // Focus first invalid input
        if (!isNameValid) nameInput.focus();
        else if (!isEmailValid) emailInput.focus();
        else if (!isSubjectValid) subjectInput.focus();
        else if (!isMessageValid) messageInput.focus();
        return;
      }

      // Enter Loading State
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // Simulate asynchronous sending
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Success notification
        showToast(`Thank you, ${nameInput.value.trim()}! Your message has been received.`, 'success');

        // Reset form and remove validation state styles
        contactForm.reset();
        ['nameGroup', 'emailGroup', 'subjectGroup', 'messageGroup'].forEach((id) => {
          const el = document.getElementById(id);
          if (el) {
            el.classList.remove('is-valid');
            el.classList.remove('has-error');
          }
        });
      }, 1400);
    });
  }

  /* ==========================================================================
     11. Toast Notification System
     ========================================================================== */
  function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'fa-solid fa-circle-info';
    if (type === 'success') iconClass = 'fa-solid fa-circle-check';
    if (type === 'error') iconClass = 'fa-solid fa-triangle-exclamation';

    toast.innerHTML = `
      <i class="${iconClass} toast-icon"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      toast.style.animation = 'slideInToast 0.3s ease reverse forwards';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 4000);
  }
});
