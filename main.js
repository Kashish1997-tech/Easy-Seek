/* ==========================================================================
   EasySeek — Shared site behavior (runs on every page)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---- page loader ---- */
  const loader = document.getElementById("page-loader");
  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("hide"), 250);
    });
    // safety net in case 'load' already fired
    setTimeout(() => loader.classList.add("hide"), 1200);
  }

  /* ---- footer year ---- */
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  /* ---- mobile nav toggle ---- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("is-open");
      navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", navLinks.classList.contains("is-open"));
    });
    navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      navToggle.classList.remove("is-open");
      navLinks.classList.remove("is-open");
    }));
  }

  /* ---- dark mode toggle ---- */
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;
  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("easyseek-theme", theme);
    if (themeToggle) {
      themeToggle.innerHTML = theme === "dark"
        ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
    }
  };
  const savedTheme = localStorage.getItem("easyseek-theme")
    || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(savedTheme);
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* ---- scroll to top ---- */
  const scrollBtn = document.getElementById("scrollTop");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.classList.toggle("show", window.scrollY > 480);
    });
    scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq-item").forEach(item => {
    const btn = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    if (!btn || !panel) return;
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".faq-item").forEach(i => {
        i.classList.remove("open");
        i.querySelector(".faq-a").style.maxHeight = null;
        i.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---- animated counters ---- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString("en-IN") + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => io.observe(c));
  }

  /* ---- scroll-reveal ---- */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    reveals.forEach(el => el.style.opacity = 0);
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transition = "opacity .6s ease, transform .6s ease";
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
          io2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => {
      el.style.transform = "translateY(18px)";
      io2.observe(el);
    });
  }

  /* ---- newsletter form ---- */
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector("input[type=email]");
      const note = newsletterForm.querySelector(".form-note");
      if (input && input.value && input.checkValidity()) {
        if (note) note.style.display = "flex";
        input.value = "";
      }
    });
  }

  /* ---- generic social share buttons ---- */
  document.querySelectorAll("[data-share]").forEach(btn => {
    btn.addEventListener("click", () => {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(document.title);
      const platform = btn.dataset.share;
      const links = {
        whatsapp: `https://wa.me/?text=${text}%20${url}`,
        twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
      };
      if (links[platform]) window.open(links[platform], "_blank", "noopener,width=600,height=500");
    });
  });

});
