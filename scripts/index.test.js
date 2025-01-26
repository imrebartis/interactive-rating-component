import './index.js';
import { RatingComponent } from './index.js';

describe('RatingComponent', () => {
  document.body.innerHTML = `
    <main class="rating-container" role="main">
      <section class="rating-panel rating-input-state" id="rating-input-section" aria-labelledby="rating-prompt">
        <header class="rating-icon">
          <img src="images/icon-star.svg" alt="Star icon">
        </header>
        <h1 id="rating-prompt" class="rating-title">How did we do?</h1>
        <p class="rating-description">Please let us know how we did with your support request. All feedback is appreciated
          to help us improve our offering!</p>
        <p id="validation-message" class="error-feedback hidden" role="alert"></p>
        <div class="rating-scale" role="group" aria-label="Rating scale">
          <button class="rating-scale-btn" value="1">1</button>
          <button class="rating-scale-btn" value="2">2</button>
          <button class="rating-scale-btn" value="3">3</button>
          <button class="rating-scale-btn" value="4">4</button>
          <button class="rating-scale-btn" value="5">5</button>
        </div>
        <button class="submit-rating-btn" id="rating-submit" aria-disabled="true">Submit</button>
      </section>
      <section class="rating-panel rating-confirmation-state hidden" id="rating-confirmation-section" aria-live="polite">
        <img src="images/illustration-thank-you.svg" alt="Thank you illustration">
        <p class="rating-result">You selected <span id="selected-rating">0</span> out of 5</p>
        <h2 class="rating-thank-you-title">Thank you!</h2>
        <p class="confirmation-message">We appreciate you taking the time to give a rating. If you ever need more support,
          don't hesitate to get in touch!</p>
      </section>
    </main>
  `;

  let ratingComponent;

  beforeEach(() => {
    ratingComponent = new RatingComponent();
    ratingComponent.init();
  });

  test('should initialize with correct elements', () => {
    expect(ratingComponent.ratingScaleButtons).toHaveLength(5);
    expect(ratingComponent.ratingSubmitButton).toBeTruthy();
    expect(ratingComponent.ratingInputSection).toBeTruthy();
    expect(ratingComponent.ratingConfirmationSection).toBeTruthy();
    expect(ratingComponent.selectedRatingDisplay).toBeTruthy();
    expect(ratingComponent.validationMessageElement).toBeTruthy();
  });

  test('should handle rating button click', () => {
    const button = ratingComponent.ratingScaleButtons[0];
    button.click();
    expect(ratingComponent.currentRating).toBe('1');
    expect(ratingComponent.selectedRatingDisplay.textContent).toBe('1');
  });

  test('should show validation error if no rating is selected on submit', () => {
    ratingComponent.handleSubmit();
    expect(ratingComponent.validationMessageElement.classList).not.toContain(
      'hidden'
    );
  });

  test('should show confirmation section on valid submit', () => {
    const button = ratingComponent.ratingScaleButtons[0];
    button.click();
    ratingComponent.handleSubmit();
    expect(ratingComponent.ratingInputSection.classList).toContain('hidden');
    expect(ratingComponent.ratingConfirmationSection.classList).not.toContain(
      'hidden'
    );
  });
});
