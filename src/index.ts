import { Pigeon } from './Pigeon';

// This gets ripped out when I have proper testing in place
document.addEventListener('DOMContentLoaded', () => {
  const pigeon = new Pigeon('/pigeon/tests/');
  pigeon.batchUpdate('/test.json', {
    param1: 'this is a parameter',
    param2: true
  }).then(response => {
    console.log(response);
  });
});