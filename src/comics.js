import { getComics, getComicsBySearch } from "./getResource";

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

function createMarkup(thumbnail, name) {
    return `
        <li class="comics__list-item">
            <img src=${thumbnail.path + '.' + thumbnail.extension} alt=${name}>
            <p>${name}</p>
        </li>
    `;
}

function createComicsList(arr) {
    const Comics = arr.map(({ thumbnail, title }) => {
        return createMarkup(thumbnail, title);
    }).join('');
    
    loading.hidden = true;
    comicsList.insertAdjacentHTML('beforeend', Comics);
    btnLoadMore.style.display = 'block';
}

getComicsList();