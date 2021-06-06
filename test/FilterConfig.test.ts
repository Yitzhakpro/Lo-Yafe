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

    it('Replacement symbol should only be 1 char (setter)', function () {
      expect(() => new HebrewFilter({ replacementSymbol: 'asd' })).to.throw();
    });

    it('Replacement symbol cannot be initialized to be more than 1 char', function () {
      const heFilter = new HebrewFilter();
      expect(() => (heFilter.replacementSymbol = 'test')).to.throw();
    });

    it('Replacement symbol cannot be null/nothing', function () {
      const heFilter = new HebrewFilter();
      const notAllowedSymbols = [null, ''];

      for (const notAllowed of notAllowedSymbols) {
        expect(() => new HebrewFilter({ replacementSymbol: notAllowed! })).to.throw();
        expect(() => (heFilter.replacementSymbol = notAllowed!)).to.throw();
      }
    });
  });

  describe('Fresh Start', function () {
    it('Fresh start option can only be a boolean', function () {
      const notBoolean = 'test';
      // @ts-ignore
      expect(() => new HebrewFilter({ freshStart: notBoolean })).to.throw();
    });

    it('when fresh start is true, the word list must be empty', function () {
      const heFilter = new HebrewFilter({ freshStart: true });

      expect(heFilter.wordsList.length).to.equal(0);
    });
  });

  describe('Extra Words', function () {
    it('Extra words can only be an array', function () {
      // @ts-ignore
      expect(() => new HebrewFilter({ extraWords: 'בדיקה' })).to.throw();
      // @ts-ignore
      expect(() => new HebrewFilter({ extraWords: true })).to.throw();
    });

    it('Should add extra words to the words list', function () {
      const heFilter = new HebrewFilter({ extraWords: ['בדיקה1', 'בדיקה2'] });

      expect(heFilter.wordsList.includes('בדיקה1')).to.equal(true);
      expect(heFilter.wordsList.includes('בדיקה2')).to.equal(true);
    });
  });

  describe('White List', function () {
    it('White List can only be an array', function () {
      // @ts-ignore
      expect(() => new HebrewFilter({ whiteList: 'בדיקה' })).to.throw();
      // @ts-ignore
      expect(() => new HebrewFilter({ whiteList: true })).to.throw();
    });

    it('Should remove the words from the bad words list', function () {
      const heFilter = new HebrewFilter({ whiteList: ['זונה', 'מניאק'] });

      const sentence = 'מה קורה מניאק, זונה';
      const censoredSentence = heFilter.censor(sentence);

      expect(censoredSentence).to.equal(sentence);
    });
  });
});
