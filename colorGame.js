var squares = document.querySelectorAll('.square');
var correctColor = document.getElementById('RGB-color');
var message = document.getElementById('message');
var bigHeader = document.getElementById('bigHeader');
var resetBTN = document.getElementById('resetBTN');
var hardBTN = document.getElementById('hardBTN')
var easyBTN = document.getElementById('easyBTN')
var hiddenSquares = document.querySelectorAll('.hide')
var colors = [];
var level;

colorsSetter();
correctColorPicker();
pressedColorChecker();

// make a function to generate random colors
function randomColorsMaker(){
    var red = Math.floor((Math.random() * 256));
    var green = Math.floor((Math.random() * 256));
    var blue = Math.floor((Math.random() * 256));
    var color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    return color;
}

function colorsSetter(){
	// generate a random color for each square
	squares.forEach(function(square, indexNum){
		// Store the colors in an array
		colors.push(randomColorsMaker())
		// Set each color in the array to a square
		square.style.backgroundColor = colors[indexNum]
	});
}

function correctColorPicker(squareNum){
	// Choose a random color as the correct one and display it in the smallHeader
	correctColor.textContent = colors[Math.floor((Math.random() * squareNum))]
}

function pressedColorChecker(){
	squares.forEach(function(square){
		// add a click event listener for each square
		square.addEventListener('click', function(){
			// compare if the clicked one is the correct one
			// if so
			if(this.style.backgroundColor === correctColor.textContent){
				win()
			}
			// if not remove it and display message try again
			else {
				message.textContent = 'Try again';
				this.style.backgroundColor = '#d4d2d2';
			}
		})
	})
}

// add event listener to the hard button
hardBTN.addEventListener('click', function(){
	// remove class active from the easy button
	easyBTN.classList.remove('active')
	// add class active to the hard button
	hardBTN.classList.add('active')
	// Show the hidden squares
	hiddenSquares.forEach(function(hiddenSquare){
		hiddenSquare.style.visibility = 'visible'
	})
	colors = [];
	colorsSetter();
	correctColorPicker(6);
	pressedColorChecker();
})

// add event listener to the hard button
easyBTN.addEventListener('click', function(){
	// remove class active from the hard button
	hardBTN.classList.remove('active')
	// add class active to the easy button
	easyBTN.classList.add('active')
	colors = [];
	colorsSetter();
	// hide the second three squares
	hiddenSquares.forEach(function(hiddenSquare){
		hiddenSquare.style.visibility = 'hidden'
	})
	correctColorPicker(3);
	pressedColorChecker();
})

function win(){
	// display message correct
	message.textContent = 'Correct';
	// change the background color bigHeader to the correct color
	bigHeader.style.backgroundColor = correctColor.textContent;
	// change the text on reset Button to play again
	resetBTN.textContent = 'Play again?';
	squares.forEach(function(square){
		// change the background color for all squares and bigHeader to the correct color
		square.style.backgroundColor = correctColor.textContent;
	});
}

function reset(){
	if(easyBTN.classList.value === 'active'){
		squareNum = 3
	}
	else {
		squareNum = 6
	}
	// empty colors array
	colors = [];
	colorsSetter();
	correctColorPicker(squareNum);
	pressedColorChecker();
	// Set header background-color back to noraml
	bigHeader.style.backgroundColor = 'rgb(139, 32, 27)';
	// change the text on reset Button to New colors
	resetBTN.textContent = 'New Colors';		
}

resetBTN.addEventListener('click', function(){
	reset();
});