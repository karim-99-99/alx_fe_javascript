const categorySelect = document.getElementById("categorySelect");
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuote = document.getElementById("newQuote");

// Initial quotes data
const quotes = [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "Motivation",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    category: "Motivation",
  },
  { text: "Creativity is intelligence having fun.", category: "Inspiration" },
  {
    text: "Do what you can, with what you have, where you are.",
    category: "Wisdom",
  },
  {
    text: "you can finish it.",
    category: "Wisdom",
  },
];

//function to populate categry dropdowm

function populateCategories() {
  categorySelect.innerHTML = "";
  // get a unique category
  const uniqueCategories = [...new Set(quotes.map((q) => q.category))];
  // Add categories as option
  uniqueCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}
// function to select a random quote from the selected category

function showRandomQuote() {
  const selectedCategory = categorySelect.value;
  if (!selectedCategory) {
    quoteDisplay.textContent = "please select a category";
    return;
  }
  const filteredQuotes = quotes.filter((q) => q.category === selectedCategory);
  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "no quotes available for this category.";
    return;
  }
  const randomQuote =
    filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
  quoteDisplay.textContent = `"${randomQuote.text}"`;
}

// add quotes
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

// functoin to add quotes and category
function addQuote() {
  const newQuoteInput = newQuoteText.value.trim();
  const newQuoteCategoryInput = newQuoteCategory.value.trim();

  if (!newQuoteInput || !newQuoteCategoryInput) {
    alert("please enter both quote and a category.");
    return;
  }

  quotes.push({ text: newQuoteInput, category: newQuoteCategoryInput });

  //update the category dropdown
  populateCategories();
  // Optionally, clear the input fields after adding the quote
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  alert("Quote added successfully!");
}
//Event Listners
document.addEventListener("DOMContentLoaded", () => {
  populateCategories();
  showRandomQuote();
});

newQuote.addEventListener("click", showRandomQuote);
// Get reference to the button
const addQuoteBtn = document.getElementById("addQuoteBtn");

// Add event listener to call addQuote when clicked
addQuoteBtn.addEventListener("click", addQuote);

function createAddQuoteForm() {
  const formContainer = document.getElementById("formContainer");

  formContainer.innerHTML = `
    <input type="text" id="newQuoteText" placeholder="Enter new quote" required>
    <input type="text" id="newQuoteCategory" placeholder="Enter category" required>
    <button id="addQuoteBtn">Add Quote</button>
  `;

  // Add event listener for the new button
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
}

// Call this function when the page loads to generate the form dynamically
document.addEventListener("DOMContentLoaded", () => {
  createAddQuoteForm();
  populateCategories();
  showRandomQuote();
});

