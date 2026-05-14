import { Link } from "react-router";

// export RecipeCard component
// The prop values will be passed in from the "searchResults" array in Home.jsx
export default function RecipeCard(props) {
	return (
		<div className="recipe-card-box">
			<div className="recipe-card">

				<h3>{props.strMeal}</h3>

				<div className="recipe-card-inner">
					<div className="recipe-card-img-col">
						<img className="recipe-card-img" src={props.strMealThumb} alt={props.strMeal} />
					</div>

					<div className="recipe-card-text-col">
						<p>
							<b>Recipe origin country:</b><br /> 
							{props.strCountry}
						</p>

						<div>
							<Link className="text-btn" to={`recipe/${props.mealId}`}>
								View the recipe
							</Link>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}