/* Aggregate page counter: no cookies, storage, identifiers, heartbeat, inputs or individual history. */
(()=>{'use strict';
if(navigator.globalPrivacyControl===true||navigator.doNotTrack==='1')return;
let path=location.pathname.replace(/^\/scolar(?=\/)/,'');if(path==='/index.html'||path==='')path='/';
if(!['/','/demo.html','/newsletter.html','/datenschutz.html','/impressum.html','/nutzungsbedingungen.html','/community.html','/abonnements.html','/account-loeschen.html','/einladung.html'].includes(path))return;
let source='Direkt / unbekannt';try{const u=new URL(document.referrer),h=u.hostname;if(h!==location.hostname){source=/(^|\.)instagram\.com$/.test(h)?'Instagram':/(^|\.)google\.[a-z.]+$/.test(h)?'Google':/(^|\.)bing\.com$/.test(h)?'Bing':/(^|\.)facebook\.com$/.test(h)?'Facebook':'Andere Website';}}catch{}
let campaign=new URLSearchParams(location.search).get('utm_campaign')||'';if(!['instagram','instagram-story','launch','newsletter'].includes(campaign))campaign='';
fetch('https://dqeplmggkxxmpqdggxlz.supabase.co/functions/v1/scholar-web-stats',{method:'POST',headers:{'Content-Type':'text/plain;charset=UTF-8'},body:JSON.stringify({path,source,campaign}),credentials:'omit',keepalive:true,referrerPolicy:'no-referrer'}).catch(()=>{});
})();
