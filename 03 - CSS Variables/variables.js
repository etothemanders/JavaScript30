const variablesModule = (() => {
	const controls = document.querySelectorAll('.controls input');

	function handleUpdate() {
		const unit = this.dataset.sizing || '';
		document.documentElement.style.setProperty(`--${this.name}`, this.value + unit);
	}

	function init() {
		controls.forEach(control => control.addEventListener('change', handleUpdate));
		controls.forEach(control => control.addEventListener('mousemove', handleUpdate));
	}

	return {
		init: init,
	};
})();

window.onload = () => variablesModule.init();
