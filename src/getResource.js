async function getCharacters(limit, offset) {
    const BASE_URL = 'https://gateway.marvel.com:443/v1/public/characters';
    const API_PUBLIC_KEY = 'a85ca2e1a3f06b7ee3183f960e5fdc88';

    const request = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}&apikey=${API_PUBLIC_KEY}`);
    
    if (!request.ok) {
        throw new Error(request.status);
    }

    return request.json();
}

export {getCharacters};