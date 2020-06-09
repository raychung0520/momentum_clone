const body = document.querySelector("body");
const API_KEY_UNSPLASH = "xRwphNadJCpxPJXTrl6bfq71MhbHWfYt1iM6_ttxyvk";
const IMG = "img";

function saveBackground(imgUrl) {
  const savedImage = localStorage.getItem("bg");
  if (savedImage !== null) {
    localStorage.removeItem("bg");
  }

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);
  const imageObj = {
    url: imgUrl,
    expiresOn: expirationDate,
  };
  localStorage.setItem("bg", JSON.stringify(imageObj));
  loadBackground();
  return;
}
function loadBackground(imgNumber) {
  const savedImage = localStorage.getItem("bg");
  if (savedImage === null) {
    getImg();
  } else {
    const parsedImg = JSON.parse(savedImage);
    const today = new Date();
    if (today > parsedImg.expiresOn) {
      getImg();
    } else {
      body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(${parsedImg.url})`;
    }
  }
  //   image.src = `img/${imgNumber + 1}.jpg`;
  //   image.classList.add("bgImage");
  //   body.prepend(image);
}

function init() {
  //const randomNumber = genRandom();
  //paintImage(randomNumber);
  getImg();
}

function getImg() {
  fetch(`https://api.unsplash.com/photos/random/?client_id=${API_KEY_UNSPLASH}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      if (json.urls && json.urls.full && json.location) {
        const fullUrl = json.urls.full;
        const location = json.locatioin;
        saveBackground(fullUrl, location);
      } else {
        getImage();
      }
      //   const genNumber = genRandom();

      //   const image = new Image();
      //   image.src = json.results[0].urls.full;

      //   console.log(genNumber, image.src);
      //   image.classList.add("bgImage");
      //   body.prepend(image);
    });
}

init();
