import "./Menu.css";

import { Link } from "react-router-dom";
import { useCategoryContext } from "../../providers/Provider";
import { ratings } from "../../assets/RatingData";

function Menu() {
	const categories = useCategoryContext();
	let categoriesList = [];

	categories.forEach((category) => {
		if (category.category.includes("|")) {
			category = category.category.split("|")[0];

			if (!categoriesList.includes(category)) {
				categoriesList.push(category);
			}
		}
	});

	return (
		<div className="Menu">
			<div className="SectionWrapper">
				<div className="SectionTitle">Categories:</div>
				{categoriesList.map((category) => (
					<Link to={`/category/${category}`} className="Category" key={category}>
						{category}
					</Link>
				))}
			</div>

			<div className="SectionWrapper">
				<div className="SectionTitle">Ratings:</div>
				{ratings.map((rating) => (
					<Link to={`/rating/${rating.value}`} className="Rating" key={rating.id}>
						<img src={rating.image_url} alt={rating.value} />
					</Link>
				))}
			</div>
		</div>
	);
}

export default Menu;
