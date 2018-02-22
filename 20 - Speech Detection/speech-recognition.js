var speechRecognitionModule = (function() {
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	const recognition = new SpeechRecognition();
	const words = document.querySelector('.words');
	let p = document.createElement('p');
	
	function showTranscript(e) {
		const transcript = Array.from(e.results)
			.map(result => result[0])
			.map(result => result.transcript)
			.join('');

		p.textContent = transcript;

		// If the speech recognition result is final, 
		// stop updating the text content of the paragraph.
		// Create a new empty p for interim result display.
		if (e.results[0].isFinal) {
			p = document.createElement('p');
			words.appendChild(p);
		}

	}

	function init() {
		// Show interim speech recognition results, don't wait 
		// until the person is finished speaking
		recognition.interimResults = true;

		// Add an empty p where we'll show our interim results
		words.appendChild(p);

		// Add our event listeners
		recognition.addEventListener('result', showTranscript);
		recognition.addEventListener('end', recognition.start);

		// Starting listening
		recognition.start();
	}

	return {
		init: init,
	};
})();

window.onload = speechRecognitionModule.init();
