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
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuote = document.getElementById("newQuote");

// load Initial quotes data from local sotrage
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
  sessionStorage.setItem("lastQuote", randomQuote.text);
  // Store last viewed quote in sessionStorage
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
  localStorage.setItem("quotes", JSON.stringify(quotes));
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

  // show last quote using session storage
  const LastQuote = sessionStorage.getItem("lastQuote");
  if (LastQuote) {
    quoteDisplay.textContent = `"${LastQuote}"`;
  } else {
    showRandomQuote();
  }
});

newQuote.addEventListener("click", showRandomQuote);
// Get reference to the button
const addQuoteBtn = document.getElementById("addQuoteBtn");

// Add event listener to call addQuote when clicked
addQuoteBtn.addEventListener("click", addQuote);

//Export quotes to JSON

document.getElementById("exportJsonBtn").addEventListener("click", () => {
  // Convert quotes to JSON with indentation
  const jsonData = JSON.stringify(quotes, null, 2);
  // Create a Blob from JSON data
  const blob = new Blob([jsonData], { type: "application/json" });
  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);
  // Create an anchor tag for downloading
  const link = document.createElement("a");
  link.href = url;
  // Specify the name of the file to be downloaded
  link.download = "quotes.json";
  // Simulate a click to download the file
  link.click();
  // Clean up the object URL after the download
  URL.revokeObjectURL(url);
});

// function importFromJsonFile(event) {
//   const fileReader = new FileReader();
//   fileReader.onload = function(event) {
//     const importedQuotes = JSON.parse(event.target.result);
//     quotes.push(...importedQuotes);
//     saveQuotes();
//     alert('Quotes imported successfully!');
//   };
//   fileReader.readAsText(event.target.files[0]);
// }

function importFromJsonFile(event) {
  const file = event.target.files[0];
  if (!file) {
    alert("No file selected.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);

      if (!Array.isArray(importedQuotes)) {
        throw new Error(
          "Invalid file format. JSON should contain an array of quotes."
        );
      }

      // Validate that each imported quote has 'text' and 'category'
      importedQuotes.forEach((quote) => {
        if (!quote.text || !quote.category) {
          throw new Error(
            "Invalid quote format. Each quote must have 'text' and 'category'."
          );
        }
      });

      // Add new quotes to existing ones
      quotes.push(...importedQuotes);

      // Save to localStorage
      localStorage.setItem("quotes", JSON.stringify(quotes));

      // Refresh the category dropdown
      populateCategories();

      alert("Quotes imported successfully!");
    } catch (error) {
      alert("Error importing quotes: " + error.message);
    }
  };

  reader.readAsText(file);
}
