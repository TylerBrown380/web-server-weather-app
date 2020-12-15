console.log('client side javasscript file is loaded.');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

//messageOne.textContent = 'From Javascript'

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const location = search.value;
        messageOne.textContent = 'Loading...'
        fetch('/weather?address='+location).then((response) => {
        response.json().then((data) =>{
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = 'Weather for ' + data.location + ',';
                messageTwo.textContent = data.forecast
            }
        })
    })
})