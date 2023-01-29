const sirensQuantityHideClass = "sirens-quantity-wrapper-hide";
const sirensEpicLabel = '[aria-label="Quantity, 2023 Epic Membership"]';
const subTotalClass = "cart-subtotal";

// Utility function;
const waitForElm = (selector) => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

// Hide input at /memberships.
const hideBlockQuantityInput = () => {
  const sirensID = "sirens-membership";

  if (document.getElementById(sirensID)) {
    const blockEl = document.getElementById(sirensID);
    blockEl.parentElement.parentElement.parentElement.classList.add(
      sirensQuantityHideClass
    );

    const cartWrapperClass = "sqs-add-to-cart-button-wrapper";
    const addButtonClasses = ["sirens-helptext"];
    const helpText = "Each membership must be added separately.";

    const textNode = document.createTextNode(helpText);

    const helpTextEl = document.createElement("div");
    helpTextEl.classList.add(addButtonClasses[0]);
    helpTextEl.appendChild(textNode);

    const cart = document.getElementsByClassName(cartWrapperClass);
    cart[0].appendChild(helpTextEl);
  }
};

// Hide input at /cart.
const hideCartQuantityInput = (sirensEpicLabel) => {
  if (document.querySelectorAll(sirensEpicLabel).length > 0) {
    const cartQuantityInputs = document.querySelectorAll(sirensEpicLabel);
    cartQuantityInputs.forEach((input) => {
      input.parentElement.parentElement.classList.add(sirensQuantityHideClass);
    });
  }
};

// Add membership button;
const addAnotherMembership = () => {
  if (document.getElementsByClassName(subTotalClass).length > 0) {
    const summaryClass = "cart-summary";
    const addButtonClasses = [
      "sqs-button-element--primary",
      "sirens-add-membership",
    ];
    const addButtonText = "Add another membership";

    const textNode = document.createTextNode(addButtonText);

    const addAnotherButton = document.createElement("a");
    addAnotherButton.classList.add(addButtonClasses[0]);
    addAnotherButton.classList.add(addButtonClasses[1]);
    addAnotherButton.setAttribute("href", "/memberships");
    addAnotherButton.appendChild(textNode);

    const summary = document.getElementsByClassName(summaryClass);
    summary[0].insertBefore(addAnotherButton, summary[0].childNodes[1]);
  }
};

// Run functions.
hideBlockQuantityInput();

waitForElm(sirensEpicLabel).then(() => {
  hideCartQuantityInput(sirensEpicLabel);
  addAnotherMembership();
});
