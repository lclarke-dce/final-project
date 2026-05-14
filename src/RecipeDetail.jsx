import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import ReturnToHome from './ReturnToHome';

// export RecipeDetail component
export default function RecipeDetail() {
	const [isLoading, setIsLoading] = useState(false);
	const [showErrorMsg, setShowErrorMsg] = useState(false);
	const [showNoDataMsg, setShowNoDataMsg] = useState(false);
	const [mealData, setMealData] = useState(null);

	// The dynamic segment (defined in App.jsx) is parsed from the URL and provided as params
	let params = useParams();

	// URL to get the full recipe details by id
	const fetchUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + params.mealId;

	useEffect(() => {
		// Show loading message
		setIsLoading(true);

		// Ensure that other messages are not displayed initially
		setShowNoDataMsg(false);
		setShowErrorMsg(false);

		// Perform a GET request to retrieve the recipe information
		fetch(fetchUrl)
		  .then(response => response.json())
		  .then(data => { 

		  	console.log("data.meals:", data.meals);

		  	// If there is data, save the data to a variable
		  	if (data.meals && data.meals.length > 0) {
		  		const mealDataObject = data.meals[0];

					// Copy the properties of "mealDataObject" into a new object
					const newObject = { 
						...mealDataObject,

					// Parse the "strInstructions" property into an array
					strInstructions: mealDataObject.strInstructions
						.split(/\r?\n/) // Split by line breaks
						.map(step => {
							// Remove any leading numbers, dots, dashes, and spaces
							return step.replace(/^\d+[\s.)-]*|^\s*-\s*/, "").trim();
						})
						.filter(step => step !== ""), // Filter out any empty strings

    				// Add a new array to store the ingredients
						ingredients: []
					};

					// There is a maximum number of 20 ingredients (and 20 corresponding measurements) in the original object, so loop through the original ingredient and measurement properties, and add them to the "ingredients" array.
					for (let i = 1; i <= 20; i++) {
					    const ingredient = mealDataObject[`strIngredient${i}`];
					    const measurement = mealDataObject[`strMeasure${i}`];

					    // Only add to the array if the ingredient name exists and is not empty
					    if (ingredient && ingredient.trim() !== "") {
					        newObject.ingredients.push({
					            strIngredient: ingredient,
					            strMeasure: measurement ? measurement.trim() : ""
					        });
					    }
					}

					console.log("newObject:", newObject);
					setMealData(newObject);
          setIsLoading(false);
		  	} else {
		  		// If there is no data, show a message 
          setIsLoading(false);
          setShowNoDataMsg(true);
		  	}
		  })
		  .catch( error => {
		  	// If there are errors, show a message
		  	setIsLoading(false);
		  	console.log("Fetch error:", error);
		  	setShowErrorMsg(true);
			});
	}, [params.mealId]);
	// Re-run the useEffect hook if the mealId changes


	// If there is an error, show a message
	if (showErrorMsg) {
		return (
			<>
				<p className="text-center">Sorry, an error has occurred. Please try again.</p>
				<ReturnToHome />
			</>
		);
	}

	// If there is no data returned, show a message
	if (showNoDataMsg) {
		return (
			<>
				<p className="text-center">Recipe not found.</p>
				<ReturnToHome />
			</>
		);
	}

	// Show the loading message if "isLoading" is true, or if the data hasn't loaded yet
	if (isLoading || !mealData) {
		return (
			<>
				<p className="text-center">Loading...</p>
				<ReturnToHome />
			</>
		);
	}

	// If none of the above conditions are true, show the recipe content
	return (
		<div>
				<div>
					<h2 className="recipe-detail-title">
						{mealData.strMeal}
					</h2>

					<div className="recipe-detail-box">
						<div className="recipe-img-col">
							<img className="recipe-img" src={mealData.strMealThumb} alt={mealData.strMeal} />
						</div>

						<div className="recipe-text-col">
							<p>
								<b>Recipe origin country:</b> {mealData.strCountry}
							</p>

							<p><b>Ingredients:</b></p>

							{/* Map over the ingredients array */}
							<ul>
								{mealData.ingredients.map((item, index) => (
									<li key={index}>
										{item.strMeasure} {item.strIngredient}
									</li>
								))}
							</ul>
						</div>
					</div>

					<p><b>Instructions:</b></p>

					{/* Map over the instructions array */}
					<ol>
						{mealData.strInstructions.map((item, index) => (
							<li key={index}>
								{item}
							</li>
						))}
					</ol>

					{/* Display the recipe source if available */}
					<p>
						<b>Source:</b><br />

						{mealData.strSource ? (
							<a className="text-btn" href={mealData.strSource} target="_blank">{mealData.strSource}</a>
						) : (
							<p>N/A</p>
						)}
					</p>
				</div>

			<ReturnToHome />
		</div>
	);
}