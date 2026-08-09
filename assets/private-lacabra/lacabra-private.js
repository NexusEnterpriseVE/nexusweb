(() => {
  const whatsapp = "584125477119";
  const setup = window.LA_CABRA_SETUP || {};

  const themeBtn = document.getElementById("privateTheme");
  const currentTheme = localStorage.getItem("nexus_theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.dataset.theme = currentTheme;
  if (themeBtn) themeBtn.textContent = currentTheme === "dark" ? "☀" : "◐";
  themeBtn?.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("nexus_theme", next);
    themeBtn.textContent = next === "dark" ? "☀" : "◐";
  });

  document.querySelectorAll("[data-buy-plan]").forEach(btn => {
    btn.addEventListener("click", () => {
      const plan = btn.dataset.buyPlan;
      const msg = `Hola Nexus Enterprise. Quiero activar ${plan} para Nexus Retail — La Cabra Store.`;
      window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    });
  });

  const button = document.getElementById("setupDownload");
  const status = document.getElementById("setupStatus");
  const version = document.querySelectorAll("[data-setup-version]");
  const fileName = document.querySelectorAll("[data-setup-file]");
  const size = document.querySelectorAll("[data-setup-size]");
  const sha = document.querySelectorAll("[data-setup-sha]");
  const date = document.querySelectorAll("[data-setup-date]");

  version.forEach(el => el.textContent = setup.version || "0.2.3");
  fileName.forEach(el => el.textContent = setup.fileName || "SetupLaCabraStore_NexusRetail_0.2.3.exe");
  size.forEach(el => el.textContent = setup.size || "Pendiente");
  sha.forEach(el => el.textContent = setup.sha256 || "Se publicará con el Setup");
  date.forEach(el => el.textContent = setup.publishedAt || "Pendiente");

  if (button) {
    if (setup.setupUrl && setup.setupUrl.trim()) {
      button.href = setup.setupUrl.trim();
      button.classList.remove("disabled");
      button.removeAttribute("aria-disabled");
      button.textContent = `Descargar La Cabra Store ${setup.version || ""} →`;
      if (status) status.textContent = "Paquete disponible en MediaFire";
    } else {
      button.href = "javascript:void(0)";
      button.classList.add("disabled");
      button.setAttribute("aria-disabled", "true");
      button.addEventListener("click", e => e.preventDefault());
      button.textContent = "Descarga no disponible";
      if (status) status.textContent = "Descarga no configurada";
    }
  }

  document.getElementById("copySha")?.addEventListener("click", async () => {
    if (!setup.sha256) return;
    await navigator.clipboard.writeText(setup.sha256);
    const btn = document.getElementById("copySha");
    const old = btn.textContent;
    btn.textContent = "SHA-256 copiado";
    setTimeout(() => btn.textContent = old, 1400);
  });

  const reveal = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); reveal.unobserve(e.target); }
  }), {threshold:.1});
  document.querySelectorAll(".reveal").forEach(el => reveal.observe(el));
})();
