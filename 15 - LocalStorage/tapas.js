const tapasModule = (function() {
	const addItems = document.querySelector('.add-items');
	const itemsList = document.querySelector('.plates');
	const items = JSON.parse(localStorage.getItem('items')) || [];

	function populateItems(plates, platesList) {
		platesList.innerHTML = plates.map((plate, i) => {
			return `
				<li>
					<input type="checkbox" name="plate" data-index="${i}" id="plate${i}" ${plate.done ? 'checked': ''}/>
					<label for="plate${i}">${plate.name}</label>
				</li>
			`;
		}).join('');
	}

	function addItem(ev) {
		ev.preventDefault();
		const input = (this.querySelector('[name="item"]')).value;
		let item = {
			name: input,
			done: false,
		};
		items.push(item);
		populateItems(items, itemsList);
		localStorage.setItem('items', JSON.stringify(items));
		this.reset();
	}

	function toggleDone(ev) {
		if (!ev.target.matches('input')) return;

		const input = ev.target;
		const index = input.dataset.index;

		items[index].done = !items[index].done;
		localStorage.setItem('items', JSON.stringify(items));
		populateItems(items, itemsList);
	}

	function init() {
		addItems.addEventListener('submit', addItem);
		itemsList.addEventListener('click', toggleDone);
		populateItems(items, itemsList);
	}

	return {
		init
	};
})();

window.onload = tapasModule.init();
