// script.js - background particles + interactions + UI small helpers
(function(){
  // canvas background - glowing square particles (minecraft-ish)
  const canvas = document.getElementById('bg');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  let parts = [];
  function initParticles(){
    parts = [];
    const count = Math.round((W*H)/70000); // scale with screen
    for(let i=0;i<count;i++){
      parts.push({
        x: Math.random()*W,
        y: Math.random()*H,
        s: Math.random()*18 + 6,
        v: Math.random()*0.35 + 0.05,
        alpha: Math.random()*0.5 + 0.15
      });
    }
  }
  initParticles();

  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initParticles();
  }
  window.addEventListener('resize', resize);

  function draw(){
    ctx.clearRect(0,0,W,H);
    // dark vignette
    const g = ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0, 'rgba(3,3,3,0.0)');
    g.addColorStop(1, 'rgba(0,0,0,0.35)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,W,H);

    parts.forEach(p=>{
      // glow base
      ctx.beginPath();
      ctx.fillStyle = `rgba(0,224,122,${p.alpha})`;
      ctx.fillRect(p.x, p.y, p.s, p.s);
      // inner darker square for block look
      ctx.fillStyle = `rgba(0,0,0,0.15)`;
      ctx.fillRect(p.x+Math.max(1,p.s*0.12), p.y+Math.max(1,p.s*0.12), p.s*0.75, p.s*0.75);
      // move
      p.y += p.v;
      if(p.y > H + p.s) p.y = -p.s - Math.random()*80;
    });

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);

  // loading screen hide after short delay
  window.addEventListener('load', ()=>{
    setTimeout(()=> {
      const L = document.getElementById('loading');
      if(L) L.style.display = 'none';
      // update status time
      const t = new Date(); document.getElementById('statusTime').innerText = t.toLocaleTimeString();
    }, 1000);
  });

  // click sound
  window.playClick = function(){
    const s = document.getElementById('clickSound');
    if(!s) return;
    try{ s.currentTime = 0; s.play(); } catch(e){}
  };

  // mobile menu toggle
  function toggleMenu(btn){
    const nav = btn.parentElement;
    const links = nav.querySelector('.nav-links');
    if(!links) return;
    if(links.style.display === 'flex'){ links.style.display = 'none'; btn.innerText = '☰'; }
    else { links.style.display = 'flex'; links.style.flexDirection = 'column'; links.style.gap = '10px'; btn.innerText = '✕'; }
  }
  document.getElementById('menuBtn')?.addEventListener('click', ()=>toggleMenu(document.getElementById('menuBtn')));
  document.getElementById('menuBtn2')?.addEventListener('click', ()=>toggleMenu(document.getElementById('menuBtn2')));
  document.getElementById('menuBtn3')?.addEventListener('click', ()=>toggleMenu(document.getElementById('menuBtn3')));
  document.getElementById('menuBtn4')?.addEventListener('click', ()=>toggleMenu(document.getElementById('menuBtn4')));

})();
