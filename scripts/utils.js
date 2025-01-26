export const DOMUtils = {
  getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
      console.error(`Element not found for selector: ${selector}`);
    }
    return element;
  },
  getElements(selector) {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
      console.error(`Elements not found for selector: ${selector}`);
    }
    return elements;
  },
  addEventListener(element, event, handler) {
    if (element) {
      element.addEventListener(event, handler);
    } else {
      console.error('Cannot add event listener to null element');
    }
  },
};
