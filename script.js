const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader")

let apiQuotes = [];

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//Show New Quote
function newQuote(){
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() *apiQuotes.length )];
    // Check if author is blank and replace it with unknown
    if(!quote.author){
        authorText.textContent = "Unknown"
    }else{
        authorText.textContent = quote.author;
    }
    // Check Quote Length To Determine Styling
    if(quote.text.length > 120){
        quoteText.classList.add("long-quote")
    }else{
        quoteText.classList.remove("long-quote")
    }
    // Set Quote + Hide Loader
    quoteText.textContent = quote.text
    hideLoadingSpinner();
} 

//Get Quotes From API
async function getQuotes(){
    showLoadingSpinner();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch (error){
        //Catch Error Here
    }
}

// Tweet Quote
function tweeQuote(){
    const twitterUrl = `https://twitter.com/intent/post?text=${quoteText.textContent} - ${authorText.textContent} `;
    window.open(twitterUrl, "_blank")
}

// Event Listeners
newQuoteBtn.addEventListener("click",newQuote)
twitterBtn.addEventListener("click", tweeQuote)

// On Load
getQuotes();
