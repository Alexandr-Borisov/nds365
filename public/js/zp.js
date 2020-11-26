const zpForm = document.forms.form;

zpForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const director = event.target.director.value;
  const manager = event.target.manager.value;

  const response = await fetch('/docs/calc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ director, manager }),
  });

  const result = await response.json();
  document.querySelector('#ndflDir').innerText = +result.NdflDir.toFixed(0);
  document.querySelector('#onCardDir').innerText = +result.cardDir.toFixed(0);
  document.querySelector('#paywithsalDir').innerText = +result.vznosDir.toFixed(0);
  document.querySelector('#priceDir').innerText = +result.priceDir;

  document.querySelector('#ndflMan').innerText = +result.NdflMan.toFixed(0);
  document.querySelector('#onCardMan').innerText = +result.cardMan.toFixed(0);
  document.querySelector('#paywithsalMan').innerText = +result.vznosMan.toFixed(0);
  document.querySelector('#priceMan').innerText = +result.priceMan;

  document.querySelector('#sum').innerText = Number(director) + Number(manager);
  document.querySelector('#ndflDM').innerText =
    Number(result.NdflDir.toFixed(0)) + Number(result.NdflMan.toFixed(0));
  document.querySelector('#onCardDM').innerText =
    Number(result.cardDir.toFixed(0)) + Number(result.cardMan.toFixed(0));
  document.querySelector('#paywithsalDM').innerText =
    Number(result.vznosDir.toFixed(0)) + Number(result.vznosMan.toFixed(0));
  document.querySelector('#priceDM').innerText = result.priceDir + result.priceMan;
});
