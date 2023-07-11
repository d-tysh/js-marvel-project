import { getCharacters } from "./getResource";

const charactersFilterList = document.querySelector('.characters-filter__list');
const formCharactersFilter = document.querySelector('.characters-filter__form');
const btnLoadMore = document.querySelector('.btn-load-more');
const loading = document.querySelector('.loading');

let limit = 12;
let offset = 1;

formCharactersFilter.addEventListener('submit', onSearchCharacters);
btnLoadMore.addEventListener('click', onLoadCharacters);

function getCharactersList() {
    getCharacters(limit, offset)
        .then(result => {
            const characters = result.data.results.map(({ thumbnail, name }) => {
                return createMarkup(thumbnail, name);
            }).join('');

            loading.hidden = true;
            charactersFilterList.insertAdjacentHTML('beforeend', characters);
        })
}

function onLoadCharacters() {
    loading.hidden = false;
    limit = 8;
    offset += 1;

    getCharacters(limit, offset)
        .then(result => {
            const characters = result.data.results.map(({ thumbnail, name }) => {
                return createMarkup(thumbnail, name);
            }).join('');

            loading.hidden = true;
            charactersFilterList.insertAdjacentHTML('beforeend', characters);
            return limit, offset;
        })

    return limit, offset;
}

function onSearchCharacters(e) {
    e.preventDefault();
}

function createMarkup(thumbnail, name) {
    return `
        <li class="characters-filter__list-item">
            <img src=${thumbnail.path + '.' + thumbnail.extension} alt=${name}>
            <p>${name}</p>
        </li>
    `;
}

getCharactersList();