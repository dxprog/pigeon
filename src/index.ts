import { Pigeon } from './Pigeon';

// This gets ripped out when I have proper testing in place
document.addEventListener('DOMContentLoaded', () => {
  const pigeon = new Pigeon('/pigeon/tests/');
  pigeon.get('/test.json').then(response => {
    console.log(response);
  });
});