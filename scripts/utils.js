'use strict';

export const DOMUtils = {
  getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element not found for selector: ${selector}`);
    }
    return element;
  },
  getElements(selector) {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
      throw new Error(`Elements not found for selector: ${selector}`);
    }
    return elements;
  },
  addEventListener(element, event, handler) {
    if (element) {
      element.addEventListener(event, handler);
    } else {
      throw new Error(`Cannot add event listener to null element`);
    }
  },
};
