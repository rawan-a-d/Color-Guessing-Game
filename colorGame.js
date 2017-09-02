var colors = [];
var squareNum = 6;
var bigHeader = document.getElementById('bigHeader');
var correctColor = document.getElementById('RGB-color');
var resetBTN = document.getElementById('resetBTN');
var hardBTN = document.getElementById('hardBTN');
var easyBTN = document.getElementById('easyBTN');
var message = document.getElementById('message');
var squares = document.querySelectorAll('.square');
var hiddenSquares = document.querySelectorAll('.hide');

init();

function init() {
    colorsSetter();
    correctColorPicker(squareNum);
    pressedColorChecker();
    // add event listener to the hard button
    hardBTN.addEventListener('click', hardLevel);
    // add event listener to the hard button
    easyBTN.addEventListener('click', easyLevel);
    resetBTN.addEventListener('click', reset);
}

// make a function to generate random colors
function randomColorsMaker() {
    var red = Math.floor((Math.random() * 256));
    var green = Math.floor((Math.random() * 256));
    var blue = Math.floor((Math.random() * 256));
    var color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    return color;
}

function colorsSetter(squareNum) {
    for (var i = 0; i < squareNum; i++) {
        colors.push(randomColorsMaker());
        squares[i].style.backgroundColor = colors[i];
    }
    // generate a random color for each square
    squares.forEach(function(square, indexNum) {
        // Store the colors in an array
        colors.push(randomColorsMaker());
        // Set each color in the array to a square
        square.style.backgroundColor = colors[indexNum];
    });
}

function correctColorPicker(squareNum) {
    // Make a random number
    var randomNum = Math.floor((Math.random() * squareNum));
    // Choose a random color as the correct one and display it in the smallHeader
    correctColor.textContent = colors[randomNum]
}

function pressedColorChecker() {
    squares.forEach(function(square) {
        // add a click event listener for each square
        square.addEventListener('click', function() {
            var clickedColor = this.style.backgroundColor;
            // compare the clicked one to the correct one
            // if they're the same
            if (clickedColor === correctColor.textContent) {
                win();
            }
            // if not fade it out and display message try again
            else {
                message.textContent = 'Try again';
                this.classList.add('fadeOut');
            }
        });
    });
}

function hardLevel() {
    // if easy level is selected
    if (easyBTN.classList.value === 'active') {
        // remove class active from the easy button
        easyBTN.classList.remove('active');
        // add class active to the hard button
        this.classList.add('active');
        // Show the hidden squares
        hiddenSquares.forEach(function(hiddenSquare) {
            hiddenSquare.style.visibility = 'visible';
        });
        reset();
    }
}

function easyLevel() {
    // if hard level is selected
    if (hardBTN.classList.value === 'active') {
        // remove class active from the hard button
        hardBTN.classList.remove('active');
        // add class active to the easy button
        this.classList.add('active');
        // hide the second three squares
        hiddenSquares.forEach(function(hiddenSquare) {
            hiddenSquare.style.visibility = 'hidden';
        });
        reset();
    }
}

function win() {
    // display message correct
    message.textContent = 'Correct';
    // change the background color bigHeader to the correct color
    bigHeader.style.backgroundColor = correctColor.textContent;
    // change the text on reset Button to play again
    resetBTN.textContent = 'Play again?';
    squares.forEach(function(square) {
        // remove class fadeOut
        square.classList.remove('fadeOut');
        // change the background color for all squares and bigHeader to the correct color
        square.style.backgroundColor = correctColor.textContent;
    });
}

function reset() {
    // Check which button is clicked
    easyBTN.classList.value === 'active' ? squareNum = 3 : squareNum = 6;
    // empty colors array
    colors = [];
    squares.forEach(function(square) {
        // remove class fadeOut
        square.classList.remove('fadeOut');
    });
    colorsSetter(squareNum);
    correctColorPicker(squareNum);
    pressedColorChecker();
    // Set header background-color back to noraml
    bigHeader.style.backgroundColor = 'rgb(139, 32, 27)';
    // change the text on reset Button to New colors
    resetBTN.textContent = 'New Colors';
    // remove message
    message.textContent = '';
}