const typeAheadModule = (function() {
	const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
	const input = document.querySelector('.search');
	const suggestions = document.querySelector('.suggestions');
	let cities = [];

	function addHighlight(match) {
		const regex = new RegExp(`${input.value}`, 'gi');
		return match.replace(regex, '<span class="hl">$&</span>');
	}

	function formatPopulation(population) {
		return parseInt(population, 10).toLocaleString('en-US');
	}

	function formatPop(pop) {
		let formatted = '';
		let c = 0;
		for (let i = pop.length - 1; i > -1; i--) {
			formatted = pop[i] + formatted;
			c += 1;
			if (c === 3 && i > 0) {
				formatted = ',' + formatted;
				c = 0;
			}
		}
		return formatted;
	}

	function displayMatches(matches) {
		const html = matches.map(match => {
			const cityMatch = addHighlight(match.city);
			const stateMatch = addHighlight(match.state);
			const population = formatPop(match.population);
			return `
				<li>
					<span>${cityMatch}, ${stateMatch}</span>
					<span>${population}</span>
				</li>
			`;
		}).join('');
		suggestions.innerHTML = html;
	}

	function filterCities() {
		const searchString = input.value;
		const regex = new RegExp(`${searchString}`, 'gi');
		const matches = cities.filter(item => item.city.match(regex) || item.state.match(regex));
		displayMatches(matches);
	}

	const parseResponse = response => response.json();
	const updateCities = data => {
		cities = data;
		return;
	}
	const listenForUserInput = () => input.addEventListener('keyup', filterCities);

	function init() {
		fetch(endpoint)
		.then(parseResponse)
		.then(updateCities)
		.then(listenForUserInput)
		.catch(error => console.log('Error:' + error));
	}

	return {
		init: init,
	};
})();

window.onload = typeAheadModule.init();
