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
	slidesPerView: '1',
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

new Swiper('.offer__slider', {
	navigation: {
		nextEl: '.offer__button-right',
		prevEl: '.offer__button-left'
	},
	keyboard: {
		enable: true,
	},
	slidesPerView: '1.5',
	loop: true,
	watchOverflow: true,
	spaceBetween: 60,
	observer: true,
})




//form to telegram
const form = document.querySelector('.popup-header__form');
console.log(form)
form.addEventListener('submit', () => {
	const data = Object.fromEntries(new FormData(form))
	const init = {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify(data)}
	fetch('api/data', init)
	form.reset()
})



//popup-header
const popupLinks = document.querySelectorAll('.popup-link')
const body = document.querySelector('.body')
const lockPadding = document.querySelectorAll('.lock-padding')

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	for (let i = 0; i < popupLinks.length; i++) {
		const popupLink = popupLinks[i]
		popupLink.addEventListener('click', function(e) {
			const popupName = popupLink.getAttribute('href').replace('#', '')
			const curentPopup = document.getElementById(popupName)
			popupOpen(curentPopup)
			e.preventDefault()
		})
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup')
if (popupCloseIcon.length > 0) {
	for (let i = 0; i < popupCloseIcon.length; i++) {
		const el = popupCloseIcon[i]
		el.addEventListener('click', function(e) {
			popupClose(el.closest('.popup'))
			e.preventDefault()
		})
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open')
		if (popupActive) {
			popupClose(popupActive, false)
		} /* else {
			bodyLock()
		} */
		curentPopup.classList.add('open')
		curentPopup.addEventListener('click', function(e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'))
			}
		})
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		/* if (doUnlock) {
			bodyUnLock()
		} */
	}
}

document.addEventListener('keydown', function(e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive)
	}
})


/* function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'

	for (let i = 0; i < lockPadding.length; i++) {
		const el = lockPadding[i]
		el.style.paddingRight = lockPaddingValue
	}
	body.style.paddingRight = lockPaddingValue
	body.classList.add('lock')

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		for (let i = 0; i < lockPadding.length; i++) {
			const el = lockPadding[i];
			el.style.paddingRight = '0'
		}

		body.style.paddingRight = '0'
		body.classList.remove('lock')
	}, timeout)

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);

} */