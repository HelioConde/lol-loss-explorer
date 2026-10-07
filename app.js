const API_TIMEOUT_MS=18000;
const LANGUAGE_KEY="lol-loss-explorer:language";
const VALID_PERIODS=new Set(["week","month","recent"]);

const copy={
  pt:{
    riotData:"DADOS RIOT",eyebrow:"LEAGUE OF LEGENDS · REVISÃO DE DERROTAS",
    heroTitle:'Perder uma partida é resultado. <span>Repetir um padrão é dado para revisar.</span>',
    heroText:"Agrupe suas derrotas recentes por campeão, rota e duração e compare métricas com suas próprias vitórias da mesma amostra — sem chamar correlação de “causa da derrota”.",
    riotId:"Riot ID",server:"Servidor",analyze:"Explorar minhas derrotas",methodEyebrow:"MÉTODO",
    method1:"Separar",method1Text:"vitórias e derrotas da mesma amostra",method2:"Comparar",method2Text:"métricas pessoais, não médias globais",
    method3:"Revisar",method3Text:"padrões recorrentes com evidência suficiente",loadingTitle:"Consultando suas partidas recentes…",
    loadingText:"O backend carrega até 40 partidas elegíveis.",analysis:"LOSS EXPLORER",recent40:"40 recentes",matches:"Partidas",inSample:"na amostra",
    losses:"Derrotas",avgDeaths:"Mortes médias",avgKda:"KDA médio",inLosses:"nas derrotas",compareEyebrow:"DERROTAS × VITÓRIAS",
    compareTitle:"Como suas métricas mudam na mesma amostra?",noCausality:"Uma diferença entre derrotas e vitórias não prova a causa do resultado. Use como ponto de revisão.",
    durationEyebrow:"DURAÇÃO DAS DERROTAS",durationTitle:"Quando elas terminam?",championsEyebrow:"CAMPEÕES",championsTitle:"Onde as derrotas se repetem",
    rolesEyebrow:"ROTAS",rolesTitle:"Amostra por função",signalsEyebrow:"SINAIS PARA REVISAR",signalsTitle:"Padrões recorrentes da sua própria amostra",
    recentLossesEyebrow:"DERROTAS RECENTES",recentLossesTitle:"Partidas usadas nesta revisão",ad:"PUBLICIDADE",adNote:"espaço reservado · fora da análise principal",
    disclaimer:"Produto independente. League of Legends e Riot Games são marcas da Riot Games, Inc.",about:"Sobre",privacy:"Privacidade",terms:"Termos",
    invalid:"Use um Riot ID no formato Nome#TAG.",loading:"Consultando a Riot…",notFound:"Riot ID não encontrado. Confira nome, tag e servidor.",
    rate:"Limite temporário da Riot atingido. Tente novamente em instantes.",error:"Não foi possível consultar o histórico de LoL agora.",
    live:"Dados Riot carregados.",stale:"Exibindo o último histórico real armazenado em cache.",empty:"Nenhuma partida elegível neste período.",
    noLosses:"Nenhuma derrota nesta amostra.",sample:(games,losses,wins)=>games+" partidas · "+losses+" derrotas · "+wins+" vitórias",
    lossRate:"taxa de derrota da amostra",winsLabel:"Vitórias",lossesLabel:"Derrotas",metric:"Métrica",
    deaths:"Mortes",kda:"KDA",csMin:"CS/min",visionMin:"Visão/min",duration:"Duração",
    short:"< 25 min",mid:"25–35 min",long:"> 35 min",gamesWord:"partidas",lossesWord:"derrotas",
    sampleLow:"Amostra pequena",sampleMedium:"Amostra moderada",sampleHigh:"Amostra forte",
    roleTOP:"Top",roleJUNGLE:"Selva",roleMID:"Meio",roleADC:"Atirador",roleSUPPORT:"Suporte",roleUNKNOWN:"Sem rota",
    signalDeaths:"Nas derrotas, sua média de mortes ficou {delta} acima das vitórias da mesma amostra.",
    signalCs:"Nas derrotas, seu CS/min ficou {delta} abaixo das vitórias da mesma amostra.",
    signalVision:"Nas derrotas, sua visão/min ficou {delta} abaixo das vitórias da mesma amostra.",
    signalShort:"{rate}% das derrotas terminaram antes de 25 minutos.",
    signalLong:"{rate}% das derrotas passaram de 35 minutos.",
    signalChampion:"{name} aparece em {losses} derrotas de {games} partidas desta amostra ({rate}% de derrotas).",
    signalRole:"Na função {name}, houve {losses} derrotas em {games} partidas desta amostra ({rate}%).",
    noSignals:"Ainda não há um padrão recorrente forte o bastante nesta amostra. Isso também é informação útil.",
    observed:"Sinal observado",review:"Revisar",noProof:"não prova causalidade",queue:"Fila"
  },
  en:{
    riotData:"RIOT DATA",eyebrow:"LEAGUE OF LEGENDS · LOSS REVIEW",
    heroTitle:'Losing one match is a result. <span>Repeating a pattern is data to review.</span>',
    heroText:"Group recent losses by champion, role and duration, then compare metrics with your own wins from the same sample — without calling correlation the “cause of the loss”.",
    riotId:"Riot ID",server:"Server",analyze:"Explore my losses",methodEyebrow:"METHOD",
    method1:"Separate",method1Text:"wins and losses from the same sample",method2:"Compare",method2Text:"personal metrics, not global averages",
    method3:"Review",method3Text:"recurring patterns with enough evidence",loadingTitle:"Checking your recent matches…",
    loadingText:"The backend loads up to 40 eligible matches.",analysis:"LOSS EXPLORER",recent40:"Recent 40",matches:"Matches",inSample:"in sample",
    losses:"Losses",avgDeaths:"Average deaths",avgKda:"Average KDA",inLosses:"in losses",compareEyebrow:"LOSSES × WINS",
    compareTitle:"How do your metrics change in the same sample?",noCausality:"A difference between losses and wins does not prove the cause of the result. Use it as a review point.",
    durationEyebrow:"LOSS DURATION",durationTitle:"When do they end?",championsEyebrow:"CHAMPIONS",championsTitle:"Where losses repeat",
    rolesEyebrow:"ROLES",rolesTitle:"Sample by role",signalsEyebrow:"REVIEW SIGNALS",signalsTitle:"Recurring patterns from your own sample",
    recentLossesEyebrow:"RECENT LOSSES",recentLossesTitle:"Matches used in this review",ad:"ADVERTISEMENT",adNote:"reserved space · outside the main analysis",
    disclaimer:"Independent product. League of Legends and Riot Games are trademarks of Riot Games, Inc.",about:"About",privacy:"Privacy",terms:"Terms",
    invalid:"Use a Riot ID in Name#TAG format.",loading:"Checking Riot…",notFound:"Riot ID not found. Check name, tag and server.",
    rate:"Riot is temporarily rate-limiting requests. Try again shortly.",error:"Could not load LoL history right now.",
    live:"Riot data loaded.",stale:"Showing the most recent real history available in cache.",empty:"No eligible matches in this period.",
    noLosses:"No losses in this sample.",sample:(games,losses,wins)=>games+" matches · "+losses+" losses · "+wins+" wins",
    lossRate:"sample loss rate",winsLabel:"Wins",lossesLabel:"Losses",metric:"Metric",
    deaths:"Deaths",kda:"KDA",csMin:"CS/min",visionMin:"Vision/min",duration:"Duration",
    short:"< 25 min",mid:"25–35 min",long:"> 35 min",gamesWord:"games",lossesWord:"losses",
    sampleLow:"Small sample",sampleMedium:"Moderate sample",sampleHigh:"Strong sample",
    roleTOP:"Top",roleJUNGLE:"Jungle",roleMID:"Mid",roleADC:"ADC",roleSUPPORT:"Support",roleUNKNOWN:"Unknown role",
    signalDeaths:"In losses, your average deaths were {delta} higher than in wins from the same sample.",
    signalCs:"In losses, your CS/min was {delta} lower than in wins from the same sample.",
    signalVision:"In losses, your vision/min was {delta} lower than in wins from the same sample.",
    signalShort:"{rate}% of losses ended before 25 minutes.",
    signalLong:"{rate}% of losses lasted more than 35 minutes.",
    signalChampion:"{name} appears in {losses} losses out of {games} sampled matches ({rate}% losses).",
    signalRole:"In {name}, there were {losses} losses in {games} sampled matches ({rate}%).",
    noSignals:"There is no recurring pattern strong enough in this sample yet. That is useful information too.",
    observed:"Observed signal",review:"Review",noProof:"does not prove causality",queue:"Queue"
  }
};

let lang=localStorage.getItem(LANGUAGE_KEY)==="en"?"en":"pt";
let period="month";
let rawMatches=[];
let currentPlayer=null;

const $=selector=>document.querySelector(selector);
const t=key=>copy[lang][key]||key;
const esc=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const locale=()=>lang==="pt"?"pt-BR":"en-US";
const dec=(value,digits=1)=>value==null||!Number.isFinite(Number(value))?"—":Number(value).toLocaleString(locale(),{minimumFractionDigits:digits,maximumFractionDigits:digits});

function parseRiotId(value){
  const raw=String(value||"").trim();
  const split=raw.lastIndexOf("#");
  if(split<=0)return null;
  const gameName=raw.slice(0,split).trim();
  const tagLine=raw.slice(split+1).trim();
  if(gameName.length<2||gameName.length>16||tagLine.length<2||tagLine.length>6)return null;
  return {gameName,tagLine};
}
function routingFor(platform){
  if(["br1","na1","la1","la2"].includes(platform))return"americas";
  if(["kr","jp1"].includes(platform))return"asia";
  if(platform==="oc1")return"sea";
  return"europe";
}
function num(...values){
  for(const value of values){
    if(value!==null&&value!==undefined&&value!==""&&Number.isFinite(Number(value)))return Number(value);
  }
  return 0;
}
function optionalNum(...values){
  for(const value of values){
    if(value!==null&&value!==undefined&&value!==""&&Number.isFinite(Number(value)))return Number(value);
  }
  return null;
}
function boolValue(value){
  if(value===true||value===1||value==="1")return true;
  if(value===false||value===0||value==="0"||String(value).toLowerCase()==="false")return false;
  return Boolean(value);
}
function normalizeRole(value){
  const role=String(value||"").toUpperCase();
  if(role==="MIDDLE")return"MID";
  if(["BOTTOM","BOT","ADC"].includes(role))return"ADC";
  if(["UTILITY","SUPPORT"].includes(role))return"SUPPORT";
  if(["TOP","JUNGLE","MID"].includes(role))return role;
  return role||"UNKNOWN";
}
function normalizeDuration(raw){
  const direct=optionalNum(raw?.duration,raw?.durationMinutes,raw?.gameDurationMinutes);
  if(direct!==null)return direct>600?direct/60:direct;
  const seconds=optionalNum(raw?.durationSeconds,raw?.gameDuration,raw?.info?.gameDuration);
  return seconds!==null?seconds/60:0;
}
function normalizePlayedAt(raw){
  const value=optionalNum(raw?.playedAt,raw?.gameCreation,raw?.info?.gameCreation,raw?.timestamp);
  if(value===null)return 0;
  return value<1e12?value*1000:value;
}
function normalizeMatch(raw,index){
  const p=raw?.participant||raw?.player||raw?.self||raw||{};
  const kills=num(p.kills,raw?.kills);
  const deaths=num(p.deaths,raw?.deaths);
  const assists=num(p.assists,raw?.assists);
  const duration=normalizeDuration(raw);
  const csDirect=optionalNum(p.cs,raw?.cs);
  const cs=csDirect!==null?csDirect:
    num(p.totalMinionsKilled,raw?.totalMinionsKilled)+num(p.neutralMinionsKilled,raw?.neutralMinionsKilled);
  const vision=optionalNum(p.vision,raw?.vision,p.visionScore,raw?.visionScore);
  const kdaRaw=optionalNum(p.kda,raw?.kda);
  const kda=kdaRaw!==null?kdaRaw:(kills+assists)/Math.max(1,deaths);
  const playedAt=normalizePlayedAt(raw);
  const context=String(raw?.context||raw?.mode||"").toUpperCase();
  const placement=optionalNum(raw?.placement);
  return {
    id:String(raw?.id||raw?.matchId||raw?.metadata?.matchId||"match-"+index),
    win:boolValue(p.win??raw?.win),
    champion:String(p.champion||p.championName||raw?.champion||raw?.championName||"—"),
    position:normalizeRole(p.position||p.teamPosition||raw?.position||raw?.teamPosition),
    queue:String(raw?.queue||raw?.queueName||raw?.gameMode||"—"),
    duration,
    kills,deaths,assists,kda,cs,vision,
    csPerMin:duration>0&&cs>0?cs/duration:null,
    visionPerMin:duration>0&&vision!==null?vision/duration:null,
    playedAt,
    eligible:raw?.eligible!==false && context!=="ARENA" && placement===null
  };
}
function normalizedMatches(){
  return rawMatches.map(normalizeMatch).filter(match=>match.eligible&&match.playedAt&&match.duration>0);
}
function matchesForPeriod(){
  const rows=normalizedMatches().slice().sort((a,b)=>b.playedAt-a.playedAt);
  if(period==="recent")return rows.slice(0,40);
  const days=period==="week"?7:30;
  const cutoff=Date.now()-days*86400000;
  return rows.filter(match=>match.playedAt>=cutoff);
}
function avg(rows,key){
  const values=rows.map(row=>row[key]).filter(value=>value!==null&&value!==undefined&&Number.isFinite(Number(value)));
  return values.length?values.reduce((sum,value)=>sum+Number(value),0)/values.length:null;
}
function groupBy(rows,key){
  const map=new Map();
  rows.forEach(row=>{
    const name=row[key]||"UNKNOWN";
    const entry=map.get(name)||{name,games:0,losses:0,wins:0};
    entry.games++;
    if(row.win)entry.wins++;else entry.losses++;
    map.set(name,entry);
  });
  return Array.from(map.values()).map(row=>({...row,lossRate:row.games?row.losses/row.games:0}))
    .sort((a,b)=>b.losses-a.losses||b.games-a.games||b.lossRate-a.lossRate);
}
function confidence(losses,wins){
  if(losses>=8&&wins>=8)return{level:"high",label:t("sampleHigh")};
  if(losses>=4&&wins>=4)return{level:"medium",label:t("sampleMedium")};
  return{level:"low",label:t("sampleLow")};
}
function roleLabel(role){
  return t("role"+(role||"UNKNOWN"));
}
function formatMinutes(value){
  if(value==null||!Number.isFinite(Number(value)))return"—";
  const minutes=Math.round(Number(value));
  return minutes+" min";
}
function setStatus(type,message){
  $("#status").className="status"+(type?" "+type:"");
  $("#status").textContent=message||"";
}
function setLoading(value){
  $("#loading").hidden=!value;
  $("#lookup-form").querySelector("button[type=submit]").disabled=value;
  if(value)setStatus("",t("loading"));
}

function renderComparison(losses,wins){
  const rows=[
    {key:"deaths",loss:avg(losses,"deaths"),win:avg(wins,"deaths"),format:v=>dec(v,1)},
    {key:"kda",loss:avg(losses,"kda"),win:avg(wins,"kda"),format:v=>dec(v,2)},
    {key:"csMin",loss:avg(losses,"csPerMin"),win:avg(wins,"csPerMin"),format:v=>dec(v,1)},
    {key:"visionMin",loss:avg(losses,"visionPerMin"),win:avg(wins,"visionPerMin"),format:v=>dec(v,2)},
    {key:"duration",loss:avg(losses,"duration"),win:avg(wins,"duration"),format:formatMinutes}
  ];
  $("#comparison-table").innerHTML=
    '<div class="comparison-head"><span>'+esc(t("metric"))+'</span><span>'+esc(t("lossesLabel"))+'</span><span>'+esc(t("winsLabel"))+'</span></div>'+
    rows.map(row=>'<div class="comparison-row"><strong>'+esc(t(row.key))+'</strong><span>'+esc(row.format(row.loss))+'</span><span>'+esc(row.format(row.win))+'</span></div>').join("");
  const conf=confidence(losses.length,wins.length);
  $("#comparison-confidence").className="confidence-badge "+conf.level;
  $("#comparison-confidence").textContent=conf.label;
}
function renderDuration(losses){
  const buckets=[
    {key:"short",count:losses.filter(row=>row.duration<25).length},
    {key:"mid",count:losses.filter(row=>row.duration>=25&&row.duration<=35).length},
    {key:"long",count:losses.filter(row=>row.duration>35).length}
  ];
  const max=Math.max(1,...buckets.map(row=>row.count));
  $("#duration-buckets").innerHTML=buckets.map(row=>{
    const width=Math.round(row.count/max*100);
    const rate=losses.length?Math.round(row.count/losses.length*100):0;
    return '<div class="duration-row"><div><strong>'+esc(t(row.key))+'</strong><span>'+row.count+' · '+rate+'%</span></div><div class="duration-track"><i style="width:'+width+'%"></i></div></div>';
  }).join("");
}
function renderPatterns(target,rows,type){
  const visible=rows.filter(row=>row.games>=2&&row.losses>0).slice(0,6);
  $(target).innerHTML=visible.length?visible.map(row=>{
    const label=type==="role"?roleLabel(row.name):row.name;
    return '<article class="pattern-row"><div><strong>'+esc(label)+'</strong><span>'+row.losses+' '+esc(t("lossesWord"))+' / '+row.games+' '+esc(t("gamesWord"))+'</span></div><b>'+Math.round(row.lossRate*100)+'%</b></article>';
  }).join(""):'<div class="empty-mini">—</div>';
}
function buildSignals(matches,losses,wins){
  const signals=[];
  const lossDeaths=avg(losses,"deaths"),winDeaths=avg(wins,"deaths");
  if(losses.length>=3&&wins.length>=3&&lossDeaths!==null&&winDeaths!==null&&lossDeaths-winDeaths>=1.5){
    signals.push(t("signalDeaths").replace("{delta}",dec(lossDeaths-winDeaths,1)));
  }
  const lossCs=avg(losses,"csPerMin"),winCs=avg(wins,"csPerMin");
  if(losses.length>=3&&wins.length>=3&&lossCs!==null&&winCs!==null&&winCs-lossCs>=0.5){
    signals.push(t("signalCs").replace("{delta}",dec(winCs-lossCs,1)));
  }
  const lossVision=avg(losses,"visionPerMin"),winVision=avg(wins,"visionPerMin");
  if(losses.length>=3&&wins.length>=3&&lossVision!==null&&winVision!==null&&winVision-lossVision>=0.15){
    signals.push(t("signalVision").replace("{delta}",dec(winVision-lossVision,2)));
  }
  const short=losses.filter(row=>row.duration<25).length;
  const long=losses.filter(row=>row.duration>35).length;
  if(losses.length>=4&&short/losses.length>=0.5){
    signals.push(t("signalShort").replace("{rate}",String(Math.round(short/losses.length*100))));
  }
  if(losses.length>=4&&long/losses.length>=0.5){
    signals.push(t("signalLong").replace("{rate}",String(Math.round(long/losses.length*100))));
  }
  const champ=groupBy(matches,"champion").find(row=>row.games>=3&&row.losses>=2&&row.lossRate>=0.65);
  if(champ){
    signals.push(t("signalChampion")
      .replace("{name}",champ.name).replace("{losses}",String(champ.losses))
      .replace("{games}",String(champ.games)).replace("{rate}",String(Math.round(champ.lossRate*100))));
  }
  const role=groupBy(matches,"position").find(row=>row.name!=="UNKNOWN"&&row.games>=3&&row.losses>=2&&row.lossRate>=0.65);
  if(role){
    signals.push(t("signalRole")
      .replace("{name}",roleLabel(role.name)).replace("{losses}",String(role.losses))
      .replace("{games}",String(role.games)).replace("{rate}",String(Math.round(role.lossRate*100))));
  }
  return signals.slice(0,6);
}
function renderSignals(matches,losses,wins){
  const signals=buildSignals(matches,losses,wins);
  const conf=confidence(losses.length,wins.length);
  $("#signal-confidence").className="confidence-badge "+conf.level;
  $("#signal-confidence").textContent=conf.label;
  $("#signals-list").innerHTML=signals.length?signals.map((text,index)=>
    '<article class="signal-card"><b>0'+(index+1)+'</b><div><strong>'+esc(t("observed"))+'</strong><p>'+esc(text)+'</p><small>'+esc(t("noProof"))+'</small></div></article>'
  ).join(""):'<div class="empty-signal">'+esc(t("noSignals"))+'</div>';
}
function renderLosses(losses){
  const rows=losses.slice().sort((a,b)=>b.playedAt-a.playedAt).slice(0,14);
  $("#loss-list").innerHTML=rows.length?rows.map(row=>{
    const date=new Date(row.playedAt).toLocaleDateString(locale(),{day:"2-digit",month:"short"});
    return '<article class="loss-row"><div class="champion-mark">'+esc(row.champion.slice(0,2).toUpperCase())+'</div><div><strong>'+esc(row.champion)+'</strong><span>'+esc(roleLabel(row.position))+' · '+esc(row.queue)+' · '+esc(date)+'</span></div><div class="loss-stats"><b>'+row.kills+'/'+row.deaths+'/'+row.assists+'</b><span>'+dec(row.kda,2)+' KDA · '+formatMinutes(row.duration)+'</span></div></article>';
  }).join(""):'<div class="empty-signal">'+esc(t("noLosses"))+'</div>';
}
function render(){
  const matches=matchesForPeriod();
  const losses=matches.filter(row=>!row.win);
  const wins=matches.filter(row=>row.win);

  $("#result").hidden=false;
  $("#player-name").textContent=currentPlayer?currentPlayer.gameName+"#"+currentPlayer.tagLine:"—";
  $("#sample-note").textContent=copy[lang].sample(matches.length,losses.length,wins.length);
  $("#metric-games").textContent=String(matches.length);
  $("#metric-losses").textContent=String(losses.length);
  $("#metric-loss-rate").textContent=matches.length?Math.round(losses.length/matches.length*100)+"% · "+t("lossRate"):"—";
  $("#metric-deaths").textContent=dec(avg(losses,"deaths"),1);
  $("#metric-kda").textContent=dec(avg(losses,"kda"),2);
  document.querySelectorAll("[data-period]").forEach(button=>button.classList.toggle("active",button.dataset.period===period));

  renderComparison(losses,wins);
  renderDuration(losses);
  renderPatterns("#champion-patterns",groupBy(matches,"champion"),"champion");
  renderPatterns("#role-patterns",groupBy(matches,"position"),"role");
  renderSignals(matches,losses,wins);
  renderLosses(losses);
}
function applyLanguage(){
  document.documentElement.lang=lang==="pt"?"pt-BR":"en";
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const value=t(el.dataset.i18n);
    if(typeof value!=="string")return;
    if(value.includes("<span>"))el.innerHTML=value;else el.textContent=value;
  });
  $("#language-toggle").textContent=lang==="pt"?"EN":"PT-BR";
  localStorage.setItem(LANGUAGE_KEY,lang);
  if(currentPlayer)render();
}
function updateUrl(gameName,tagLine,platform){
  const url=new URL(location.href);
  url.searchParams.set("riot",gameName+"#"+tagLine);
  url.searchParams.set("server",platform);
  url.searchParams.set("period",period);
  url.searchParams.set("lang",lang==="en"?"en":"pt");
  history.replaceState(null,"",url.pathname+"?"+url.searchParams.toString());
}
async function lookup(gameName,tagLine,platform){
  const endpoint=window.LOL_LOSS_EXPLORER_BACKEND?.profile;
  if(!endpoint){setStatus("error",t("error"));return;}
  setLoading(true);$("#result").hidden=true;
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),API_TIMEOUT_MS);
  try{
    const response=await fetch(endpoint,{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({gameName,tagLine,platform,region:routingFor(platform),limit:40}),
      signal:controller.signal
    });
    const data=await response.json().catch(()=>({}));
    if(!response.ok||data.error){
      if(response.status===404||data.error==="player"||String(data.error).includes("not_found"))throw{kind:"notFound"};
      if(response.status===429||String(data.error).includes("rate"))throw{kind:"rate"};
      throw{kind:"error"};
    }
    currentPlayer=data.player||{gameName,tagLine};
    rawMatches=Array.isArray(data.matches)?data.matches.filter(match=>match&&match.eligible!==false):[];
    updateUrl(currentPlayer.gameName||gameName,currentPlayer.tagLine||tagLine,platform);
    setStatus("success",data.cacheMeta?.stale?t("stale"):t("live"));
    render();
    $("#result").scrollIntoView({behavior:"smooth",block:"start"});
  }catch(error){
    setStatus("error",t(error?.kind||"error"));
  }finally{
    clearTimeout(timer);setLoading(false);
  }
}

$("#lookup-form").addEventListener("submit",event=>{
  event.preventDefault();
  const parsed=parseRiotId($("#riot-id").value);
  if(!parsed){setStatus("error",t("invalid"));$("#riot-id").focus();return;}
  lookup(parsed.gameName,parsed.tagLine,$("#server").value);
});
$("#language-toggle").addEventListener("click",()=>{
  lang=lang==="pt"?"en":"pt";applyLanguage();
  const url=new URL(location.href);url.searchParams.set("lang",lang==="en"?"en":"pt");history.replaceState(null,"",url.pathname+"?"+url.searchParams.toString());
});
document.querySelectorAll("[data-period]").forEach(button=>button.addEventListener("click",()=>{
  period=button.dataset.period;
  if(currentPlayer)updateUrl(currentPlayer.gameName,currentPlayer.tagLine,$("#server").value);
  if(currentPlayer)render();
}));

(function boot(){
  const params=new URLSearchParams(location.search);
  const requested=String(params.get("lang")||"").toLowerCase();
  if(requested==="en")lang="en";
  if(requested==="pt"||requested==="pt-br")lang="pt";
  const requestedPeriod=params.get("period");
  if(VALID_PERIODS.has(requestedPeriod))period=requestedPeriod;
  applyLanguage();
  const parsed=parseRiotId(params.get("riot"));
  const server=String(params.get("server")||"br1").toLowerCase();
  if(parsed){
    $("#riot-id").value=parsed.gameName+"#"+parsed.tagLine;
    if(Array.from($("#server").options).some(option=>option.value===server))$("#server").value=server;
    lookup(parsed.gameName,parsed.tagLine,server);
  }
})();
