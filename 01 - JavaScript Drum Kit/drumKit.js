var drumKitModule = (function() {
  const HOMEKEYCODES = [65, 83, 68, 70, 71, 72, 74, 75, 76];

  function addStyle(keycode) {
    let div = document.querySelector(`div[data-key='${keycode}']`);
    div.classList.add('playing');
  }

  function removeStyle(ev) {
    if (ev.propertyName !== 'transform') return;
    ev.target.classList.remove('playing');
  }

  function playSound(keycode) {
    const audio = document.querySelector(`audio[data-key='${keycode}']`);
    audio.currentTime = 0;
    audio.play();
  }

  function handleKeydown(ev) {
    const keycode = ev.keyCode;
    if (keycode && HOMEKEYCODES.indexOf(keycode) > -1) {
      playSound(keycode);
      addStyle(keycode);
    }
  }

  function init() {
    window.addEventListener('keydown', handleKeydown);
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => key.addEventListener('transitionend', removeStyle));
  }

  return {
    init: init,
  };
})();

window.onload = () => drumKitModule.init();
