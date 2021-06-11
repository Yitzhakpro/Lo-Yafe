const { expect } = require('chai');
import HebrewFilter from '../src/index';

describe('Add To White List Function', function () {
  it('Should remove the new words from the bad words list', function () {
    const heFilter = new HebrewFilter();
    const testWord = 'בדיקה';
    const testArray = ['בדיקה1', 'בדיקה2'];

    heFilter.addToWhiteList(testWord);
    expect(heFilter.wordsList.includes(testWord)).to.equal(false);

    heFilter.addToWhiteList(...testArray);
    for (const word of testArray) {
      expect(heFilter.wordsList.includes(word)).to.equal(false);
    }
  });

  it('Should not censor the new words from a text', function () {
    const heFilter = new HebrewFilter();
    const testBadWord = 'זונה';
    heFilter.addToWhiteList(testBadWord);

    const sentence = 'מה קורה זונה';
    expect(heFilter.censor(sentence)).to.equal(sentence);

    const testBadWords = ['מניאק', 'זונה'];
    heFilter.addToWhiteList(...testBadWords);

    for (const word of testBadWords) {
      const testSentence = `מה קורה ${word}`;
      expect(heFilter.censor(testSentence)).to.equal(testSentence);
    }
  });
});
