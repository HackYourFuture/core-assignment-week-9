import UI from './ui.js';

/**
 * Main function to initialize the Nobel Prize Explorer application
 */
function main() {
  const ui = new UI();
  ui.initialize();

  console.log('Nobel Prize Explorer initialized');
  console.log(
    'API Documentation: https://www.nobelprize.org/about/developer-zone-2/'
  );
}

window.addEventListener('load', main);
