import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import ImgApiServis from "./js/ImgApiServis";
import { getRefs } from "./js/refs";
import { renderMarkupList, markupCreating } from "./js/renderMarkup";


const refs = getRefs();
const gallery = new SimpleLightbox('.gallery a');
gallery.on('show.simplelightbox');
const imgApiServis = new ImgApiServis();

refs.loadmoreBtn.classList.add('invisible');
refs.andMessage.classList.add('invisible');

refs.searchForm.addEventListener('submit', onSearch);
refs.loadmoreBtn.addEventListener('click', onClickLoadMore);

function onSearch(e) {
    e.preventDefault();
    imgApiServis.reset();
        
    imgApiServis.userRequest = e.target[0].value.toLowerCase().trim().replaceAll(' ', '+');
        
    if (imgApiServis.userRequest === '') {
        refs.gallery.innerHTML = '';
        refs.andMessage.classList.add('invisible');
        return;
    }
    
    imgApiServis.fetchImgs() 
        .then(answerProperties => {
        
        if (answerProperties.length === 0) {
            imgApiServis.infoMess();
            refs.loadmoreBtn.classList.add('invisible');
            refs.andMessage.classList.add('invisible');
            return;
        };

        if (answerProperties.length < 40) {
            imgApiServis.successMess();
            refs.andMessage.classList.remove('invisible');
            refs.loadmoreBtn.classList.add('invisible');
            
            renderMarkupList(refs.gallery, answerProperties, markupCreating);
            gallery.refresh();
            
            return;
        };

        imgApiServis.successMess();
        refs.andMessage.classList.add('invisible');
        refs.loadmoreBtn.classList.remove('invisible');
        renderMarkupList(refs.gallery, answerProperties, markupCreating);
        gallery.refresh();
    });            
};

function onClickLoadMore() {
    imgApiServis.fetchImgs()
        .then(answerProperties => {
        
        if (answerProperties.length < 40) {
            refs.andMessage.classList.remove('invisible');
            refs.loadmoreBtn.classList.add('invisible');
            
            renderRefreshScrol(refs.gallery, answerProperties, markupCreating);
            return;
        };

        renderRefreshScrol(refs.gallery, answerProperties, markupCreating);
    })
};

function renderRefreshScrol(el, answer, func) {
    renderMarkupList(el, answer, func);
        gallery.refresh();
        scroll();
};

function scroll() {
    const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
    });
};











