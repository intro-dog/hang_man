const word = document.getElementById('word');
const incorrectLetters = document.getElementById('incorrect__letters');
const playAgain = document.getElementById('play__button');
const popup = document.getElementById('popup__desc');
const notification = document.getElementById('notification');
const gameMessage = document.getElementById('game__message');
const correctLetters = [];
const wrongLetters = [];
const figureElem= document.querySelectorAll('.figure__elem');

const words = ['клещ', 'сердце', 'конвеер', 'канава', 'баянист', 
'батальон', 'козленок', 'микрофон', 'кипарис', 'саксофон', 
'победа', 'путешествие', 'тележка', 'люк', 'заглавие', 'алюминий', 
'контора', 'мост', 'скатерть', 'коридор' ];

let selectedWord = words[Math.floor(Math.random() * words.length)];

// отобразить скрытое слово
function displayWord(){
     word.innerHTML = `
    ${selectedWord
    .split('')
    .map(
        letter =>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
    )
    .join('')}
    `;

    const innerWord = word.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord){
        gameMessage.innerText = 'Вы отгадали!';
        popup.style.display= 'flex';
    } 
}
// обновить скрытые буквы
function updateWrongLetter(){
    //отображает буквы
    incorrectLetters.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Ошибка</p>' : ''}
    ${wrongLetters.map(letter => `<span class="span">${letter}</span>`)}
    `;
    //отобразить элементы человека
    figureElem.forEach((part,index) => {
        const errors = wrongLetters.length;
        if(index <= errors) {
            part.style.display = 'block'
        }
        else{
            part.style.display = 'none';
        }
    });
    
    if(wrongLetters.length === figureElem.length){
        gameMessage.innerText = 'Вы не отгадали! Попробуйте еще раз';
        popup.style.display = 'flex';
    } else {
        displayWord();
    }
}
// отобразить оповещение
function showNotification(){
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}
// работа с клавиатурой
window.addEventListener('keydown', e =>{
    if(e.keyCode >= 65 && e.keyCode <= 190 ){
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
                
            } else{
                showNotification();
                
            }
        } else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetter();
                
            } else{
                showNotification();
                
            }
        }
    }
});
// играть снова
playAgain.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLetter();

    popup.style.display = 'none';
});
displayWord();

// подсказка
let coll = document.getElementsByClassName('collapsible');
for(let i = 0; i < coll.length; i++) {
    coll[i].addEventListener('click', function() {
        this.classList.toggle('active');
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    })
}

