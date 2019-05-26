// DOMstrings
const DOMstrings = {
	arrow: document.querySelector('.menu__arrow'),
	updateBtn: document.querySelector('.update__clock'),
	realTime: document.querySelector('.real__time'),
	clockMsg: document.querySelector('.clock__msg'),
	workVal: document.querySelector('.work__val'),
	studyVal: document.querySelector('.study__val'),
	relaxVal: document.querySelector('.relax__val'),
	body: document.querySelector('.main'),
	menu: document.querySelector('.side__menu'),
	settings: document.querySelector('.setting__container'),
	settingsAll: document.querySelectorAll('.setting__container'),
	settingText: document.querySelectorAll('.setting__text')
}

////////////////
// CLOCK
////////////////

const updateClock = () => {
	const now = new Date()
	const hour = now.getHours()
	const min = now.getMinutes()

	// fullSec keeps the seconds two digits when less than 10
	const fullSec = () => {
		let sec = now.getSeconds()
		if (sec < 10) {
			sec = `0${sec}`
		} else {
			sec = sec
		}
		return sec
	}

	let time = `${hour}:${min}:${fullSec()}`

	DOMstrings.realTime.innerHTML = time

	// setTimeout will keep the clock moving
	setTimeout(updateClock, 1000)
}

updateClock()

////////////////
// SIDE MENU
////////////////

// sets menu state
let menuOpen = false

// LISTENS for clicks on arrow
DOMstrings.arrow.addEventListener('click', () => {
	if (!menuOpen) {
		openMenu()
		menuOpen = true
	} else if (menuOpen) {
		closeMenu()
		menuOpen = false
	}
})

// OPEN menu function

const showSettings = () => {
	let settings = DOMstrings.settingsAll
	for (i = 0; i < settings.length; i++) {
		settings[i].classList.remove('fallingSelection')
		settings[i].classList.add('risingSelection')
	}
	DOMstrings.updateBtn.classList.add('risingSelection')
}

const hideSettings = () => {
	let settings = DOMstrings.settingsAll
	for (i = 0; i < settings.length; i++) {
		settings[i].classList.remove('risingSelection')
		settings[i].classList.add('fallingSelection')
	}
	DOMstrings.updateBtn.classList.remove('risingSelection')
}

const openMenu = () => {
	DOMstrings.body.style.marginLeft = '220px'
	DOMstrings.menu.style.width = '220px'
	DOMstrings.arrow.style.left = '165px'
	DOMstrings.arrow.style.color = 'white'
	DOMstrings.arrow.classList.add('fa-rotate-180')
	showSettings()
}

// CLOSE menu function

const closeMenu = () => {
	DOMstrings.body.style.marginLeft = '0px'
	DOMstrings.menu.style.width = '0px'
	DOMstrings.arrow.style.left = '20px'
	DOMstrings.arrow.style.color = 'black'
	DOMstrings.arrow.classList.remove('fa-rotate-180')
	hideSettings()
}

// point arrow correct direction and reposition

////////////////////////////////
// UPDATE IMG AND PHRASE
////////////////////////////////

// connect each selection variable to corresponding phrase

// read time and which selection we are in to change phrase and BG
