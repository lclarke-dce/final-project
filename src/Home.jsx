import React, { useState } from 'react';
import RecipeCard from './RecipeCard';

// export Home component
export default function Home() {
	// Define the state variables, their setter functions, and their default values
	const [isLoading, setIsLoading] = useState(false);
	const [isEmptySearch, setIsEmptySearch] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [currentSearchQuery, setCurrentSearchQuery] = useState("");

	const apiUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i="

	// Click handler to clear the search bar and search results
	const handleClearSearch = () => {
		setSearchResults([]);
		setSearchInput("");
		setCurrentSearchQuery("");
		setIsEmptySearch(false);
	}

	// Click handler to scroll back to top of the page
	const handleScrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	// Form submission handler
	const handleSubmit = (e) => {
		// Prevent the page from reloading when the form is submitted
		event.preventDefault();

		// Clear previous values
		setSearchResults([]);
		setCurrentSearchQuery("");

		// Show loading message
		setIsLoading(true);

		// Create the fetch URL
		const searchQuery = searchInput.trim();
		const fetchUrl = apiUrl + searchQuery;

		// Perform a GET request to retrieve the search results
		fetch(fetchUrl)
		  .then(response => response.json())
		  .then(data => { 
		  	console.log("data:", data);

		  	// If there is data, save the data to the "searchResults" state, then display the search results
		  	if (data.meals && data.meals.length > 0) {
		  		setSearchResults(data.meals);
		  		setCurrentSearchQuery(searchQuery);
		  	} else {
		  		// If there is no data, display a message
		  		setIsEmptySearch(true);
		  	}
		  })
		  .catch( error => {
		  	// If there are errors, show messages and clear the search data
		  	console.log("Fetch error:", error);
		  	alert("Sorry, an error has occurred. Please try again.");
		  	handleClearSearch();
			})
		  .finally(() => {
		  	// Hide loading message
				setIsLoading(false);

		  	// Remove focus from form fields after submission
				document.activeElement.blur();
		  });
	}


	return (
		<main>
			<div className="text-center">

				{/* Search form */}
				<div className="search-bar">
	      	<form onSubmit={handleSubmit}>	      	
						<p className="mb-10">
							<b>Search for a recipe by ingredient.</b> (ex. chicken, parsley, etc)
						</p>

						<div className="search-bar-inner">
			        <input 
			        	type="text"
			        	className="search-input" 
			        	value={searchInput} 
			        	onChange={(e) => setSearchInput(e.target.value)} // Update the searchInput state with the current input value 
			        	onFocus={(e) => setIsEmptySearch(false)} // Hide the empty search div on focus
			        	pattern="[A-Za-z]+" // Regex
			        	title="Please enter a value that only contains letters."
			        />

			        {/* Disable the submit button if the input field is empty */}
			        <button 
			        	className="btn" 
			        	type="submit" 
			        	disabled={!searchInput}>
			        	Search
			        </button>
		      	</div>
	      	</form>
	      </div>
    	</div>


      {/* Search results */}
			<div className="search-results">

				{isEmptySearch ? (
					<p className="text-center">
						No results found for "{searchInput}".
					</p>

				) : isLoading ? (
						<p className="text-center">Loading...</p>

				) : searchResults.length > 0 && (

					<div>
						{/* Show the search results title including the number of results */}
						<h2>Search results for "{currentSearchQuery}" ({searchResults.length}):</h2>

						{/* Button to clear the search bar and results */}
						<div>
							<button className="btn" onClick={handleClearSearch}>
								Clear
							</button>
						</div>

						{/* Map over the "searchResults" array and generate the content for the recipe boxes */}
						<div className="recipe-card-boxes">
							{searchResults.map((item, index) => (
								<RecipeCard 
									key={index}
									mealId={item.idMeal}
									strMeal={item.strMeal}
									strCountry={item.strCountry} 
									strMealThumb={item.strMealThumb}
								/>
							))}
						</div>

						{/* Button to scroll back to top of page */}
						<div className="text-center">
							<button className="btn" onClick={handleScrollToTop}>
								Back to top
							</button>
						</div>
					</div>
				)}

			</div>
		</main>
	)
}