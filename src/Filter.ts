import klalot from './klalot.json';
import './arrayPrototypeExtend';

interface FilterConfig {
  replacementSymbol?: string;
  freshStart?: boolean;
  extraWords?: string[];
  whiteList?: string[];
}

export class Filter {
  private _replacementSymbol: string;
  private _wordsList: string[] = klalot.words;

  constructor(config: FilterConfig = {}) {
    const { replacementSymbol = '*', freshStart = false, extraWords = [], whiteList = [] } = config;

    this._replacementSymbol = replacementSymbol;

    if (freshStart) {
      this._wordsList = [];
    } else if (extraWords.length > 0) {
      this._wordsList.pushElementsIfNotIncluded(extraWords);
    }
    if (whiteList.length > 0) {
      const filteredList = this._wordsList.filter((badWord) => {
        return whiteList.indexOf(badWord) === -1;
      });

      this._wordsList = filteredList;
    }
  }

  public get replacementSymbol() {
    return this._replacementSymbol;
  }

  public set replacementSymbol(newReplacementSymbol) {
    this._replacementSymbol = newReplacementSymbol;
  }

  public get wordsList() {
    return this._wordsList;
  }

  /**
   * Returns if a a given word is profane or not
   *
   * @param word - the word to check
   * @returns true if the given word is profane, false if its not
   */
  public isProfane(word: string) {
    return this._wordsList.some((badWord) => {
      if (word.search(badWord) !== -1) {
        return true;
      }

      return false;
    });
  }

  /**
   * Censoring given text and returning it.
   *
   * @param text - the text you want to censor
   * @returns censored version of entered text
   */
  public censor(text: string) {
    return text
      .split(/\s+/g)
      .map((word) => {
        return this.isProfane(word) ? Array(word.length + 1).join(this._replacementSymbol) : word;
      })
      .join(' ');
  }

  /**
   * Adds new profane words to the profane words list.
   *
   * @param args - word/s or a spread array of words that will be considered profane
   */
  public addBadWords(...args: string[]) {
    this._wordsList.pushElementsIfNotIncluded(args);
  }

  /**
   * Adds "White List/ Allowed Words" to the filter mechanism.
   *
   * @param args - a word or array of words that will be removed(if they exist) from the profane words list
   */
  public addToWhiteList(...args: string[]) {
    const filterdList = this._wordsList.filter((badWord) => {
      return args.indexOf(badWord) === -1;
    });

    this._wordsList = filterdList;
  }
}
