const speechModule = (function() {
	const msg = new SpeechSynthesisUtterance();

	const voicesDropdown = document.querySelector('[name="voice"]');
	const options = document.querySelectorAll('[type="range"], [name="text"]');
	const speakButton = document.querySelector('#speak');
	const stopButton = document.querySelector('#stop');
	
	let voices = [];

	function populateVoices() {
		voices = this.getVoices();
		
		const voiceOptions = voices
			.filter(voice => voice.lang.startsWith('en'))
			.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
			.join('');

		voicesDropdown.innerHTML = voiceOptions;
	}

	function setVoice() {
		msg.voice = voices.find(voice => voice.name === this.value);
		toggle();
	}

	function toggle(startOver = true) {
		speechSynthesis.cancel();
		if (startOver) {
			speechSynthesis.speak(msg);
		}
	}

	function setOption() {
		msg[this.name] = this.value;
		toggle(msg);
	}

	function init() {
		msg.text = document.querySelector('[name="text"]').value;

		speechSynthesis.addEventListener('voiceschanged', populateVoices);
		voicesDropdown.addEventListener('change', setVoice);

		options.forEach(option => option.addEventListener('change', setOption));

		speakButton.addEventListener('click', toggle);
		stopButton.addEventListener('click', () => toggle(false));
	}

	return {
		init: init,
	};
})();

window.onload = speechModule.init();
