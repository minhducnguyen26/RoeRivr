import "./NavBar.css";

import { Link } from "react-router-dom";
import ArrowLogo from "../../assets/arrowLogo.png";
import { useTableNameContext, useSetSelectedCategoryContext } from "../../providers/Provider";

function NavBar() {
	const setTableName = useTableNameContext()[1];
	const setSelectedCategory = useSetSelectedCategoryContext();

	return (
		<div className="NavBar">
			<Link
				to="/"
				className="Logo"
				onClick={() => {
					setTableName("products");
					setSelectedCategory(" ");
				}}
			>
				<div className="BrandName">RoeRivr</div>
				<div className="ArrowLogo">
					<img src={ArrowLogo} alt="Arrow Logo" />
				</div>
			</Link>
			<div className="SearchBar">
				<input type="text" />
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
