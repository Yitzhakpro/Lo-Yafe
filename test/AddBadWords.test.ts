const { expect } = require('chai');
import HebrewFilter from '../src/index';

describe('Add Bad Words Function', function () {
  it('Should only accpet word/s and a spread array', function () {
    const heFilter = new HebrewFilter();

    // @ts-ignore
    expect(() => heFilter.addBadWords([['test']])).to.throw();

    expect(() => heFilter.addBadWords('test')).to.not.throw();
    expect(() => heFilter.addBadWords('test', 'test2', 'test3')).to.not.throw();
    const testWordsArr = ['test1', 'test2', 'test3'];
    expect(() => heFilter.addBadWords(...testWordsArr)).to.not.throw();
  });

  it('Should add the new words to the bad words list', function () {
    const heFilter = new HebrewFilter();
    const testWord = 'בדיקה';
    const testArray = ['בדיקה1', 'בדיקה2'];

    heFilter.addBadWords(testWord);
    expect(heFilter.wordsList.includes(testWord)).to.equal(true);

    heFilter.addBadWords(...testArray);
    for (const word of testArray) {
      expect(heFilter.wordsList.includes(word)).to.equal(true);
    }
  });

  it('Censor the new words from a text', function () {
    const heFilter = new HebrewFilter();
    const testBadWord = 'בדיקה';
    heFilter.addBadWords(testBadWord);

    expect(heFilter.censor('מה קורה בדיקה')).to.equal('מה קורה *****');

    const testBadWords = ['בדיקה1', 'בדיקה2'];
    heFilter.addBadWords(...testBadWords);

    for (const word of testBadWords) {
      const testSentence = `מה קורה ${word}`;
      expect(heFilter.censor(testSentence)).to.equal('מה קורה ******');
    }
  });
});
