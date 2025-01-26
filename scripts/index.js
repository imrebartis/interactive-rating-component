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
        DOMUtils.addEventListener(button, 'click', () =>
          this.handleRatingButtonClick(button)
        );
        DOMUtils.addEventListener(button, 'mouseenter', () =>
          this.highlightButton(button)
        );
        DOMUtils.addEventListener(button, 'mouseleave', () =>
          this.resetButtonHighlight()
        );
        DOMUtils.addEventListener(button, 'focus', () =>
          this.removeButtonHighlight()
        );
        DOMUtils.addEventListener(button, 'keydown', (event) =>
          this.handleButtonKeydown(event, button)
        );
      });
    }
    if (this.ratingSubmitButton) {
      DOMUtils.addEventListener(this.ratingSubmitButton, 'click', () =>
        this.handleSubmit()
      );
      this.ratingSubmitButton.setAttribute('aria-live', 'polite');
    }
  }

  setInitialFocus() {
    if (this.ratingScaleButtons.length > 0) {
      this.ratingScaleButtons[0].setAttribute('tabindex', '0'); // Ensure the element is focusable
      this.ratingScaleButtons[0].focus();
    }
  }

  handleRatingButtonClick(button) {
    this.updateRating(button.value);
    this.updateButtonState(button);
    this.clearValidationError();
    this.announceRatingChange();
    button.blur();
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

  removeButtonHighlight() {
    this.selectedButton?.classList.remove('selected');
  }

  handleButtonKeydown(event, button) {
    if (['Enter', ' '].includes(event.key)) {
      event.preventDefault();
      this.updateRating(button.value);
      this.updateButtonState(button);
      this.ratingSubmitButton.click();
    }
  }

  handleSubmit() {
    this.currentRating > 0
      ? this.showConfirmation()
      : this.showValidationError('Please select a rating before submitting.');
  }

  updateRating(value) {
    this.currentRating = value;
    this.selectedRatingDisplay.textContent = value;
  }

  updateButtonState(button) {
    this.resetButtonStyles();
    button.classList.add('selected');
    this.selectedButton = button;
    this.ratingSubmitButton.removeAttribute('aria-disabled');
  }

  resetButtonStyles() {
    this.ratingScaleButtons.forEach((btn) =>
      btn.classList.remove('selected', 'hovered')
    );
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
    this.ratingInputSection.classList.add('hidden');
    this.ratingConfirmationSection.classList.remove('hidden');
    this.ratingConfirmationSection.focus();
  }

  announceRatingChange() {
    this.selectedRatingDisplay.setAttribute('aria-live', 'polite');
    this.selectedRatingDisplay.setAttribute('aria-atomic', 'true');
  }

  announceSubmission() {
    this.ratingConfirmationSection.setAttribute('aria-live', 'polite');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ratingComponent = new RatingComponent();
  ratingComponent.init();
});
