const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const effects = {
	redEffect: redEffect,
	rgbSplit: rgbSplit,
	greenScreen: greenScreen
};

function getVideo() {
	navigator.mediaDevices.getUserMedia({ video: true, audio: false })
		.then(localMediaStream => {
			video.src = window.URL.createObjectURL(localMediaStream);
			video.play();
		})
		.catch(error => console.error('An error occurred:', error));
}

function paintToCanvas() {
	const width = video.videoWidth;
	const height = video.videoHeight;

	canvas.width = width;
	canvas.height = height;

	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);

		const effect = document.querySelector('input[name="effect"]:checked').value;

		if (effect) {
			let pixels = ctx.getImageData(0, 0, width, height);
			pixels = effects[effect](pixels);
			ctx.putImageData(pixels, 0, 0);
		}

		// Ghosting effect that crashes the video feed into the canvas
		// ctx.globalAlpha = 0.1;

	}, 16);
}

function takePhoto() {
	snap.currentTime = 0;
	snap.play();

	const data = canvas.toDataURL('image/jpeg');
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'handsome');
	link.innerHTML = `<img src="${data}" alt="handsome"/>`;
	strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i + 0] = pixels.data[i + 0] + 100; // red
		pixels.data[i + 1] = pixels.data[i + 1] - 50;// green
		pixels.data[i + 2] = pixels.data[i + 2] * 0.5;// blue
	}

	return pixels;
}

function rgbSplit(pixels) {
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i - 150] = pixels.data[i + 0]; // red
		pixels.data[i + 100] = pixels.data[i + 1];// green
		pixels.data[i - 150] = pixels.data[i + 2];// blue
	}

	return pixels;
}

function greenScreen(pixels) {
	let levels = {};

	document.querySelectorAll('.rgb input').forEach(input => {
		levels[input.name] = input.value;
	});

	for (let i = 0; i < pixels.data.length; i += 4) {
		const red = pixels.data[i + 0];
		const green = pixels.data[i + 1];
		const blue = pixels.data[i + 2];

		if (
			red >= levels.rmin
			&& green >= levels.gmin
			&& blue >= levels.bmin
			&& red <= levels.rmax
			&& green <= levels.gmax
			&& blue <= levels.bmax
		) {
			pixels.data[i + 3] = 0;
		}
	}

	return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
