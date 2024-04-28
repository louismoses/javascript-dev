const contentURL = `https://coauth.com/test.json`;
const testEl = document.querySelector("#test");

const refreshButton = document.querySelector(".button-count");
refreshButton.addEventListener("click", fetchContent);

let accordionNumber = 0;

// disable refresh button
async function disableRefreshButton() {
  const countDownTime = 5;
  refreshButton.setAttribute("disabled", "");

  for (let i = countDownTime; i > 0; i--) {
    refreshButton.innerText = i;
    await delay(1000);
  }
  enableRefreshButton();
}

// enable refresh button
async function enableRefreshButton() {
  refreshButton.innerText = "Refresh";
  refreshButton.removeAttribute("disabled");
}

// Utility function to delay execution
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchContent() {
  accordionNumber++;
  disableRefreshButton();
  try {
    const response = await fetch(contentURL);
    const data = await response.json();

    const accordionContainer = document.createElement("div");
    accordionContainer.classList.add("accordion", "py-3");
    accordionContainer.id = `dataAccordion${accordionNumber}`;
    testEl.appendChild(accordionContainer);

    Object.entries(data).forEach(([key, value]) => {
      const accordionItem = document.createElement("div");
      accordionItem.classList.add("accordion-item");

      if (typeof value === "object") {
        Object.entries(value).forEach(([subKey, subValue]) => {
          makeAccordionHeader(subKey, accordionItem);
          makeAccordionBody(subKey, subValue, accordionItem);
        });
      }
      // eliminate parent object
      if (typeof value !== "object") {
        makeAccordionHeader(key, accordionItem);
        makeAccordionBody(key, value, accordionItem);
      }

      accordionContainer.appendChild(accordionItem);
    });

    openFirstAccordion();
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

// accordion Header
async function makeAccordionHeader(key, accordionItem) {
  const accordionHeader = document.createElement("h2");
  accordionHeader.classList.add("accordion-header");

  const accordionButton = document.createElement("button");
  accordionButton.classList.add("accordion-button");
  accordionButton.type = "button";
  accordionButton.setAttribute("data-bs-toggle", "collapse");
  accordionButton.setAttribute("data-bs-target", `#${key}`);
  accordionButton.setAttribute("aria-expanded", true);
  accordionButton.setAttribute("aria-controls", `${key}`);
  accordionButton.innerText = key;

  accordionHeader.appendChild(accordionButton);
  accordionItem.appendChild(accordionHeader);
}

// accordion Body
async function makeAccordionBody(key, value, accordionItem) {
  const accordionCollapse = document.createElement("div");
  accordionCollapse.id = key;
  accordionCollapse.classList.add("accordion-collapse", "collapse");
  accordionCollapse.setAttribute("data-bs-parent", "#dataAccordion");

  const accordionBody = document.createElement("div");
  accordionBody.classList.add("accordion-body");
  accordionBody.innerText = value;

  accordionCollapse.appendChild(accordionBody);
  accordionItem.appendChild(accordionCollapse);
}

// open first accordion if exists
async function openFirstAccordion() {
  const firstAccordion = document.querySelector(".accordion-collapse");
  if (firstAccordion) {
    firstAccordion.classList.add("show");
  }
}

window.onload = fetchContent;
