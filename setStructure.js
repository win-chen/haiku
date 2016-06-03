// GLOBAL VARS
var structure;

// FUNCTIONS
function validateInput(args) {
	if(args.length === 0) {
		printRules();
		return false;
	}
	else {
		var str = args.join("");
		if(str.toLowerCase() === "random") {
			setRandomStructure();
			return true;
		}
		else {
			str += ",";
			var struct = [], line = []; syllSums = [], sum = 0, num = 0;
			// Split input into an structure array, count syllables
			for(var i = 0; i < str.length; i++) {
				var letter = str[i];
				if(!isNaN(letter)) {
					num = parseInt(letter);
					line.push(num);
					sum += num;
				}
				else {
					if(letter === ",") {
						struct.push(line);
						line = [];
						syllSums.push(sum);
						sum = 0;
					}
					else {
						console.log(letter + " is an invalid input.");
						printRules();
						return false;
					}
				}
			}
			// Check structure for correct amount of lines and correct amount of syllables
			if(syllSums.length != 3) {
				console.log("Invalid number of lines. A haiku uses three lines with the syllable structure 5, 7, 5.");
				printRules();
				return false;
			}
			if(syllSums[0] != 5 || syllSums[1] != 7 || syllSums[2] != 5) {
				console.log("Invalid number of syllables. A haiku uses three lines with the syllable structure 5, 7, 5.");	
				printRules();
				return false;
			}
			structure = struct;
			return true;
		}
	}
}

function printRules(){
	console.log("Create a haiku: \n- Enter the syllables per word. \n  Example: 'node haiku 2 3, 1 1 5, 2 1 2' \n- Or generate a random haiku with 'node haiku random'");
}

function setRandomStructure(args) {
	// Pick random number of words per line
	var numWords = [], lines = [];
	numWords[0] = Math.floor(Math.random() * 5) + 1;
	numWords[1] = Math.floor(Math.random() * 7) + 1;
	numWords[2] = Math.floor(Math.random() * 5) + 1;
	lines[0] = 5;
	lines[1] = 7;
	lines[2] = 5;	
	// Pick random number of syllables per word
	var splits = [], index = 0, struct = [], split, line;
	var arrayHas = function(arr, ele) {
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] === ele)
				return true;
		}
		return false;
	}
	while(index < 3) {
		// Randomly partition line
		while(splits.length < numWords[index] - 1) {
			split = Math.floor(Math.random() * (lines[index] - 1)) + 1;
			if(!arrayHas(splits, split)) {
				splits.push(split);
			}
		}
		splits.push(lines[index]);
		splits.sort();
		line = [];
		var prev = 0;
		for(var i = 0; i < splits.length; i++) {
			line.push(splits[i] - prev);
			prev = splits[i];
		}
		splits = [];
		struct.push(line);
		index++;
	}
	structure = struct;
}

// EXPORT
module.exports = function(args) {
	if(validateInput(args)) {
		return structure;
	}
}