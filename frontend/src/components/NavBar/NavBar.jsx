import "./NavBar.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowLogo from "../../assets/arrowLogo.png";
import {
	useTableNameContext,
	useSetSelectedCategoryContext,
	useProductIdContext,
	useRatingOrderContext,
	usePriceOrderContext,
	useSearchProductContext,
	useCurrentPageNumberContext,
} from "../../providers/Provider";

function NavBar() {
	const setTableName = useTableNameContext()[1];
	const setSelectedCategory = useSetSelectedCategoryContext();
	const setProductId = useProductIdContext();
	const setRatingOrder = useRatingOrderContext()[1];
	const setPriceOrder = usePriceOrderContext()[1];
	const setSearchProduct = useSearchProductContext();
	const setCurrentPageNumber = useCurrentPageNumberContext()[1];

	const handleGoToHomePage = () => {
		setTableName("products");
		setSelectedCategory("");
		setProductId("");
		setRatingOrder("");
		setPriceOrder("");
		setSearchProduct("");
		setCurrentPageNumber(1);
		setSearchValue("");
	};

	let [searchValue, setSearchValue] = useState("");
	const handleChange = (e) => {
		setSearchValue(e.target.value);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleSearchProduct();
		}
	};

	const handleSearchProduct = () => {
		setCurrentPageNumber(1);

		if (searchValue === "") {
			handleGoToHomePage();
		} else {
			setTableName("products_by_search");
			setSearchProduct(searchValue);
			setSelectedCategory("");
		}
	};

	return (
		<div className="NavBar">
			<Link to={"/"} className="Logo" onClick={handleGoToHomePage}>
				<div className="BrandName">RoeRivr</div>
				<div className="ArrowLogo">
					<img src={ArrowLogo} alt="Arrow Logo" />
				</div>
			</Link>
			<div className="SearchBar">
				<input type="text" onChange={handleChange} onKeyPress={handleKeyPress} />
				<Link to={`/search/${searchValue}`} className="SearchNameButton" onClick={handleSearchProduct}>
					<i className="las la-search"></i>
				</Link>
			</div>
			<div className="UserAccount">
				<div className="Greeting">Hello, Sign in</div>
				<i className="las la-sort-down"></i>
			</div>
			<div className="Cart">
				<i className="las la-shopping-cart"></i>
			</div>
		</div>
	);
}

export default NavBar;
