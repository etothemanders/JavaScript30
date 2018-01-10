# Notes

0. Revealing module pattern practice

0. keyboard events, playing audio, transitionend event


# Questions

0. Keydown vs. Keypress
keydown - an event corresponding to a physical key press which hasn't been translated with a keyboard layout yet so the character is unknown.
keypress - corresponds to a character being typed, so may not be associated with a single key. not all keys when pressed result in keypress events (arrow keys).

tldr; use keydown and check the .keyCode prop for value.

Source: https://lists.webkit.org/pipermail/webkit-dev/2007-December/002992.html via https://www.quirksmode.org/dom/events/keys.html

0. <kbd>
the keyboard input element - semantic markup to represent a span of inline text denoting textual user input. rendered by convention as default monospace font (but not mandated by HTML spec).


# TODO

0. implement using AMD instead of revealing module pattern
