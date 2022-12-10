import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";
import { getRefs } from "./refs";

const axios = require('axios').default;
const refs = getRefs();

export default class ImgApiServis {
    constructor() {
        this.userRequest = '';
        this.page = 1;
        this.totalHits = 0;
        this.perPage = 40;
    }

    async fetchImgs() {
        const URL = 'https://pixabay.com/api/';
        const KEY = '25319761-84ef76f9b3bcf2090a4cd8b86';
        
        const searchParams = new URLSearchParams({
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: `${this.perPage}`,
            page: `${this.page}`,
        });
        
        try {
            const images = await axios.get(`${URL}?key=${KEY}&q=${this.userRequest}&${searchParams}`);
            this.totalHits = images.data.totalHits;
            
            const answerProperties = images.data.hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => (
                    {
                        webformatURL,
                        largeImageURL,
                        tags,
                        likes,
                        views,
                        comments,
                        downloads,
                    }
                ));
                return answerProperties;  
        } catch (error) {
            this.errorMess(error.message);
        }
    }

    get request() {
        return this.userRequest;
    } 

    set request(newUserRequest) {
        this.userRequest = newUserRequest;
    }
    
    incrementPage() {
        this.page += 1;
    }

    reset() {
        refs.gallery.innerHTML = '';
        this.page = 1;
        this.totalHits = 0;
    }

    successMess() {
        Notiflix.Notify.success(`Hooray! We found ${this.totalHits} images.`);
    }
    
    infoMessNoImg() {
        Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
    }

    infoMessEnd() {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }

    errorMess(error) {
        Notiflix.Notify.failure(`${error} Please try again.`);
    }
}

