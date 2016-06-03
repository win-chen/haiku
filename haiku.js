var setStructure = require('./setStructure.js');
var parseCMU = require('./parseCMU.js');
var haikuGenerator = require('./haikuGenerator');
var structure = setStructure(process.argv.slice(2));
var lookup = parseCMU();

var haiku = haikuGenerator(lookup.bySyll, structure);
console.log(haiku);