import "./Home.css";

import NavBar from "../../components/NavBar/NavBar";
import Menu from "../../components/Menu/Menu";
import Products from "../../components/Products/Products";
import PageCount from "../../components/PageCount/PageCount";

import { useIsLoadingContext } from "../../providers/Provider";

function Home() {
	const isLoading = useIsLoadingContext();

	return (
		<>
			{isLoading && (
				<div className="Loading">
					<i className="las la-spinner Rotate"></i>
				</div>
			)}
			<div className="Home">
				<NavBar />

				<div className="Body">
					<Menu />
					<div className="MainContent">
						<Products />
						<PageCount />
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
