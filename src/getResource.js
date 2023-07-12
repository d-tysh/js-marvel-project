const BASE_URL = 'https://gateway.marvel.com:443/v1/public/';
const API_PUBLIC_KEY = 'a85ca2e1a3f06b7ee3183f960e5fdc88';

async function getCharacters(limit, offset) {

    const request = await fetch(`${BASE_URL}characters?limit=${limit}&offset=${offset}&apikey=${API_PUBLIC_KEY}`);
    
    if (!request.ok) {
        throw new Error(request.status);
    }

    return request.json();
}

async function getCharactersBySearch(name, orderBy, limit, offset) {
    const request = await fetch(`${BASE_URL}characters?nameStartsWith=${name}&orderBy=${orderBy}&limit=${limit}&offset=${offset}&apikey=${API_PUBLIC_KEY}`);
    
    if (!request.ok) {
        throw new Error(request.status);
    }

    return request.json();
}

async function getComics(limit, offset) {
    const request = await fetch(`${BASE_URL}comics?limit=${limit}&offset=${offset}&apikey=${API_PUBLIC_KEY}`);
    
    if (!request.ok) {
        throw new Error(request.status);
    }

    return request.json();
}

async function getComicsBySearch(title, format, orderBy, limit, offset) {
    const request = await fetch(`https://gateway.marvel.com:443/v1/public/comics?format=${format}&titleStartsWith=${title}&orderBy=${orderBy}&limit=${limit}&offset=${offset}&apikey=${API_PUBLIC_KEY}`);

    if (!request.ok) {
        throw new Error(request.status, request.statusText);
    }

    return request.json();
}

export {getCharacters, getCharactersBySearch, getComics, getComicsBySearch};