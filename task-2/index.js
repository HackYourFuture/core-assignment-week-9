import UI from './ui.js';

/**
 * Main function to initialize the Nobel Prize Explorer application
 */
function main() {
  const ui = new UI();
  ui.initialize();
}

window.addEventListener('load', main);
