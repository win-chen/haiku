module.exports = function(syllable_arr, structure) {
	var haiku = "";
	var word_bank = [];
	
	structure.forEach(function(line) {
		var phrase = "";
		line.forEach(function(syllable) {
			var words = syllable_arr[syllable];
			var random_word = words[Math.floor(Math.random() * words.length)];
			while(hasWord(word_bank, random_word)) {
				random_word = words[Math.floor(Math.random() * words.length)];
			}
			word_bank.push(random_word);
			phrase = phrase + random_word + " ";
		});
		haiku = haiku + phrase + "\n";
	});
	return haiku.slice(0, -1);
}

function hasWord(word_bank, word) {
	word_bank.forEach(function(banked) {
		if(banked === word) {
			return true;
		}
	});
	return false;
}
