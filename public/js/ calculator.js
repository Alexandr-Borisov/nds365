const earnings = document.querySelector('#earnings');
const bank = document.querySelector('#bank');
const nds = document.querySelector('#nds');
const np = document.querySelector('#np');
const debit = document.querySelector('#debit');
const credit = document.querySelector('#credit');
const cashgap = document.querySelector('#cashgap');

const button = document.querySelector('#calculate');
button.addEventListener('submit', async (event) => {
  event.preventDefault();
  const resolve = await fetch('calculator_rout/calculator', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ earnings, bank, nds, np, debit, credit, cashgap });
  })

});
