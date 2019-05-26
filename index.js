const DOMstrings = {
	arrow: document.querySelector('.menu__arrow'),
	updateBtn: document.querySelector('.update__clock'),
	realTime: document.querySelector('.real__time'),
	clockMsg: document.querySelector('.clock__msg'),
	workVal: document.querySelector('.work__drop'),
	studyVal: document.querySelector('.study__drop'),
	relaxVal: document.querySelector('.relax__drop'),
	main: document.querySelector('.main'),
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

	const standardHour = () => {
		let hour = now.getHours()
		if (hour > 12) {
			hour = hour - 12
		} else {
			hour = hour
		}
		return hour
	}

	const fullMin = () => {
		let min = now.getMinutes()
		if (min < 10) {
			min = `0${min}`
		} else {
			min = min
		}
		return min
	}

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

	let time = `${standardHour()}:${fullMin()}:${fullSec()}`

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
	DOMstrings.main.style.marginLeft = '220px'
	DOMstrings.menu.style.width = '220px'
	DOMstrings.arrow.style.left = '165px'
	DOMstrings.arrow.style.color = 'white'
	DOMstrings.arrow.classList.add('fa-rotate-180')
	showSettings()
}

// CLOSE menu function

const closeMenu = () => {
	DOMstrings.main.style.marginLeft = '0px'
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

const calcDayState = () => {
	const hour = new Date().getHours()

	let workHour = parseInt(
		DOMstrings.workVal.options[DOMstrings.workVal.selectedIndex].value
	)
	let studyHour = parseInt(
		DOMstrings.studyVal.options[DOMstrings.studyVal.selectedIndex].value
	)
	let relaxHour = parseInt(
		DOMstrings.relaxVal.options[DOMstrings.relaxVal.selectedIndex].value
	)

	if (hour === workHour && workHour !== studyHour && workHour !== relaxHour) {
		DOMstrings.clockMsg.innerHTML = 'You should be working right now'
		DOMstrings.main.style.backgroundImage = 'url(/../img/driving.jpg)'
	}
	if (hour === studyHour && studyHour !== workHour && studyHour !== relaxHour) {
		DOMstrings.clockMsg.innerHTML = 'You should be studying right now'
		DOMstrings.main.style.backgroundImage = 'url(/../img/study.jpg)'
	}
	if (hour === relaxHour && relaxHour !== workHour && relaxHour !== studyHour) {
		DOMstrings.clockMsg.innerHTML = 'Take some time in a quiet room to relax'
		DOMstrings.main.style.backgroundImage = 'url(/../img/relax.jpg)'
	}
	if (hour !== workHour && hour !== studyHour && hour !== relaxHour) {
		DOMstrings.clockMsg.innerHTML = 'Do whatever you want!'
		DOMstrings.main.style.backgroundImage = 'url(/../img/freeToDo.jpg)'
	}
	if (
		relaxHour === studyHour ||
		relaxHour === workHour ||
		workHour === studyHour
	) {
		DOMstrings.clockMsg.innerHTML =
			'Schedule conflicts. Adjust something in the menu!'
		DOMstrings.main.style.backgroundImage = 'url(/../img/confused.jpg)'
	}
}

window.addEventListener('load', () => {
	calcDayState()
})

DOMstrings.updateBtn.addEventListener('click', () => {
	calcDayState()
})
