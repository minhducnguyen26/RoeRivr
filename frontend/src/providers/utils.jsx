import { ratings } from "../assets/RatingData";

export const getDisplayPrice = (price) => {
	const prefix = typeof price === "number" ? "$" : "";
	price = price.length > 15 ? "19.99" : price;

	return prefix ? "$" + price : price;
};

export const getRatingStar = (rating) => {
	let image_url = "";

	ratings.forEach((ratingObject) => {
		const roundedRating = (Math.round(rating * 2) / 2).toFixed(1);

		if (ratingObject.value === parseInt(roundedRating)) {
			image_url = ratingObject.image_url;
		}
	});

	return image_url;
};

export const getSelectedCategoryPath = (category, splitBy) => {
	let categoryPath;

	if (splitBy.length === 1) {
		categoryPath = category.split(splitBy[0]);
	} else if (splitBy.length === 2) {
		if (category.includes(splitBy[0])) {
			categoryPath = category.split(splitBy[0]);
		}

		if (category.includes(splitBy[1])) {
			categoryPath = category.split(splitBy[1]);
		}
	}

	return categoryPath[0];
};
