const contentURL = `https://coauth.com/test.json`;
const testEl = document.querySelector("#test");

async function fetchContent() {
  try {
    const response = await fetch(contentURL);
    const data = await response.json();

    const testContent = document.createElement("div");
    testContent.classList.add("accordion");
    testEl.appendChild(testContent);

    Object.keys(data).forEach((key) => {
      const value = data[key];
      console.log(`${key}:  ${value}`);
    });

    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}

window.onload = fetchContent;
