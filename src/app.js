// Constants
const button1 = document.getElementById('crypto-get');
const form_coin = document.getElementById('Coin');
const api_key = ' ';
// Selectors
const iconElement = document.querySelector(".img-sizing");
const titleElement = document.querySelector(".crypto-title");
const divElement = document.querySelector(".information");
const bodyElement = document.querySelector(".crypto-details");

// Event listener when button pressed
button1.addEventListener('click', syncData);

function syncData(){
    let coin = document.getElementById('Coin').value.toUpperCase();
    getData(coin)
        .then(data => {
            fillData(data);
    }).catch(function(error){
        if (window.confirm('Invalid Coin entered, click OK to visit a webisite with all of the currency abbreviations.')) 
        {
            window.location.href='https://abbreviations.yourdictionary.com/articles/major-cryptocurrency-abbreviations.html';
        };
    })
}

// Enter key is pressed anywhere on the document
document.body.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        syncData();
    }
});


// Asynchronous fetch function
async function getData(coin)
{
    let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.nomics.com/v1/currencies/ticker?key=${api_key}&ids=${coin}&interval=1d,30d&convert=USD`);
    if(!response.ok){
        throw Error(response.statusText);
    }
    let data = await response.json();
    return data;
}

// Fill web page with API data
function fillData(data){
    // Clear div to start fresh before inputting a new coin
    divElement.innerHTML = '<p class="card-text crypto-details"></p>';
    iconElement.src = data[0].logo_url;
    titleElement.innerHTML = data[0].id;
    document.querySelector(".crypto-details").innerHTML = "Price: " + data[0].price;

    // Create additional paragraph tag for 1 day
    let para = document.createElement("p");
    let t = document.createTextNode("1 Day Price Change: " + data[0]['1d'].price_change);
    para.appendChild(t);
    document.querySelector(".information").appendChild(para);

    // Unhide
    document.querySelector(".custom-visibility").style.visibility = "visible";
}
