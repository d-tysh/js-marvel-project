!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},r=e.parcelRequire8df6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in t){var r=t[e];delete t[e];var o={id:e,exports:{}};return n[e]=o,r.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){t[e]=n},e.parcelRequire8df6=r);var o={};o=function e(n,t,r){function o(c,a){if(!t[c]){if(!n[c]){var s=void 0;if(!a&&s)return s(c,!0);if(i)return i(c,!0);var l=new Error("Cannot find module '"+c+"'");throw l.code="MODULE_NOT_FOUND",l}var u=t[c]={exports:{}};n[c][0].call(u.exports,(function(e){return o(n[c][1][e]||e)}),u,u.exports,e,n,t,r)}return t[c].exports}for(var i=void 0,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.create=t.visible=void 0;var r=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],t=document.createElement("div");return t.innerHTML=e.trim(),!0===n?t.children:t.firstChild},o=function(e,n){var t=e.children;return 1===t.length&&t[0].tagName===n},i=function(e){return null!=(e=e||document.querySelector(".basicLightbox"))&&!0===e.ownerDocument.body.contains(e)};t.visible=i,t.create=function(e,n){var t=function(e,n){var t=r('\n\t\t<div class="basicLightbox '.concat(n.className,'">\n\t\t\t<div class="basicLightbox__placeholder" role="dialog"></div>\n\t\t</div>\n\t')),i=t.querySelector(".basicLightbox__placeholder");e.forEach((function(e){return i.appendChild(e)}));var c=o(i,"IMG"),a=o(i,"VIDEO"),s=o(i,"IFRAME");return!0===c&&t.classList.add("basicLightbox--img"),!0===a&&t.classList.add("basicLightbox--video"),!0===s&&t.classList.add("basicLightbox--iframe"),t}(e=function(e){var n="string"==typeof e,t=e instanceof HTMLElement==1;if(!1===n&&!1===t)throw new Error("Content must be a DOM element/node or string");return!0===n?Array.from(r(e,!0)):"TEMPLATE"===e.tagName?[e.content.cloneNode(!0)]:Array.from(e.children)}(e),n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(null==(e=Object.assign({},e)).closable&&(e.closable=!0),null==e.className&&(e.className=""),null==e.onShow&&(e.onShow=function(){}),null==e.onClose&&(e.onClose=function(){}),"boolean"!=typeof e.closable)throw new Error("Property `closable` must be a boolean");if("string"!=typeof e.className)throw new Error("Property `className` must be a string");if("function"!=typeof e.onShow)throw new Error("Property `onShow` must be a function");if("function"!=typeof e.onClose)throw new Error("Property `onClose` must be a function");return e}(n)),c=function(e){return!1!==n.onClose(a)&&function(e,n){return e.classList.remove("basicLightbox--visible"),setTimeout((function(){return!1===i(e)||e.parentElement.removeChild(e),n()}),410),!0}(t,(function(){if("function"==typeof e)return e(a)}))};!0===n.closable&&t.addEventListener("click",(function(e){e.target===t&&c()}));var a={element:function(){return t},visible:function(){return i(t)},show:function(e){return!1!==n.onShow(a)&&function(e,n){return document.body.appendChild(e),setTimeout((function(){requestAnimationFrame((function(){return e.classList.add("basicLightbox--visible"),n()}))}),10),!0}(t,(function(){if("function"==typeof e)return e(a)}))},close:c};return a}},{}]},{},[1])(1);var i=r("4qBpi"),c=document.querySelector(".characters-filter__list"),a=document.querySelector(".characters-filter__form"),s=document.querySelector(".btn-load-more"),l=document.querySelector(".loading"),u=document.querySelector(".characters-filter__input-name"),f=document.querySelector(".characters-filter__select");s.style.display="none";var d=20,h=0;function m(e){if(e.target.closest(".characters-filter__list-item")){var n=e.target.closest(".characters-filter__list-item").dataset.id;(0,i.getCharacterById)(n).then((function(e){console.log(e.data.results[0]);var n=e.data.results[0],t=n.thumbnail,r=n.name,i=n.description,c=n.comics,a=o.create("\n            <div class='char-info'>\n                    <button class='char-info__btn-close'>X</button>\n                    <img class='char-info__img' src=".concat(t.path+"."+t.extension," alt=").concat(r,">\n                    <div class='char-info__information'>\n                        <p class='char-info__name'>").concat(r,"</p>\n                        <p class='char-info__description'>").concat(i||"No description for this character.","</p>\n                        <p class='char-info__comics-title'>List of Comics</p>\n                        <ul class='char-info__comics-list'>\n                            ").concat(c.items.length?c.items.map((function(e){return"<li class='char-info__comics-list-item'>".concat(e.name,"</li>")})).join(""):"No comics.","\n                        </ul>\n                    </div>\n                </div>\n            "));a.show(),document.querySelector(".char-info__btn-close").addEventListener("click",(function(){return a.close()}))})).catch((function(e){return console.error(e)}))}}function p(e){var n=e.map((function(e){return function(e,n,t){return'\n        <li class="characters-filter__list-item" data-id='.concat(e,">\n            <img src=").concat(n.path+"."+n.extension," alt=").concat(t,">\n            <p>").concat(t,"</p>\n        </li>\n    ")}(e.id,e.thumbnail,e.name)})).join("");l.hidden=!0,c.insertAdjacentHTML("beforeend",n),s.style.display="block"}a.addEventListener("submit",(function(e){e.preventDefault();var n=u.value,t=f.value;if(!n)return;c.innerHTML="",l.hidden=!1,d=50,(0,i.getCharactersBySearch)(n,t,d,h).then((function(e){l.hidden=!0,e.data.results.length||(c.innerHTML="\n                    <p class='no-data'>Sorry, no data for this query.</p>\n                "),p(e.data.results),s.style.display="none"})).catch((function(e){return console.error(e)}))})),s.addEventListener("click",(function(){l.hidden=!1,h+=20,(0,i.getCharacters)(d,h).then((function(e){return p(e.data.results),h}))})),(0,i.getCharacters)(d,h).then((function(e){p(e.data.results),c.addEventListener("click",m)})).catch((function(e){return console.error(e)}))}();
//# sourceMappingURL=characters.c221db3a.js.map