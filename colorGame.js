var squares = document.querySelectorAll('.square');
var correctColor = document.getElementById('RGB-color');
var colors = [];

colorsSetter()
CorrectColorPicker()
PressedColorChecker()
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

function CorrectColorPicker(){
	// Choose a random color as the correct one and display it in the smallHeader
	correctColor.textContent = colors[Math.floor((Math.random() * colors.length))]
}

function PressedColorChecker(){
	squares.forEach(function(square){
		// add a click event listener for each square
		square.addEventListener('click', function(){
			// compare if the clicked one is the correct one
			// if so alert correct
			if(this.style.backgroundColor === correctColor.textContent){
				alert('Correct')
			}
			// if not remove it
			else {
				this.style.backgroundColor = 'white'
			}
		})
	})
}