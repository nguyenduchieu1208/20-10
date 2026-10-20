(function(){
"use strict";
var flowers=window.__flowerData;
var colors=window.__flowerColors;
var safeFlowerSvg=window.__safeFlowerSvg;
var flowerHead=window.__flowerHead;
var flowerFlying=window.__flowerFlying;
if(!flowers||!safeFlowerSvg||!flowerHead||!flowerFlying)return;

var garden=document.createElement("main");
garden.className="garden";
garden.id="garden";
garden.dataset.tone="pink";
garden.innerHTML=
'<header class="garden-header">'+
  '<div class="garden-brand"><span class="garden-mark" aria-hidden="true">20</span><span class="garden-brand-copy"><strong>20 / 10</strong><small>Một ngày dành tặng nàng</small></span></div>'+
  '<div class="garden-title"><span>20 tháng 10</span><h1>Khu vườn của <em>nàng</em></h1></div>'+
  '<div class="garden-date">20 loài hoa · 20 lời chúc</div>'+
'</header>'+
'<div class="garden-instruction"><span class="instruction-flower" aria-hidden="true">✳</span><p>Chạm vào một đóa hoa<small>Hoa sẽ nở và gửi nàng một lời chúc</small></p><span class="instruction-flower" aria-hidden="true">✳</span></div>'+
'<div class="flower-field" role="group" aria-label="Chọn một trong hai mươi loài hoa"></div>'+
  '<footer class="garden-footer"><span><strong>20 đóa hoa</strong> · chạm nhẹ để hoa nở</span><button type="button" class="garden-bloom">Nở hoa ✿</button></footer>'+
'<section class="wish-overlay" role="dialog" aria-modal="true" aria-labelledby="wish-flower-name" aria-hidden="true" tabindex="-1">'+
'<div class="creature-sky" aria-hidden="true"></div><div class="petal-back" aria-hidden="true"></div><div class="hero-sky" aria-hidden="true"></div>'+
  '<div class="wish-card">'+
    '<button class="wish-close" type="button" aria-label="Đóng lời chúc">×</button>'+
    '<div class="wish-visual"><div class="modal-flower"></div></div>'+
    '<div class="wish-copy">'+
      '<p class="wish-kicker">20 tháng 10 · một đóa hoa dành tặng nàng</p>'+
      '<h2 class="wish-flower-name" id="wish-flower-name"></h2>'+
      '<p class="wish-meaning"></p><div class="wish-divider" aria-hidden="true"></div>'+
      '<p class="wish-text" aria-live="polite"></p><p class="wish-count">Lời chúc riêng dành tặng nàng</p>'+
      '<div class="wish-controls"><button class="wish-next" type="button">Nở hoa <span aria-hidden="true">✿</span></button></div>'+
      '<div class="rose-choice" hidden role="group" aria-label="Chọn sắc hồng"><span>Sắc hoa:</span><button class="rose-tone" type="button" data-tone="red" aria-label="Hồng đỏ" aria-pressed="false"></button><button class="rose-tone" type="button" data-tone="pink" aria-label="Hồng phấn" aria-pressed="true"></button><button class="rose-tone" type="button" data-tone="white" aria-label="Hồng trắng" aria-pressed="false"></button><small class="rose-caption" aria-live="polite">Hồng phấn · dịu dàng</small></div>'+
    '</div>'+
  '</div>'+
'</section>';

document.body.appendChild(garden);
var field=garden.querySelector(".flower-field");
var modal=garden.querySelector(".wish-overlay");
var petalBack=garden.querySelector(".petal-back");
var creatureSky=garden.querySelector(".creature-sky");
var heroSky=garden.querySelector(".hero-sky");
var modalFlower=garden.querySelector(".modal-flower");
var wishCard=garden.querySelector(".wish-card");
var activeFlower=null;
var returnFocus=null;

field.innerHTML=flowers.map(function(f,i){
  var svg=bouquetSvg(f);
  return '<button class="flower-tile" type="button" data-type="'+f[0]+'" style="--i:'+i+'" aria-label="Chọn '+f[1]+'. '+f[2]+'">'+
    '<span class="flower-art">'+svg+'</span>'+
    '<span class="flower-label"><strong>'+f[1]+'</strong><small>'+f[2].split(" · ")[0]+'</small></span>'+
  '</button>';
}).join("");

function flowerFor(type){return flowers.find(function(f){return f[0]===type})}

function bouquetSvg(f){
  var heads=flowerHead(f[0]);
  return '<svg class="flower-svg bouquet-svg" viewBox="0 0 300 315" aria-hidden="true" focusable="false">'+
    '<ellipse class="ground" cx="150" cy="296" rx="69" ry="8"/>'+
    '<g class="bouquet-stems" fill="none" stroke="#73866f" stroke-width="3.5" stroke-linecap="round"><path style="--stem-delay:0ms" d="M150 117C147 174 148 226 150 269"/><path style="--stem-delay:100ms" d="M103 143C115 190 135 230 150 269"/><path style="--stem-delay:170ms" d="M198 139C185 188 165 230 150 269"/></g>'+ 
    '<g class="bouquet-leaves"><path class="leaf" d="M130 205C98 177 74 185 81 207c17 17 34 16 49-2Z"/><path class="vein" d="M84 199c17-3 31 0 45 7"/><path class="leaf" d="M169 222c24-30 48-30 56-11-12 21-34 25-56 11Z"/><path class="vein" d="M174 220c15-9 30-12 46-10"/><path class="leaf" d="M139 175c-28-22-47-15-46 4 14 13 31 12 46-4Z"/><path class="leaf" d="M162 186c20-23 40-21 46-4-10 17-27 19-46 4Z"/></g>'+
    '<path class="bouquet-wrap" d="M63 174Q150 206 237 174L198 286Q150 305 102 286Z" fill="#f8eee2" stroke="#cbb8a3" stroke-width="1.6"/>'+ 
    '<path d="M64 175Q103 192 124 194L147 301Q124 294 102 286Z" fill="#efe1d2" opacity=".78"/><path d="M236 175Q200 192 177 194L153 301Q176 294 198 286Z" fill="#fff9f1" opacity=".85"/><path d="M63 174Q150 207 237 174" fill="none" stroke="#d1bcaa" stroke-width="2"/>'+
    '<g transform="translate(150 98) scale(.7)"><g class="head" style="--flower-delay:0ms">'+heads+'</g></g>'+
    '<g transform="translate(102 122) scale(.48)"><g class="head" style="--flower-delay:110ms">'+heads+'</g></g>'+
    '<g transform="translate(198 120) scale(.5)"><g class="head" style="--flower-delay:190ms">'+heads+'</g></g>'+
    '<path d="M150 258c-21-19-38-11-27 1 6 6 18 7 27 9-10 14-1 20 5 9 4-8 2-12-1-15 20 1 32-7 22-12-8-4-18 3-26 8Z" fill="#b87870" stroke="#9d625f" stroke-width="1"/><path d="M149 267C140 278 135 283 127 288M153 267c8 9 14 15 21 20" fill="none" stroke="#ae716a" stroke-width="2" stroke-linecap="round"/>'+
    flowerFlying(f[0])+
  '</svg>';
}

function flowerShape(type){
  if(["hydrangea","babysbreath","forget"].indexOf(type)>=0)return "shape-cluster";
  if(["sunflower","gerbera","daisy","aster"].indexOf(type)>=0)return "shape-ray";
  if(["rose","peony","dahlia","carnation"].indexOf(type)>=0)return "shape-ruffle";
  if(["tulip","lotus"].indexOf(type)>=0)return "shape-tulip";
  if(type==="orchid")return "shape-orchid";
  if(type==="lavender")return "shape-lavender";
  if(type==="calla")return "shape-calla";
  return "shape-round";
}

function addBurstPetal(container,kind,color,originX,originY,burstX,burstY,fallX,fallY,delay,size){
  var flight=document.createElement("span");
  var petal=document.createElement("i");
  flight.className="petal-flight";
  flight.style.left=originX+"px";
  flight.style.top=originY+"px";
  flight.style.setProperty("--burst-x",burstX.toFixed(1)+"px");
  flight.style.setProperty("--burst-y",burstY.toFixed(1)+"px");
  flight.style.setProperty("--mid-x",(burstX+fallX*.22).toFixed(1)+"px");
  flight.style.setProperty("--mid-y",(burstY+fallY*.22).toFixed(1)+"px");
  flight.style.setProperty("--dx",(burstX+fallX).toFixed(1)+"px");
  flight.style.setProperty("--dy",(burstY+fallY).toFixed(1)+"px");
  flight.style.setProperty("--delay",delay+"s");
  var spin=Math.random()*180-90;
  flight.style.setProperty("--spin",spin.toFixed(1)+"deg");
  flight.style.setProperty("--mid-spin",(spin*1.4).toFixed(1)+"deg");
  flight.style.setProperty("--end-spin",(spin*2.2).toFixed(1)+"deg");
  petal.className="flight-petal "+kind;
  petal.style.setProperty("--petal-color",color);
  petal.style.setProperty("--size",size+"px");
  petal.style.left=(-size/2)+"px";
  petal.style.top=(-size/2)+"px";
  flight.appendChild(petal);
  container.appendChild(flight);
}

function addFireworkGlow(container,x,y,color,delay){
  var glow=document.createElement("span");
  glow.className="firework-glow";
  glow.style.left=x+"px";
  glow.style.top=y+"px";
  glow.style.setProperty("--flash-color",color);
  glow.style.setProperty("--delay",delay+"s");
  container.appendChild(glow);
}

function addFireworkRocket(container,x,startY,travel,color,duration,delay){
  var rocket=document.createElement("span");
  rocket.className="firework-rocket";
  rocket.style.left=x+"px";
  rocket.style.top=startY+"px";
  rocket.style.setProperty("--flash-color",color);
  rocket.style.setProperty("--launch-dy",(-travel).toFixed(1)+"px");
  rocket.style.setProperty("--launch-duration",duration+"s");
  rocket.style.setProperty("--delay",delay+"s");
  container.appendChild(rocket);
}

function throwPetals(type){
  petalBack.replaceChildren();
  sendCreatures(type);
  var tone=garden.dataset.tone;
  var palette=colors[type].slice();
  if(type==="rose"&&tone==="red")palette=["#bd4050","#d65d6a","#ed9293","#e8a36e"];
  if(type==="rose"&&tone==="white")palette=["#f3ece0","#fff9ef","#fffdf7","#e8c7a8"];
  var kind=flowerShape(type);
  var cardRect=wishCard.getBoundingClientRect();
  var overlayRect=modal.getBoundingClientRect();
  var mobile=window.matchMedia("(max-width: 600px)").matches;
  var cardLeft=cardRect.left-overlayRect.left;
  var cardTop=cardRect.top-overlayRect.top;
  var cardWidth=cardRect.width;
  var cardBottom=cardRect.bottom-overlayRect.top;
  var candidates=mobile?[
    [.08,.06],[.5,.055],[.92,.06],
    [.045,.18],[.955,.18],[.045,.82],[.955,.82],
    [.08,.94],[.5,.945],[.92,.94]
  ]:[
    [.06,.1],[.22,.085],[.5,.07],[.78,.085],[.94,.1],
    [.035,.3],[.965,.3],[.035,.5],[.965,.5],[.035,.7],[.965,.7],
    [.06,.9],[.22,.92],[.5,.94],[.78,.92],[.94,.9]
  ];
  var bursts=candidates.map(function(point){return [point[0]*overlayRect.width,point[1]*overlayRect.height]}).filter(function(point){
    var outsideHorizontally=point[0]<cardLeft-28||point[0]>cardLeft+cardWidth+28;
    var outsideVertically=point[1]<cardTop-28||point[1]>cardBottom+28;
    return outsideHorizontally||outsideVertically;
  }).slice(0,mobile?8:16);
  var petalsPerBurst=mobile?11:14;
  var launchRise=mobile?108:150;
  var launchDuration=mobile ? .68 : .78;
  bursts.forEach(function(point,burstIndex){
    var burstDelay=burstIndex*(mobile ? .28 : .16);
    var startY=Math.min(overlayRect.height-24,point[1]+launchRise);
    var travel=Math.max(0,startY-point[1]);
    addFireworkRocket(petalBack,point[0],startY,travel,palette[(burstIndex*2)%palette.length],launchDuration,burstDelay);
    var explosionDelay=burstDelay+launchDuration;
    addFireworkGlow(petalBack,point[0],point[1],palette[(burstIndex*2)%palette.length],explosionDelay);
    for(var j=0;j<petalsPerBurst;j++){
      var angle=(Math.PI*2/petalsPerBurst)*j+(Math.random()-.5)*.16;
      var radius=(mobile?54:70)+Math.random()*(mobile?46:86);
      var burstX=Math.cos(angle)*radius;
      var burstY=Math.sin(angle)*radius;
      var fallX=(Math.random()-.5)*(mobile?130:190);
      var fallY=(mobile?135:175)+Math.random()*(mobile?105:140);
      var delay=explosionDelay+Math.random()*(mobile ? .1 : .14);
      var size=(mobile?10:11)+Math.random()*(mobile?6:9);
      addBurstPetal(petalBack,kind,palette[(burstIndex*3+j)%palette.length],point[0],point[1],burstX,burstY,fallX,fallY,delay,size);
    }
  });
}



function butterflySvg(index,type){
  var palette=(colors[type]||["#ee9eaa","#ffd4a3"]);
  if(type==="rose"&&garden.dataset.tone==="red")palette=["#bd4050","#d65d6a","#ed9293","#e8a36e"];
  if(type==="rose"&&garden.dataset.tone==="white")palette=["#f3ece0","#fff9ef","#fffdf7","#e8c7a8"];
  var c=[palette[index%palette.length],palette[(index+1)%palette.length]];
  var gradientId="wing-"+type+"-"+index;
  return '<svg viewBox="0 0 80 60" focusable="false" aria-hidden="true">'+
    '<defs><linearGradient id="'+gradientId+'" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+c[0]+'"/><stop offset="1" stop-color="'+c[1]+'"/></linearGradient></defs>'+
    '<g class="butterfly-wing wing-left"><path d="M39 31C31 8 12 4 8 17 4 29 16 36 36 36 30 30 22 23 19 19 25 15 33 21 39 31Z" fill="url(#'+gradientId+')" stroke="#fff8ee" stroke-opacity=".9" stroke-width="1.2"/><path d="M39 34C27 29 16 34 18 44c2 10 16 9 22 0-3-3-4-7-1-10Z" fill="url(#'+gradientId+')" stroke="#fff8ee" stroke-opacity=".84" stroke-width="1.1"/><circle cx="17" cy="18" r="2.5" fill="#fff8e8" fill-opacity=".88"/><circle cx="24" cy="44" r="1.7" fill="#fff8e8" fill-opacity=".78"/></g>'+
    '<g class="butterfly-wing wing-right"><path d="M41 31C49 8 68 4 72 17 76 29 64 36 44 36 50 30 58 23 61 19 55 15 47 21 41 31Z" fill="url(#'+gradientId+')" stroke="#fff8ee" stroke-opacity=".9" stroke-width="1.2"/><path d="M41 34C53 29 64 34 62 44c-2 10-16 9-22 0 3-3 4-7 1-10Z" fill="url(#'+gradientId+')" stroke="#fff8ee" stroke-opacity=".84" stroke-width="1.1"/><circle cx="63" cy="18" r="2.5" fill="#fff8e8" fill-opacity=".88"/><circle cx="56" cy="44" r="1.7" fill="#fff8e8" fill-opacity=".78"/></g>'+
    '<path d="M40 27c-3 7-3 13 0 19" fill="none" stroke="'+c[0]+'" stroke-width="2.6" stroke-linecap="round"/><path d="M39 28q-8-9-8-12m10 12q8-9 8-12" fill="none" stroke="'+c[0]+'" stroke-width="1.4" stroke-linecap="round"/>'+
  '</svg>';
}

function sendCreatures(type){
  if(!creatureSky)return;
  creatureSky.replaceChildren();
  if(heroSky)heroSky.replaceChildren();
  var mobile=window.matchMedia("(max-width: 600px)").matches;
  var cardRect=wishCard.getBoundingClientRect();
  var overlayRect=modal.getBoundingClientRect();
  var centerX=cardRect.left-overlayRect.left+cardRect.width*.5;
  var centerY=cardRect.top-overlayRect.top+cardRect.height*.5;
  var nearHalfWidth=cardRect.width*.5+(mobile?34:54);
  var nearHalfHeight=cardRect.height*.5+(mobile?32:50);
  var count=mobile?16:30;
  for(var i=0;i<count;i++){
    var creature=document.createElement("span");
    var angle=Math.random()*Math.PI*2;
    var dirX=Math.cos(angle);
    var dirY=Math.sin(angle);
    var margin=mobile?96:180;
    var toX=dirX>0?(overlayRect.width+margin-centerX)/dirX:(-margin-centerX)/dirX;
    var toY=dirY>0?(overlayRect.height+margin-centerY)/dirY:(-margin-centerY)/dirY;
    var distance=Math.min(Math.abs(toX),Math.abs(toY));
    var endX=dirX*distance;
    var endY=dirY*distance;
    var nearDistance=Math.min(nearHalfWidth/Math.max(.01,Math.abs(dirX)),nearHalfHeight/Math.max(.01,Math.abs(dirY)));
    var nearX=dirX*nearDistance;
    var nearY=dirY*nearDistance;
    var scale=mobile?1.05:1.2;
    creature.className="sky-creature sky-butterfly";
    creature.style.left=centerX+"px";
    creature.style.top=centerY+"px";
    creature.style.setProperty("--sky-duration",(mobile?3.8:4.4)+"s");
    creature.style.setProperty("--sky-delay",((mobile?1:.98)+Math.floor(i/(mobile?4:6))*.12+Math.random()*.25)+"s");
    creature.style.setProperty("--sky-scale",(scale+Math.random()*.3).toFixed(2));
    creature.style.setProperty("--near-x",nearX.toFixed(1)+"px");
    creature.style.setProperty("--near-y",nearY.toFixed(1)+"px");
    creature.style.setProperty("--hover-x",(nearX+(Math.random()-.5)*30).toFixed(1)+"px");
    creature.style.setProperty("--hover-y",(nearY+(Math.random()-.5)*30).toFixed(1)+"px");
    var curveX=(Math.random()-.5)*(mobile?150:240);
    var curveY=(Math.random()-.5)*(mobile?150:240);
    creature.style.setProperty("--mid-x",(endX*.5+curveX).toFixed(1)+"px");
    creature.style.setProperty("--mid-y",(endY*.5+curveY).toFixed(1)+"px");
    creature.style.setProperty("--far-x",(endX*.91+curveX*.55).toFixed(1)+"px");
    creature.style.setProperty("--far-y",(endY*.91+curveY*.55).toFixed(1)+"px");
    creature.style.setProperty("--dx",endX.toFixed(1)+"px");
    creature.style.setProperty("--dy",endY.toFixed(1)+"px");
    var depth=Math.random()*130-30;
    creature.style.setProperty("--near-z",(depth*.12).toFixed(1)+"px");
    creature.style.setProperty("--hover-z",(depth*.3).toFixed(1)+"px");
    creature.style.setProperty("--mid-z",(depth*.58).toFixed(1)+"px");
    creature.style.setProperty("--far-z",depth.toFixed(1)+"px");
    creature.style.setProperty("--end-z",(depth+70).toFixed(1)+"px");
    creature.style.setProperty("--sky-yaw",(dirX*27+(Math.random()-.5)*20).toFixed(1)+"deg");
    creature.style.setProperty("--sky-pitch",(dirY*21+(Math.random()-.5)*16).toFixed(1)+"deg");
    creature.style.setProperty("--sky-spin",(Math.random()*52-26).toFixed(1)+"deg");
    creature.innerHTML=butterflySvg(i,type);
    creature.addEventListener("animationend",function(event){
      if(event.target===creature&&event.animationName==="butterfly-escape")creature.remove();
    });
    creatureSky.appendChild(creature);
  }
  addHeroButterfly(type,overlayRect,mobile);
}

function addHeroButterfly(type,overlayRect,mobile){
  if(!heroSky)return;
  var fromLeft=Math.random()<.5;
  var direction=fromLeft?1:-1;
  var travel=direction*(overlayRect.width+280);
  var startY=overlayRect.height*(.28+Math.random()*.34);
  var driftY=(Math.random()-.5)*overlayRect.height*.24;
  var hero=document.createElement("span");
  hero.className="sky-creature sky-butterfly sky-hero";
  hero.style.left=(fromLeft?-120:overlayRect.width+120)+"px";
  hero.style.top=startY+"px";
  hero.style.setProperty("--hero-duration",(mobile?4.8:5.5)+"s");
  hero.style.setProperty("--sky-delay",(mobile?1.65:1.9)+"s");
  hero.style.setProperty("--hero-mid-x",(travel*.46).toFixed(1)+"px");
  hero.style.setProperty("--hero-mid-y",(driftY*.45).toFixed(1)+"px");
  hero.style.setProperty("--hero-late-x",(travel*.79).toFixed(1)+"px");
  hero.style.setProperty("--hero-late-y",(driftY*.82).toFixed(1)+"px");
  hero.style.setProperty("--hero-travel",travel.toFixed(1)+"px");
  hero.style.setProperty("--hero-drift",driftY.toFixed(1)+"px");
  hero.style.setProperty("--hero-yaw-start",fromLeft?"-58deg":"58deg");
  hero.style.setProperty("--hero-yaw-end",fromLeft?"42deg":"-42deg");
  hero.innerHTML=butterflySvg(99,type);
  hero.addEventListener("animationend",function(event){
    if(event.target===hero&&event.animationName==="butterfly-hero-glide")hero.remove();
  });
  heroSky.appendChild(hero);
}
function displayWish(index,burst){
  var f=activeFlower;
  if(!f)return;
  modal.querySelector(".wish-text").textContent=f[4][0];
  if(burst)throwPetals(f[0]);
}

function openBloom(tile){
  var f=flowerFor(tile.dataset.type);
  if(!f)return;
  activeFlower=f;
  returnFocus=tile;
  garden.dataset.type=f[0];
  modal.querySelector(".wish-flower-name").textContent=f[1];
  modal.querySelector(".wish-meaning").textContent=f[2];
  modalFlower.innerHTML=bouquetSvg(f);
  modalFlower.classList.remove("blooming");
  void modalFlower.offsetWidth;
  modalFlower.classList.add("blooming");
  garden.querySelector(".rose-choice").hidden=f[0]!=="rose";
  garden.querySelectorAll(".rose-tone").forEach(function(button){button.setAttribute("aria-pressed",String(button.dataset.tone===garden.dataset.tone))});
  garden.querySelector(".rose-caption").textContent=garden.dataset.tone==="red"?"Hồng đỏ · nồng nàn":garden.dataset.tone==="white"?"Hồng trắng · tinh khôi":"Hồng phấn · dịu dàng";
  modal.classList.remove("show");
  void modal.offsetWidth;
  modal.classList.add("show");
  garden.classList.add("modal-open");
  modal.setAttribute("aria-hidden","false");
  field.querySelectorAll(".flower-tile").forEach(function(button){button.classList.toggle("is-picked",button===tile)});
  displayWish(0,true);
  garden.querySelector(".wish-close").focus();
}

function openAnotherBloom(){
  var current=activeFlower&&activeFlower[0];
  var choices=flowers.filter(function(f){return f[0]!==current});
  var next=choices[Math.floor(Math.random()*choices.length)];
  var tile=field.querySelector('[data-type="'+next[0]+'"]');
  if(tile)openBloom(tile);
}

function replayBloom(){
  if(!activeFlower)return;
  modalFlower.classList.remove("blooming");
  void modalFlower.offsetWidth;
  modalFlower.classList.add("blooming");
  throwPetals(activeFlower[0]);
}

function closeBloom(){
  if(!modal.classList.contains("show"))return;
  modal.classList.remove("show");
  garden.classList.remove("modal-open");
  modal.setAttribute("aria-hidden","true");
  garden.removeAttribute("data-type");
  petalStorm.replaceChildren();
  petalBack.replaceChildren();
  creatureSky.replaceChildren();
  field.querySelectorAll(".flower-tile").forEach(function(button){button.classList.remove("is-picked")});
  if(returnFocus)returnFocus.focus();
}

field.addEventListener("click",function(event){
  var tile=event.target.closest(".flower-tile");
  if(tile)openBloom(tile);
});
garden.querySelector(".wish-close").addEventListener("click",closeBloom);
modal.addEventListener("click",function(event){if(event.target===modal)closeBloom()});
garden.querySelectorAll(".rose-tone").forEach(function(button){
  button.addEventListener("click",function(){
    garden.dataset.tone=button.dataset.tone;
    garden.querySelectorAll(".rose-tone").forEach(function(item){item.setAttribute("aria-pressed",String(item===button))});
    garden.querySelector(".rose-caption").textContent=button.dataset.tone==="red"?"Hồng đỏ · nồng nàn":button.dataset.tone==="white"?"Hồng trắng · tinh khôi":"Hồng phấn · dịu dàng";
    if(activeFlower&&activeFlower[0]==="rose")throwPetals("rose");
  });
});

garden.querySelector(".garden-bloom").addEventListener("click",openAnotherBloom);
garden.querySelector(".wish-next").addEventListener("click",replayBloom);
document.addEventListener("keydown",function(event){
  if(event.key==="Escape")closeBloom();
  if(event.key==="Tab"&&modal.classList.contains("show")){
    var controls=Array.prototype.filter.call(modal.querySelectorAll("button"),function(button){return !button.closest("[hidden]")});
    var first=controls[0],last=controls[controls.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  }
});
})();

