// PSEUDO CODE:
//LOADING PAGE
//Make a listener all buttons (click), choose character player picks and manipulate into mainBoard
//Hide loading page and display mainBoard
//Add an h2 that shows the high score.

// for (let i = 0; i < characterButton.length; i ++ ) {
//     characterButton[i]
// }

const characterButton = document.querySelectorAll('.characterButton');
console.log(characterButton)
const characterButton2 = Array.from(document.getElementsByClassName('characterButton'))

console.log(characterButton2)
//cannot figure out why .getElementsByClassName does not work
const loadingPage = document.querySelector('.loading');
const mainBoard = document.querySelector('.mainBoard');
// const characterDiv = document.querySelector('.playersCharacter');
const characterPic = document.querySelector('.characterPic');

characterButton2.forEach(button => button.addEventListener('click', (e) => {
    //had to add class of homer to the img element for this to work. having it on the button wasn't working
    e.target.classList.contains('homer') 
        ? characterPic.innerHTML = `<img src="./assets/homer.jpg" alt="">`
        : e.target.classList.contains('fry')
        ? characterPic.innerHTML = `<img src="./assets/fry.jpg" alt="">`
        : e.target.classList.contains('darth')
        ? characterPic.innerHTML = `<img src="./assets/darth.jpg" alt="">`
        : e.target.classList.contains('han')
        ? characterPic.innerHTML = `<img src="./assets/han.jpg" alt="">`
        : console.log('not valid - what do we actually put here??');
        //YOU PUT NULL
    loadingPage.style.display = "none";
    mainBoard.style.display = "block";
}))
