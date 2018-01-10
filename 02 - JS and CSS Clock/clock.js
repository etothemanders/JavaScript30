const clockModule = (() => {
	const rotationOffset = 90; // degree offset to rotate hands up to 12
	const secondHand = document.querySelector('.second-hand');
	const minuteHand = document.querySelector('.min-hand');
	const hourHand = document.querySelector('.hour-hand');

	function addTicking(hand) {
		hand.classList.add('ticking');
	}

	function removeTicking(ev) {
		if (ev.propertyName !== 'transform') return;
		this.classList.remove('ticking');
	}

  function setDate() {
  	const now = new Date();
  	const seconds = now.getSeconds();
  	const secondsDegrees = ((seconds / 60) * 360) + rotationOffset;
  	if (secondsDegrees !== 90) addTicking(secondHand); // ony apply the transition if it isn't ticking up to 12

  	const minutes = now.getMinutes();
  	const minutesDegrees = ((minutes / 60) * 360) + rotationOffset;
  	if (minutesDegrees !== 90) addTicking(minuteHand); // ony apply the transition if it isn't ticking up to 12

  	const hours = now.getHours();
  	const hoursDegrees = ((hours / 12) * 360) + rotationOffset;
  	if (hoursDegrees !== 90) addTicking(hourHand); // ony apply the transition if it isn't ticking up to 12

    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
  }

  function init() {
    setInterval(setDate, 1000);
    const hands = document.querySelectorAll('.hand');
    hands.forEach(hand => hand.addEventListener('transitionend', removeTicking));
  }

  return {
    init: init
  } ;
})();

window.onload = () => clockModule.init();
