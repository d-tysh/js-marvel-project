import * as basicLightbox from 'basiclightbox';

import { getCharacters, getCharactersBySearch, getCharacterById } from "./getResource";

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
            charactersFilterList.addEventListener('click', openCharInfo);
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

function openCharInfo(e) {
    if (!e.target.closest(('.characters-filter__list-item'))) {
        return;
    }

    const { id } = e.target.closest('.characters-filter__list-item').dataset;


    getCharacterById(id)
        .then(result => {
            console.log(result.data.results[0]);

            const {thumbnail, name, description, comics} = result.data.results[0];
            const instance = basicLightbox.create(`
            <div class='char-info'>
                    <button class='char-info__btn-close'>X</button>
                    <img class='char-info__img' src=${thumbnail.path + '.' + thumbnail.extension} alt=${name}>
                    <div class='char-info__information'>
                        <p class='char-info__name'>${name}</p>
                        <p class='char-info__description'>${description ? description : 'No description for this character.'}</p>
                        <p class='char-info__comics-title'>List of Comics</p>
                        <ul class='char-info__comics-list'>
                            ${
                                comics.items.length ? comics.items.map(item => `<li class='char-info__comics-list-item'>${item.name}</li>`).join('') : 'No comics.'
                            }
                        </ul>
                    </div>
                </div>
            `);

            instance.show()

            document.querySelector('.char-info__btn-close').addEventListener('click', () => instance.close());
        })
        .catch(error => console.error(error));
}

function createMarkup(id, thumbnail, name) {
    return `
        <li class="characters-filter__list-item" data-id=${id}>
            <img src=${thumbnail.path + '.' + thumbnail.extension} alt=${name}>
            <p>${name}</p>
        </li>
    `;
}

function createCharactersList(arr) {
    const characters = arr.map(({ id, thumbnail, name }) => {
        return createMarkup(id, thumbnail, name);
    }).join('');

    loading.hidden = true;
    charactersFilterList.insertAdjacentHTML('beforeend', characters);
    btnLoadMore.style.display = 'block';
}

getCharactersList();