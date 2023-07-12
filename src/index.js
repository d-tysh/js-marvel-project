import { getCharacters } from "./getResource";

const heroList = document.querySelector('.hero__menu-list');
const heroCharacters = document.querySelector('.hero__characters');
const randomCharactersList = document.querySelector('.random-characters__list');
const randomCharImg = document.querySelector('.random-characters__img');
const loading = document.querySelector('.loading');

randomCharImg.hidden = true;
randomCharactersList.hidden = true;

let timer1 = null;

heroList.addEventListener('click', heroListHandler);

function heroListHandler(e) {
    if (!e.target.classList.contains('hero__menu-item')) {
        return;
    }

    [...heroList.children].forEach(item => item.classList.remove('active'));
    [...heroCharacters.children].forEach(item => item.classList.remove('active'));
    e.target.classList.add('active');

    for (let i = 0; i < heroList.children.length; i++) {
        if (e.target.dataset.name === heroCharacters.children[i].dataset.name) {
            heroCharacters.children[i].classList.add('active');
        }
    }
}

function changeHeroCharacter() {
    for (let i = 0; i <= heroList.children.length; i++) {
        timer1 = setTimeout(() => {
            if (i === heroList.children.length) {
                i = 0;
                changeHeroCharacter();
            }
            [...heroList.children].forEach(item => item.classList.remove('active'));
            [...heroCharacters.children].forEach(item => item.classList.remove('active'));
            heroList.children[i].classList.add('active');
            heroCharacters.children[i].classList.add('active');
            return timer1;
        }, i * 5000)
    }
}

changeHeroCharacter();

function getRandomCharacters() {
    loading.hidden = false;
    let randomOffset = Math.floor(Math.random() * 300);
    getCharacters(5, randomOffset)
        .then(result => {
            const characters = result.data.results.map(({ thumbnail, name, description }) => {
                return createRandCharList(thumbnail, name, description);
            }).join('');

            loading.hidden = true;
            randomCharactersList.innerHTML = characters;
            randomCharImg.hidden = false;
            randomCharactersList.hidden = false;

            randomCharactersList.children[0].classList.add('active');
            randomCharImg.src = randomCharactersList.children[0].dataset.img;
            randomCharImg.alt = randomCharactersList.children[0].dataset.name;
            
            if (randomCharImg.src === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                randomCharImg.style.height = '400px';
            }

            randomCharactersList.addEventListener('click', onCharClick);
        })
        .catch(error => console.error(error));
}

getRandomCharacters();

function createRandCharList(thumbnail, name, description) {
    return `
        <li class="random-characters__list-item" data-img=${thumbnail.path + '.' + thumbnail.extension} data-name=${name}>
            <p class="random-characters__name">${name}</p>
            <p class="random-characters__description">${description ? description : 'No description for this character.'}</p>
        </li>
    `;
}

function onCharClick(e) {
    if (!(e.target.classList.contains('random-characters__list-item') || e.target.classList.contains('random-characters__name') || e.target.classList.contains('random-characters__description'))) {
        return;
    }

    [...randomCharactersList.children].forEach(item => item.classList.remove('active'));
    e.target.closest('.random-characters__list-item').classList.add('active');
    randomCharImg.src = e.target.closest('.random-characters__list-item').dataset.img;
    if (randomCharImg.src === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        randomCharImg.style.height = '400px';
    } else {
        randomCharImg.style.height = '704px';
    }
}