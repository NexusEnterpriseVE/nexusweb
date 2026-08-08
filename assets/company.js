(() => {
  const cfg = {
    whatsapp: '584125477119',
    whatsappDisplay: '0412-5477119',
    emails: ['somosnexusstudio@gmail.com','contactooliverlugo@gmail.com'],
    download: 'https://www.mediafire.com/file/nydaus8a6t541b1/SetupNexusEnterprise_2.1.0.rar/file',
    locationEs: 'Guanare, Edo. Portuguesa, Venezuela 3350',
    locationEn: 'Guanare, Portuguesa, Venezuela 3350'
  };
  window.NEXUS_CONFIG = cfg;

  const page = document.body.dataset.page || 'home';
  const labels = {
    es:{home:'Inicio',company:'Empresa',services:'Servicios',products:'Productos',clients:'Clientes',affiliates:'Afiliados',resources:'Recursos',quote:'Cotizar',product:'Nexus Enterprise',download:'Descargar',pricing:'Planes',docs:'Documentación',security:'Seguridad',portal:'Portal',dark:'Modo oscuro',light:'Modo claro',lang:'EN'},
    en:{home:'Home',company:'Company',services:'Services',products:'Products',clients:'Clients',affiliates:'Affiliates',resources:'Resources',quote:'Get a quote',product:'Nexus Enterprise',download:'Download',pricing:'Pricing',docs:'Documentation',security:'Security',portal:'Portal',dark:'Dark mode',light:'Light mode',lang:'ES'}
  };

  function getLang(){ return localStorage.getItem('nexus_lang') || 'es'; }
  function setLang(lang){ localStorage.setItem('nexus_lang',lang); document.documentElement.lang=lang; translate(lang); renderNav(); renderFooter(); }
  function getTheme(){ return localStorage.getItem('nexus_theme') || (matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'); }
  function setTheme(theme){ localStorage.setItem('nexus_theme',theme); document.documentElement.dataset.theme=theme; renderNav(); }

  function translate(lang){
    document.querySelectorAll('[data-es]').forEach(el=>{
      const val = lang==='en' ? el.dataset.en : el.dataset.es;
      if(val !== undefined) el.textContent = val;
    });
    document.querySelectorAll('[data-es-html]').forEach(el=>{
      const val = lang==='en' ? el.dataset.enHtml : el.dataset.esHtml;
      if(val !== undefined) el.innerHTML = val;
    });
    document.querySelectorAll('[data-placeholder-es]').forEach(el=>{
      el.placeholder = lang==='en' ? (el.dataset.placeholderEn||'') : (el.dataset.placeholderEs||'');
    });
    document.querySelectorAll('option[data-es]').forEach(el=>{
      el.textContent = lang==='en' ? el.dataset.en : el.dataset.es;
    });
    document.querySelectorAll('[data-location]').forEach(el=> el.textContent = lang==='en'?cfg.locationEn:cfg.locationEs);
  }

  function brandHTML(){return `<a class="brand" href="index.html" aria-label="Nexus Enterprise"><img src="assets/brand/nexus-icon.png" alt="Nexus Enterprise"><span><strong>Nexus Enterprise</strong><small>${getLang()==='es'?'Software · Desarrollo · Tecnología':'Software · Development · Technology'}</small></span></a>`}

  function renderNav(){
    const host=document.getElementById('site-nav'); if(!host) return;
    const lang=getLang(), t=labels[lang], theme=getTheme();
    const active=(name)=>page===name?'active':'';
    host.innerHTML=`
      <div class="top-note"><div class="container"><span>${lang==='es'?'Desarrollo de software, páginas web, apps y automatización para empresas y personas.':'Software, websites, apps and automation for businesses and individuals.'}</span><span><a href="cotizar.html">${lang==='es'?'Cuéntanos tu proyecto →':'Tell us about your project →'}</a></span></div></div>
      <header class="nav"><div class="nav-inner">
        ${brandHTML()}
        <nav class="nav-links" aria-label="${lang==='es'?'Navegación principal':'Main navigation'}">
          <a class="${active('home')}" href="index.html">${t.home}</a>
          <button class="nav-drop" type="button" data-mega-trigger="company" data-mobile-href="empresa.html">${t.company} ⌄</button>
          <button class="nav-drop" type="button" data-mega-trigger="solutions" data-mobile-href="servicios.html">${lang==='es'?'Soluciones':'Solutions'} ⌄</button>
          <a class="${active('clients')}" href="clientes.html">${t.clients}</a>
          <a class="${active('affiliates')}" href="afiliados.html">${t.affiliates}</a>
          <button class="nav-drop" type="button" data-mega-trigger="resources" data-mobile-href="documentacion.html">${t.resources} ⌄</button>
        </nav>
        <div class="nav-tools">
          <a class="btn primary nav-quote" href="cotizar.html">${t.quote}</a>
          <button class="icon-btn lang-btn" type="button" id="langToggle" aria-label="Language">${t.lang}</button>
          <button class="icon-btn" type="button" id="themeToggle" aria-label="${theme==='dark'?t.light:t.dark}">${theme==='dark'?'☀':'◐'}</button>
          <button class="icon-btn mobile-btn" type="button" id="mobileToggle" aria-label="Menu">☰</button>
        </div>
      </div>
      <div class="mega" data-mega="company"><div class="mega-grid">
        <div class="mega-intro"><span class="eyebrow">Nexus</span><h3>${lang==='es'?'Tecnología para construir y hacer crecer negocios.':'Technology to build and grow businesses.'}</h3></div>
        <a class="mega-link" href="empresa.html"><b>${lang==='es'?'Quiénes somos':'About us'}</b><span>${lang==='es'?'Visión, equipo y filosofía.':'Vision, team and philosophy.'}</span></a>
        <a class="mega-link" href="clientes.html"><b>${t.clients}</b><span>${lang==='es'?'Experiencia con más de 20 clientes.':'Experience with 20+ clients.'}</span></a>
        <a class="mega-link" href="afiliados.html"><b>${t.affiliates}</b><span>${lang==='es'?'Únete al ecosistema Nexus.':'Join the Nexus ecosystem.'}</span></a>
      </div></div>
      <div class="mega" data-mega="solutions"><div class="mega-grid">
        <div class="mega-intro"><span class="eyebrow">${lang==='es'?'Soluciones':'Solutions'}</span><h3>${lang==='es'?'Creamos lo que tu operación necesita.':'We build what your operation needs.'}</h3></div>
        <a class="mega-link" href="servicios.html"><b>${lang==='es'?'Desarrollo a medida':'Custom development'}</b><span>${lang==='es'?'Web, apps, automatización, portales e integraciones.':'Web, apps, automation, portals and integrations.'}</span></a>
        <a class="mega-link" href="productos.html"><b>${t.products}</b><span>${lang==='es'?'Nexus Enterprise y próximos productos.':'Nexus Enterprise and future products.'}</span></a>
        <a class="mega-link" href="nexus-enterprise.html"><b>Nexus Enterprise</b><span>${lang==='es'?'Nuestro producto principal para gestión empresarial.':'Our flagship business management product.'}</span></a>
      </div></div>
      <div class="mega" data-mega="resources"><div class="mega-grid">
        <div class="mega-intro"><span class="eyebrow">${t.resources}</span><h3>${lang==='es'?'Descarga, aprende y recibe soporte.':'Download, learn and get support.'}</h3></div>
        <a class="mega-link" href="descargas.html"><b>${t.download}</b><span>Nexus Enterprise 2.1.0 · Windows</span></a>
        <a class="mega-link" href="documentacion.html"><b>${t.docs}</b><span>${lang==='es'?'Instalación y uso del producto.':'Product installation and use.'}</span></a>
        <a class="mega-link" href="seguridad.html"><b>${t.security}</b><span>${lang==='es'?'Principios de seguridad y licenciamiento.':'Security and licensing principles.'}</span></a>
      </div></div>
      </header>`;
    bindNav();
  }

  function renderFooter(){
    const host=document.getElementById('site-footer'); if(!host) return; const lang=getLang(),t=labels[lang];
    host.innerHTML=`<footer class="footer"><div class="container footer-grid">
      <div class="footer-col">${brandHTML()}<p>${lang==='es'?'Software, desarrollo y soluciones digitales para empresas y personas.':'Software, development and digital solutions for businesses and individuals.'}</p><span>${lang==='es'?'CEO y desarrollador principal: Oliver Lugo':'CEO & Lead Developer: Oliver Lugo'}</span><span data-location>${lang==='es'?cfg.locationEs:cfg.locationEn}</span></div>
      <div class="footer-col"><h4>${lang==='es'?'Empresa':'Company'}</h4><a href="empresa.html">${lang==='es'?'Quiénes somos':'About'}</a><a href="clientes.html">${t.clients}</a><a href="afiliados.html">${t.affiliates}</a><a href="cotizar.html">${t.quote}</a></div>
      <div class="footer-col"><h4>${lang==='es'?'Soluciones':'Solutions'}</h4><a href="servicios.html">${lang==='es'?'Desarrollo a medida':'Custom development'}</a><a href="productos.html">${t.products}</a><a href="nexus-enterprise.html">Nexus Enterprise</a><a href="planes.html">${t.pricing}</a></div>
      <div class="footer-col"><h4>${t.resources}</h4><a href="descargas.html">${t.download}</a><a href="documentacion.html">${t.docs}</a><a href="seguridad.html">${t.security}</a><a href="portal.html">${t.portal}</a><a href="privacidad.html">${lang==='es'?'Privacidad':'Privacy'}</a><a href="terminos.html">${lang==='es'?'Términos':'Terms'}</a></div>
      <div class="footer-col"><h4>${lang==='es'?'Contacto':'Contact'}</h4><a href="https://wa.me/${cfg.whatsapp}" target="_blank" rel="noreferrer">WhatsApp · ${cfg.whatsappDisplay}</a><a href="mailto:${cfg.emails[0]}">${cfg.emails[0]}</a><a href="mailto:${cfg.emails[1]}">${cfg.emails[1]}</a><span>Binance · Zelle · Pago Móvil</span></div>
    </div><div class="container footer-bottom"><span>© 2026 Nexus Enterprise. ${lang==='es'?'Todos los derechos reservados.':'All rights reserved.'}</span><span>${lang==='es'?'Programado y desarrollado por Oliver Lugo.':'Programmed and developed by Oliver Lugo.'}</span></div></footer>`;
  }

  function bindNav(){
    const nav=document.querySelector('.nav');
    document.getElementById('themeToggle')?.addEventListener('click',()=>setTheme(getTheme()==='dark'?'light':'dark'));
    document.getElementById('langToggle')?.addEventListener('click',()=>setLang(getLang()==='es'?'en':'es'));
    document.getElementById('mobileToggle')?.addEventListener('click',()=>document.querySelector('.nav-links')?.classList.toggle('open'));
    document.querySelectorAll('[data-mega-trigger]').forEach(btn=>btn.addEventListener('click',e=>{
      if(innerWidth<=1050 && btn.dataset.mobileHref){ location.href=btn.dataset.mobileHref; return; }
      e.stopPropagation(); const key=btn.dataset.megaTrigger; const panel=document.querySelector(`[data-mega="${key}"]`);
      document.querySelectorAll('.mega').forEach(x=>{if(x!==panel)x.classList.remove('open')}); panel?.classList.toggle('open');
    }));
    document.addEventListener('click',()=>document.querySelectorAll('.mega').forEach(x=>x.classList.remove('open')));
    addEventListener('scroll',()=>nav?.classList.toggle('scrolled',scrollY>12),{passive:true});
  }

  function initReveal(){
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  }
  function initCounters(){
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,target=Number(el.dataset.count||0),suffix=el.dataset.suffix||'';let n=0;const start=performance.now(),dur=900;function tick(now){const p=Math.min(1,(now-start)/dur);n=Math.round(target*(1-Math.pow(1-p,3)));el.textContent=n+suffix;if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);io.unobserve(el)}),{threshold:.7});
    document.querySelectorAll('[data-count]').forEach(el=>io.observe(el));
  }
  function initProgress(){
    const bar=document.querySelector('.scroll-progress i'); const top=document.querySelector('.back-top');
    addEventListener('scroll',()=>{const d=document.documentElement;const p=d.scrollHeight<=innerHeight?0:scrollY/(d.scrollHeight-innerHeight);if(bar)bar.style.width=`${p*100}%`;top?.classList.toggle('show',scrollY>500)},{passive:true});
    top?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
  }
  function initParallax(){
    const v=document.querySelector('[data-parallax]'); if(!v || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    v.addEventListener('pointermove',e=>{const r=v.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;const w=v.querySelector('.product-window');if(w)w.style.transform=`rotateY(${x*7-4}deg) rotateX(${-y*5+2}deg) translate3d(${x*5}px,${y*4}px,0)`});
    v.addEventListener('pointerleave',()=>{const w=v.querySelector('.product-window');if(w)w.style.transform='rotateY(-4deg) rotateX(2deg)'});
  }
  function initStory(){
    const buttons=[...document.querySelectorAll('[data-story-target]')],panels=[...document.querySelectorAll('[data-story-panel]')]; if(!buttons.length)return;
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){buttons.forEach(b=>b.classList.toggle('active',b.dataset.storyTarget===e.target.dataset.storyPanel))}}),{rootMargin:'-35% 0px -45% 0px',threshold:.05}); panels.forEach(p=>io.observe(p));
    buttons.forEach(b=>b.addEventListener('click',()=>document.querySelector(`[data-story-panel="${b.dataset.storyTarget}"]`)?.scrollIntoView({behavior:'smooth',block:'center'})));
  }
  function initQuote(){
    const form=document.getElementById('quoteForm'); if(!form)return;
    form.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(form);const lang=getLang();const lines=lang==='es'?[`Hola Nexus Enterprise, quiero solicitar una cotización.`,`Proyecto: ${f.get('type')}`,`Nombre/empresa: ${f.get('name')}`,`Alcance: ${f.get('scope')}`,`Presupuesto orientativo: ${f.get('budget')}`,`Plazo: ${f.get('deadline')}`,`Detalles: ${f.get('details')}`]:[`Hello Nexus Enterprise, I would like a quote.`,`Project: ${f.get('type')}`,`Name/company: ${f.get('name')}`,`Scope: ${f.get('scope')}`,`Budget range: ${f.get('budget')}`,`Timeline: ${f.get('deadline')}`,`Details: ${f.get('details')}`];window.open(`https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank');const result=document.getElementById('quoteResult');if(result){result.classList.add('show');result.textContent=lang==='es'?'Abrimos WhatsApp con el resumen de tu proyecto. Puedes revisarlo antes de enviarlo.':'We opened WhatsApp with your project brief. You can review it before sending.'}});
  }
  function initPlanButtons(){
    document.querySelectorAll('[data-plan]').forEach(btn=>btn.addEventListener('click',()=>{const lang=getLang(),plan=btn.dataset.plan;const msg=lang==='es'?`Hola Nexus Enterprise, quiero adquirir el plan ${plan} de Nexus Enterprise.`:`Hello Nexus Enterprise, I want to purchase the ${plan} plan for Nexus Enterprise.`;window.open(`https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(msg)}`,'_blank')}));
  }
  function initDownload(){ document.querySelectorAll('[data-download]').forEach(a=>a.href=cfg.download); }

  document.documentElement.dataset.theme=getTheme();
  renderNav(); renderFooter(); translate(getLang()); initReveal(); initCounters(); initProgress(); initParallax(); initStory(); initQuote(); initPlanButtons(); initDownload();
})();
