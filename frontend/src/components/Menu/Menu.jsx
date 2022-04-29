import "./Menu.css";

import { Link } from "react-router-dom";
import { useCategoryContext, useTableNameContext, useSetSelectedCategoryContext, useSelectedCategoryContext, useCurrentPageNumberContext } from "../../providers/Provider";
import { ratings } from "../../assets/RatingData";
import { getSelectedCategoryPath } from "../../providers/utils";

function Menu() {
	const categories = useCategoryContext();
	let categoriesList = [];

	let visitedCategories = [];
	categories.forEach((category) => {
		if (category.category.includes("|")) {
			category = getSelectedCategoryPath(category.category, ["|"]);

			const categoryKeyWord = getSelectedCategoryPath(category, ["&", " "]);
			if (!visitedCategories.includes(categoryKeyWord)) {
				visitedCategories.push(categoryKeyWord);

				if (!categoriesList.includes(category)) {
					categoriesList.push(category);
				}
			}
		}
	});

	const setCurrentPageNumber = useCurrentPageNumberContext()[1];

	const setTableName = useTableNameContext()[1];

	const setSelectedCategory = useSetSelectedCategoryContext();
	const handleSelectCategory = (category) => {
		const category_name = getSelectedCategoryPath(category, [" ", ","]);
		setSelectedCategory(category_name);
		setTableName(`products_by_category`);
		setCurrentPageNumber(1);
	};

	const selectedCategory = useSelectedCategoryContext();

	return (
		<div className="Menu">
			<div className="SectionWrapper">
				<div className="SectionTitle">Categories:</div>
				{categoriesList.map((category) => (
					<Link
						to={`/categories/${getSelectedCategoryPath(category, [" ", ","])}`}
						className={selectedCategory === getSelectedCategoryPath(category, [" ", ","]) ? "SelectedCategory Category" : "Category"}
						key={category}
						onClick={() => handleSelectCategory(category)}
					>
						{category}
					</Link>
				))}
			</div>

			<div className="SectionWrapper">
				<div className="SectionTitle">Ratings:</div>
				{ratings.map((rating) => (
					<>
						{rating.value % 1 === 0 && (
							<Link to={`/rating/${rating.value}`} className="Rating" key={rating.id}>
								<img src={rating.image_url} alt={rating.value} />
							</Link>
						)}
					</>
				))}
			</div>

			<div className="SectionWrapper">
				<div className="SectionTitle">Price:</div>
				<Link to={`/price/desc`} className="Price">
					Low to High
				</Link>
				<Link to={`/price/asc`} className="Price">
					High to Low
				</Link>
			</div>
		</div>
	);
}

export default Menu;
