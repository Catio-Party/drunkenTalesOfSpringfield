// PSEUDO CODE:
// make the 'retry' and 'try with new character' buttons functional: 
    // click on retry displays fresh gameboard/mainBoard
    // click on new character displays loading screen
// update current score
// update high score
    // - if the current score is => high score, update high score with current score value
    // - if current score is < high score, high score doesn't change

const app = {}

app.retryButton = document.querySelector('.retry');
app.changeCharacterButton = document.querySelector('.changeCharacter');
app.mainBoard = document.querySelector('.mainBoard');
app.loadingPage = document.querySelector('.loading');
app.gameOver = document.querySelector('.gameOver');
app.currentScore = "fun times";
app.highScore = "funest times";


app.gameOver = (e) => {
    e.target.classList.contains('retry') 
        ? (app.mainBoard.style.display = 'flex', app.gameOver.style.display = 'none', app.StartGame())
        : (app.loadingPage.style.display = 'flex', app.gameOver.style.display = 'none');
}

app.retryButton.addEventListener('click', app.gameOver);
app.changeCharacterButton.addEventListener('click', app.gameOver);

app.setScore = (e) => {
    document.querySelector('.endCurrentScore').textContent = app.currentScore;
}

app.setHighScore = () => {
    app.currentScore > app.highScore
    ? (app.highScore = app.currentScore, app.highScore.textContent = app.highScore)
    : app.highScore = app.highScore
}