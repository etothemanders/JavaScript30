const followNavModule = (function() {
	const triggers = document.querySelectorAll('.cool li');
	const dropdownBackground = document.querySelector('.dropdownBackground');
	const nav = document.querySelector('.top');

	function handleEnter() {
		this.classList.add('trigger-enter');
		setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
		dropdownBackground.classList.add('open');

		const dropdownRect = this.querySelector('.dropdown').getBoundingClientRect();

		const coords = {
			height: dropdownRect.height,
			width: dropdownRect.width,
			top: dropdownRect.top - nav.offsetTop,
			left: dropdownRect.left - nav.offsetLeft,
		};

		dropdownBackground.style.setProperty('height', `${coords.height}px`);
		dropdownBackground.style.setProperty('width', `${coords.width}px`);
		dropdownBackground.style.setProperty('top', `${coords.top}px`);
		dropdownBackground.style.setProperty('left', `${coords.left}px`);
	}

	function handleLeave() {
		this.classList.remove('trigger-enter', 'trigger-enter-active');
		dropdownBackground.classList.remove('open');
	}
	
	function init() {
		triggers.forEach(trigger => {
			trigger.addEventListener('mouseenter', handleEnter);
			trigger.addEventListener('mouseleave', handleLeave);
		});
	}

	return {
		init: init,
	};
})();

window.onload = followNavModule.init();
