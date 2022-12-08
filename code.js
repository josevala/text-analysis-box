let textArea = document.getElementById("text");
let results = document.getElementById("results");

// Your Code Here.
function main(){


let result = {
    text: "",
    vowels: {
      a: 0,
      e: 0,
      i: 0,
      o: 0,
      u: 0
    },
    punctuation: {
      period: 0,
      comma: 0,
      exclamation: 0,
      questionMark: 0
    },
    numCharacters: 0,
    numWords: 0,
    longestWord: "",
    shortestWord: "",
    lastThreeWords: [],
    waldoIndexes: [],
  }
let textInput = textArea.value;
  result.text = textInput;
 result.numCharacters = textInput.trim().length;
 result.vowels = vowelCount(textInput);
result.punctuation = grammar(textInput);
let textFiltered = filterText(textInput);
result.numWords = textFiltered.length;
result.lastThreeWords = textFiltered.slice(-3);
result.longestWord = longstWord(textFiltered);
result.shortestWord = shorstWord(textFiltered);
result.waldoIndexes = getWAldoI(textInput)
renderText(result)

}
function vowelCount(vString){
  vString = vString.toLowerCase()
  let vowels = {}
 for(let index = 0; index < vString.length; index +=1){
  let currentLetter = vString[index]
   switch(currentLetter){
    case "a":
    case "e":
    case "i":
    case "o":
    case "u":
    if(vowels[currentLetter]){
      vowels[currentLetter] += 1 
    } else{
      vowels[currentLetter] = 1
    }
    break; 
  }
 } 
 return vowels
} 
function grammar(vString){
  vString = vString.toLowerCase()
  let grammarC = {
    period: 0,
    comma: 0, 
    exclamation: 0,
    questionMark: 0
  }
 for(let index = 0; index < vString.length; index +=1){
  let currentLetter = vString[index]
   switch(currentLetter){
    case ".":
      grammarC["period"] += 1
      break;
    case ",":
      grammarC["comma"] += 1
      break;
    case "!": 
    grammarC["exclamation"] += 1
    break;
    case "?":
      grammarC["questionMark"] += 1 
    break; 
  }
 } 
 return grammarC;
} 
function filterText(vString){
  let textFiltered = vString.split(" ");
  let characters = "abcdefghijklmnopqrstuvwxyz'ABCDEFGHIJKLMNOPQRTUVWXYZ"
    let finalText = []
    for (let word of textFiltered){
      if(word !== ""){
        let charsArry = word.split("")
        let filteredChars = []
        for(let index = 0; index < charsArry.length; index += 1){
          let currentChar = charsArry[index]
          if (characters.includes(currentChar) === true){
            filteredChars.push(currentChar)
          }
        }
        finalText.push(filteredChars.join(""))
      }
    }
  return finalText;
}
function longstWord(words){
let sorted = [...words].sort((wordA, wordB) => wordB.length- wordA.length)
return sorted[0]
}
function shorstWord(words){
  let sorted = [...words].sort((wordA, wordB) => wordA.length- wordB.length)
  return sorted[0]
  }
function getWAldoI(vString){
  let indices = []
  let searchString = "waldo"
  let lowerStr = vString.toLowerCase()
  let searchIndex = 0
  let index 
  while((index = lowerStr.indexOf(searchString, searchIndex))>-1){
    indices.push(index)
    searchIndex = index + searchString.length
  }
  return indices;
}
function renderText(dataObject){
  results.replaceChildren()

  let container = document.createElement("div")
  container.classList.add("container") 
  let title = document.createElement("h2")
  title.append("Text Analysis")
  container.append(title)
  let column = document.createElement("div")
  column.classList.add("columnContainer")
  container.append(column)

  let leftColumn = document.createElement("div")
  leftColumn.classList.add("column")
  column.append(leftColumn)

  let rightColumn = document.createElement("div")
  rightColumn.classList.add("column")
  column.append(rightColumn)

  let vowels = document.createElement("div")
  vowels.classList.add("column")
  leftColumn.append(vowels)
  let vowelsTitle = document.createElement("h3")
  vowelsTitle.append("Vowel Count")
  vowels.append(vowelsTitle)
  vowels.append(displayObj(dataObject.vowels))
  
  let puncCunt = document.createElement("div")
  puncCunt.classList.add("column")
  leftColumn.append(puncCunt)
  let grammarTitle = document.createElement("h3")
  grammarTitle.append("Punctuation Counts")
  puncCunt.append(grammarTitle)
  puncCunt.append(displayObj(dataObject.punctuation))

  let numberChar = document.createElement("h3");
  numberChar.append(`Number of characters: ${dataObject.numCharacters}`);
  rightColumn.append(numberChar);
  
  let numWords = document.createElement("h3");
  numWords.append(`Number of Words: ${dataObject.numWords}`);
  rightColumn.append(numWords);
 let longWord = document.createElement("h3");
 longWord.append(`Longest Word: ${dataObject.longestWord}`);
 rightColumn.append(longWord);
 let shortWord = document.createElement("h3");
 shortWord.append(`Shortest Word: ${dataObject.shortestWord}`);
rightColumn.append(shortWord);
let lasThree = document.createElement("h3");
lasThree.append(`Last Three Words: ${dataObject.lastThreeWords}`);
rightColumn.append(lasThree);
let waldoIn = document.createElement("h3");
waldoIn.append(`waldo Indexes:[${dataObject.waldoIndexes}]`);
rightColumn.append(waldoIn);
  results.append(container);
}
function displayObj(obj){
  let list = document.createElement("ul")
  for(let property in obj){
    let listItem = document.createElement("li")
    listItem.append(`${property}: ${obj[property]}`)
    list.append(listItem)
  }
  return list
}
    textArea.addEventListener('keyup', main)
