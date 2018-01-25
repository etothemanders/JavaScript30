const videoModule = (() => {
	const video = document.querySelector('video');
	const playButton = document.querySelector('.toggle');
	const volumeSlider = document.querySelector('input[name="volume"]');
	const playbackSlider = document.querySelector('input[name="playbackRate"]');
	const skipButtons = document.querySelectorAll('button[data-skip]');
	const progressScrubber = document.querySelector('.progress');
	const progressBar = document.querySelector('.progress__filled');
	const fullscreenButton = document.querySelector('.fullscreen');
	let isMousedown = false;

	function togglePlay() {
		return video.paused ? video.play() : video.pause();
	}

	function updatePlayButton() {
		const icon = this.paused ? '►' : '❚ ❚';
		playButton.textContent = icon;
	}

	function adjustVolume() {
		video.volume = this.value;
	}

	function adjustPlaybackRate() {
		video.playbackRate = this.value;
	}

	function skipVideo() {
		video.currentTime += parseFloat(this.dataset.skip);
	}

	function scrubVideo(ev) {
		video.currentTime = (ev.offsetX / progressScrubber.offsetWidth) * video.duration;
	}

	function handleProgressChange() {
		const percent = (video.currentTime / video.duration) * 100;
		progressBar.style.flexBasis = `${percent}%`;
	}

	function goFullscreen() {
		video.webkitRequestFullscreen();
	}

	function init() {
		video.addEventListener('click', togglePlay);
		playButton.addEventListener('click', togglePlay);
		video.addEventListener('play', updatePlayButton);
		video.addEventListener('pause', updatePlayButton);

		volumeSlider.addEventListener('change', adjustVolume);
		volumeSlider.addEventListener('mousemove', adjustVolume);

		playbackSlider.addEventListener('change', adjustPlaybackRate);
		playbackSlider.addEventListener('mousemove', adjustPlaybackRate);

		skipButtons.forEach(skipButton => skipButton.addEventListener('click', skipVideo));

		video.addEventListener('timeupdate', handleProgressChange);

		progressScrubber.addEventListener('click', scrubVideo);
		progressScrubber.addEventListener('mousemove', (ev) => isMousedown && scrubVideo(ev));
		progressScrubber.addEventListener('mousedown', () => isMousedown = true);
		progressScrubber.addEventListener('mouseup', () => isMousedown = false);

		fullscreenButton.addEventListener('click', goFullscreen);
	}

	return {
		init
	};
})();

window.onload = () => videoModule.init();
