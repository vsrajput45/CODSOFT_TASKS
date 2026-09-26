# CODSOFT FRONTEND DEVELOPMENT — TASK 5
## Responsive Modern Blog Website ("Lumina")

A responsive, feature-packed digital publication and blog platform built with semantic HTML5, modern CSS3 (warm beige & royal purple aesthetic), and vanilla JavaScript.

Developed for **CodSoft Frontend Development Internship — Task 5**.

---

## 🎨 Theme & Aesthetic
- **Color Palette:** Warm Ivory/Beige (`#FBF9F5`, `#F5F0E6`, `#EDE3D3`) blended with rich Royal Purple accents (`#7B42E6`, `#9B72EF`, `#6826D9`).
- **Dark Mode:** Deep midnight plum and obsidian surface (`#120D20`, `#1B142E`) with glowing lavender accents (`#9B72EF`, `#C084FC`) and champagne beige text.
- **Typography:** *Outfit* (for bold, geometric headlines) + *Plus Jakarta Sans* (for comfortable editorial reading).
- **Visuals:** Translucent frosted glass headers, smooth elevation hover micro-interactions, responsive grid layout, and native `<dialog>` overlays.

---

## 📁 Project Structure

```
CODSOFT _ TASK_5/
│
├── index.html        # Semantic HTML5 structure (Header, Hero, Filters, Grid, Modal, Footer)
├── style.css         # Custom CSS tokens, responsive layout, animations, light & dark mode
├── script.js         # Interactive search, category filters, dialog modal, load more & theme logic
└── README.md         # Project documentation and video script walkthrough
```

---

## ✨ Features Implemented (Matching Video Script)

1. **Responsive Navigation Bar**:
   - Logo with custom icon badge.
   - Quick navigation links (*Home*, *Articles*, *About*).
   - Theme toggle button with sun/moon icon indicators.
   - Mobile hamburger navigation drawer.

2. **Hero Section ("Ideas worth reading.")**:
   - Hero badge & headline: **"Ideas worth reading."**
   - Subtitle introducing the publication's mission.
   - Live interactive search bar with instant query matching and clear button.
   - Trending topic pills (`#JavaScript`, `#UI/UX`, `#Career`, `#Frontend`, `#Design Systems`) that trigger search on click.

3. **Category Filtering**:
   - Filter buttons for: **All Categories**, **Technology**, **Career**, and **Design**.
   - Dynamic article counters updating in real time.
   - Active state indicators and filter reset badges.

4. **Live Search Functionality**:
   - Instant filtering across article titles, excerpts, tags, authors, and content.
   - Friendly **"No articles found"** empty state when queries yield zero results, complete with a one-click reset button.

5. **Featured Articles Grid**:
   - Multiple blog posts arranged in a responsive grid (3-column desktop, 2-column tablet, 1-column mobile).
   - Each card displays:
     - Article visual thumbnail
     - Category badge (color-coded per category)
     - Estimated reading time
     - Publication date
     - Article title
     - Short excerpt
     - Author information
     - **"Read Article"** interactive button

6. **Individual Blog Detail View (Native `<dialog>` Modal)**:
   - Opens when clicking **"Read Article"** on any card.
   - Shows article category, date, read time, author name and role, full article text, blockquotes, and tags.
   - Supports light-dismiss (clicking outside the modal or pressing `Esc`), along with top and bottom Close buttons.
   - Includes social share shortcuts and link copying with toast notifications.

7. **Load More Functionality**:
   - Initially displays 6 articles.
   - Clicking **"Load More Articles"** smoothly appends additional articles.
   - Automatically hides once all available articles are rendered.

8. **Dark Mode Toggle**:
   - Smooth transition between normal (warm beige & purple) and dark interface.
   - Automatically remembers user preference via `localStorage`.

9. **About & Newsletter Sections**:
   - Highlight stats (12+ articles, 3 verticals, 100% vanilla stack).
   - Interactive newsletter subscription form with toast feedback.

10. **Responsive Footer**:
    - Publication branding, category links, task details, and copyright information.

---

## 🚀 How to Run the Website

### Option 1: Direct File Opening
Simply double-click `index.html` or drag it into any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Recommended)
Open a terminal in the project directory and run:
```bash
python -m http.server 8085
```
Then visit:
```
http://localhost:8085/
```
