import gallery from './gallery-items.js';

const galleryEl = document.querySelector('.js-gallery');
const modalEl = document.querySelector('.js-lightbox');
const modalImgEl = document.querySelector('.lightbox__image');

galleryEl.addEventListener('click', onClickModalOpen);
modalEl.addEventListener('click', onClickModalClose);
modalEl.addEventListener('click', onClickOverlayModalClose);
window.addEventListener('keydown', onKeydownBtnModalClose);
window.addEventListener('keydown', onKeydownNextImg);
window.addEventListener('keydown', onKeydownPrewImg);

const markupString = createMarkup(gallery);
renderMarkup(markupString, galleryEl);
const arrOfSrces = gallery.map(e => e.original);
const arrOfDescr = gallery.map(e => e.description);

function createMarkup(arr) {
  return arr
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
    })
    .join('');
}

function renderMarkup(string, parentNode) {
  parentNode.insertAdjacentHTML('beforeend', string);
}

function onClickModalOpen(e) {
  e.preventDefault();

  if (!e.target.classList.contains('gallery__image')) {
    return;
  }

  modalEl.classList.add('is-open');

  updateAttr(e.target.dataset.source, e.target.alt);
}

function updateAttr(src, alt) {
  modalImgEl.src = src;
  modalImgEl.alt = alt;
}

function onKeydownBtnModalClose(e) {
  if (e.code !== 'Escape') {
    return;
  }
  closeModal();
}

function onClickModalClose(e) {
  if (e.target.dataset.action !== 'close-lightbox') {
    return;
  }
  closeModal();
}

function onClickOverlayModalClose(e) {
  if (e.target.classList.contains('lightbox__image')) {
    return;
  }
  closeModal();
}

function closeModal() {
  modalEl.classList.remove('is-open');
  updateAttr('', '');
}

function onKeydownNextImg(e) {
  if (
    e.code !== 'ArrowRight' ||
    modalImgEl.src === arrOfSrces[arrOfSrces.length - 1]
  ) {
    return;
  }

  let bufferValue;
  arrOfSrces.forEach((source, idx) => {
    if (modalImgEl.src === source) {
      updateAttr('', '');
      modalImgEl.alt = arrOfDescr[idx + 1];
      bufferValue = arrOfSrces[idx + 1];
    }
  });
  return (modalImgEl.src = bufferValue);
}

function onKeydownPrewImg(e) {
  if (e.code !== 'ArrowLeft' || modalImgEl.src === arrOfSrces[0]) {
    return;
  }

  arrOfSrces.forEach((source, idx) => {
    if (modalImgEl.src === source) {
      updateAttr('', '');
      modalImgEl.alt = arrOfDescr[idx - 1];
      return (modalImgEl.src = arrOfSrces[idx - 1]);
    }
  });
}