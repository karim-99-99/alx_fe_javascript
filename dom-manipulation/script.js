// const categorySelect = document.getElementById("categorySelect");
// const quoteDisplay = document.getElementById("quoteDisplay");
// const newQuote = document.getElementById("newQuote");

// // Initial quotes data
// const quotes = [
//   {
//     text: "The only limit to our realization of tomorrow is our doubts of today.",
//     category: "Motivation",
//   },
//   {
//     text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
//     category: "Motivation",
//   },
//   { text: "Creativity is intelligence having fun.", category: "Inspiration" },
//   {
//     text: "Do what you can, with what you have, where you are.",
//     category: "Wisdom",
//   },
//   {
//     text: "you can finish it.",
//     category: "Wisdom",
//   },
// ];

// //function to populate categry dropdowm

// function populateCategories() {
//   categorySelect.innerHTML = "";
//   // get a unique category
//   const uniqueCategories = [...new Set(quotes.map((q) => q.category))];
//   // Add categories as option
//   uniqueCategories.forEach((category) => {
//     const option = document.createElement("option");
//     option.value = category;
//     option.textContent = category;
//     categorySelect.appendChild(option);
//   });
// }
// // function to select a random quote from the selected category

// function showRandomQuote() {
//   const selectedCategory = categorySelect.value;
//   if (!selectedCategory) {
//     quoteDisplay.textContent = "please select a category";
//     return;
//   }
//   const filteredQuotes = quotes.filter((q) => q.category === selectedCategory);
//   if (filteredQuotes.length === 0) {
//     quoteDisplay.textContent = "no quotes available for this category.";
//     return;
//   }
//   const randomQuote =
//     filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
//   quoteDisplay.textContent = `"${randomQuote.text}"`;
// }

// // add quotes
// const newQuoteText = document.getElementById("newQuoteText");
// const newQuoteCategory = document.getElementById("newQuoteCategory");

// // functoin to add quotes and category
// function addQuote() {
//   const newQuoteInput = newQuoteText.value.trim();
//   const newQuoteCategoryInput = newQuoteCategory.value.trim();

//   if (!newQuoteInput || !newQuoteCategoryInput) {
//     alert("please enter both quote and a category.");
//     return;
//   }

//   quotes.push({ text: newQuoteInput, category: newQuoteCategoryInput });

//   //update the category dropdown
//   populateCategories();
//   // Optionally, clear the input fields after adding the quote
//   document.getElementById("newQuoteText").value = "";
//   document.getElementById("newQuoteCategory").value = "";
//   alert("Quote added successfully!");
// }
// //Event Listners
// document.addEventListener("DOMContentLoaded", () => {
//   populateCategories();
//   showRandomQuote();
// });

// newQuote.addEventListener("click", showRandomQuote);
// // Get reference to the button
// const addQuoteBtn = document.getElementById("addQuoteBtn");

// // Add event listener to call addQuote when clicked
// addQuoteBtn.addEventListener("click", addQuote);

// function createAddQuoteForm() {
//   const formContainer = document.getElementById("formContainer");

//   formContainer.innerHTML = `
//     <input type="text" id="newQuoteText" placeholder="Enter new quote" required>
//     <input type="text" id="newQuoteCategory" placeholder="Enter category" required>
//     <button id="addQuoteBtn">Add Quote</button>
//   `;

//   // Add event listener for the new button
//   document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
// }

// // Call this function when the page loads to generate the form dynamically
// document.addEventListener("DOMContentLoaded", () => {
//   createAddQuoteForm();
//   populateCategories();
//   showRandomQuote();
// });
const categorySelect = document.getElementById("categorySelect");
const categoryFilter = document.getElementById("categoryFilter");
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const exportJsonBtn = document.getElementById("exportJsonBtn");

const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Mock API

// Load Initial quotes from local storage
const quotes = JSON.parse(localStorage.getItem("quotes")) || [
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
  { text: "You can finish it.", category: "Wisdom" },
];

// Populate category dropdowns
function populateCategories() {
  categorySelect.innerHTML = '<option value="">Select Category</option>';
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  const uniqueCategories = [...new Set(quotes.map((q) => q.category))];
  uniqueCategories.forEach((category) => {
    categorySelect.innerHTML += `<option value="${category}">${category}</option>`;
    categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
  });
}

// Show random quote from selected category
function showRandomQuote() {
  const selectedCategory = categorySelect.value;
  if (!selectedCategory)
    return (quoteDisplay.textContent = "Please select a category");
  const filteredQuotes = quotes.filter((q) => q.category === selectedCategory);
  if (!filteredQuotes.length)
    return (quoteDisplay.textContent =
      "No quotes available for this category.");
  const randomQuote =
    filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
  quoteDisplay.textContent = `"${randomQuote.text}"`;
  sessionStorage.setItem("lastQuote", randomQuote.text);
}

// Add new quote
function addQuote() {
  const newText = newQuoteText.value.trim();
  const newCategory = newQuoteCategory.value.trim();
  if (!newText || !newCategory)
    return alert("Please enter both quote and a category.");
  quotes.push({ text: newText, category: newCategory });
  localStorage.setItem("quotes", JSON.stringify(quotes));
  populateCategories();
  newQuoteText.value = "";
  newQuoteCategory.value = "";
  alert("Quote added successfully!");
}

// Fetch quotes from server (simulating real API call)
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const serverQuotes = await response.json();
    serverQuotes.forEach((quote) => {
      if (!quotes.some((q) => q.text === quote.title)) {
        quotes.push({ text: quote.title, category: "General" });
      }
    });
    localStorage.setItem("quotes", JSON.stringify(quotes));
    populateCategories();
    console.log("Quotes synced with server!");
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
}

// Sync new quotes to server
async function syncQuotesToServer() {
  try {
    const newQuotes = quotes.map((q) => ({
      title: q.text,
      body: q.category,
      userId: 1,
    }));
    await fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuotes),
    });
    console.log("Quotes synced with server!");
  } catch (error) {
    console.error("Error syncing quotes:", error);
  }
}

// Periodically sync data every 30 seconds
setInterval(fetchQuotesFromServer, 30000);
setInterval(syncQuotesToServer, 60000);

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  populateCategories();
  fetchQuotesFromServer(); // Initial fetch
  const lastQuote = sessionStorage.getItem("lastQuote");
  if (lastQuote) quoteDisplay.textContent = `"${lastQuote}"`;
});

categorySelect.addEventListener("change", showRandomQuote);
categoryFilter.addEventListener("change", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);
exportJsonBtn.addEventListener("click", () => {
  const jsonData = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();
  URL.revokeObjectURL(url);
});
