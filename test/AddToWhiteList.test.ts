const { expect } = require('chai');
import HebrewFilter from '../src/index';

describe('Add To White List Function', function () {
  it('Should only accpet word/s and a spread array', function () {
    const heFilter = new HebrewFilter();

    // @ts-ignore
    expect(() => heFilter.addToWhiteList([['test']])).to.throw();

    expect(() => heFilter.addToWhiteList('test')).to.not.throw();
    expect(() => heFilter.addToWhiteList('test', 'test2', 'test3')).to.not.throw();
    const testWordsArr = ['test1', 'test2', 'test3'];
    expect(() => heFilter.addToWhiteList(...testWordsArr)).to.not.throw();
  });

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
