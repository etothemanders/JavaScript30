const stickyNavModule = (function() {
	const nav = document.querySelector('#main');
	const topOfNav = nav.offsetTop;

	function fixNav() {
		if (window.scrollY >= topOfNav) {
			document.body.classList.add('fixed-nav');
			document.body.style.paddingTop = `${nav.offsetHeight}px`;
		} else {
			document.body.classList.remove('fixed-nav');
			document.body.style.paddingTop = 0;
		}

	}

	function init() {
		window.addEventListener('scroll', fixNav);
	}

	return {
		init: init,
	};
})();

window.onload = stickyNavModule.init();
