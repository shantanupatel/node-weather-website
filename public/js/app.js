const weatherForm = document.querySelector('form');
const address = document.getElementById('address');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = address.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  if (location.length > 0) {
    fetch('/weather?address=' + location)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          // console.log(data.error);
          messageOne.textContent = data.error;
        } else {
          /* console.log(data.location);
          console.log(data.forecast); */
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      })
    });
  } else {
    console.log('Location is required');
  }
});

/* document.querySelector('button').addEventListener('click', () => {

}) */