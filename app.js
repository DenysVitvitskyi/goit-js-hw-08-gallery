const galleryItems = [
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
      description: 'Hokkaido Flower',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
      description: 'Container Haulage Freight',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
      description: 'Aerial Beach View',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
      description: 'Flower Blooms',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
      description: 'Alpine Mountains',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
      description: 'Mountain Lake Sailing',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
      description: 'Alpine Spring Meadows',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
      description: 'Nature Landscape',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
      description: 'Lighthouse Coast Sea',
    },
  ];

  const gallery = document.querySelector(".js-gallery")
  const modal = document.querySelector(".js-lightbox")
  const img = document.querySelector(".lightbox__image")
  const btn = document.querySelector('[data-action="close-lightbox"]')
  
  const items = []
  
  galleryItems.forEach(item => {
  const prev = item.preview
  const origin = item.original
  const descr = item.description
    item = `
  <li class="gallery__item">
  <a href="#" class="gallery__link">
  <img src="${prev}" data-source="${origin}" class="gallery__image" alt="${descr}"></a>
  </li>`
    
    items.push(item)
  });

  
  
  gallery.insertAdjacentHTML('afterbegin', items.join(" "))
  gallery.addEventListener("click", onImgClick);
  btn.addEventListener("click", onCloseModal)
  
  function onImgClick(event) { 
    const targetImg = event.target;
    console.log("event target: ", targetImg)
    modal.classList.toggle("is-open")
    img.src = targetImg.dataset.source
  };
  
  function onCloseModal(event) {
    const targetCloseBtn = event.target;
    modal.classList.toggle("is-open")
      img.src = ""
  }


// Листание картинок с помощью клавиатуры

  function onArrowRight() {
    if (currentIndex + 1 > galleryItems.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex += 1;
    }
    lightBoxImgContent(
      galleryItems[currentIndex].original,
      galleryItems[currentIndex].description
    );
  }
  
  function onArrowLeft() {
    if (currentIndex - 1 < 0) {
      currentIndex = galleryItems.length - 1;
    } else {
      currentIndex -= 1;
    }
    lightBoxImgContent(
      galleryItems[currentIndex].original,
      galleryItems[currentIndex].description
    );
  }

  // Закрытие модального окна через кнопку Esc

  document.body.addEventListener('keyup', function (e) {
    var key = e.keyCode;

    if (key == 27) {
        document.querySelector('.js-gallery').classList.remove("is-open");
        document.querySelector('.js-lightbox').classList.remove("is-open");
    };
}, false);