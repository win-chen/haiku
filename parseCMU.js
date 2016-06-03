// GLOBAL VARS
var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');
var bySyll = [];
var byWords = {};

//FUNCTIONS
function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){    
   var lines = data.toString().split("\n");
   var lineSplit, word, pronunciation, syllcount = 0;
   var syllArr = [], wordObj = {};
   // Initialize empy syllArr of arrays.
   	for(var i = 0; i <= 7; i++) {
		syllArr[i] = [];
	}
   lines.forEach(function(line){
	// Count syllables.	   
		lineSplit = line.split("  ");  
		word = cropWord(lineSplit[0]);
		pronunciation = lineSplit[1];
		syllcount = countSyllables(pronunciation);
	// Add to lookup objects.
		if(syllcount <= 7) {
			syllArr[syllcount].push(word);}
		wordObj[word] = syllcount;
		}
	);
	bySyll = syllArr;
	byWord = wordObj;
}

function cropWord(word) {
	if(word[word.length - 1] === ")")
		return word.slice(0, -3)
	else
		return word;
}

function countSyllables(pronunciation) {
	var count = 0;
	pronunciation.split(" ").forEach(function(syll) {
		if(syll.match(/\d/))
			count++;
	});
	return count;
}

// EXPORT
module.exports = function() {
	formatData(cmudictFile);
	return {
		bySyll: bySyll,
		byWord: byWords
	};
}