(() => {
  const USER = "justturuu";
  const EMAIL = "Turbold2019@gmail.com";
  const GITHUB = "https://github.com/JustTuruu";

  const app = document.getElementById("app");
  const screen = document.getElementById("screen");

  const esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );

  /* ---------- file system ---------- */

  const files = {
    erxes: {
      title: "erxes-tourism.txt",
      body: `ERXES INC — Backend Developer
duration: 7 months

- Joined as an intern and helped migrate erxes from
  version 2 to version 3.
- Spent 2 months porting the Template module to the new
  version and adding new features. The module makes the
  sales pipeline reusable across tenants, saving time
  when a new tenant is set up.
- Shipped it, then moved into the Tourism team as the
  main backend developer: built the create / edit logic
  for tours tied to a tenant's itinerary.

what I took away:
  microservice architecture, team conventions, and
  shipping in a real production environment.

stack: TypeScript, Node.js, GraphQL (Apollo), MongoDB`,
    },
    stadium: {
      title: "360-stadium.txt",
      body: `GRAND EMBER GROUP — Full-stack Developer
duration: 6 months

360 STADIUM — Central Stadium, Ulaanbaatar
- A website that streams live 360° camera video.
- Kiosk ticket sales: tickets print together with an
  e-barimt receipt, and the entry gate reads their QR
  codes.

my part:
- System architecture and core development.
- Payment integrations: QPay, POS API, E-Barimt.
- Live streaming with the Wowza engine, delivered to the
  website through a CDN.
- Recordings stored on AWS S3.

in production:
  streamed the Naadam opening ceremony and wrestling
  matches live in 360°.`,
    },
    cv: {
      title: "cv.pdf",
      body: `OYUN-UKHAAN TURBOLD
Backend / Full-stack Developer — Ulaanbaatar, Mongolia
${EMAIL} · github.com/JustTuruu

EDUCATION
  MUST (ШУТИС), School of ICT
  B.Sc. Software Engineering — graduating June 2027

EXPERIENCE
  Erxes Inc ............ Backend Developer   (7 mo)
  Grand Ember Group .... Full-stack Developer (6 mo)

SKILLS
  TypeScript, Node.js, Express, NestJS, Spring Boot,
  REST, Apollo GraphQL, Next.js, Flutter
  PostgreSQL, MongoDB/Mongoose, SQL & NoSQL
  AWS, Cloudflare, Vercel, Git workflow
  Auth, secrets & env management
  Race conditions, high concurrency,
  distributed systems
  macOS, Windows, Linux/Ubuntu, SSH

AI TOOLING
  Claude Code, Codex — writing code and unit tests,
  debugging, refactoring, researching solutions;
  every result is reviewed and adapted to the project.`,
    },
    readme: {
      title: "readme.txt",
      body: `Hi, I'm Turbold (a.k.a. ${USER}).

Final-year Software Engineering student at MUST
and a backend / full-stack developer.

Double-click a folder to look around,
or open pages > about.`,
    },
  };

  const fs = {
    home: {
      path: `C:\\Users\\${USER}`,
      items: [
        { label: "projects", icon: "📁", to: "#/home/projects" },
        { label: "socials", icon: "📁", to: "#/home/socials" },
        { label: "pages", icon: "📁", to: "#/home/pages" },
        { label: "readme.txt", icon: "📝", file: "readme" },
        { label: "cv.pdf", icon: "📄", file: "cv" },
      ],
    },
    projects: {
      path: `C:\\Users\\${USER}\\projects`,
      items: [
        { label: "360 Stadium", icon: "🏟️", file: "stadium" },
        { label: "Erxes Tourism", icon: "🧳", file: "erxes" },
      ],
    },
    socials: {
      path: `C:\\Users\\${USER}\\socials`,
      items: [
        { label: "GitHub", icon: "💻", href: GITHUB },
        { label: "Email", icon: "✉️", href: `mailto:${EMAIL}` },
      ],
    },
    pages: {
      path: `C:\\Users\\${USER}\\pages`,
      items: [
        { label: "about", icon: "👤", to: "#/about" },
        { label: "experience", icon: "🔧", to: "#/experience" },
        { label: "skills", icon: "🧠", to: "#/skills" },
        { label: "contact", icon: "📨", to: "#/contact" },
      ],
    },
  };

  /* ---------- views ---------- */

  function landing() {
    setMode("light");
    app.innerHTML = `
      <div class="landing">
        <h1 class="landing-title">JUSTTURUU</h1>
        <button class="landing-hint" id="start"><span class="landing-cursor">&gt;</span> PRESS START</button>
        <p class="landing-footer">© ${new Date().getFullYear()} JUSTTURUU</p>
      </div>`;
    document
      .getElementById("start")
      .addEventListener("click", () => (location.hash = "#/home"));
    document.title = "JUSTTURUU - Oyun-Ukhaan Turbold";
  }

  function explorer(key) {
    const dir = fs[key];
    setMode("desktop");
    const isTouch = matchMedia("(hover: none)").matches;
    app.innerHTML = `
      <div class="win-window" role="application">
        <div class="win-titlebar">
          <span class="win-title">${esc(dir.path)}</span>
          <div class="win-controls">
            <button class="win-ctrl" aria-label="Minimize" data-act="landing">_</button>
            <button class="win-ctrl" aria-label="Maximize">□</button>
            <button class="win-ctrl" aria-label="Close" data-act="landing">×</button>
          </div>
        </div>
        <div class="win-toolbar">
          <button class="win-toolbar-btn" id="back" ${key === "home" ? "disabled" : ""}>← Back</button>
          <div class="win-address">
            <span class="win-toolbar-btn win-address-label">Address</span>
            <span class="win-address-path">${esc(dir.path)}</span>
          </div>
        </div>
        <div class="win-content">
          ${dir.items
            .map(
              (it, i) => `
            <button class="win-icon${i === 0 ? " selected" : ""}" data-i="${i}" style="--i:${i}">
              <span class="win-icon-img" aria-hidden="true">${it.icon}</span>
              <span class="win-icon-label">${esc(it.label)}</span>
            </button>`,
            )
            .join("")}
        </div>
        <div class="win-statusbar">${dir.items.length} object(s) inside</div>
      </div>`;

    document
      .getElementById("back")
      .addEventListener("click", () => (location.hash = "#/home"));
    app
      .querySelectorAll("[data-act=landing]")
      .forEach((b) =>
        b.addEventListener("click", () => (location.hash = "#/")),
      );

    const icons = [...app.querySelectorAll(".win-icon")];
    const select = (el) => {
      icons.forEach((x) => x.classList.toggle("selected", x === el));
      el.focus();
    };
    icons.forEach((el) => {
      const item = dir.items[+el.dataset.i];
      el.addEventListener("click", () => (isTouch ? open(item) : select(el)));
      el.addEventListener("dblclick", () => open(item));
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") open(item);
        const idx = icons.indexOf(el);
        if (e.key === "ArrowRight" && icons[idx + 1]) select(icons[idx + 1]);
        if (e.key === "ArrowLeft" && icons[idx - 1]) select(icons[idx - 1]);
        if (e.key === "Backspace" && key !== "home") location.hash = "#/home";
      });
    });
    document.title = `${key} | JUSTTURUU`;
  }

  function open(item) {
    if (item.to) location.hash = item.to;
    else if (item.href)
      window.open(
        item.href,
        item.href.startsWith("mailto:") ? "_self" : "_blank",
        "noopener",
      );
    else if (item.file) viewer(files[item.file]);
  }

  function viewer(file) {
    const wrap = document.createElement("div");
    wrap.className = "viewer-backdrop";
    wrap.innerHTML = `
      <div class="viewer-window" role="dialog" aria-label="${esc(file.title)}">
        <div class="win-titlebar">
          <span class="win-title">${esc(file.title)} - Notepad</span>
          <div class="win-controls"><button class="win-ctrl" aria-label="Close" data-close>×</button></div>
        </div>
        <pre class="viewer-text">${esc(file.body)}</pre>
        <div class="viewer-actions"><button class="win-toolbar-btn" data-close>OK</button></div>
      </div>`;
    const close = () => {
      wrap.remove();
      document.removeEventListener("keydown", onKey);
    };
    const onKey = (e) => e.key === "Escape" && close();
    wrap.addEventListener(
      "click",
      (e) =>
        (e.target === wrap || e.target.hasAttribute("data-close")) && close(),
    );
    document.addEventListener("keydown", onKey);
    app.appendChild(wrap);
    wrap.querySelector("[data-close]").focus();
  }

  const nav = (active) => `
    <nav class="nav-bar">
      ${["home", "about", "experience", "skills", "contact"]
        .map(
          (p) =>
            `<a href="#/${p}" class="${p === active ? "active" : ""}">${p}</a>`,
        )
        .join("")}
    </nav>`;

  function terminal(name, html) {
    setMode("terminal");
    app.innerHTML = `<main class="terminal-page">${nav(name)}${html}</main>`;
    // stagger every top-level block (and each card inside a grid) like a printout
    const blocks = app.querySelectorAll(
      ".terminal-page > :not(nav):not(.terminal-grid), .terminal-grid > *",
    );
    blocks.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.setProperty("--i", Math.min(i, 14));
    });
    document.title = `${name[0].toUpperCase() + name.slice(1)} | JUSTTURUU`;
  }

  const pages = {
    about: () =>
      terminal(
        "about",
        `
      <h2>whoami</h2>
      <p>I'm <span class="hl">Oyun-Ukhaan Turbold</span>, also known as <span class="hl">${USER.toUpperCase()}</span> — a backend and full-stack developer based in Ulaanbaatar, Mongolia.</p>

      <h2>background</h2>
      <p>Final-year Software Engineering student at MUST (School of ICT), graduating June 2027. I've worked on real production systems: backend at <span class="hl">Erxes Inc</span>, and the web platform, payment integrations and 360° live streaming for the <span class="hl">360 Stadium</span> project at Grand Ember Group.</p>

      <h2>interests</h2>
      <ul>
        <li>Backend & API development</li>
        <li>Microservices & distributed systems</li>
        <li>High concurrency & race conditions</li>
        <li>Live streaming & media delivery</li>
        <li>AI tools for developer productivity</li>
      </ul>

      <h2>current_focus</h2>
      <p>Learning new technology on my own, using AI tools like Claude Code and Codex to ship faster without dropping code quality, and joining a team where I can grow quickly.</p>
      <p class="dim">$ <span class="nf-cursor">█</span></p>`,
      ),

    experience: () =>
      terminal(
        "experience",
        `
      <h2>experience</h2>
      <div class="terminal-grid">
        <div class="terminal-card">
          <div class="terminal-card-title">Grand Ember Group</div>
          <div class="meta">Full-stack Developer · 6 months</div>
          <p>360 Stadium: live 360° camera streaming website and kiosk ticketing with QR entry for the Central Stadium.</p>
          <ul>
            <li>System architecture & core development</li>
            <li>QPay, POS API, E-Barimt payments</li>
            <li>Wowza live streaming + CDN</li>
            <li>Recordings on AWS S3</li>
            <li>Streamed Naadam opening & wrestling live</li>
          </ul>
          <div class="tags"><span class="tag">QPay</span><span class="tag">E-Barimt</span><span class="tag">Wowza</span><span class="tag">AWS S3</span><span class="tag">CDN</span></div>
        </div>
        <div class="terminal-card">
          <div class="terminal-card-title">Erxes Inc</div>
          <div class="meta">Backend Developer · 7 months</div>
          <p>Joined as an intern and moved up to main backend developer on the Tourism team.</p>
          <ul>
            <li>Migrated erxes v2 → v3</li>
            <li>Ported the Template module and added features (reusable sales pipeline across tenants)</li>
            <li>Built tour create / edit logic for tenant itineraries</li>
            <li>Microservice architecture in production</li>
          </ul>
          <div class="tags"><span class="tag">TypeScript</span><span class="tag">GraphQL</span><span class="tag">MongoDB</span><span class="tag">Microservices</span></div>
        </div>
      </div>

      <h2>education</h2>
      <div class="terminal-card">
        <div class="terminal-card-title">MUST — School of ICT</div>
        <div class="meta">B.Sc. Software Engineering · graduating June 2027</div>
      </div>`,
      ),

    skills: () =>
      terminal(
        "skills",
        `
      <h2>skills</h2>
      <div class="terminal-grid">
        <div class="terminal-card">
          <div class="terminal-card-title">backend & frameworks</div>
          <div class="tags">${tags("TypeScript, Node.js, Express, NestJS, Spring Boot, Java, REST API, Apollo GraphQL, Next.js, Flutter, Design patterns")}</div>
        </div>
        <div class="terminal-card">
          <div class="terminal-card-title">databases</div>
          <div class="tags">${tags("SQL, NoSQL, PostgreSQL, MongoDB, Mongoose, Data modeling")}</div>
        </div>
        <div class="terminal-card">
          <div class="terminal-card-title">cloud & devops</div>
          <div class="tags">${tags("AWS, Cloudflare, Vercel, Env config, Git workflow, Server setup")}</div>
        </div>
        <div class="terminal-card">
          <div class="terminal-card-title">systems</div>
          <div class="tags">${tags("Race conditions, High concurrency, Distributed systems, Algorithms, Auth, Secrets management")}</div>
        </div>
        <div class="terminal-card">
          <div class="terminal-card-title">environments</div>
          <div class="tags">${tags("macOS, Windows, Linux/Ubuntu, SSH, Remote control")}</div>
        </div>
        <div class="terminal-card">
          <div class="terminal-card-title">ai tooling</div>
          <div class="tags">${tags("Claude Code, Codex")}</div>
          <p style="margin-top:.8rem">Writing code & unit tests, debugging, refactoring and researching solutions — every result is reviewed and adapted to the project.</p>
        </div>
      </div>`,
      ),

    contact: () => {
      terminal(
        "contact",
        `
      <h2>send_message</h2>
      <p>email: <a href="mailto:${EMAIL}">${EMAIL}</a></p>
      <form class="contact-form" id="contact">
        <label>subject<input class="contact-input" name="subject" placeholder="what is this about" required /></label>
        <label>your contact<input class="contact-input" name="from" placeholder="email / telegram handle" /></label>
        <label>message<textarea class="contact-input" name="message" placeholder="write your message here..." required></textarea></label>
        <button class="contact-submit" type="submit">&gt; send</button>
      </form>
      <p class="dim" style="margin-top:1rem">opens your mail client with the message composed. no data leaves your browser.</p>

      <h2>socials</h2>
      <ul>
        <li><a href="${GITHUB}" target="_blank" rel="noopener">GitHub</a></li>
        <li><a href="mailto:${EMAIL}">Email</a></li>
      </ul>`,
      );
      document.getElementById("contact").addEventListener("submit", (e) => {
        e.preventDefault();
        const d = new FormData(e.target);
        const body = `${d.get("message")}\n\n— ${d.get("from") || ""}`;
        location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(d.get("subject"))}&body=${encodeURIComponent(body)}`;
      });
    },
  };

  function tags(list) {
    return list
      .split(",")
      .map((t) => `<span class="tag">${esc(t.trim())}</span>`)
      .join("");
  }

  function notFound() {
    terminal(
      "404",
      `<h2>404</h2><p>file not found.</p><p><a href="#/home">cd ~</a> <span class="nf-cursor">█</span></p>`,
    );
  }

  /* ---------- router ---------- */

  function setMode(mode) {
    screen.className = `tv-screen ${mode}`;
  }

  function render(path) {
    if (path === "") return landing();
    if (path === "home") return explorer("home");
    const m = path.match(/^home\/(\w+)$/);
    if (m && fs[m[1]]) return explorer(m[1]);
    if (pages[path]) return pages[path]();
    notFound();
  }

  const kindOf = (path) =>
    path === "" ? "landing" : /^home(\/\w+)?$/.test(path) ? "explorer" : "terminal";

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const beam = document.getElementById("beam");
  const flash = document.getElementById("flash");
  const staticCanvas = document.getElementById("static");
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // picture collapses to a bright line, then a dot — like switching a CRT off
  function crtOff() {
    beam.animate(
      [
        { opacity: 0, width: "86%", height: "2px", offset: 0 },
        { opacity: 0, width: "86%", height: "2px", offset: 0.45 },
        { opacity: 1, width: "86%", height: "2px", offset: 0.6 },
        { opacity: 1, width: "6px", height: "6px", offset: 0.9 },
        { opacity: 0, width: "2px", height: "2px", offset: 1 },
      ],
      { duration: 380, easing: "ease-in" },
    );
    flash.animate(
      [{ opacity: 0 }, { opacity: 0.85, offset: 0.55 }, { opacity: 0 }],
      { duration: 300, easing: "ease-in" },
    );
    return app.animate(
      [
        { transform: "scale(1, 1)" },
        { transform: "scale(1, 0.006)", offset: 0.55 },
        { transform: "scale(0, 0.006)" },
      ],
      { duration: 300, easing: "cubic-bezier(.7,0,.9,.4)", fill: "forwards" },
    ).finished.catch(() => {});
  }

  // a line flashes across, then the picture opens vertically and settles
  function crtOn() {
    beam.animate(
      [
        { opacity: 1, width: "4px", height: "2px" },
        { opacity: 1, width: "86%", height: "2px", offset: 0.35 },
        { opacity: 0, width: "86%", height: "2px" },
      ],
      { duration: 300, easing: "ease-out" },
    );
    flash.animate(
      [{ opacity: 0.9 }, { opacity: 0.6, offset: 0.3 }, { opacity: 0 }],
      { duration: 520, easing: "ease-out" },
    );
    const a = app.animate(
      [
        { transform: "scale(0, 0.006)" },
        { transform: "scale(1, 0.006)", offset: 0.3 },
        { transform: "scale(1, 1.03)", offset: 0.72 },
        { transform: "scale(1, 0.995)", offset: 0.86 },
        { transform: "scale(1, 1)" },
      ],
      { duration: 520, easing: "cubic-bezier(.2,.8,.2,1)" },
    );
    setTimeout(() => {
      app.classList.add("glitch");
      setTimeout(() => app.classList.remove("glitch"), 340);
    }, 300);
    return a.finished.catch(() => {});
  }

  // TV snow with a rolling bar, drawn at low resolution and scaled up
  function snow(ms) {
    const w = 160, h = 110;
    staticCanvas.width = w;
    staticCanvas.height = h;
    const ctx = staticCanvas.getContext("2d");
    const img = ctx.createImageData(w, h);
    staticCanvas.style.opacity = 1;
    let running = true;
    return new Promise((resolve) => {
      setTimeout(() => {
        running = false;
        staticCanvas.style.opacity = 0;
        resolve();
      }, ms);
      (function frame(now) {
        const bar = ((now / 3) % (h + 30)) - 15;
        for (let y = 0; y < h; y++) {
          const lift = Math.abs(y - bar) < 8 ? 70 : 0;
          for (let x = 0; x < w; x++) {
            const v = Math.min(255, ((Math.random() * 255) | 0) + lift);
            const p = (y * w + x) * 4;
            img.data[p] = img.data[p + 1] = img.data[p + 2] = v;
            img.data[p + 3] = 255;
          }
        }
        ctx.putImageData(img, 0, 0);
        if (running) requestAnimationFrame(frame);
      })(performance.now());
    });
  }

  // BIOS-style POST screen shown once, between PRESS START and the desktop
  let booted = false;
  function boot(isCurrent) {
    setMode("boot");
    const lines = [
      `<span class="brand">JUSTTURUU BIOS v2.0.27</span>`,
      `Copyright (C) 2005-${new Date().getFullYear()} Oyun-Ukhaan Turbold`,
      ``,
      `CPU     : MUST Software Engineering, class of 2027`,
      `Memory  : 640K ............................. <span class="ok">OK</span>`,
      `Drive 0 : erxes-inc (backend) ............... <span class="ok">OK</span>`,
      `Drive 1 : grand-ember (full-stack) .......... <span class="ok">OK</span>`,
      `Loading TypeScript, Node.js, GraphQL ........ <span class="ok">OK</span>`,
      `Mounting C:\\Users\\${USER} .................. <span class="ok">OK</span>`,
      ``,
      `Starting desktop...`,
    ];
    app.innerHTML = `<div class="boot" role="status"><div id="boot-out"></div><div class="boot-bar"><span id="boot-bar"></span></div><div class="boot-skip">click or press any key to skip</div></div>`;
    const out = document.getElementById("boot-out");
    const bar = document.getElementById("boot-bar");
    return new Promise((resolve) => {
      let i = 0;
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        clearInterval(t);
        removeEventListener("keydown", finish);
        resolve();
      };
      const t = setInterval(() => {
        if (!isCurrent()) return finish();
        if (i < lines.length) {
          out.innerHTML += lines[i] + "\n";
          bar.style.width = `${Math.round(((i + 1) / lines.length) * 100)}%`;
          i++;
        } else finish();
      }, 120);
      app.firstElementChild.addEventListener("click", finish);
      addEventListener("keydown", finish);
    });
  }

  let current = null;
  let navId = 0;

  async function route() {
    const id = ++navId;
    const isCurrent = () => id === navId;
    const path = location.hash.replace(/^#\/?/, "").replace(/\/$/, "");
    const next = kindOf(path);
    const prev = current;
    current = next;

    app.getAnimations().forEach((a) => a.cancel());
    screen.classList.remove("switching");

    // first paint, or the user asked for less motion: just show it
    if (prev === null || reduceMotion) {
      render(path);
      if (prev === null && !reduceMotion) crtOn();
      return;
    }

    // moving between folders keeps the window; only the icons re-enter
    if (prev === "explorer" && next === "explorer") {
      document.body.style.cursor = "progress";
      render(path);
      setTimeout(() => (document.body.style.cursor = ""), 220);
      return;
    }

    screen.classList.add("switching");
    await crtOff();
    if (!isCurrent()) return;

    if (prev === "landing" && next === "explorer" && !booted) {
      booted = true;
      app.getAnimations().forEach((a) => a.cancel());
      await boot(isCurrent);
      if (!isCurrent()) return;
      await crtOff();
      if (!isCurrent()) return;
    } else {
      await snow(200);
      if (!isCurrent()) return;
    }

    app.getAnimations().forEach((a) => a.cancel());
    render(path);
    screen.classList.remove("switching");
    await crtOn();
  }

  window.addEventListener("hashchange", route);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && location.hash.replace(/^#\/?/, "") === "")
      location.hash = "#/home";
  });
  route();

  /* ---------- starfield for terminal pages ---------- */

  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  let stars = [];
  function resize() {
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
    stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 * devicePixelRatio + 0.3,
      v: Math.random() * 0.25 + 0.05,
      t: Math.random() * Math.PI * 2,
    }));
  }
  function tick() {
    if (screen.classList.contains("terminal")) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.y += s.v;
        s.t += 0.03;
        if (s.y > canvas.height) s.y = 0;
        ctx.globalAlpha = 0.35 + Math.sin(s.t) * 0.3;
        ctx.fillStyle = "#fff";
        ctx.fillRect(s.x, s.y, s.r, s.r);
      }
    }
    requestAnimationFrame(tick);
  }
  addEventListener("resize", resize);
  resize();
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) tick();
})();
