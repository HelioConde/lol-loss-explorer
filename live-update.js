(() => {
  "use strict";
  const I=12000,V="version.json",P="__v";
  if(new Set(["localhost","127.0.0.1","::1"]).has(location.hostname))return;
  let current=null,checking=false,reloading=false;
  async function read(){const r=await fetch(V+"?_="+Date.now(),{cache:"no-store",credentials:"same-origin"});if(!r.ok)throw new Error("version-"+r.status);const j=await r.json();return String(j?.sha||j?.version||"").trim();}
  function notice(){if(document.getElementById("live-update-notice"))return;const e=document.createElement("div");e.id="live-update-notice";e.setAttribute("role","status");e.setAttribute("aria-live","polite");e.textContent="Nova versão publicada. Atualizando automaticamente…";Object.assign(e.style,{position:"fixed",left:"50%",bottom:"18px",transform:"translateX(-50%)",zIndex:"2147483647",padding:"10px 14px",borderRadius:"999px",background:"#141b24",color:"#fff",font:"600 12px system-ui",boxShadow:"0 10px 35px rgba(0,0,0,.3)"});document.body.appendChild(e);}
  async function refresh(next){if(reloading)return;reloading=true;notice();try{if("caches"in window){const keys=await caches.keys();await Promise.allSettled(keys.map(k=>caches.delete(k)));}}catch{}await new Promise(r=>setTimeout(r,650));const u=new URL(location.href);u.searchParams.set(P,next.slice(0,16)||Date.now().toString());location.replace(u.toString());}
  async function check(){if(checking||reloading)return;checking=true;try{const next=await read();if(!next)return;if(current===null)current=next;else if(next!==current)await refresh(next);}catch{}finally{checking=false;}}
  const u=new URL(location.href);if(u.searchParams.has(P)){u.searchParams.delete(P);history.replaceState(null,"",u.pathname+u.search+u.hash);}check();setInterval(check,I);addEventListener("focus",check);document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")check();});
})();