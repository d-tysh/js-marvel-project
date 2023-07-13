import * as basicLightbox from 'basiclightbox';

import { getComics, getComicsBySearch, getComicsById } from "./getResource";

const comicsList = document.querySelector('.comics__list');
const formComicsFilter = document.querySelector('.comics__form');
const btnLoadMore = document.querySelector('.btn-load-more');
const loading = document.querySelector('.loading');

const titleInput = document.querySelector('.comics__input-title');
const comicsFormat = document.querySelector('.comics__format');
const selectOrderBy = document.querySelector('.comics__order-by');

btnLoadMore.style.display = 'none';

let limit = 20;
let offset = 0;

formComicsFilter.addEventListener('submit', onSearchComics);
btnLoadMore.addEventListener('click', onLoadComics);

function getComicsList() {
    getComics(limit, offset)
        .then(result => {
            createComicsList(result.data.results);
            comicsList.addEventListener('click', openComicInfo);
        })
        .catch(err => console.error(err));
}

function onLoadComics() {
    loading.hidden = false;
    offset += 20;

    getComics(limit, offset)
        .then(result => {
            createComicsList(result.data.results);
            return limit, offset;
        })
}

function onSearchComics(e) {
    e.preventDefault();
    const title = titleInput.value;
    const format = comicsFormat.value;
    const orderBy = selectOrderBy.value;

    if (!title) {
        return;
    }
    
    comicsList.innerHTML = '';
    loading.hidden = false;
    limit = 50;

    console.log(title, format, orderBy, limit, offset);
    
    getComicsBySearch(title, format, orderBy, limit, offset)
        .then(result => {
            loading.hidden = true;
            if (!result.data.results.length) {
                comicsList.innerHTML = `
                    <p class='no-data'>Sorry, no data for this query.</p>
                `;
            }
            createComicsList(result.data.results);
            btnLoadMore.style.display = 'none';
        })
        .catch(err => console.error(err));
}

function openComicInfo(e) {
    if (!e.target.closest(('.comics__list-item'))) {
        return;
    }

    const { id } = e.target.closest('.comics__list-item').dataset;

    getComicsById(id)
        .then(result => {
            console.log(result.data.results[0]);

            const {thumbnail, title, description, characters, format, prices} = result.data.results[0];
            const instance = basicLightbox.create(`
            <div class='comic-info'>
                    <button class='comic-info__btn-close'>X</button>
                    <img class='comic-info__img' src=${thumbnail.path + '.' + thumbnail.extension} alt=${title}>
                    <div class='comic-info__information'>
                        <p class='comic-info__title'>${title}</p>
                        <p class='comic-info__description'>${description ? description : 'No description for this comic.'}</p>
                        <ul class='comic-info__sale-info-list list'>
                            <li class='comic-info__sale-info-list-item'>
                                <span>FORMAT</span>
                                <p>${format}</p>
                            </li>
                            <li class='comic-info__sale-info-list-item'>
                                <span>PRICE</span>
                                <p>${prices[0].price}</p>
                            </li>
                        </ul>
                        <p class='comic-info__char-title'>Characters</p>
                        <ul class='comic-info__char-list'>
                            ${
                                characters.items.length ? characters.items.map(item => `
                                    <li class='comic-characters-list-item'>${item.name}</li>
                                `).join('') : 'No data about characters.'
                            }
                        </ul>
                    </div>
                </div>
            `);

            instance.show()

            document.querySelector('.comic-info__btn-close').addEventListener('click', () => instance.close());
        })
        .catch(error => console.error(error));
}

function createMarkup(id, thumbnail, name) {
    return `
        <li class="comics__list-item" data-id=${id}>
            <img src=${thumbnail.path + '.' + thumbnail.extension} alt=${name}>
            <p>${name}</p>
        </li>
    `;
}

function createComicsList(arr) {
    const Comics = arr.map(({ id, thumbnail, title }) => {
        return createMarkup(id, thumbnail, title);
    }).join('');
    
    loading.hidden = true;
    comicsList.insertAdjacentHTML('beforeend', Comics);
    btnLoadMore.style.display = 'block';
}

getComicsList();