const panelsModule = (function() {
	function toggleActive(ev) {
		if (ev.propertyName.startsWith('flex')) this.classList.toggle('open-active');
	}

	function toggleOpen() {
		this.classList.toggle('open');
	}

	function init() {
		const panels = document.querySelectorAll('.panel');

		panels.forEach(panel => panel.addEventListener('click', toggleOpen));
		panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
	}

	return {
		init: init,
	};
})();

window.onload = () => panelsModule.init();
