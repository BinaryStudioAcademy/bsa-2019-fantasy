export const createIterator = (array) => {
  let nextIndex = 0;

  return {
    next: () => {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { done: true };
    },
    setIndex: (index) => {
      nextIndex = index;
      return nextIndex;
    },
    getItems: () => {
      return array;
    },
  };
};
