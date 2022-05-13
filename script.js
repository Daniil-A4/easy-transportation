new Swiper('.gallery__slider', {
	
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	/* scrollbar: {
		el: '.swiper-scrollbar',
		draggable: true
	}, */
	keyboard: {
		enable: true,
	},
	/* autoHeight: true, */
	slidesPerView: '2',
	spaceBetween: 20,
	/* centeredSlides: true, */
	loop: true,
	thumbs: {
		swiper: {
			el: '.gallery__mini-slider',
			slidesPerView: 8,
		}
	},
});


const headers = document.querySelectorAll("[data-name='spoiler-title']");
headers.forEach(function(item) {
    item.addEventListener("click", headerClick);
});
function headerClick() {
    this.previousElementSibling.classList.toggle("spoiler-body");
}