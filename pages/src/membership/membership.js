const sirensQuantityHideClass = "sirens-quantity-wrapper-hide";
// In a new year, change the string, not the variable
const sirensEpicLabel = '[aria-label="Quantity, 2025 Epic Membership"]';
const sirensEpicShortLabel = '[aria-label="2025 Epic Membership"]';
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

// Hide quantity input at /memberships.
const hideBlockQuantityInput = () => {
  const sirensID = "sirens-membership";
  const cartSelector = ".sqs-add-to-cart-button-wrapper";
  const addButtonClasses = ["sirens-helptext"];
  const helpText = "Each membership must be added separately.";

  if (document.getElementsByClassName(sirensID).length > 0) {
    const blockEls = document.getElementsByClassName(sirensID);

    Array.from(blockEls).forEach((blockEl) => {
      // Step through each parentElement
      //          div.sirens-membership                <-embedded
      //       div.sqs-block-content
      //    div.sqs-block-code
      // div.fe-block.sirens-quantity-wrapper-hide    <----added

      blockEl.parentElement.parentElement.parentElement.parentElement.classList.add(
        sirensQuantityHideClass
      );
    });

    const cart = document.querySelectorAll(cartSelector);
    Array.from(cart).forEach((item) => {
      let helpTextEl = document.createElement("div");

      helpTextEl.appendChild(document.createTextNode(helpText));
      helpTextEl.classList.add(addButtonClasses[0]);

      item.appendChild(helpTextEl);
    });
  }
};

// Hide quantity input at /cart.
const hideCartQuantityInput = (sirensEpicLabel) => {
  if (document.querySelectorAll(sirensEpicLabel).length > 0) {
    const cartQuantityInputs = document.querySelectorAll(sirensEpicLabel);
    cartQuantityInputs.forEach((input) => {
      input.parentElement.parentElement.classList.add(sirensQuantityHideClass);
    });
  }
};

// Change link on scarf images at /store.
const changeStoreLink = (sirensEpicShortLabel) => {
  if (document.querySelectorAll(sirensEpicShortLabel).length > 0) {
    const storeLink = document.querySelectorAll(sirensEpicShortLabel);
    storeLink[0].setAttribute("href", "/membership");
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
    addAnotherButton.setAttribute("href", "/membership");
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

waitForElm(sirensEpicShortLabel).then(() => {
  changeStoreLink(sirensEpicShortLabel);
});
