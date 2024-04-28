// API URL
const contentURL = `https://coauth.com/test.json`;

// accordion container
const testEl = document.querySelector("#test");

async function fetchContent() {
  try {
    // fetch data
    const response = await fetch(contentURL);
    const data = await response.json();

    const testContent = document.createElement("div");
    testContent.classList.add("accordion");
    testContent.id = "dataAccordion";
    testEl.appendChild(testContent);

    const accordionDiv = document.querySelector(".accordion");

    Object.keys(data).forEach((key) => {
      const value = data[key];
      console.log(`${key}:  ${value}`);

      // accordion item
      const accordionItem = document.createElement("div");
      accordionItem.classList.add("accordion-item");
      accordionDiv.appendChild(accordionItem);

      // accordion header

      // accordion body
      // const accordionBody = document.createElement("div");
      // const accordionCollapse = document.createElement("div");

      // accordionBody.classList.add("accordion-body");
      // accordionBody.innerText = `${value}`;
      // accordionBody.appendChild("accordion-collapse");

      // accordionCollapse.classList.add("accordion-collapse collapse");
      // accordionCollapse.id = `body-${key}`;
    });
  } catch (error) {
    console.error(error.message);
  }
}

window.onload = fetchContent;
