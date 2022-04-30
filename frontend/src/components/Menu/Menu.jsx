import "./Menu.css";

import { Link } from "react-router-dom";
import {
	useCategoryContext,
	useTableNameContext,
	useSetSelectedCategoryContext,
	useSelectedCategoryContext,
	useCurrentPageNumberContext,
	useRatingOrderContext,
	usePriceOrderContext,
	useIsLoadingContext,
} from "../../providers/Provider";
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

	const currentPageNumber = useCurrentPageNumberContext()[0];
	const setCurrentPageNumber = useCurrentPageNumberContext()[1];

	const setTableName = useTableNameContext()[1];

	const setSelectedCategory = useSetSelectedCategoryContext();
	const handleSelectCategory = (category) => {
		const category_name = getSelectedCategoryPath(category, [" ", ","]);
		setSelectedCategory(category_name);
		setTableName(`products_by_category`);
		setCurrentPageNumber(1);
		setRatingOrder("");
	};

	const selectedCategory = useSelectedCategoryContext();

	const [ratingOrder, setRatingOrder] = useRatingOrderContext();
	const [priceOrder, setPriceOrder] = usePriceOrderContext();

	const handleSelectedFilterOrder = (filterType, ratingOrder) => {
		let path = "/";

		if (selectedCategory !== "") {
			path += `categories/${selectedCategory}/`;
		}

		if (currentPageNumber !== 1) {
			path += `${currentPageNumber}/`;
		}

		return (path += `${filterType}/${ratingOrder}`);
	};

	const handleSetRatingOrder = (ratingOrder) => {
		setRatingOrder(ratingOrder);
		setPriceOrder("");
	};

	const handleSetPriceOrder = (priceOrder) => {
		setPriceOrder(priceOrder);
		setRatingOrder("");
	};

	const isLoading = useIsLoadingContext();

	return (
		<div className="Menu">
			{isLoading && (
				<div className="Loading">
					<i className="las la-spinner Rotate"></i>
				</div>
			)}

			<div className="SectionWrapper">
				<div className="SectionTitle">Categories:</div>
				{categoriesList.map((category, index) => (
					<Link
						to={`/categories/${getSelectedCategoryPath(category, [" ", ","])}`}
						className={selectedCategory === getSelectedCategoryPath(category, [" ", ","]) ? "SelectedCategory Category" : "Category"}
						key={index}
						onClick={() => handleSelectCategory(category)}
					>
						{category}
					</Link>
				))}
			</div>

			<div className="SectionWrapper">
				<div className="SectionTitle">Rating:</div>
				<Link to={handleSelectedFilterOrder("rating", "ASC")} className={ratingOrder === "ASC" ? "SelectedRatingOrder Rating" : "Rating"} onClick={() => handleSetRatingOrder("ASC")}>
					Low to High
				</Link>
				<Link to={handleSelectedFilterOrder("rating", "DESC")} className={ratingOrder === "DESC" ? "SelectedRatingOrder Rating" : "Rating"} onClick={() => handleSetRatingOrder("DESC")}>
					High to Low
				</Link>
			</div>

			<div className="SectionWrapper">
				<div className="SectionTitle">Price:</div>
				<Link to={handleSelectedFilterOrder("price", "ASC")} className={priceOrder === "ASC" ? "SelectedPriceOrder Price" : "Price"} onClick={() => handleSetPriceOrder("ASC")}>
					Low to High
				</Link>
				<Link to={handleSelectedFilterOrder("price", "DESC")} className={priceOrder === "DESC" ? "SelectedPriceOrder Price" : "Price"} onClick={() => handleSetPriceOrder("DESC")}>
					High to Low
				</Link>
			</div>
		</div>
	);
}

export default Menu;
