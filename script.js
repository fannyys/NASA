//Skapa ref/variabel till element/klasser i html
const switchBtn = document.querySelector('#switchBtn');
const bodyRef = document.querySelector('body');
const darkModeKey = 'theme-dark';
const darkModeValue = 'active';
const btnSubmit = document.querySelector('#btn-submit');
const nameInput = document.querySelector('#name');
const hiddenSection = document.querySelector('#hidden');
const greetingMessage = document.querySelector('#greetingMessage');

// --------------------För dynamisk layout----------------------

//För att kontrollera om det finns något i localStorage
if(localStorage.getItem(darkModeKey) === darkModeValue){
    //Är det sant så är localStorage satt och klassen dark ska läggas till på body 
    console.log('Det finns ett localStorage satt');
    //Anropar en function
    enabledDarkMode();
};

//Lyssnare som lyssnar efter klick
switchBtn.addEventListener('click', () => {
    //Vad ska hända vid klick?
    console.log('Du klickade på switch');
    //Anropar en function
    toggleDarkMode();
});

function toggleDarkMode(){
    console.log('Nu körs toggleDarkMode');
    if(bodyRef.classList.contains('dark')){
        //OM body har klassen dark på sig
        console.log('Klassen dark finns');
        //Finns klassen dark så anropas en function som avaktiverar den
        disabledDarkMode();   
    }else{
        console.log('Klassen dark finns inte');
        //Finns inte klassen dark så anropas en function som aktiverar den
        enabledDarkMode();
    }
}

function enabledDarkMode(){
    console.log('enabledDarkMode körs');
    switchBtn.checked = true;
    //Lägga till klassen dark på body
    bodyRef.classList.add('dark');
    //Anropar en funktion för att sätta local storage
    setLocalStorage();
}

function disabledDarkMode(){
    console.log('disabledDarkMode körs');
    //För att ta bort klassen dark
    bodyRef.classList.remove('dark');
    removeLocalStorage();
}

//Funktion för att sätta localStorage
function setLocalStorage(){
    console.log('setLocalStorage körs');
    //Sätta localStorage med key och value
    localStorage.setItem(darkModeKey , darkModeValue);
}

//Funktion för att rensa localStorage
function removeLocalStorage(){
    console.log('removeLocalStorage körs');
    //Ta bort satt localStorage
    localStorage.removeItem(darkModeKey);
}

// För att kontrollera att det är rätt längd ifyllt i input
nameInput.addEventListener('keyup', () => {
    let getValueLength = nameInput.value.length;
    // console.log(getValueLength);
    if(getValueLength > 3){
        console.log('Det är MER än 3 tecken!');
    }else{
        console.log('Det är MINDRE än 3 tecken!');
    }
    checkInput();
});
// Function för att göra knappen enabled om kraven är uppfyllda
function checkInput(){
    if(nameInput.value.length > 3){
        console.log('Du har fyllt i ett tillräckligt långt namn!');
        btnSubmit.disabled = false;
    }else{
        btnSubmit.disabled = true;
    }
}

// Lyssnare som lyssnar efter klick och för att disabla knappen när fältet inte uppfyller kraven
btnSubmit.addEventListener('click', (event) => {
    console.log('Du klickade på knappen');
    // För att ta bort default beteende på btn
    event.preventDefault();
    btnSubmit.disabled = true;
    
    // För att kontrollera om det är tomt och att knappen då ska bli disabled
    if(nameInput.value === ''){
        // Om det är tomt
        console.log('Det är tomt');
        greetingMessage.textContent = 'Please enter your name';
    }else{
        console.log('Det är inte tomt');
        greetingMessage.textContent = `Welcome to Space, ${nameInput.value}!`;
        // För att rensa input
        nameInput.value = '';
    }
});


// Lyssnare som lyssnar efter när input är i focus och inte
nameInput.addEventListener('focus', () =>{
    console.log('Du står i input!');
});
nameInput.addEventListener('blur', () =>{
    console.log('Du står utanför input!');
});


// -------------------NASA-----------------------------
// För NASA bilder
const apiUrlCuriosity = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=8nGEDXW4L8kHe9hYtFJTXjAG32UAVIS00RmJMxyO';

// // Api key: 8nGEDXW4L8kHe9hYtFJTXjAG32UAVIS00RmJMxyO
// // https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=DEMO_KEY

// // För att hämta data
fetch(apiUrlCuriosity)
    .then(response => response.json())
    .then(data => {
        //Vad ska vi göra med datan?
        // console.log(data.photos);
        const imgs = data.photos;
        const marsCards = document.querySelector('.main-info');
        const marsImg = document.querySelector('.mars-photo');
        
        if(imgs.length !== 0){
            console.log('Det finns data');
            // För att skapa en loop som loopar igenom datan som finns
            imgs.forEach(photo => {
                console.log(photo);
                // För att anropa en function som skapar upp ett nytt kort
                // skickar med photo in i function
                const newCard = createCard(photo);

                // Lägger till det nya kortet i container
                marsCards.append(newCard);
            });
        }else{
            //Om det inte finns bilder så kommer en popup notis upp samt det skriver i console.log
            alert('Det finns tyvärr inga bilder för denhär dagen!');
            console.log('Det finns ingen data för tillfället.');
        }
    }).catch(error => console.log(`Detta är felet: ${error}`));

// Function som skapar upp ett nytt kort, i () skickar vi in datan från createCard anropet
function createCard(photo){
    // console.log('createCard körs');

    //För att skapa ett nytt kort krävs dessa
    const article = document.createElement('article');
    const textDiv = document.createElement('div');
    const h3 = document.createElement('h3');
    const pTag = document.createElement('p');
    const imgDiv = document.createElement('div');
    const img = document.createElement('img');

    // Lägger till klasser
    article.classList.add('cards');
    textDiv.classList.add('text');
    imgDiv.classList.add('mars-photo');

    // Lägger till text
    h3.textContent = photo.rover.name;
    // Lägga till earth_date
    pTag.textContent = photo.earth_date;

    // Sätta src på img
    img.setAttribute('src', photo.img_src);

    // Lägger till element i article
    imgDiv.append(img);
    article.append(imgDiv, textDiv);
    textDiv.append(h3, pTag);
    console.log(article)

    // Skickar tillbaka det nya kortet in i loop
    return article;
}

// För att dölja section med bilder när man laddas in på sidan
document.addEventListener('DOMContentLoaded', () =>{
    let hiddenSection = document.getElementById('hidden');
    let btnSubmit = document.getElementById('btn-submit');
    let nameInput = document.getElementById('name');
    
    let inputValue = nameInput.value.trim();
    // För att dölja section när man laddas in på sidan
    hiddenSection.style.display = 'none';
    // För att få fram innehållet igen när man klickar på knappen och fyllt kraven
    btnSubmit.addEventListener('click', () =>{
        
        if(inputValue === ''){
            hiddenSection.style.display = 'block';
        }else{
            alert('Fyll i ditt namn');
        }
    });
    
});


// ------------För Cookie Alert-------
const cookieAlert = document.querySelector('.cookieAlert');
// console.log(cookieAlert);
const cookieConsent = 'cookie-consent';

// När sidan laddas in ska detta ske
document.addEventListener('DOMContentLoaded', () =>{
    // Vad vill vi ska hända?
    // Skapar en ref till btn
    const cookieBtn = document.querySelector('#cookieBtn');
    // console.log(cookieBtn);
    // Kontrollera om det finns något i localStorage sen tidigare
    if(!localStorage.getItem(cookieConsent)){
        // Om localStorage är tomt händer detta
        console.log('Det finns inget i localStorage');
        cookieAlert.classList.add('show');
        // Lägger en lyssnare på btn
        cookieBtn.addEventListener('click', () => {
            // Vad vill vi ska hända när vi klickar?
            console.log('Du klickade på btn');
            // För att sätta localStorage
            localStorage.setItem(cookieConsent, 'consent');
            // För att ta bort klass när man har accepterat cookies
            cookieAlert.classList.remove('show');
        });
    }else{
        console.log('Det finns något i localStorage');
    }
});