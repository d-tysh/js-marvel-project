import { getCharacters, getCharactersBySearch } from "./getResource";

const charactersFilterList = document.querySelector('.characters-filter__list');
const formCharactersFilter = document.querySelector('.characters-filter__form');
const btnLoadMore = document.querySelector('.btn-load-more');
const loading = document.querySelector('.loading');

const nameInput = document.querySelector('.characters-filter__input-name');
const searchSelect = document.querySelector('.characters-filter__select');

btnLoadMore.style.display = 'none';

let limit = 20;
let offset = 0;

formCharactersFilter.addEventListener('submit', onSearchCharacters);
btnLoadMore.addEventListener('click', onLoadCharacters);

function getCharactersList() {
    getCharacters(limit, offset)
        .then(result => {
            createCharactersList(result.data.results);
        })
        .catch(err => console.error(err));
}

function onLoadCharacters() {
    loading.hidden = false;
    offset += 20;

    getCharacters(limit, offset)
        .then(result => {
            createCharactersList(result.data.results);
            return limit, offset;
        })
}

function onSearchCharacters(e) {
    e.preventDefault();
    const name = nameInput.value;
    const orderBy = searchSelect.value;
    if (!name) {
        return;
    }

    charactersFilterList.innerHTML = '';
    loading.hidden = false;
    limit = 50;

    getCharactersBySearch(name, orderBy, limit, offset)
        .then(result => {
            loading.hidden = true;
            if (!result.data.results.length) {
                charactersFilterList.innerHTML = `
                    <p class='no-data'>Sorry, no data for this query.</p>
                `;
            }
            createCharactersList(result.data.results);
            btnLoadMore.style.display = 'none';
        })
        .catch(err => console.error(err));
}

function createMarkup(thumbnail, name) {
    return `
        <li class="characters-filter__list-item">
            <img src=${thumbnail.path + '.' + thumbnail.extension} alt=${name}>
            <p>${name}</p>
        </li>
    `;
}

function createCharactersList(arr) {
    const characters = arr.map(({ thumbnail, name }) => {
        return createMarkup(thumbnail, name);
    }).join('');
    
    loading.hidden = true;
    charactersFilterList.insertAdjacentHTML('beforeend', characters);
    btnLoadMore.style.display = 'block';
}

getCharactersList();