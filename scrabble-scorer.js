// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
  // console.log(word)
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let userInput = input.question("Let's play some scrabble!\n\nEnter a word: ");
   return userInput;
};


let simpleScore = function(word){
  let simplePoint = 0
  let simpleWordScore = word.toUpperCase()
  for (i=0; i<word.length; i++){
    simplePoint = (i+1);
  }
return simplePoint
}


let vowelBonusScore = function(word){
  let vowels = ['a','e','i','o','u']
  let vowelPoints = 3
  let vowelScore = 0
  let wordArray = []
  let newWord = word.toLowerCase()
  wordArray = newWord.split('');
  // console.log(wordArray)
  for (i=0; i<wordArray.length; i++){
    if (vowels.includes(wordArray[i])){
      vowelScore += 3
    } else {
      vowelScore += 1
    }
  }
  wordArray.join(',');
  newWord.toUpperCase();
  return vowelScore;
}

// console.log(vowelBonusScore('fffffAaAaA'));
let scrabbleScore = function(word){
  word = word.toLowerCase();
  let wordPoints = 0;
  for (i=0; i<word.length; i++){
    // for(letters in newPointStructure){
      wordPoints = (wordPoints + (newPointStructure[word[i]]))
    // }
  } return wordPoints
}
 

let simpleScoring = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoringFunction: simpleScore
}

let bonusVowels = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoringFunction: vowelBonusScore
}

let scrabble = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scoringFunction: scrabbleScore
}

const scoringAlgorithms = [simpleScoring, bonusVowels, scrabble];

function scorerPrompt(userWord) {
  let scoreChoice = input.question(`Which scoring method would you like to use?
  
  0 - Simple: One point per character
  1 - Vowel Bonus: Vowels are worth 3 points
  2 - Scrabble: Uses scrabble point system
  Enter 0, 1, or 2: `);
 scoreChoice = Number(scoreChoice); 
 return scoringAlgorithms[scoreChoice];
}

function transform(oldPointStructure) {
  let transformPoints = {};
  for (key in oldPointStructure) { 
    for (i=0; i < oldPointStructure[key].length; i++) {
     let newKey = oldPointStructure[key][i]
     transformPoints[newKey.toLowerCase()] = Number(key)
    }
  } 
  return transformPoints; 
};


let newPointStructure = transform(oldPointStructure);
// console.log(newPointStructure);
// console.log(scrabbleScore('cow'));

function runProgram() {
  let userWord = initialPrompt();
  let scoringObject = scorerPrompt();
  let score = scoringObject.scoringFunction(userWord);
  
console.log(`Score for ${userWord}: ${score}`);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

