const { expect } = require('chai');
import HebrewFilter from '../src/index';

describe('Censor Test', function () {
  const heFilter = new HebrewFilter();

  it('text with profane words should be censored', function () {
    const sentence = 'מה קורה יזונה';
    const censoredSentence = heFilter.censor(sentence);

    expect(censoredSentence).to.equal('מה קורה *****');
  });

  it('text with multiple profane words should be censored', function () {
    const sentence = 'מה קורה יזונה יחרא, שמן, מניאק';
    const censoredSentence = heFilter.censor(sentence);

    expect(censoredSentence).to.equal('מה קורה ***** ***** **** *****');
  });

  it('text with no bad words should not be censored', function () {
    const cleanSentence = 'מה נשמע אחי';
    const censoredSentence = heFilter.censor(cleanSentence);

    expect(censoredSentence).to.equal(cleanSentence);
  });
});
