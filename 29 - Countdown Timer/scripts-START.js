const timerModule = (function() {
	let countdown;
	const timerDisplay = document.querySelector('.display__time-left');
	const endTime = document.querySelector('.display__end-time');
	const buttons = document.querySelectorAll('[data-time]');

	function displayEndTime(timestamp) {
		const end = new Date(timestamp);
		const hours = end.getHours();
		const minutes = end.getMinutes();
		endTime.textContent = `Be Back At ${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' : ''}${minutes}`;
	}

	function displayTimeLeft(seconds) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		const display = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

		timerDisplay.textContent = display;
		document.title = display;
	}

	function timer(seconds) {
		clearInterval(countdown);

		const now = Date.now(); // ms since Jan 1 1970
		const then = now + (seconds * 1000); // ms

		displayTimeLeft(seconds);
		displayEndTime(then);
		
		countdown = setInterval(() => {
			const secondsLeft = Math.round((then - Date.now()) / 1000);

			if (secondsLeft < 0) {
				clearInterval(countdown);
				return;
			}

			displayTimeLeft(secondsLeft);
		}, 1000);
	}

	function startTimer() {
		const seconds = parseInt(this.dataset.time, 10);
		timer(seconds);
	}

	function handleSubmit(ev) {
		ev.preventDefault();
		const minutes = this.minutes.value * 60;
		timer(minutes);
		this.reset();
	}

	function init() {
		buttons.forEach(button => button.addEventListener('click',  startTimer));
		document.customForm.addEventListener('submit', handleSubmit);
	}

	return {
		init: init,
	};
})();

window.onload = timerModule.init();
