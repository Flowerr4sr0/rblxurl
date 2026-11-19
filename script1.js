const dropdown = document.getElementById("custom-dropdown");
const button = dropdown.querySelector(".dropdown-button");
const options = dropdown.querySelectorAll(".dropdown-option");
const label = document.getElementById("selected-label");
const input = document.getElementById("input");
const output = document.getElementById("output");

let selectedValue = "";

button.addEventListener("click", () => {
  dropdown.classList.toggle("open");
});

options.forEach(option => {
  option.addEventListener("click", () => {
    selectedValue = option.dataset.value;
    label.textContent = option.textContent;

    options.forEach(item => item.classList.remove("selected"));
    option.classList.add("selected");

    dropdown.classList.remove("open");
    updateOutput();
  });
});

function updateOutput() {
  const value = input.value.trim();

  output.textContent = selectedValue && value
    ? selectedValue + "/" + value
    : "";
}

input.addEventListener("input", updateOutput);

document.addEventListener("click", event => {
  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove("open");
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    dropdown.classList.remove("open");
  }
});


const copyButton = document.getElementById("copy-button");

copyButton.addEventListener("click", async () => {
  const text = output.textContent;

  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = "Copied!";

    setTimeout(() => {
      copyButton.textContent = "Copy";
    }, 1500);
  } catch (error) {
    copyButton.textContent = "Failed!";
  }
});