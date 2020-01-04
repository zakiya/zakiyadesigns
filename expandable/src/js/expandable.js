document.documentElement.className = document.documentElement.className.replace('no-js', 'js');

function addClass(el, klass) {
  el.classList.add(klass);
}

function removeClass(el, klass) {
  el.classList.remove(klass);
}

const accordionItems = document.querySelectorAll('li');
const accordionContentPanes = document.querySelectorAll('.accordion__body');

// Show first by default
accordionItems[0].querySelector('.accordion__body').classList.remove('hidden');

// Hide each besides the targeted accordion on click
accordionItems.forEach(function(accordion) {
  // Clicked accordions clickable target
  const accordionTitleRow = accordion.firstElementChild;
  
  accordionTitleRow.addEventListener('click', toggleAccordion);
  // console.log(accordion.firstElementChild);
});

function toggleAccordion(e) {
  accordionContentPanes.forEach(function(content) {
    // Check if clicked row matches the content's previous element sibling
    console.log(content);
    if (content.previousElementSibling === e.target) {
      removeClass(content, 'hidden');
      addClass(content.parentElement, 'active');
    } else {
      removeClass(content.parentElement, 'active');
      addClass(content, 'hidden');
    }
  });
}
