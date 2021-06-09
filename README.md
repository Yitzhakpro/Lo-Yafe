# Lo Yafe - bad hebrew words filter

## Installation
```cmd
npm install lo-yafe
```

## Usage
```js
const HebrewFilter = require('lo-yafe');

const heFilter = new HebrewFilter(); // Filter with no custom config
console.log(heFilter.censor('מה קורה ימניאק')) // מה קורה ******


const customFilter = new HebrewFilter({ // Filter with custom config
    replacementSymbol: '*', // any 1 char, DEFAULT: *
    freshStart: false, // starts the profane word list with 0 words, DEFAULT: false
    extraWords: [], // add extra words to the profane word list, DEFAULT: []
    whiteList: [], // add white list words that will not be censored, DEFAULT: []
});
```
