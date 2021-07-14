// PSEUDO CODE:
//LOADING PAGE
//Make a listener all buttons (click), choose character player picks and manipulate into mainBoard
//Hide loading page and display mainBoard
//Add an h2 that shows the high score.


// for (let i = 0; i < characterButton.length; i ++ ) {
//     characterButton[i]
// }

const characterButton = document.querySelectorAll('.characterButton');
//cannot figure out why .getElementsByClassName does not work
const loadingPage = document.querySelector('.loading');
const mainBoard = document.querySelector('.mainBoard');
const characterDiv = document.querySelector('.playersCharacter');

characterButton.forEach(button => button.addEventListener('click', (e) => {
    //had to add class of homer to the img element for this to work. having it on the button wasn't working
    e.target.classList.contains('homer') 
        ? characterDiv.innerHTML = `<img src="./assets/homer.jpg" alt="">`
        : e.target.classList.contains('fry')
        ? characterDiv.innerHTML = `<img src="./assets/fry.jpg" alt="">`
        : e.target.classList.contains('darth')
        ? characterDiv.innerHTML = `<img src="./assets/darth.jpg" alt="">`
        : e.target.classList.contains('han')
        ? characterDiv.innerHTML = `<img src="./assets/han.jpg" alt="">`
        : console.log('not valid - what do I actually put here');
    loadingPage.style.display = "none";
    mainBoard.style.display = "block";
}))


// const characterPic = document.querySelector('.d')
// characterPic.innerHTML = `<img class="make a class here" src=${chacacter image link here}>
