(function() {
    // API endpoint url https://jsonplaceholder.typicode.com/albums/1/photos 
    // It need to show on page thumbnails with photos, but on photo click it need to redirect to show full size of photo at new tab
    // each photo should contain title on the top of thumbnail

    // Optional: When data is fetched first time additional button should be attached with text `Next Album` and existing button text should be changed to `Prev Album`
    // But when user return back to album number 1 button Prev Album should be disabled. Only Next Album should be enabled 
    // And add CSS using javascript to make it nice and change card background on hover

    // constants
    const apiUrl = 'https://jsonplaceholder.typicode.com/albums/1/photos';
    const textNoPhotos = 'User does not have any photos';
    // existing DOM elemnts
    const photoListRoot = document.querySelector('#photo-list_root');
    const buttonSubmitEl = document.querySelector('#fetch-data-btn');


    const addDataToDom = (list) => {
        if(!list || list.length === 0) {
            const pElement = document.createElement('p');
            photoListRoot.append(textNoPhotos, pElement);
            return;
        }
        const ul = document.createElement('ul');

        list.forEach(({ title, thumbnailUrl, url }) => {
            // create elements
            const li = document.createElement('li');
            const img = document.createElement('img');
            const p = document.createElement('p');
            const a = document.createElement('a');

            img.setAttribute('src', thumbnailUrl);
            img.setAttribute('alt', title);
            a.setAttribute('href', url);
            a.setAttribute('target', '_blank');
            
            a.append(p, title);
            a.append(img);
            li.append(a);
            ul.append(li);
        })
        photoListRoot.append(ul);
    }

    const fetchData = async () => {
        const response = await fetch(apiUrl);

        if(response.ok) {
            const data = await response.json();
            addDataToDom(data);
        } else {
            console.error(new Error('Error occured on fetching data', { cause: response.status }))
        }
    }
    // event listeners
    buttonSubmitEl.addEventListener('click', fetchData);
})();