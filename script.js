const app = {}

//Loading Section
//Choose Character and start game
app.chooseCharacter = (e) => {
    e.target.classList.contains('homer')
        ? app.characterParams = ['simpsons', 'Homer', 'Smrt and lovable drunk']
        : e.target.classList.contains('fry')
            ? app.characterParams = ['futurama', 'Fry', 'Intergalactic delivery boy']
            : e.target.classList.contains('darth')
                ? app.characterParams = ['starwars', 'Darth Vader', 'Has daddy issues']
                : app.characterParams = ['starwars', 'Han Solo', 'Self proclaimed bad boy']
    app.loadingPage.style.display = "none";
    app.mainBoard.style.display = "flex";
    app.StartGame()
}

//API Function
app.apiCall = async (tvShow, character) => {
    const getQuotes = async () => {
        app.url.searchParams.set('show', tvShow)
        const res = await fetch(app.url)
        const data = await res.json()
        return data
    }
    await getQuotes(character)
        .then((res) => {
            app.characterQuotes = res.db.filter(x => x.source == character).map(y => y.quote).filter(z => z.split(' ').length < 27)
        })
        .catch(() => {
            app.characterQuotes.push("Drinking is fun but practice moderation.")
        })
    return Promise.resolve()
}

app.displayCharacteristics = async () => {
    //Change Character Pic and Profile  according to user selection
    document.querySelector('.characterPic').innerHTML = `<img src="./assets/${app.characterParams[1].split(' ')[0]}.jpg" alt="">`
    document.querySelector('.characterProfile').textContent = `${app.characterParams[1]}: ${app.characterParams[2]}`
    //Api Call to get Quotes and set it to display and cycle in Quotes Container.
    await app.apiCall(...app.characterParams)
    app.changeQuote = () => {
        let randomQuoteNum = Math.floor(Math.random() * app.characterQuotes.length)
        document.querySelector('.characterQuote').textContent = app.characterQuotes[randomQuoteNum]
    }
    app.changeQuote()
    app.quoteInterval = () => endQuote = setInterval(app.changeQuote, 7500)
    app.quoteInterval()
}

//Clear Quote Interval Function
app.clearQuotes = () => clearInterval(endQuote)

//MainBoard Section
//Randomizer Func
app.StartGame = () => {
    if (app.gamesPlayed > 0) {
        app.area.map(x => x.classList.remove(...app.alcoholClasses))
    }
    app.level = 0;
    app.currentScore = 0
    app.currentScoreDisplay.textContent = app.currentScore
    app.sober = 50
    app.displayCharacteristics()
    app.setAll()
    app.soberCheck()
}

app.randomizer = (array) => {
    return Math.floor(Math.random() * array.length)
}

//Make Playing Field
app.makeGrid = () => {
    for (let i = 1; i <= 100; i++) {
        let place = document.createElement('div')
        place.classList.add("place")
        document.querySelector('.gameGrid').appendChild(place)
        app.area.push(place)
    }
}

//Generate a random beer
app.randomBeer = () => {
    //Generate a beerIndex that is not already taken by another beer and change classes
    let beerIndex
    do {
        beerIndex = app.randomizer(app.area)
    } while (app.area[beerIndex].classList.contains('beer'))
    app.area[beerIndex].classList.add('beer')
    //Set it to disappear after 4 seconds
    setTimeout(() => {
        app.area[beerIndex].classList.remove('bl')
        app.area[beerIndex].classList.remove('bw')
        app.area[beerIndex].classList.remove('beer')
    }, 4000)
}

//Generate Random Liquor and move it
app.randomLiquor = () => {
    const directionArray = ['up', 'down', 'left', 'right']
    let liquorMoveCounter = 0
    let liquorIndex = app.randomizer(app.area)
    let liquorDirection = directionArray[app.randomizer(directionArray)]
    app.alcoholClasses.map(x => app.area[liquorIndex].classList.remove(x))
    //Set the correct liquor classes
    const setLiquorClasses = () => {
        app.area[liquorIndex].classList.contains('bw')
            ? (app.area[liquorIndex].classList.add('bwl'), app.area[liquorIndex].classList.add('liquor'))
            : app.area[liquorIndex].classList.contains('beer')
                ? (app.area[liquorIndex].classList.add('bl'), app.area[liquorIndex].classList.add('liquor'))
                : app.area[liquorIndex].classList.contains('wine')
                    ? (app.area[liquorIndex].classList.add('wl'), app.area[liquorIndex].classList.add('liquor'))
                    : app.area[liquorIndex].classList.add('liquor')
    }
    setLiquorClasses()
    //Move the liquor bottle and set classes
    app.moveLiquor = () => {
        liquorMoveCounter++
        app.alcoholClasses.map(x => app.area[liquorIndex].classList.remove(x))
        liquorDirection == 'up'
            ? liquorIndex >= 10 ? liquorIndex -= 10 : liquorIndex += 90
            : liquorDirection == "right"
                ? liquorIndex % 10 != 9 ? liquorIndex++ : liquorIndex -= 9
                : liquorDirection == "down"
                    ? liquorIndex <= 89 ? liquorIndex += 10 : liquorIndex -= 90
                    : liquorIndex % 10 != 0 ? liquorIndex-- : liquorIndex += 9
        setLiquorClasses()
        liquorMoveCounter >= 20
            ? (app.area[liquorIndex].classList.remove('bwl'), app.area[liquorIndex].classList.remove('bl'), app.area[liquorIndex].classList.remove('wl'), app.area[liquorIndex].classList.remove('liquor'), app.finishLiquor())
            : null
    }
    app.moveLiquorInterval = () => stopLiquorInterval = setInterval(app.moveLiquor, 250 - (2 * app.level))
    app.finishLiquor = () => clearInterval(stopLiquorInterval)
    app.moveLiquorInterval();
}

//Generate random Wine and move it
app.randomWine = () => {
    let wineMoveCounter = 0
    let wineIndex = app.randomizer(app.area)
    app.alcoholClasses.map(x => app.area[wineIndex].classList.remove(x))
    //Set classes
    const setWineClasses = () => {
        app.area[wineIndex].classList.contains('bl')
            ? (app.area[wineIndex].classList.add('bwl'), app.area[wineIndex].classList.add('wine'))
            : app.area[wineIndex].classList.contains('liquor')
                ? (app.area[wineIndex].classList.add('wl'), app.area[wineIndex].classList.add('wine'))
                : app.area[wineIndex].classList.contains('beer')
                    ? (app.area[wineIndex].classList.add('bw'), app.area[wineIndex].classList.add('wine'))
                    : app.area[wineIndex].classList.add('wine')
    }
    setWineClasses()
    //Move Wine
    app.moveWine = () => {
        wineMoveCounter++
        app.alcoholClasses.map(x => app.area[wineIndex].classList.remove(x))
        wineIndex % 10 != 9 ? wineIndex++ : wineIndex -= 9
        setWineClasses()
        wineMoveCounter >= 10
            ? (app.area[wineIndex].classList.remove('bwl'), app.area[wineIndex].classList.remove('wl'), app.area[wineIndex].classList.remove('bw'), app.area[wineIndex].classList.remove('wine'), app.finishWine())
            : null
    }
    app.moveWineInterval = () => stopWineInterval = setInterval(app.moveWine, 495 - (2.5 * app.level))
    app.finishWine = () => clearInterval(stopWineInterval)
    app.moveWineInterval();
}

//Set and Clear Intervals for getting/clearing Alcohol
app.wine = () => endWine = setInterval(app.randomWine, 5000 - 2.5 * app.level)
app.beer = () => endBeer = setInterval(app.randomBeer, 600 - app.level)
app.liquor = () => endLiquor = setInterval(app.randomLiquor, 7500 - 2.5 * app.level)
app.setAll = () => {
    app.wine()
    app.beer()
    app.liquor()
}

app.clearBeer = () => clearInterval(endBeer)
app.clearWine = () => clearInterval(endWine)
app.clearLiquor = () => clearInterval(endLiquor)
app.clearAll = () => {
    app.clearBeer()
    app.clearWine()
    app.clearLiquor()
}

//Control the Sobriety Bar
app.moveSoberBar = () => {
    document.querySelector('.soberLevel').style.width = `${app.sober}%`
}

// Add events for clicking wine/hard liquor, and tracking scores
app.makeClick = () => {
    app.area.map(x => x.addEventListener("click", (e) => {
        if (e.target.classList.contains('beer') && e.target.classList.contains('wine') && e.target.classList.contains('liquor')) {
            app.finishWine()
            app.finishLiquor()
            app.clearAll()
            app.alcoholClasses.map(x => e.target.classList.remove(x))
            app.sober = 0
            app.currentScore += 100
            app.setAll()
        } else if (e.target.classList.contains('liquor') && e.target.classList.contains('wine')) {
            app.finishLiquor()
            app.clearLiquor()
            app.finishWine()
            app.clearWine()
            app.alcoholClasses.map(x => e.target.classList.remove(x))
            app.sober <= 40 ? app.sober = 0 : app.sober -= 40;
            app.currentScore += 40;
            app.liquor()
            app.wine()
        } else if (e.target.classList.contains('liquor') && e.target.classList.contains('beer')) {
            app.finishLiquor()
            app.clearLiquor()
            app.clearBeer()
            app.alcoholClasses.map(x => e.target.classList.remove(x))
            app.sober <= 30 ? app.sober = 0 : app.sober -= 30;
            app.currentScore += 30;
            app.liquor()
            app.beer()
        } else if (e.target.classList.contains('beer') && e.target.classList.contains('wine')) {
            app.clearBeer()
            app.finishWine()
            app.clearWine()
            app.alcoholClasses.map(x => e.target.classList.remove(x))
            app.sober <= 20 ? app.sober = 0 : app.sober -= 20;
            app.currentScore += 20;
            app.beer()
            app.wine()
        } else if (e.target.classList.contains('beer')) {
            app.clearBeer()
            e.target.classList.remove('beer')
            app.sober <= 3 ? app.sober = 0 : app.sober -= 4;
            app.currentScore += 3
            app.level++
            app.beer()
        } else if (e.target.classList.contains('liquor')) {
            app.clearLiquor()
            app.finishLiquor()
            e.target.classList.remove('liquor')
            app.sober <= 14 ? app.sober = 0 : app.sober -= 14;
            app.currentScore += 14
            app.level++
            app.liquor()
        } else if (e.target.classList.contains('wine')) {
            app.clearWine()
            app.finishWine()
            e.target.classList.remove('wine')
            app.sober <= 7 ? app.sober = 0 : app.sober -= 8;
            app.currentScore += 7
            app.level++
            app.wine()
        } else if (!e.target.classList.contains('beer')) {
            app.currentScore -= 4
            app.sober += 4
        }
        app.currentScoreDisplay.textContent = app.currentScore
        app.moveSoberBar()

    }))
}

//Increase Sobriety, speeding up over time and check to see if game is over
app.soberCheck = (totalChecks = 0) => {
    const addSober = () => {
        return new Promise((resolve) => {
            app.sober += 1.25;
            app.moveSoberBar()
            setTimeout(resolve, (500 - (totalChecks * 0.0875) * 25))
        })
    }
    const finalCheck = async () => {
        await addSober();
        app.sober >= 100
            ? (app.clearAll(), app.clearQuotes(), app.setScores(), app.gamesPlayed++,
                app.mainBoard.style.display = 'none', app.gameOver.style.display = 'flex')
            : (totalChecks++, app.soberCheck(totalChecks))
    }
    finalCheck()
}

//Gameover Section
app.setScores = () => {
    document.querySelector('.endCurrentScore').textContent = app.currentScore
    app.currentScore > app.highScore
        ? (app.highScore = app.currentScore, document.querySelector('.endHighScore').textContent = app.highScore)
        : app.highScore = app.highScore
}

app.gameOverButtons = (e) => {
    e.target.classList.contains('retry')
        ? (app.mainBoard.style.display = 'flex', app.gameOver.style.display = 'none', app.StartGame())
        : (app.loadingPage.style.display = 'flex', app.gameOver.style.display = 'none');
}

//Make a infomation modal
app.createModal = () => {
    app.modal = document.querySelector('.modal');

    document.querySelector('.modalButton').onclick = () => {
        app.modal.style.display = "block";
    }

    document.querySelector(".closeModal").onclick = () => {
        app.modal.style.display = "none";
    }

    window.onclick = function (e) {
        if (e.target == modal) {
            app.modal.style.display = "none";
        }
    }
}

//App.init
app.init = () => {
    //Declarations 
    app.mainBoard = document.querySelector('.mainBoard')
    app.gameOver = document.querySelector('.gameOver')
    app.loadingPage = document.querySelector('.loading');
    app.currentScoreDisplay = document.querySelector('.currentScore')
    app.modal = document.querySelector('.modal');
    app.modalButton = document.querySelector('.modalButton');
    app.modalClose = document.querySelector(".closeModal");

    app.characterParams = []
    app.characterQuotes = []
    app.url = new URL('http://api.chrisvalleskey.com/fillerama/get.php')
    app.url.search = new URLSearchParams({
        format: 'json',
    })

    app.alcoholClasses = ['beer', 'wine', 'liquor', 'bw', 'bl', 'wl', 'bwl']
    app.area = []
    app.highScore = 0
    app.gamesPlayed = 0

    //Loading Buttons
    document.querySelectorAll('.characterButton').forEach(button => button.addEventListener('click', app.chooseCharacter))
    //Gameover Buttons
    document.querySelector('.retry').addEventListener('click', app.gameOverButtons)
    document.querySelector('.changeCharacter').addEventListener('click', app.gameOverButtons)

    //Initalize functions needed at the beginning
    app.makeGrid()
    app.makeClick()
    app.createModal()
}

app.init()


