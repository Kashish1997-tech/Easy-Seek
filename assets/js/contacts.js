/* ==========================================================================
   EasySeek — Contact form validation
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const successMsg = document.getElementById("contactSuccess");

  const validators = {
    name: (v) => v.trim().length >= 2 || "Please enter your full name.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email address.",
    subject: (v) => v.trim().length >= 3 || "Please add a short subject.",
    message: (v) => v.trim().length >= 10 || "Message should be at least 10 characters."
  };

  function validateField(field) {
    const wrap = field.closest(".field");
    const rule = validators[field.name];
    if (!rule) return true;
    const result = rule(field.value);
    if (result === true) {
      wrap.classList.remove("invalid");
      return true;
    }
    wrap.classList.add("invalid");
    const msg = wrap.querySelector(".error-msg");
    if (msg) msg.textContent = result;
    return false;
  }

  form.querySelectorAll("input, textarea").forEach(field => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.closest(".field").classList.contains("invalid")) validateField(field);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll("input[name], textarea[name]").forEach(field => {
      if (!validateField(field)) valid = false;
    });
    if (!valid) {
      form.querySelector(".field.invalid input, .field.invalid textarea")?.focus();
      return;
    }
    if (successMsg) {
      successMsg.style.display = "flex";
      successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    form.reset();
  });
});
