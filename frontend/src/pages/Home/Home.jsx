import React, { useState, useEffect } from "react";
import "./Home.css";

import NavBar from "../../components/NavBar/NavBar";
import Menu from "../../components/Menu/Menu";
import Products from "../../components/Products/Products";
import PageCount from "../../components/PageCount/PageCount";

import { useLocation } from "react-router-dom";
import { useCurrentPageNumberContext, useSelectedCategoryContext, useTotalPageNumbersContext } from "../../providers/Provider";

function Home() {
	const location = useLocation();
	const [path, setPath] = useState("/");
	useEffect(() => {
		setPath(window.location.pathname);
	}, [location]);

	const setCurrentPageNumber = useCurrentPageNumberContext()[1];
	useEffect(() => {
		const pathPartsList = path.split("/");

		if (path === "/" || pathPartsList[1] === "") {
			setCurrentPageNumber(1);
		} else if (pathPartsList[1] !== "categories") {
			const newPath = pathPartsList[1];
			setCurrentPageNumber(newPath);
		}
	}, [path, setCurrentPageNumber]);

	const setSelectedCategory = useSelectedCategoryContext();
	useEffect(() => {
		const pathPartsList = path.split("/");

		if (pathPartsList[1] === "categories") {
			const category_name = pathPartsList[2].split("%")[0];
			setSelectedCategory(category_name);
		}
	}, [path, setSelectedCategory]);

	const setTotalPageNumbers = useTotalPageNumbersContext()[1];

	return (
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
	);
}

export default Home;
