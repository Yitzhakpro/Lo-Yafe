const { expect } = require('chai');
import HebrewFilter from '../src/index';

describe('Filter Config (including setters)', function () {
  describe('Replacement Symbol', function () {
    it('Profane words should be replaced with different replacement symbols', function () {
      const heFilter = new HebrewFilter();

      const symbols = ['*', '!', '$', '&'];
      const profaneWord = heFilter.wordsList[0];

      for (const symbol of symbols) {
        heFilter.replacementSymbol = symbol;

        const censoredWord = heFilter.censor(profaneWord);
        const expectedCensorWord = Array(profaneWord.length + 1).join(heFilter.replacementSymbol);

        expect(censoredWord).to.equal(expectedCensorWord);
      }
    });
  });

  describe('Fresh Start', function () {
    it('when fresh start is true, the word list must be empty', function () {
      const heFilter = new HebrewFilter({ freshStart: true });

      expect(heFilter.wordsList.length).to.equal(0);
    });
  });

  describe('Extra Words', function () {
    it('Should add extra words to the words list', function () {
      const heFilter = new HebrewFilter({ extraWords: ['בדיקה1', 'בדיקה2'] });

      expect(heFilter.wordsList.includes('בדיקה1')).to.equal(true);
      expect(heFilter.wordsList.includes('בדיקה2')).to.equal(true);
    });
  });

  describe('White List', function () {
    it('Should remove the words from the bad words list', function () {
      const heFilter = new HebrewFilter({ whiteList: ['זונה', 'מניאק'] });

      const sentence = 'מה קורה מניאק, זונה';
      const censoredSentence = heFilter.censor(sentence);

      expect(censoredSentence).to.equal(sentence);
    });
  });
});
