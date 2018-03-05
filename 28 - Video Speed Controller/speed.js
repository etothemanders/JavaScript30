const speedModule = (function() {
	const min = 0.4;
	const max = 4;
	const video = document.querySelector('video');
	const speed = document.querySelector('.speed');
	const speedBar = document.querySelector('.speed-bar');
	let isMouseDown = false;

	// Note 1: using destructuring assignment to create default params.
	// e.g. clicked will be undefined.
	// Note 2: the event comes last because .bind() passes the sequence of provided arguments
	// to the handler before any provided by default (the event)
	function changeSpeed({clicked}={}, ev) {
		if (!isMouseDown && !clicked) return;

		const y = ev.pageY - this.offsetTop;
		const percent = y / this.offsetHeight;

		const height = `${Math.round(percent * 100)}%`;
		speedBar.style.height = height;

		const playbackRate = (max - min) * percent + min;
		const textContent = `${playbackRate.toFixed(2)}x`;

		speedBar.textContent = textContent;
		video.playbackRate = playbackRate;
	}

	function init() {
		speed.addEventListener('mousedown', () => isMouseDown = true);
		speed.addEventListener('mouseup', () => isMouseDown = false);
		speed.addEventListener('mouseleave', () => isMouseDown = false);
		speed.addEventListener('mousemove', changeSpeed.bind(speed, {})); // need the empty options argument here, otherwise .bind() will pass the event there instead
		speed.addEventListener('click', changeSpeed.bind(speed, {clicked: true}));
	}

	return {
		init: init,
	};
})();

window.onload = speedModule.init();
