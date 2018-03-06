const whackAMoleGame = (function() {
	const holes = document.querySelectorAll('.hole');
	const scoreBoard = document.querySelector('.score');
	const moles = document.querySelectorAll('.mole');
	const startButton = document.querySelector('.start');
	const max = 2000;
	const min = 200;
	let playing = false;
	let lastHole, timesUp, score;

	function randomTime() {
		return Math.round((Math.random() * (max - min)) + min);
	}

	function randomHole() {
		const idx = Math.floor(Math.random() * holes.length);
		const hole = holes[idx];
		if (hole !== lastHole) {
			lastHole = hole;
			return hole;
		} else {
			return randomHole();
		}
	}

	function peep() {
		const time = randomTime();
		const hole = randomHole();

		hole.classList.add('up');

		setTimeout(() => {
			hole.classList.remove('up');
			if (!timesUp) peep();
		}, time);
	}

	function hit(ev) {
		if (!ev.isTrusted) return;
		score++;
		scoreBoard.textContent = score;
		this.parentNode.classList.remove('up');
	}

	function startGame() {
		if (playing) return;
		playing = true;
		timesUp = false;
		score = 0;
		scoreBoard.textContent = score;

		peep();
		setTimeout(() => {
			timesUp = true;
			playing = false;
		}, 10000);
	}

	function init() {
		moles.forEach(mole => mole.addEventListener('click', hit));
		startButton.addEventListener('click', startGame);
	}

	return {
		init: init,
	};
})();

window.onload = whackAMoleGame.init();
