/**
 * LUMINA BLOG — SCRIPT.JS
 * CODSOFT Frontend Development — Task 5
 * Interactive Logic: Searching, Category Filtering, Article Detail Modal, Load More, Dark Mode
 */

// -----------------------------------------------------------------------------
// 1. Blog Articles Database
// -----------------------------------------------------------------------------
const BLOG_ARTICLES = [
  {
    id: "tech-1",
    title: "Mastering Modern JavaScript: From ES2024 to Web APIs",
    category: "Technology",
    date: "Oct 18, 2026",
    readTime: "6 min read",
    author: {
      name: "Sophia Vance",
      role: "Senior Frontend Architect",
      initials: "SV"
    },
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80",
    tags: ["JavaScript", "WebDev", "Frontend", "ECMAScript"],
    excerpt: "Explore the newest capabilities in modern JavaScript including temporal APIs, pipeline operators, top-level await, and best practices for resilient client-side architecture.",
    content: `
      <p>JavaScript continues its rapid evolution, bringing language features that previously required complex external dependencies or polyfills directly into native browser engines.</p>
      
      <h3>1. The Shift Toward Immutable Operations</h3>
      <p>Recent ECMAScript additions have placed a strong emphasis on non-mutating array methods such as <code>toSorted()</code>, <code>toReversed()</code>, and <code>with()</code>. These methods allow developers to update state with pure functions without mutating previous state trees:</p>
      
      <blockquote>
        "Writing predictable code starts with treating your data structures as immutable by default. Native modern JavaScript APIs finally make this effortless."
      </blockquote>

      <h3>2. Asynchronous Patterns & Top-Level Await</h3>
      <p>Modern browser runtimes and bundlers now natively embrace module-level asynchronous initialization. This streamlines resource loading, dynamic module imports, and configuration retrieval without wrapping everything inside bulky IIFE functions.</p>

      <h3>3. Native Dialog & Invoker Commands</h3>
      <p>Browser standards have moved far beyond DIY modal solutions. With native <code>&lt;dialog&gt;</code> elements and light-dismiss APIs, web applications gain instant accessibility, keyboard focus traps, and top-layer stacking contexts without bloat.</p>
      
      <p>As you build future web applications, prioritizing vanilla web platform capabilities ensures faster page loads, lower bundle sizes, and a far more delightful experience for users across every device.</p>
    `
  },
  {
    id: "design-1",
    title: "Design Systems in 2026: Balancing Consistency and Delight",
    category: "Design",
    date: "Oct 14, 2026",
    readTime: "5 min read",
    author: {
      name: "Marcus Chen",
      role: "Head of Product Design",
      initials: "MC"
    },
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    tags: ["Design Systems", "UI/UX", "Figma", "Design Tokens"],
    excerpt: "How world-class design teams construct fluid design token hierarchies that bridge the gap between Figma mockups and production-ready CSS variables.",
    content: `
      <p>A great design system is more than just a repository of buttons and modal components. It is a shared vocabulary that enables designers and engineers to collaborate with zero friction.</p>

      <h3>Moving Beyond Static Components</h3>
      <p>Earlier design systems focused strictly on rigid component catalogs. In 2026, the industry has shifted toward tokenized multi-brand systems. Color scales, fluid typography clamps, and elevation matrices are defined semantically.</p>

      <blockquote>
        "Tokens represent decisions, not values. When you name a token --color-surface-subtle instead of --gray-100, your entire design becomes adaptable across themes."
      </blockquote>

      <h3>Delight Through Micro-Interactions</h3>
      <p>Consistency does not have to mean sterility. Introducing thoughtful transitions, hover states with subtle elevation changes, and responsive layout shifts gives applications an organic, crafted feeling that keeps users engaged.</p>

      <p>When engineering and design harmonize through modular tokens, shipping cohesive interfaces across desktop, tablet, and mobile screens becomes second nature.</p>
    `
  },
  {
    id: "career-1",
    title: "The Senior Developer Mindset: Beyond Syntax and Frameworks",
    category: "Career",
    date: "Oct 10, 2026",
    readTime: "7 min read",
    author: {
      name: "Elena Rostova",
      role: "Engineering Director",
      initials: "ER"
    },
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    tags: ["Career", "Leadership", "Mentorship", "Engineering"],
    excerpt: "Discover the critical shift from writing isolated lines of code to understanding business outcomes, mentoring juniors, and architectural trade-offs.",
    content: `
      <p>Every software engineer starts by learning syntax, mastering frameworks, and fixing build errors. But what truly differentiates a senior engineer from a mid-level practitioner?</p>

      <h3>1. Thinking in Systems and Trade-Offs</h3>
      <p>Junior engineers often ask: <em>'How do I build this with the newest tool?'</em> Senior engineers ask: <em>'What happens when this service fails? How will our team maintain this in 18 months?'</em></p>

      <blockquote>
        "The best code is often the code you didn't have to write. Simplicity in architecture always triumphs over clever complexity."
      </blockquote>

      <h3>2. Amplifying Those Around You</h3>
      <p>True technical leadership is measured not by how many pull requests you author, but by how effectively you unblock teammates, review code constructively, and mentor up-and-coming talent.</p>

      <h3>3. Strategic Communication</h3>
      <p>Translating technical debt, refactoring initiatives, and performance metrics into tangible business value is the superpower that unlocks career advancement into staff and principal engineering levels.</p>
    `
  },
  {
    id: "tech-2",
    title: "Next-Gen CSS: Container Queries, Cascade Layers & Color Spaces",
    category: "Technology",
    date: "Oct 06, 2026",
    readTime: "5 min read",
    author: {
      name: "David Kim",
      role: "CSS Specialist & DevRel",
      initials: "DK"
    },
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=800&q=80",
    tags: ["CSS", "WebDev", "Responsive", "Frontend"],
    excerpt: "CSS has evolved more in the past two years than in the previous decade. Learn how container queries and color-mix() revolutionize responsive components.",
    content: `
      <p>For years, responsive design relied solely on viewport media queries. If a component sat in a narrow sidebar or a wide hero banner, media queries could not differentiate. Container queries changed everything.</p>

      <h3>Component-Driven Responsiveness</h3>
      <p>With <code>container-type: inline-size</code> and <code>@container</code> rules, a card component knows exactly how much space its parent provides, adapting its own layout automatically wherever it is placed on the page.</p>

      <h3>Vibrant P3 Color Gamuts</h3>
      <p>Modern screens display far more colors than standard sRGB. With <code>oklch()</code> and <code>color-mix()</code>, designers and developers can define perceptual lightness and produce accessible color shades effortlessly.</p>

      <blockquote>
        "The modern CSS cascade is declarative, component-aware, and astonishingly expressive. You rarely need CSS-in-JS abstractions today."
      </blockquote>

      <p>By taking advantage of native CSS custom properties and cascade layers (<code>@layer</code>), stylesheets stay organized, modular, and performant.</p>
    `
  },
  {
    id: "design-2",
    title: "The Art of Digital Typography: Hierarchy, Rhythm and Readability",
    category: "Design",
    date: "Sep 29, 2026",
    readTime: "4 min read",
    author: {
      name: "Clara Beauchamp",
      role: "Editorial Type Designer",
      initials: "CB"
    },
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    tags: ["Typography", "Design", "UI/UX", "Editorial"],
    excerpt: "Transform ordinary web layouts into captivating reading experiences through intentional vertical rhythm, pairing typefaces, and line-height calibration.",
    content: `
      <p>Over 90% of information on the web is written text. When your typography is poorly scaled, reading becomes fatigue-inducing. When done masterfully, reading feels effortless and immersive.</p>

      <h3>The Rule of Proportion</h3>
      <p>Pairing a distinctive geometric heading typeface (such as Outfit or Playfair) with a crisp, neutral grotesque body font (like Plus Jakarta Sans or Inter) creates immediate visual cadence.</p>

      <h3>Line Length & Measure</h3>
      <p>To avoid reading fatigue, paragraphs should ideally stay between 55 to 75 characters per line (approximately <code>65ch</code>). Generous line height (1.6 to 1.8) gives the reader's eye space to transition between sentences smoothly.</p>

      <blockquote>
        "Good typography is invisible. Great typography invites you in, guides your attention, and disappears into the message."
      </blockquote>

      <p>Paying attention to micro-details like letter-spacing on uppercase badges and comfortable heading hierarchy elevates any digital publication from amateur to world-class.</p>
    `
  },
  {
    id: "career-2",
    title: "How to Build a Standout Developer Portfolio in 2026",
    category: "Career",
    date: "Sep 22, 2026",
    readTime: "6 min read",
    author: {
      name: "Tariq Mansour",
      role: "Career Coach & Hiring Manager",
      initials: "TM"
    },
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    tags: ["Portfolio", "CareerTips", "JobSearch", "Frontend"],
    excerpt: "Hiring managers review dozens of portfolios daily. Learn what actually catches their eye: case studies with context, live demos, and clean problem solving.",
    content: `
      <p>Listing ten cloned tutorial projects on a GitHub profile is no longer enough to secure high-tier frontend roles. Recruiters and technical leads look for intentionality, craft, and business awareness.</p>

      <h3>Showcase the Problem-Solving Journey</h3>
      <p>Rather than just showing screenshots of a finished app, write a concise case study answering:</p>
      <ul>
        <li><strong>Problem:</strong> What challenge were you solving?</li>
        <li><strong>Architecture:</strong> Why did you choose these specific technologies?</li>
        <li><strong>Trade-offs:</strong> What hurdles did you encounter and how did you overcome them?</li>
      </ul>

      <blockquote>
        "A candidate who can clearly articulate why they made architectural trade-offs is ten times more memorable than someone who merely follows boilerplate tutorials."
      </blockquote>

      <h3>Focus on Performance and Polish</h3>
      <p>Make sure your live demos are accessible, load fast, support keyboard navigation, and look polished on mobile viewports. First impressions matter immensely.</p>
    `
  },
  {
    id: "tech-3",
    title: "Building Accessible Web Apps: An Actionable Guide",
    category: "Technology",
    date: "Sep 15, 2026",
    readTime: "5 min read",
    author: {
      name: "Sophia Vance",
      role: "Senior Frontend Architect",
      initials: "SV"
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    tags: ["Accessibility", "A11y", "HTML5", "Technology"],
    excerpt: "Accessibility is not a checklist item—it is foundational engineering. Discover semantic HTML techniques, ARIA patterns, and keyboard navigation best practices.",
    content: `
      <p>An accessible website benefits everyone—from screen-reader users and keyboard-only navigators to people browsing on low-contrast mobile screens under direct sunlight.</p>

      <h3>Semantic HTML Comes First</h3>
      <p>Before adding ARIA attributes, rely on native HTML elements. A native <code>&lt;button&gt;</code> comes with built-in keyboard activation (Enter and Space), disabled states, and accessibility tree integration without writing a single line of JavaScript.</p>

      <blockquote>
        "The first rule of ARIA is: Do not use ARIA if a native HTML element or attribute already satisfies the semantic requirement."
      </blockquote>

      <h3>Focus Management & Dialogs</h3>
      <p>When opening a modal or dynamic flyout, manage the user's focus appropriately. Return focus to the trigger button once dismissed, and ensure interactive elements have clear, visible focus rings.</p>
    `
  },
  {
    id: "design-3",
    title: "Glassmorphism, Skeuomorphism & Flat Design: The Modern Fusion",
    category: "Design",
    date: "Sep 08, 2026",
    readTime: "4 min read",
    author: {
      name: "Marcus Chen",
      role: "Head of Product Design",
      initials: "MC"
    },
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80",
    tags: ["UI/UX", "Glassmorphism", "Trends", "Design"],
    excerpt: "Visual trends come in cycles. Today's most lauded web interfaces combine crisp typography with tactile textures, translucent backdrops, and organic warmth.",
    content: `
      <p>The stark minimalism of the flat design era stripped interfaces of their tactile affordances. Today, designers are combining the best aspects of flat clarity with physical tactile cues.</p>

      <h3>Tactile Depth with Ambient Lighting</h3>
      <p>Subtle gradients, multi-layered shadows with soft color tints (rather than plain black), and translucent frosted glass overlays create natural visual hierarchy on modern displays.</p>

      <blockquote>
        "Design is visual storytelling. When an element catches the light or responds gently to a mouse hover, it communicates state and presence."
      </blockquote>

      <p>By pairing warm neutral palettes like beige and oat with deep royal purples, interfaces feel welcoming, calm, and unmistakably premium.</p>
    `
  },
  {
    id: "career-3",
    title: "Navigating Imposter Syndrome in Software Engineering",
    category: "Career",
    date: "Aug 29, 2026",
    readTime: "5 min read",
    author: {
      name: "Elena Rostova",
      role: "Engineering Director",
      initials: "ER"
    },
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    tags: ["Mindset", "ImposterSyndrome", "Career", "Wellbeing"],
    excerpt: "Feeling like you don't belong is remarkably common, even among principal engineers. Here is how to reframe doubt into continuous curiosity.",
    content: `
      <p>Because tech changes constantly, it is impossible for any single human to know everything. The moment you accept this reality, the burden of feeling like a fraud begins to dissolve.</p>

      <h3>Keep a 'Brag & Learning' Document</h3>
      <p>Document your wins every Friday afternoon: bugs you conquered, modules you optimized, questions you answered. When self-doubt strikes, reviewing this log serves as tangible proof of your continuous growth.</p>

      <blockquote>
        "Curiosity is the antidote to imposter syndrome. Shift your internal narrative from 'I don't know this, so I am failing' to 'I don't know this yet, which means I get to learn something new today.'"
      </blockquote>

      <p>Remember that asking for clarification is a sign of engineering maturity, not weakness.</p>
    `
  },
  {
    id: "tech-4",
    title: "Understanding Browser Rendering: The Path to 60fps Web Apps",
    category: "Technology",
    date: "Aug 20, 2026",
    readTime: "6 min read",
    author: {
      name: "David Kim",
      role: "CSS Specialist & DevRel",
      initials: "DK"
    },
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    tags: ["Performance", "CoreWebVitals", "Browser", "Technology"],
    excerpt: "Demystify DOM construction, CSSOM recalculation, layout reflow, and composite paint layers to build buttery smooth animations.",
    content: `
      <p>When an animation stutters, it is usually because code triggered layout thrashing or synchronous reflow on the browser's main thread.</p>

      <h3>Stick to Transform & Opacity</h3>
      <p>Changes to properties like <code>transform</code> and <code>opacity</code> can be handled entirely by the GPU composite layer without causing geometry recomputation. Avoid animating <code>top</code>, <code>left</code>, or <code>height</code> during continuous transitions.</p>

      <blockquote>
        "Smoothness is perceived speed. A web application that runs at a stable 60 frames per second always feels faster and more premium than one with erratic frame drops."
      </blockquote>

      <p>Leverage Chrome DevTools Performance panel to audit Cumulative Layout Shift (CLS) and Interaction to Next Paint (INP) for modern web vitals perfection.</p>
    `
  },
  {
    id: "career-4",
    title: "Mastering the Remote Work Routine as a Developer",
    category: "Career",
    date: "Aug 12, 2026",
    readTime: "4 min read",
    author: {
      name: "Tariq Mansour",
      role: "Career Coach & Hiring Manager",
      initials: "TM"
    },
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
    tags: ["RemoteWork", "Productivity", "Career", "Focus"],
    excerpt: "Remote work gives immense freedom, but without boundaries it leads to burnout. Practical strategies for sustainable asynchronous productivity.",
    content: `
      <p>Working from home offers flexibility, but without deliberate separation between work and life, the home easily turns into the workplace 24 hours a day.</p>

      <h3>Establish Dedicated Work Zones</h3>
      <p>Keep your coding laptop away from your relaxation spaces. A clear end-of-day shutdown ritual signals your brain that work is concluded.</p>

      <blockquote>
        "Deep work is a muscle. Block 2-3 hours of uninterrupted focus time each morning before checking Slack or email to make meaningful progress on your most challenging tasks."
      </blockquote>

      <p>Over-communicate asynchronously through clear markdown documentation, concise pull request summaries, and proactive status updates.</p>
    `
  },
  {
    id: "design-4",
    title: "Color Theory for Developers: Creating Harmonies That Pop",
    category: "Design",
    date: "Aug 02, 2026",
    readTime: "5 min read",
    author: {
      name: "Clara Beauchamp",
      role: "Editorial Type Designer",
      initials: "CB"
    },
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
    tags: ["ColorTheory", "Design", "Aesthetics", "UI/UX"],
    excerpt: "You don't need a fine arts degree to choose beautiful color schemes. Learn how analogous palettes, warm neutrals, and 60-30-10 color balance work.",
    content: `
      <p>Many frontend developers feel intimidated when picking colors. Yet, adhering to a few time-tested rules can guarantee an aesthetically pleasing result every time.</p>

      <h3>The 60-30-10 Golden Rule</h3>
      <ul>
        <li><strong>60% Dominant Neutral:</strong> Warm beige, oat, or charcoal canvas that sets the backdrop.</li>
        <li><strong>30% Secondary Surface:</strong> Subtle off-white cards or deeper panels that structure sections.</li>
        <li><strong>10% Accent Hero:</strong> Vibrant royal purple or violet reserved strictly for call-to-actions, badges, and focal points.</li>
      </ul>

      <blockquote>
        "When everything screams for attention with bright colors, nothing stands out. Restraint in color application is what creates visual luxury."
      </blockquote>

      <p>By blending warm earthy beiges with royal purple accents, your application achieves both approachable warmth and modern digital sophistication.</p>
    `
  }
];

// -----------------------------------------------------------------------------
// 2. Application State
// -----------------------------------------------------------------------------
const state = {
  activeCategory: "all",
  searchQuery: "",
  visibleCount: 6,
  batchSize: 3,
  theme: localStorage.getItem("lumina-theme") || "light"
};

// -----------------------------------------------------------------------------
// 3. DOM Elements
// -----------------------------------------------------------------------------
const elements = {
  html: document.documentElement,
  themeToggle: document.getElementById("themeToggle"),
  mobileMenuBtn: document.getElementById("mobileMenuBtn"),
  navMenu: document.getElementById("navMenu"),
  navLinks: document.querySelectorAll(".nav-link"),
  
  searchInput: document.getElementById("searchInput"),
  clearSearchBtn: document.getElementById("clearSearchBtn"),
  trendingTags: document.getElementById("trendingTags"),
  
  categoryFilters: document.getElementById("categoryFilters"),
  filterButtons: document.querySelectorAll(".filter-btn"),
  countAll: document.getElementById("countAll"),
  countTech: document.getElementById("countTech"),
  countCareer: document.getElementById("countCareer"),
  countDesign: document.getElementById("countDesign"),
  
  resultsCount: document.getElementById("resultsCount"),
  activeFilterBadge: document.getElementById("activeFilterBadge"),
  filterBadgeText: document.getElementById("filterBadgeText"),
  resetFilterBtn: document.getElementById("resetFilterBtn"),
  
  articlesGrid: document.getElementById("articlesGrid"),
  noResultsState: document.getElementById("noResultsState"),
  resetSearchBtn: document.getElementById("resetSearchBtn"),
  
  loadMoreWrap: document.getElementById("loadMoreWrap"),
  loadMoreBtn: document.getElementById("loadMoreBtn"),
  
  // Modal Elements
  articleModal: document.getElementById("articleModal"),
  modalCloseBtn: document.getElementById("modalCloseBtn"),
  modalBottomCloseBtn: document.getElementById("modalBottomCloseBtn"),
  modalCategory: document.getElementById("modalCategory"),
  modalReadTime: document.getElementById("modalReadTime"),
  modalHeroVisual: document.getElementById("modalHeroVisual"),
  modalAuthorAvatar: document.getElementById("modalAuthorAvatar"),
  modalAuthorName: document.getElementById("modalAuthorName"),
  modalAuthorRole: document.getElementById("modalAuthorRole"),
  modalDateText: document.getElementById("modalDateText"),
  modalArticleTitle: document.getElementById("modalArticleTitle"),
  modalTags: document.getElementById("modalTags"),
  modalArticleBody: document.getElementById("modalArticleBody"),
  copyArticleLinkBtn: document.getElementById("copyArticleLinkBtn"),
  
  toastContainer: document.getElementById("toastContainer")
};

// Currently selected article in modal
let currentModalArticle = null;

// -----------------------------------------------------------------------------
// 4. Initialization
// -----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCategoryCounts();
  attachEventListeners();
  renderArticles();
});

// -----------------------------------------------------------------------------
// 5. Theme Toggle Functionality (Light / Dark Mode)
// -----------------------------------------------------------------------------
function initTheme() {
  // Check system preference if no stored theme
  if (!localStorage.getItem("lumina-theme")) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    state.theme = prefersDark ? "dark" : "light";
  }
  applyTheme(state.theme);
}

function applyTheme(theme) {
  state.theme = theme;
  elements.html.setAttribute("data-theme", theme);
  localStorage.setItem("lumina-theme", theme);
}

function toggleTheme() {
  const newTheme = state.theme === "light" ? "dark" : "light";
  applyTheme(newTheme);
  showToast(
    newTheme === "dark" 
      ? '<i class="fa-solid fa-moon"></i> Dark theme activated' 
      : '<i class="fa-solid fa-sun"></i> Light theme activated'
  );
}

// -----------------------------------------------------------------------------
// 6. Category Counts Calculation
// -----------------------------------------------------------------------------
function initCategoryCounts() {
  const allCount = BLOG_ARTICLES.length;
  const techCount = BLOG_ARTICLES.filter(a => a.category.toLowerCase() === "technology").length;
  const careerCount = BLOG_ARTICLES.filter(a => a.category.toLowerCase() === "career").length;
  const designCount = BLOG_ARTICLES.filter(a => a.category.toLowerCase() === "design").length;

  if (elements.countAll) elements.countAll.textContent = allCount;
  if (elements.countTech) elements.countTech.textContent = techCount;
  if (elements.countCareer) elements.countCareer.textContent = careerCount;
  if (elements.countDesign) elements.countDesign.textContent = designCount;
}

// -----------------------------------------------------------------------------
// 7. Filter & Search Logic
// -----------------------------------------------------------------------------
function getFilteredArticles() {
  return BLOG_ARTICLES.filter(article => {
    // Category match
    const categoryMatch = 
      state.activeCategory === "all" || 
      article.category.toLowerCase() === state.activeCategory.toLowerCase();

    // Search query match (in title, excerpt, tags, author, content)
    let queryMatch = true;
    if (state.searchQuery.trim() !== "") {
      const q = state.searchQuery.toLowerCase().trim();
      const inTitle = article.title.toLowerCase().includes(q);
      const inExcerpt = article.excerpt.toLowerCase().includes(q);
      const inAuthor = article.author.name.toLowerCase().includes(q);
      const inTags = article.tags.some(t => t.toLowerCase().includes(q));
      const inCategory = article.category.toLowerCase().includes(q);
      queryMatch = inTitle || inExcerpt || inAuthor || inTags || inCategory;
    }

    return categoryMatch && queryMatch;
  });
}

// -----------------------------------------------------------------------------
// 8. Render Articles Grid
// -----------------------------------------------------------------------------
function renderArticles() {
  const filtered = getFilteredArticles();
  const totalMatches = filtered.length;

  // Handle Empty State
  if (totalMatches === 0) {
    elements.articlesGrid.innerHTML = "";
    elements.noResultsState.style.display = "block";
    elements.loadMoreWrap.style.display = "none";
    elements.resultsCount.textContent = "0 articles found";
    updateActiveFilterBadge(totalMatches);
    return;
  }

  elements.noResultsState.style.display = "none";

  // Slice visible items
  const visibleArticles = filtered.slice(0, state.visibleCount);

  // Render cards
  elements.articlesGrid.innerHTML = visibleArticles.map(article => createArticleCardHTML(article)).join("");

  // Update Status Text
  elements.resultsCount.textContent = `Showing ${visibleArticles.length} of ${totalMatches} articles`;
  updateActiveFilterBadge(totalMatches);

  // Load More Button visibility
  if (visibleArticles.length < totalMatches) {
    elements.loadMoreWrap.style.display = "block";
  } else {
    elements.loadMoreWrap.style.display = "none";
  }

  // Attach click listeners to "Read Article" buttons
  attachCardEvents();
}

function updateActiveFilterBadge(totalMatches) {
  const hasFilter = state.activeCategory !== "all" || state.searchQuery.trim() !== "";
  if (hasFilter) {
    elements.activeFilterBadge.style.display = "inline-flex";
    let desc = [];
    if (state.activeCategory !== "all") desc.push(state.activeCategory);
    if (state.searchQuery.trim() !== "") desc.push(`"${state.searchQuery}"`);
    elements.filterBadgeText.textContent = desc.join(" + ");
  } else {
    elements.activeFilterBadge.style.display = "none";
  }
}

// -----------------------------------------------------------------------------
// 9. Blog Card Template
// -----------------------------------------------------------------------------
function createArticleCardHTML(article) {
  const catClass = article.category.toLowerCase();
  
  return `
    <article class="blog-card" data-id="${article.id}">
      <div class="card-visual">
        <img 
          src="${article.image}" 
          alt="${article.title}" 
          class="card-visual-img" 
          loading="lazy"
        >
        <span class="category-badge ${catClass}">${article.category}</span>
        <span class="card-read-time"><i class="fa-regular fa-clock"></i> ${article.readTime}</span>
      </div>

      <div class="card-content">
        <div class="card-meta">
          <i class="fa-regular fa-calendar"></i>
          <span>${article.date}</span>
        </div>

        <h3 class="card-title">${article.title}</h3>
        
        <p class="card-excerpt">${article.excerpt}</p>

        <div class="card-footer">
          <div class="card-author-inline">
            <div class="author-mini-avatar">${article.author.initials}</div>
            <span class="author-mini-name">${article.author.name}</span>
          </div>
          <button class="read-article-btn" data-article-id="${article.id}" aria-label="Read article: ${article.title}">
            <span>Read Article</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </article>
  `;
}

function attachCardEvents() {
  const readButtons = elements.articlesGrid.querySelectorAll(".read-article-btn");
  readButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const articleId = btn.getAttribute("data-article-id");
      openArticleDetail(articleId);
    });
  });

  // Clicking anywhere on card opens the article
  const cards = elements.articlesGrid.querySelectorAll(".blog-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const articleId = card.getAttribute("data-id");
      openArticleDetail(articleId);
    });
  });
}

// -----------------------------------------------------------------------------
// 10. Individual Blog Detail View (Modal Dialog)
// -----------------------------------------------------------------------------
function openArticleDetail(articleId) {
  const article = BLOG_ARTICLES.find(a => a.id === articleId);
  if (!article) return;

  currentModalArticle = article;

  // Populate Modal Fields
  elements.modalCategory.textContent = article.category;
  elements.modalCategory.className = `modal-category ${article.category.toLowerCase()}`;
  elements.modalReadTime.innerHTML = `<i class="fa-regular fa-clock"></i> ${article.readTime}`;

  elements.modalHeroVisual.innerHTML = `
    <img src="${article.image}" alt="${article.title}">
  `;

  elements.modalAuthorAvatar.textContent = article.author.initials;
  elements.modalAuthorName.textContent = article.author.name;
  elements.modalAuthorRole.textContent = article.author.role;
  elements.modalDateText.textContent = article.date;
  elements.modalArticleTitle.textContent = article.title;

  elements.modalTags.innerHTML = article.tags.map(tag => `
    <span class="modal-tag-item">#${tag}</span>
  `).join("");

  elements.modalArticleBody.innerHTML = article.content;

  // Show native modal
  if (typeof elements.articleModal.showModal === "function") {
    elements.articleModal.showModal();
    // Scroll modal wrapper to top
    const wrapper = elements.articleModal.querySelector(".modal-wrapper");
    if (wrapper) wrapper.scrollTop = 0;
  }
}

function closeArticleDetail() {
  if (elements.articleModal && elements.articleModal.open) {
    elements.articleModal.close();
  }
}

// Light-Dismiss Fallback Implementation for <dialog> (from modern-web-guidance)
if (elements.articleModal && !('closedBy' in HTMLDialogElement.prototype)) {
  elements.articleModal.addEventListener('click', (event) => {
    // 1. When clicking the backdrop, event.target is the dialog element itself
    if (event.target !== elements.articleModal) return;

    // 2. Check if click coordinates fall within modal content box
    const rect = elements.articleModal.getBoundingClientRect();
    const isDialogContent = (
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width
    );

    if (isDialogContent) return;

    // 3. Click was outside content area, close dialog
    closeArticleDetail();
  });
}

// -----------------------------------------------------------------------------
// 11. Event Listeners Setup
// -----------------------------------------------------------------------------
function attachEventListeners() {
  // Theme Toggle Button
  elements.themeToggle.addEventListener("click", toggleTheme);

  // Mobile Menu Toggle
  elements.mobileMenuBtn.addEventListener("click", () => {
    const isOpen = elements.navMenu.classList.toggle("open");
    elements.mobileMenuBtn.setAttribute("aria-expanded", isOpen);
  });

  // Nav link clicks
  elements.navLinks.forEach(link => {
    link.addEventListener("click", () => {
      elements.navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      if (elements.navMenu.classList.contains("open")) {
        elements.navMenu.classList.remove("open");
        elements.mobileMenuBtn.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Search Input live typing
  elements.searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    state.visibleCount = 6; // Reset visible count on new search
    
    // Toggle clear search button
    elements.clearSearchBtn.style.display = state.searchQuery.length > 0 ? "inline-flex" : "none";
    
    renderArticles();
  });

  // Clear Search button
  elements.clearSearchBtn.addEventListener("click", () => {
    elements.searchInput.value = "";
    state.searchQuery = "";
    elements.clearSearchBtn.style.display = "none";
    elements.searchInput.focus();
    renderArticles();
  });

  // Trending Tag Pills
  const tagPills = elements.trendingTags.querySelectorAll(".tag-pill");
  tagPills.forEach(pill => {
    pill.addEventListener("click", () => {
      const tagQuery = pill.getAttribute("data-query");
      elements.searchInput.value = tagQuery;
      state.searchQuery = tagQuery;
      elements.clearSearchBtn.style.display = "inline-flex";
      state.visibleCount = 6;
      renderArticles();

      // Smooth scroll to articles section
      document.getElementById("articles").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Category Filter Buttons
  elements.filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      elements.filterButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      state.activeCategory = btn.getAttribute("data-category");
      state.visibleCount = 6; // Reset pagination on category change
      renderArticles();
    });
  });

  // Footer Category links
  const footerCatLinks = document.querySelectorAll(".footer-cat-link");
  footerCatLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const cat = link.getAttribute("data-cat");
      const targetBtn = Array.from(elements.filterButtons).find(b => b.getAttribute("data-category").toLowerCase() === cat.toLowerCase());
      if (targetBtn) {
        targetBtn.click();
      }
    });
  });

  // Reset filter badge button
  if (elements.resetFilterBtn) {
    elements.resetFilterBtn.addEventListener("click", resetAllFilters);
  }

  // Reset search button inside empty state
  if (elements.resetSearchBtn) {
    elements.resetSearchBtn.addEventListener("click", resetAllFilters);
  }

  // Load More Button
  elements.loadMoreBtn.addEventListener("click", () => {
    state.visibleCount += state.batchSize;
    renderArticles();
  });

  // Modal Close buttons
  elements.modalCloseBtn.addEventListener("click", closeArticleDetail);
  elements.modalBottomCloseBtn.addEventListener("click", closeArticleDetail);

  // Copy article link button in modal
  if (elements.copyArticleLinkBtn) {
    elements.copyArticleLinkBtn.addEventListener("click", () => {
      if (navigator.clipboard) {
        const dummyUrl = `${window.location.origin}${window.location.pathname}#${currentModalArticle?.id || ""}`;
        navigator.clipboard.writeText(dummyUrl).then(() => {
          showToast('<i class="fa-solid fa-check"></i> Article link copied to clipboard!');
        });
      } else {
        showToast('<i class="fa-solid fa-check"></i> Article link ready to share!');
      }
    });
  }

  // Keyboard navigation: Escape key closes modal (native for <dialog>, but ensures safety)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && elements.articleModal.open) {
      closeArticleDetail();
    }
  });
}

function resetAllFilters() {
  state.activeCategory = "all";
  state.searchQuery = "";
  state.visibleCount = 6;
  elements.searchInput.value = "";
  elements.clearSearchBtn.style.display = "none";

  elements.filterButtons.forEach(btn => {
    const isAll = btn.getAttribute("data-category") === "all";
    btn.classList.toggle("active", isAll);
    btn.setAttribute("aria-selected", isAll ? "true" : "false");
  });

  renderArticles();
}

// -----------------------------------------------------------------------------
// 12. Helper Utilities: Social Share & Toast
// -----------------------------------------------------------------------------
window.shareModalArticle = function(platform) {
  if (!currentModalArticle) return;
  const title = encodeURIComponent(currentModalArticle.title);
  const url = encodeURIComponent(window.location.href);

  if (platform === "twitter") {
    window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, "_blank");
  } else if (platform === "linkedin") {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  }
};

window.handleNewsletterSubmit = function(event) {
  event.preventDefault();
  const emailInput = document.getElementById("newsletterEmail");
  if (emailInput && emailInput.value) {
    showToast(`<i class="fa-solid fa-envelope-circle-check"></i> Subscribed! Welcome to Lumina Weekly, ${emailInput.value}!`);
    emailInput.value = "";
  }
};

function showToast(messageHtml) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = messageHtml;

  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(30px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3200);
}
