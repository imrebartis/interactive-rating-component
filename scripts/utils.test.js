import { DOMUtils } from './utils.js';

describe('DOMUtils', () => {
  document.body.innerHTML = `
    <div id="test-element"></div>
    <div class="test-elements"></div>
    <div class="test-elements"></div>
  `;

  test('getElement should return the element for a valid selector', () => {
    expect(DOMUtils.getElement('#test-element')).toBeTruthy();
  });

  test('getElement should throw an error for an invalid selector', () => {
    expect(() => DOMUtils.getElement('#invalid-element')).toThrow(
      'Element not found for selector: #invalid-element'
    );
  });

  test('getElements should return the elements for a valid selector', () => {
    expect(DOMUtils.getElements('.test-elements')).toHaveLength(2);
  });

  test('getElements should throw an error for an invalid selector', () => {
    expect(() => DOMUtils.getElements('.invalid-elements')).toThrow(
      'Elements not found for selector: .invalid-elements'
    );
  });

  test('addEventListener should add an event listener to the element', () => {
    const element = DOMUtils.getElement('#test-element');
    const handler = jest.fn();
    DOMUtils.addEventListener(element, 'click', handler);
    element.click();
    expect(handler).toHaveBeenCalled();
  });

  test('addEventListener should throw an error if the element is null', () => {
    expect(() => DOMUtils.addEventListener(null, 'click', () => {})).toThrow(
      'Cannot add event listener to null element'
    );
  });
});
