const sliderDragModule = (function() {
	const slider = document.querySelector('.items');
	let isDown, startX, startScrollLeft;

	function startSlide(ev) {
		isDown = true;
		slider.classList.add('active');
		startX = ev.pageX - slider.offsetLeft; // How far from the left edge of div.items did we click? accounts for slider margin
		startScrollLeft = slider.scrollLeft; // How far scrolled left is the slider currently?
		// console.log({startX, startScrollLeft});
	}

	function stopSlide() {
		isDown = false;
		slider.classList.remove('active');
	}

	function slide(ev) {
		if (!isDown) return;
		
		ev.preventDefault();
		const currentX = ev.pageX - slider.offsetLeft; // Same as how we determine start x
		const walk = currentX - startX; // How far did we move from the startX?
		// console.log(walk);
		slider.scrollLeft = startScrollLeft - walk;
	}

	function init() {
		isDown = false;
		slider.addEventListener('mousedown', startSlide);
		slider.addEventListener('mouseleave', stopSlide);
		slider.addEventListener('mouseup', stopSlide);
		slider.addEventListener('mousemove', slide);
	}

	return {
		init: init,
	};
})();

window.onload = sliderDragModule.init();
