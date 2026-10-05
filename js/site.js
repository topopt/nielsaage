// Renders hero, research grid and project pages from PROJECTS (js/projects.js).
const $ = (s, el = document) => el.querySelector(s);
const bySlug = Object.fromEntries(PROJECTS.map(p => [p.slug, p]));
const isVideo = m => m.startsWith("v:");
const name = m => m.replace(/^v:/, "");
const root = document.body.dataset.root || "";

function mediaEl(m, { autoplay = false } = {}) {
  if (!isVideo(m)) return `<img src="${root}media/${m}.jpg" alt="" loading="lazy">`;
  const n = name(m);
  return `<video src="${root}media/${n}.mp4" poster="${root}media/${n}.jpg" muted loop playsinline
    preload="${autoplay ? "auto" : "none"}" ${autoplay ? "autoplay" : ""}></video>`;
}

/* Home: slideshow */
function hero(el) {
  const slides = HERO.map(s => bySlug[s]);
  el.innerHTML = slides.map((p, i) => `
      <div class="slide ${p.heroFit || "contain"}" data-i="${i}">${mediaEl(p.heroMedia || p.media[0], { autoplay: true })}
        <a class="slide-link" href="project.html?p=${p.slug}" aria-label="${p.title}"></a></div>`).join("") + `
    <a class="slide-caption caps" href="project.html?p=${slides[0].slug}">${slides[0].title}</a>
    <button class="arrow prev" aria-label="Previous">&#8249;</button>
    <button class="arrow next" aria-label="Next">&#8250;</button>
    <div class="hero-controls">${slides.map((_, i) => `<button aria-label="Slide ${i + 1}"></button>`).join("")}</div>`;
  const els = [...el.querySelectorAll(".slide")], dots = [...el.querySelectorAll(".hero-controls button")];
  const cap = $(".slide-caption", el);
  let cur = 0, timer;
  const show = i => {
    cur = (i + els.length) % els.length;
    els.forEach((s, k) => s.classList.toggle("active", k === cur));
    dots.forEach((d, k) => d.classList.toggle("active", k === cur));
    cap.textContent = slides[cur].title;
    cap.href = `project.html?p=${slides[cur].slug}`;
    clearTimeout(timer);
    timer = setTimeout(() => show(cur + 1), 6500);
  };
  dots.forEach((d, k) => d.onclick = () => show(k));
  $(".prev", el).onclick = () => show(cur - 1);
  $(".next", el).onclick = () => show(cur + 1);
  show(0);
}

/* Research: masonry grid, animations play on hover (in view on touch screens).
   Tiles flow down the columns, so a project with newBlock starts a fresh grid below:
   adding tiles never reshuffles the ones above. */
function grid(el) {
  const tile = p => {
    const m = p.tileMedia || p.media[0];
    const still = `<img src="media/${name(m)}.jpg" alt="${p.title}" loading="lazy">`;
    return `<a class="tile fade" href="project.html?p=${p.slug}">
      <div class="tile-media">${still}${isVideo(m) ? mediaEl(m) : ""}</div>
      <div class="tile-title caps">${p.title}</div>
      <div class="tile-area">${p.area}</div></a>`;
  };
  const blocks = [];
  PROJECTS.forEach(p => (p.newBlock || !blocks.length ? blocks.push([p]) : blocks.at(-1).push(p)));
  el.innerHTML = blocks.map(b => `<div class="grid">${b.map(tile).join("")}</div>`).join("");
  const touch = matchMedia("(hover: none)").matches;
  el.querySelectorAll(".tile").forEach(t => {
    const v = $("video", t);
    if (!v) return;
    const play = () => { t.classList.add("playing"); v.play().catch(() => {}); };
    const stop = () => { t.classList.remove("playing"); v.pause(); };
    if (touch) new IntersectionObserver(([e]) => e.isIntersecting ? play() : stop(), { threshold: .6 }).observe(t);
    else { t.onmouseenter = play; t.onmouseleave = stop; }
  });
}

/* Project page */
function project(el) {
  const i = Math.max(0, PROJECTS.findIndex(p => p.slug === new URLSearchParams(location.search).get("p")));
  const p = PROJECTS[i], prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length], next = PROJECTS[(i + 1) % PROJECTS.length];
  document.title = `${p.title} | Niels Aage`;
  el.innerHTML = `
    <div class="project-lead fade"${p.leadWidth ? ` style="max-width:${p.leadWidth}px"` : ""}>${mediaEl(p.media[0], { autoplay: true })}</div>
    <div class="project-head fade">
      <span class="caps">${p.area}</span>
      <h1>${p.title}</h1>
      <p class="project-text">${p.text || '<span class="todo">Text to come.</span>'}</p>
    </div>
    ${p.media.length > 1 ? `<div class="gallery"${p.galleryCols ? ` style="--cols:${p.galleryCols}"` : ""}>${p.media.slice(1).map(m => `<div class="fade${(p.wide || []).includes(m) ? " wide" : ""}">${mediaEl(m, { autoplay: true })}</div>`).join("")}</div>` : ""}
    <nav class="pager caps">
      <a href="project.html?p=${prev.slug}">&#8249;&nbsp; ${prev.title}</a>
      <a href="project.html?p=${next.slug}">${next.title} &nbsp;&#8250;</a>
    </nav>`;
}

/* Gentle fade-in on scroll */
function fades() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll(".fade").forEach(f => io.observe(f));
}

const page = document.body.dataset.page;
if (page === "home") hero($(".hero"));
if (page === "research") grid($(".grids"));
if (page === "project") project($(".project"));
fades();
