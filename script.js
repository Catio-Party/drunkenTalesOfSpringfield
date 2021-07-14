const app = {}

app.mainBoard = document.querySelector('.mainBoard')
app.gameOver = document.querySelector('.gameOver')
app.gameGrid = document.querySelector('.gameGrid')
app.soberLevel = document.querySelector('.soberLevel')
app.characterQuoteDisplay = document.querySelector('.characterQuote')
app.highScoreDisplay = document.querySelector('.highScore')
app.currentScoreDisplay = document.querySelector('.currentScore')


app.area = []
app.sober = 50
app.currentScore = 0
app.highScore = 0
app.level = 0;
app.characterChosen;

app.characterQuotes = []

app.url = new URL('http://api.chrisvalleskey.com/fillerama/get.php')
app.url.search = new URLSearchParams({
    format: 'json',
})

app.apiCall = async (param, show, character) => {
    const tryNew = async () => {
        app.url.searchParams.set(param, show)
        const res = await fetch(app.url)
        const data = await res.json()
        return data
    }
    await tryNew(character)
        .then((res) => {
            console.log('callllled')
            app.characterQuotes = res.db.filter(x => x.source == character).map(x => x.quote)
        })
    return Promise.resolve()
}



app.displayCharacteristics = async () => {
    //API Call for Quotes
    await app.apiCall('show', 'simpsons', 'Homer')
    app.characterQuoteDisplay.textContent = app.characterQuotes[1]

    //Change Quote function
    app.changeQuote = () => {
        console.log('changing quotes')
        let randomQuoteNum = Math.floor(Math.random() * app.characterQuotes.length)
        app.characterQuoteDisplay.textContent = app.characterQuotes[randomQuoteNum]
    }
    //Call Funtions and setInterval
    app.changeQuote()
    app.quoteInterval = () => endQuote = setInterval(app.changeQuote, 7500)
    app.quoteInterval()

    //Change character Profile Div
    


}

app.clearQuotes = () => clearInterval(endQuote)

app.displayCharacteristics()





//Make the playing field
app.makeGrid = () => {
    for (let i = 1; i <= 100; i++) {
        let place = document.createElement('div')
        place.classList.add("place")
        app.gameGrid.appendChild(place)
        app.area.push(place)
    }
}

//Generate a random beer
app.randomBeer = () => {
    //Generate a beerIndex that is not already taken by another beer
    let beerIndex
    do {
        beerIndex = Math.floor(Math.random() * app.area.length)
    } while (app.area[beerIndex].classList.contains('beer'))

    // console.log(`level: ${app.level}`)
    app.area[beerIndex].classList.add('beer')
    setTimeout(() => {
        app.area[beerIndex].classList.remove('beerAndWine')
        app.area[beerIndex].classList.remove('beer')

    }, 4000)
}

//Generate a random liquor
app.randomLiquor = () => {
    console.log('randomLiquor')

}

//Generate a random wine
app.randomWine = () => {
    console.log('randomwine')
    // let control;
    // app.level >= 5 ? control = 5 : control = app.level
    let wineMoveCounter = 0

    let randomWineNum = Math.floor(Math.random() * app.area.length)
    app.area[randomWineNum].classList.contains('beer') ? (app.area[randomWineNum].classList.add('beerAndWine'), app.area[randomWineNum].classList.add('wine')) : app.area[randomWineNum].classList.add('wine')

    app.moveWine = () => {
        wineMoveCounter++
        app.area[randomWineNum].classList.remove('beerAndWine')
        app.area[randomWineNum].classList.remove('wine')
        randomWineNum % 10 != 9 ? randomWineNum++ : randomWineNum -= 9
        app.area[randomWineNum].classList.contains('beer') ? (app.area[randomWineNum].classList.add('beerAndWine'), app.area[randomWineNum].classList.add('wine')) : app.area[randomWineNum].classList.add('wine')
        wineMoveCounter >= 10 ? (loseWine = 0, app.area[randomWineNum].classList.remove('beerAndWine'), app.area[randomWineNum].classList.remove('wine'), app.finishWine()) : null
    }
    app.moveWineInterval = () => stopWineInterval = setInterval(app.moveWine, 500 - (2 * app.level))
    app.finishWine = () => clearInterval(stopWineInterval)
    app.moveWineInterval();
}

//need function for producing random liquor and unifying all 3 alcohols into a single function

//Set Intervals for getting Wine and Beer
app.wine = () => endWine = setInterval(app.randomWine, 6000 - 25 * app.level)
app.beer = () => endBeer = setInterval(app.randomBeer, 500 - 2.5 * app.level)

app.clearBeer = () => clearInterval(endBeer)
app.clearWine = () => clearInterval(endWine)

//Control the Sobriety Bar
app.moveSoberBar = () => {
    app.soberLevel.style.width = `${app.sober}%`
}

// Add events for clicking wine/hard liquor, and tracking scores
app.makeClick = () => {
    app.area.map(x => x.addEventListener("click", (e) => {

        //      e.target.innerHTML = `<img class="pokeFound" src=${pokeArray[pokeSelection][2]}>`
        //      pokemonDisplay.textContent = `Player ${playerArray[turnIndex]} caught Pokemon number ${pokeArray[pokeSelection][1]}, ${pokeArray[pokeSelection][0]}!`

        if (e.target.classList.contains('beer') && e.target.classList.contains('wine')) {
            console.log('both at the same time')
            app.clearBeer()
            app.finishWine()
            app.clearWine()
            e.target.classList.remove('beer')
            e.target.classList.remove('wine')
            e.target.classList.remove('beerAndWine')
            app.sober <= 19 ? app.sober = 0 : app.sober -= 20;
            app.moveSoberBar()
            app.currentScore += 20;
            app.currentScoreDisplay.textContent = app.currentScore
            console.log(app.sober)
            app.beer()
            app.wine()
        } else if (e.target.classList.contains('beer')) {
            console.log("makeclick")
            app.clearBeer()
            e.target.classList.remove('beer')
            app.sober <= 3 ? app.sober = 0 : app.sober -= 4;
            app.moveSoberBar()
            app.currentScore += 3
            app.currentScoreDisplay.textContent = app.currentScore
            app.currentScore > app.highScore ? app.highScoreDisplay.textContent = app.currentScore : null
            console.log(app.sober)
            app.level++
            // console.log(app.level)
            app.beer()
        } else if (e.target.classList.contains('wine')) {
            console.log("makeclick")
            app.clearWine()
            app.finishWine()
            e.target.classList.remove('wine')
            app.sober <= 7 ? app.sober = 0 : app.sober -= 8;
            app.moveSoberBar()
            app.currentScore += 7
            app.currentScoreDisplay.textContent = app.currentScore
            app.currentScore > app.highScore ? app.highScoreDisplay.textContent = app.currentScore : null
            console.log(app.sober)
            app.level++
            // console.log(app.level)
            app.wine()
        } else if (!e.target.classList.contains('beer')) {
            console.log('you suck')
            app.currentScore -=
                app.currentScoreDisplay.textContent = app.currentScore
            app.currentScore > app.highScore ? app.highScoreDisplay.textContent = app.currentScore : null
            app.sober += 3
            console.log(app.sober)
        }
    }))
}

//Increase Sobriety and check to see if game is over
app.soberCheck = (totalChecks = 0) => {
    const addSober = () => {
        return new Promise((resolve) => {
            //redo
            app.sober += 0.5;
            app.moveSoberBar()
            setTimeout(resolve, (500 - (totalChecks * 0.0875) * 25))
        })
    }
    const finalCheck = async () => {
        await addSober();
        app.sober >= 100
            ? (app.clearBeer(), app.clearWine(), console.log("Game Over"), app.mainBoard.style.display = "none", app.gameOver.style.display = "flex")
            : (totalChecks++, app.soberCheck(totalChecks))
    }
    finalCheck()
}


//LOADING PAGE

//Make a listener all buttons (click), choose character player picks and manipulate into mainBoard
//Hide loading page and display mainBoard 
//Add an h2 that shows the high score. 

// const characterButton = document.getElementsByClassName('characterButton')
// const loadingPage = document.getElementsById('loading')
// const mainBoard = document.getElementById('mainBoard')

// const characterPic = document.querySelector('.d')
// characterPic.innerHTML = `<img class="make a class here" src=${chacacter image link here}>`




// characterButton.forEach(button => button.addEventListener('click', (e) => {
//     // change ID to button
//     e.target.classList.contains('barney')
//     ? mainBoard.characterdiv.innerHTML = add pic of barney
//     : e.target.classList.contains('homer')
//     ? mainBoard.chardiver = homer 
//     : etc etc 

// loadingPage.style.display = "none"
// mainBoard.style.display = "block"

// }))

// for (let i  = 0; i < characterButton.length; i ++ ) {
//     characterButton[i].addEventListener('click', () => {
//         do this do that do this
//     })
// }




app.init = () => {
    app.makeGrid()
    app.makeClick()
    app.beer()
    app.wine()
    app.soberCheck()
}

app.init()
