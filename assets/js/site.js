(() => {
  const cfg = window.NEXUS_CONFIG || {};
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="assets/icons.svg#${name}"></use></svg>`;

  // Intro corporativo una vez por sesión
  const splash = $('.intro-splash');
  if (splash) {
    const seen = sessionStorage.getItem('nexus-splash');
    if (seen) splash.remove();
    else {
      sessionStorage.setItem('nexus-splash','1');
      setTimeout(() => splash.classList.add('hide'), 1850);
      setTimeout(() => splash.remove(), 2500);
    }
  }

  // Menú móvil
  const navWrap = $('.nav-wrap');
  $('.menu-btn')?.addEventListener('click', () => navWrap?.classList.toggle('open'));
  $$('.nav-drop>button').forEach(btn => btn.addEventListener('click', (e) => {
    if (innerWidth <= 1050) { e.preventDefault(); btn.parentElement.classList.toggle('open'); }
  }));

  // Reveal
  const reveal = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), {threshold:.12});
  $$('.reveal').forEach(el => reveal.observe(el));

  // Screens interactivos
  $$('.tab[data-screen]').forEach(tab => tab.addEventListener('click', () => {
    const group = tab.closest('[data-screen-group]') || document;
    $$('.tab[data-screen]', group).forEach(x => x.classList.remove('active'));
    tab.classList.add('active');
    $$('.screen', group).forEach(x => x.classList.toggle('active', x.dataset.screen === tab.dataset.screen));
  }));

  // Precios centralizados
  const monthly = Number(cfg.proMonthly || 25), yearly = Number(cfg.proYearly || 250);
  const money = n => new Intl.NumberFormat('es-VE',{style:'currency',currency:'USD',minimumFractionDigits:2}).format(n).replace('US$','$');
  const priceNodes = $$('[data-pro-price]');
  const billingNodes = $$('[data-pro-billing]');
  function setPrice(mode){
    $$('.pricing-toggle button').forEach(b => b.classList.toggle('active', b.dataset.billing===mode));
    if(mode==='yearly'){
      priceNodes.forEach(n => n.innerHTML = `${money(yearly)} <small>/año</small>`);
      billingNodes.forEach(n => n.textContent = `Equivale a ${money(yearly/12)} al mes`);
    }else{
      priceNodes.forEach(n => n.innerHTML = `${money(monthly)} <small>/mes</small>`);
      billingNodes.forEach(n => n.textContent = 'Facturación mensual');
    }
  }
  $$('.pricing-toggle button').forEach(b => b.addEventListener('click',()=>setPrice(b.dataset.billing)));
  if(priceNodes.length) setPrice('monthly');

  // Descarga
  $$('[data-download]').forEach(a => {
    a.href = cfg.windowsFile || 'downloads/SetupNexusEnterprise_3.2.0.exe';
    const v = a.querySelector('[data-version]'); if(v) v.textContent = cfg.version || '3.2.0';
  });
  $$('[data-version-text]').forEach(el => el.textContent = cfg.version || '3.2.0');

  // Cotización: resumen + copia/Email/WhatsApp configurables
  const form = $('#quote-form');
  if(form){
    const out = {
      company: $('#sum-company'), country: $('#sum-country'), pcs: $('#sum-pcs'), modules: $('#sum-modules')
    };
    const sync = () => {
      out.company.textContent = form.company.value || '—';
      out.country.textContent = form.country.value || '—';
      out.pcs.textContent = form.pcs.value || '—';
      const mods = $$('input[name="modules"]:checked', form).map(x=>x.value);
      out.modules.textContent = mods.length ? `${mods.length} seleccionados` : '—';
    };
    form.addEventListener('input',sync); sync();
    const build = () => {
      const mods = $$('input[name="modules"]:checked', form).map(x=>x.value).join(', ') || 'Por definir';
      return `SOLICITUD DE COTIZACIÓN — NEXUS ENTERPRISE\n\nEmpresa: ${form.company.value}\nContacto: ${form.contact.value}\nEmail: ${form.email.value}\nPaís: ${form.country.value}\nEquipos: ${form.pcs.value}\nMódulos: ${mods}\n\nNecesidad:\n${form.message.value}`;
    };
    $('#copy-quote')?.addEventListener('click', async()=>{
      await navigator.clipboard.writeText(build()); showToast('Solicitud copiada','Ya puedes pegarla en WhatsApp, correo o CRM.');
    });
    $('#send-quote')?.addEventListener('click', e=>{
      e.preventDefault();
      const text = build();
      if(cfg.salesEmail) location.href = `mailto:${cfg.salesEmail}?subject=${encodeURIComponent('Cotización Nexus Enterprise')}&body=${encodeURIComponent(text)}`;
      else if(cfg.whatsapp) location.href = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(text)}`;
      else { navigator.clipboard.writeText(text); showToast('Canal comercial pendiente','La solicitud fue copiada. Configura email o WhatsApp en assets/js/config.js.'); }
    });
  }

  function showToast(title, text){
    let t=$('.toast'); if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}
    t.innerHTML=`<strong>${title}</strong><span>${text}</span>`;requestAnimationFrame(()=>t.classList.add('show'));setTimeout(()=>t.classList.remove('show'),3600);
  }

  // Año
  $$('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());

  // Contadores
  const countObs = new IntersectionObserver(entries => entries.forEach(e=>{
    if(!e.isIntersecting || e.target.dataset.done) return; e.target.dataset.done='1';
    const end=Number(e.target.dataset.count), suffix=e.target.dataset.suffix||''; const start=performance.now();
    const step=t=>{const p=Math.min(1,(t-start)/1100);e.target.textContent=Math.round(end*(1-Math.pow(1-p,3))).toLocaleString('es-VE')+suffix;if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step);
  }),{threshold:.5}); $$('[data-count]').forEach(x=>countObs.observe(x));
})();
