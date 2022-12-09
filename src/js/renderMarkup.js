export function renderMarkupList(element, imgArr, markupCreating) {
    element.insertAdjacentHTML('beforeend', imgArr.map(markupCreating).join('')) ; 
};

export function markupCreating({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
    return `
    
        <div class="photo-card animate__animated animate__zoomIn">
        <a class="big-photo" href="${largeImageURL}">
         <div class="img-wrapper">
            <img class="img" src="${webformatURL}" alt="${tags}" width="380" loading="lazy" />
        </div>    
            </a>
                <div class="info">
                    <p class="info-item">
                        <b>Likes ${likes}</b>
                    </p>
                    <p class="info-item">
                        <b>Views ${views}</b>
                    </p>
                    <p class="info-item">
                        <b>Comments ${comments}</b>
                    </p>
                    <p class="info-item">
                        <b>Downloads ${downloads}</b>
                    </p>
                </div>
        </div>
    `
};


