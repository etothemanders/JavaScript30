const canvasModule = (function() {
	const canvas = document.querySelector('#draw');
	const ctx = canvas.getContext('2d');
	let isDrawing = false;
	let lastX = 0;
	let lastY = 0;
	let hue = 0;
	let direction = true;
	let lineWidth = 0;

	const startDrawing = (ev) => {
		isDrawing = true;
		[lastX, lastY] = [ev.offsetX, ev.offsetY];
	};
	
	const draw = (ev) => {
		if (!isDrawing) return;

		ctx.strokeStyle = `hsl(${hue}, 90%, 50%)`;
		ctx.lineWidth = lineWidth;

		ctx.beginPath();
		ctx.moveTo(lastX, lastY);
		ctx.lineTo(ev.offsetX, ev.offsetY);
		ctx.stroke();

		[lastX, lastY] = [ev.offsetX, ev.offsetY];
		hue = (hue + 1) % 360;
		if (direction) {
			lineWidth++;
		} else {
			lineWidth--;
		}

		if (lineWidth > 50 || lineWidth < 1) {
			direction = !direction;
		}
	};

	const resizeCanvas = () => {
		canvas.height = window.innerHeight;
		canvas.width = window.innerWidth;
	};

	const setInitialStyles = () => {
		ctx.strokeStyle = hue;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
	};

	const init = () => {
		resizeCanvas();
		setInitialStyles();

		canvas.addEventListener('mousemove', draw);
		canvas.addEventListener('mouseout', () => isDrawing = false);
		canvas.addEventListener('mousedown', startDrawing);
		canvas.addEventListener('mouseup', () => isDrawing = false);
	};

	return {
		init: init,
	};
})();

window.onload = () => canvasModule.init();
