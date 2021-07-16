// PSEUDO CODE:
//LOADING PAGE
//Make a listener all buttons (click), choose character player picks and manipulate into mainBoard
//Hide loading page and display mainBoard
//Add an h2 that shows the high score.

const app = {

}


app.characterButton = document.querySelectorAll('.characterButton');
app.loadingPage = document.querySelector('.loading');
app.mainBoard = document.querySelector('.mainBoard');
app.characterPic = document.querySelector('.characterPic');
app.characterProfile = document.querySelector('.characterProfile');
app.characterQuote = document.querySelector('.characterQuote');
app.name = [];



app.characterButton.forEach(button => button.addEventListener('click', (e) => {
    e.target.classList.contains('homer')
        ? (app.name.push(e.target.id))
        : e.target.classList.contains('fry')
            ? (app.name.push(e.target.id))
            : e.target.classList.contains('darth')
                ? (app.name.push(e.target.id))
                // ? app.characterPic.innerHTML = `<img src="./assets/darth.jpg" alt="">`
                : e.target.classList.contains('han')
                    ? (app.name.push(e.target.id))
                    // ? app.characterPic.innerHTML = `<img src="./assets/han.jpg" alt="">`
                    : null;
    app.loadingPage.style.display = "none";
    app.mainBoard.style.display = "flex";
    app.displayCharacteristics();
}))

// create a function that takes in the information from the button click
app.URL = new URL('http://api.chrisvalleskey.com/fillerama/get.php');
app.URL.search = new URLSearchParams({
    format: 'json'
})

app.APICall = (param, show, character) => {
    async function getQuotes() {
        app.URL.searchParams.set(param, show);
        const response = await fetch(app.URL);
        const data = await response.json();
        return data;
    }
    getQuotes(character)
        .then((response) => {
            app.quote = response.db.filter(x => x.source == character).map(x => x.quote);
            console.log(app.quote);
        })
}
app.APICall('show', 'simpsons', `${app.name[0]}`);

// also make this async
app.displayCharacteristics = () => {
    app.characterProfile.textContent = app.name[0];
    app.characterPic.innerHTML = `<img src="./assets/${app.name[0]}.jpg" alt="">`;
    app.characterQuote.textContent = app.quote[Math.floor(Math.random() * app.quote.length)];
}
