!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},r=e.parcelRequire8df6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in t){var r=t[e];delete t[e];var i={id:e,exports:{}};return n[e]=i,r.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){t[e]=n},e.parcelRequire8df6=r);var i=r("4qBpi"),o=document.querySelector(".characters-filter__list"),a=document.querySelector(".characters-filter__form"),c=document.querySelector(".btn-load-more"),d=document.querySelector(".loading"),l=12,u=1;function f(e,n){return'\n        <li class="characters-filter__list-item">\n            <img src='.concat(e.path+"."+e.extension," alt=").concat(n,">\n            <p>").concat(n,"</p>\n        </li>\n    ")}a.addEventListener("submit",(function(e){e.preventDefault()})),c.addEventListener("click",(function(){return d.hidden=!1,l=8,u+=1,(0,i.getCharacters)(l,u).then((function(e){var n=e.data.results.map((function(e){return f(e.thumbnail,e.name)})).join("");return d.hidden=!0,o.insertAdjacentHTML("beforeend",n),u})),u})),(0,i.getCharacters)(l,u).then((function(e){var n=e.data.results.map((function(e){return f(e.thumbnail,e.name)})).join("");d.hidden=!0,o.insertAdjacentHTML("beforeend",n)}))}();
//# sourceMappingURL=characters.2bea334c.js.map
