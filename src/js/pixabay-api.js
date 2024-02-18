export function getGallery(queryName) {      // Відправляємо посильного на сервер за адресою і сервер нам сам поверне посильного з інформацією
    const BASE_URL = 'https://pixabay.com';
    const END_POINT = '/api/';
    const PARAMS = new URLSearchParams({
        key: "42112521-3ff4dfc201bab0977369cd2bc",
        q: queryName,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
    });

    const url = `${BASE_URL}${END_POINT}?${PARAMS}`;

    console.log(url);
 
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
}







