'use strict';

import { DOMUtils } from './utils.js';

export class RatingComponent {
  constructor() {
    this.ratingScaleButtons = DOMUtils.getElements('.rating-scale-btn');
    this.ratingSubmitButton = DOMUtils.getElement('#rating-submit');
    this.ratingInputSection = DOMUtils.getElement('#rating-input-section');
    this.ratingConfirmationSection = DOMUtils.getElement(
      '#rating-confirmation-section'
    );
    this.selectedRatingDisplay = DOMUtils.getElement('#selected-rating');
    this.validationMessageElement = DOMUtils.getElement('#validation-message');
    this.ratingForm = DOMUtils.getElement('#rating-form');
    this.currentRating = 0;
    this.selectedButton = null;
  }

  init() {
    this.addEventListeners();
    this.setInitialFocus();
  }

  addEventListeners() {
    if (this.ratingScaleButtons.length > 0) {
      this.ratingScaleButtons.forEach((button) => {
        DOMUtils.addEventListener(
          button,
          'click',
          this.handleRatingButtonClick.bind(this, button)
        );
        DOMUtils.addEventListener(
          button,
          'mouseenter',
          this.highlightButton.bind(this, button)
        );
        DOMUtils.addEventListener(
          button,
          'mouseleave',
          this.resetButtonHighlight.bind(this)
        );
        DOMUtils.addEventListener(
          button,
          'keydown',
          this.handleButtonKeydown.bind(this, button)
        );
      });
    }
    if (this.ratingForm) {
      DOMUtils.addEventListener(
        this.ratingForm,
        'submit',
        this.handleSubmit.bind(this)
      );
    }
  }

  setInitialFocus() {
    if (this.ratingScaleButtons.length > 0) {
      this.ratingScaleButtons[0].setAttribute('tabindex', '0');
      this.ratingScaleButtons[0].focus();
    }
  }

  enableSubmitButton() {
    this.ratingSubmitButton.disabled = false;
    this.ratingSubmitButton.setAttribute(
      'aria-label',
      `Submit rating of ${this.currentRating}`
    );
  }

  handleRatingButtonClick(button) {
    this.updateRating(button.value);
    this.updateButtonState(button);
    this.clearValidationError();
    this.announceRatingChange();
    this.enableSubmitButton();
  }

  highlightButton(button) {
    this.selectedButton?.classList.add('selected');
    button.classList.add('hovered');
  }

  resetButtonHighlight() {
    this.selectedButton
      ? this.updateButtonState(this.selectedButton)
      : this.resetButtonStyles();
  }

  handleButtonKeydown(button, event) {
    if (['Enter', ' '].includes(event.key)) {
      event.preventDefault();
      this.updateRating(button.value);
      this.updateButtonState(button);
      this.enableSubmitButton();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.currentRating > 0
      ? this.showConfirmation()
      : this.showValidationError('Please select a rating before submitting.');
  }

  updateRating(value) {
    this.currentRating = parseInt(value, 10);
    this.selectedRatingDisplay.textContent = value;
  }

  updateButtonState(button) {
    this.resetButtonStyles();
    button.classList.add('selected');
    this.selectedButton = button;
    this.ratingSubmitButton.removeAttribute('aria-disabled');
  }

  resetButtonStyles() {
    this.ratingScaleButtons.forEach((btn) => btn.classList.remove('hovered'));

    if (this.selectedButton) {
      this.selectedButton.classList.remove('selected');
    }
  }

  showValidationError(message) {
    this.validationMessageElement.textContent = message;
    this.validationMessageElement.classList.remove('hidden');
    this.validationMessageElement.focus();
  }

  clearValidationError() {
    this.validationMessageElement.classList.add('hidden');
  }

  showConfirmation() {
    this.announceSubmission();
    this.ratingInputSection.classList.add('hidden');
    this.ratingConfirmationSection.classList.remove('hidden');
    this.ratingConfirmationSection.focus();
  }

  announceRatingChange() {
    this.selectedRatingDisplay.setAttribute('aria-live', 'assertive');
    this.selectedRatingDisplay.setAttribute('aria-atomic', 'true');
  }

  announceSubmission() {
    this.ratingConfirmationSection.setAttribute('aria-live', 'assertive');
  }

  cleanup() {
    if (this.ratingScaleButtons.length > 0) {
      this.ratingScaleButtons.forEach((button) => {
        DOMUtils.removeEventListener(
          button,
          'click',
          this.handleRatingButtonClick.bind(this, button)
        );
        DOMUtils.removeEventListener(
          button,
          'mouseenter',
          this.highlightButton.bind(this, button)
        );
        DOMUtils.removeEventListener(
          button,
          'mouseleave',
          this.resetButtonHighlight.bind(this)
        );
        DOMUtils.removeEventListener(
          button,
          'keydown',
          this.handleButtonKeydown.bind(this, button)
        );
      });
    }

    if (this.ratingForm) {
      DOMUtils.removeEventListener(
        this.ratingForm,
        'submit',
        this.handleSubmit.bind(this)
      );
    }
  }
}

let ratingComponent;
document.addEventListener('DOMContentLoaded', () => {
  ratingComponent = new RatingComponent();
  ratingComponent.init();
});

window.addEventListener('beforeunload', () => {
  if (ratingComponent) {
    ratingComponent.cleanup();
  }
});
