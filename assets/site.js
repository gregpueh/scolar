["sage","lilac","blue","orange","rose","teal","coral","berry"].forEach(c=>{const i=new Image();i.src="assets/Scholar_"+c+"_plus.png";});
document.querySelectorAll('[data-color]').forEach(button => { button.addEventListener('click', () => { document.querySelectorAll('[data-color]').forEach(other => other.setAttribute('aria-pressed', String(other === button))); document.querySelector('.plus-section').dataset.palette = button.dataset.color; document.querySelector('.plus-logo').src = 'assets/Scholar_' + button.dataset.color + '_plus.png'; }); });
document.querySelectorAll('[data-phone-tab]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-phone-tab]').forEach(tab => tab.setAttribute('aria-pressed', String(tab === button))); document.querySelectorAll('[data-phone-view]').forEach(view => view.hidden = view.dataset.phoneView !== button.dataset.phoneTab); }));
// Transform animation avoids rounded scrollLeft values at low speeds.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const carousels = [...document.querySelectorAll('.horizontal-cards')].map(track => {
  const originals=[...track.children];
  const rail=document.createElement('div');rail.className='carousel-rail';
  originals.forEach(card=>rail.append(card));
  originals.forEach(card=>{const copy=card.cloneNode(true);copy.classList.add('carousel-copy');copy.setAttribute('aria-hidden','true');copy.setAttribute('inert','');rail.append(copy);});
  track.append(rail);
  const state={track,rail,animation:null,hover:false,focus:false,visible:false,manual:false};
  function sync(){if(state.animation){if(document.hidden||reducedMotion.matches||state.hover||state.focus||!state.visible||state.manual)state.animation.pause();else state.animation.play();}}
  function configure(){
    if(state.manual)return;
    const first=rail.children[0],copy=rail.querySelector('.carousel-copy');
    const distance=copy.offsetLeft-first.offsetLeft;
    const phase=state.animation?((state.animation.currentTime||0)/(state.animation.effect.getTiming().duration||1))%1:0;
    state.animation?.cancel();
    if(distance>0){state.animation=rail.animate([{transform:'translateX(0)'},{transform:'translateX(-'+distance+'px)'}],{duration:distance/23*1000,iterations:Infinity,easing:'linear'});state.animation.currentTime=phase*distance/23*1000;sync();}
  }
  function manual(){
    if(state.manual)return;
    const transform=getComputedStyle(rail).transform;
    const offset=transform==='none'?0:Math.abs(new DOMMatrixReadOnly(transform).m41);
    state.manual=true;state.animation?.cancel();track.scrollLeft=offset;
  }
  track.addEventListener('pointerenter',()=>{state.hover=true;sync();});
  track.addEventListener('pointerleave',()=>{state.hover=false;sync();});
  track.addEventListener('focusin',()=>{state.focus=true;sync();});
  track.addEventListener('focusout',()=>{state.focus=track.contains(document.activeElement);sync();});
  track.addEventListener('pointerdown',manual);
  track.addEventListener('wheel',manual,{passive:true});
  track.addEventListener('keydown',manual);
  new ResizeObserver(configure).observe(track);
  return {...state,sync,configure,setVisible(value){state.visible=value;sync();}};
});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>carousels.find(item=>item.track===entry.target)?.setVisible(entry.isIntersecting)));
carousels.forEach(item=>observer.observe(item.track));
document.addEventListener('visibilitychange',()=>carousels.forEach(item=>item.sync()));
reducedMotion.addEventListener('change',()=>carousels.forEach(item=>item.sync()));
