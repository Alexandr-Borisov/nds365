const form = document.querySelector('#calculate');
const dividends = document.querySelector('.dividends');
const tax = document.querySelector('.tax');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const earnings = event.target.earnings.value;
  const bank = event.target.bank.value;
  const debit = event.target.debit.value;
  const credit = event.target.credit.value;

  const response = await fetch('/calculator/calculator', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      earnings,
      bank,
      debit,
      credit,
      dividends,
      tax,
    }),
  });

  const answer = await response.json();
  document.querySelector('#nds').value = answer.newNds;
  document.querySelector('#np').value = answer.newNp;
  document.querySelector('#cashgap').value = answer.newCashgap;
  document.querySelector('.dividends').innerText = `${Number(answer.dividends).toFixed(
    0
  )} ₽`;
  document.querySelector('.tax').innerText = `${answer.tax} %`;
});
