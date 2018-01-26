const slideModule = (function() {
	const sliderImages = document.querySelectorAll('.slide-in');

	function debounce(func, wait = 20, immediate = true) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	function checkSlideIn() {
		sliderImages.forEach(image => {
			const viewportBottom = window.scrollY + window.innerHeight;
			const isHalfShown = viewportBottom - (image.height / 2) > image.offsetTop;
			const imageBottom = image.offsetTop + image.height;
			const isNotScrolledPast = window.scrollY < imageBottom;
			if (isHalfShown && isNotScrolledPast) {
				image.classList.add('active');
			} else {
				image.classList.remove('active');
			}
		});
	}

	function init() {
		// Add event listeners
		window.addEventListener('scroll', debounce(checkSlideIn));
	}

	return {
		init,
	};
})();

window.onload = slideModule.init();
