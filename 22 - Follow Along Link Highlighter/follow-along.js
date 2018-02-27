const followAlongModule = (function() {
	const triggers = document.querySelectorAll('a');
	const highlight = document.createElement('span');

	function positionHighlight() {
		const linkRect = this.getBoundingClientRect();

		highlight.style.height = `${linkRect.height}px`;
		highlight.style.width = `${linkRect.width}px`;

		const viewportX = linkRect.x + window.scrollX;
		const viewportY = linkRect.y + window.scrollY;
		highlight.style.transform = `translate(${viewportX}px, ${viewportY}px)`;
	}

	function init() {
		highlight.classList.add('highlight');
		document.body.append(highlight);

		triggers.forEach(a => a.addEventListener('mouseenter', positionHighlight));
	}

	return {
		init: init,
	};
})();

window.onload = followAlongModule.init();
