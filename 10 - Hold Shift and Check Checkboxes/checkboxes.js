const checkboxesModule = (function() {
	const checkboxes = document.querySelectorAll('input[type="checkbox"]');
	let lastClicked = undefined;

	function handleCheck(ev) {
		if (ev.shiftKey && this.checked && lastClicked && lastClicked.checked) {
			let inBetween = false;

			checkboxes.forEach(checkbox => {
				if (checkbox === this || checkbox === lastClicked) inBetween = !inBetween;
				if (inBetween) checkbox.checked = true;
			});	
		}

		lastClicked = this;
	}


	function init() {
		checkboxes.forEach(checkbox => {
			checkbox.addEventListener('click', handleCheck);
		});
	}

	return {
		init: init,
	};
})();

window.onload = () => checkboxesModule.init();
