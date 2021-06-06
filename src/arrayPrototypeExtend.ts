export {};

declare global {
  interface Array<T> {
    inArray(element: T): boolean;
    pushIfNotIncluded(element: T): T[];
    pushElementsIfNotIncluded(arr: T[]): T[];
  }
}

Array.prototype.inArray = function (element) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === element) return true;
  }
  return false;
};

Array.prototype.pushIfNotIncluded = function (element) {
  if (!this.inArray(element)) {
    this.push(element);
  }

  return this;
};

Array.prototype.pushElementsIfNotIncluded = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    this.pushIfNotIncluded(arr[i]);
  }

  return this;
};
