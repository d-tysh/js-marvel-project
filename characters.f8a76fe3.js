async function e(e,t){const n=await fetch(`https://gateway.marvel.com:443/v1/public/characters?limit=${e}&offset=${t}&apikey=a85ca2e1a3f06b7ee3183f960e5fdc88`);if(!n.ok)throw new Error(n.status);return n.json()}const t=document.querySelector(".characters-filter__list"),n=document.querySelector(".characters-filter__form"),r=document.querySelector(".btn-load-more"),a=document.querySelector(".loading");let c=12,i=1;function o(e,t){return`\n        <li class="characters-filter__list-item">\n            <img src=${e.path+"."+e.extension} alt=${t}>\n            <p>${t}</p>\n        </li>\n    `}n.addEventListener("submit",(function(e){e.preventDefault()})),r.addEventListener("click",(function(){return a.hidden=!1,c=8,i+=1,e(c,i).then((e=>{const n=e.data.results.map((({thumbnail:e,name:t})=>o(e,t))).join("");return a.hidden=!0,t.insertAdjacentHTML("beforeend",n),i})),i})),e(c,i).then((e=>{const n=e.data.results.map((({thumbnail:e,name:t})=>o(e,t))).join("");a.hidden=!0,t.insertAdjacentHTML("beforeend",n)}));
//# sourceMappingURL=characters.f8a76fe3.js.map
