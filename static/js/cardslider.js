
const ACTIVECLASS = 'active';
const IMAGES = document.querySelectorAll('.flex-card-container');
const DESCRS = document.querySelectorAll('.info-card-container');
IMAGES[0].classList.add(ACTIVECLASS);
DESCRS[0].classList.add(ACTIVECLASS);



function removeActiveClass() {
    const elm = document.querySelector(`.flex-card-container.${ACTIVECLASS}`)
    if (elm) {
        elm.classList.remove(ACTIVECLASS);
    }
    const elm2 = document.querySelector(`.info-card-container.${ACTIVECLASS}`)
    if (elm2) {
        elm2.classList.remove(ACTIVECLASS);
    }
}

function addClass($event) {
    $event.stopPropagation();
    removeActiveClass();
    const target = $event.currentTarget;
    target.classList.add(ACTIVECLASS);
    var cls = target.className;
    var re = RegExp("bild-([0-9]+)");
    var erg = cls.match(re);
    const target2 = document.querySelector('.info-card-container.info-'+erg[1]);
    target2.classList.add(ACTIVECLASS);
}

IMAGES.forEach(image => {
    image.addEventListener('click', addClass);
})