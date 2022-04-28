import React, { useContext, useEffect, useState } from "react";

const path = "http://localhost:8080";

const AllProductsContext = React.createContext({});
export function useAllProductsContext() {
	return useContext(AllProductsContext);
}

const CurrentPageNumberContext = React.createContext({});
export function useCurrentPageNumberContext() {
	return useContext(CurrentPageNumberContext);
}

const ProductIdContext = React.createContext({});
export function useProductIdContext() {
	return useContext(ProductIdContext);
}

const ProductInfosContext = React.createContext({});
export function useProductInfosContext() {
	return useContext(ProductInfosContext);
}

const AllCategoriesContext = React.createContext({});
export function useCategoryContext() {
	return useContext(AllCategoriesContext);
}

const SelectedCategoryContext = React.createContext({});
export function useSelectedCategoryContext() {
	return useContext(SelectedCategoryContext);
}

const TotalPageNumbers = React.createContext({});
export function useTotalPageNumbersContext() {
	return useContext(TotalPageNumbers);
}

export function MainProvider({ children }) {
	//! All Products
	const [data, setData] = useState([]);
	const [currentPageNumber, setCurrentPageNumber] = useState(1);

	useEffect(() => {
		fetch(`${path}/products/${currentPageNumber}`)
			.then((res) => res.json())
			.then((res) => {
				setData(res);
			});
	}, [currentPageNumber]);

	//! Single Product
	const [productId, setProductId] = useState("4c69b61db1fc16e7013b43fc926e502d");
	const [productInfos, setProductInfos] = useState(null);

	useEffect(() => {
		fetch(`${path}/products/${currentPageNumber}/${productId}`)
			.then((res) => res.json())
			.then((res) => {
				setProductInfos(res);
			});
	}, [currentPageNumber, productId]);

	//! Categories
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetch(`${path}/categories`)
			.then((res) => res.json())
			.then((res) => {
				setCategories(res);
			});
	}, []);

	//! Categories Filter
	const [selectedCategory, setSelectedCategory] = useState(" ");

	useEffect(() => {
		fetch(`${path}/categories/${selectedCategory}`)
			.then((res) => res.json())
			.then((res) => {
				setData(res);
			});
	}, [selectedCategory]);

	//! Page Numbers
	const [totalPageNumbers, setTotalPageNumbers] = useState(0);

	useEffect(() => {
		fetch(`${path}/page_numbers`)
			.then((res) => res.json())
			.then((res) => {
				setTotalPageNumbers(res);
			});
	}, [totalPageNumbers]);

	return (
		<AllProductsContext.Provider value={data}>
			<CurrentPageNumberContext.Provider value={[currentPageNumber, setCurrentPageNumber]}>
				<ProductIdContext.Provider value={setProductId}>
					<ProductInfosContext.Provider value={productInfos}>
						<AllCategoriesContext.Provider value={categories}>
							<SelectedCategoryContext.Provider value={setSelectedCategory}>
								<TotalPageNumbers.Provider value={[totalPageNumbers, setTotalPageNumbers]}>{children}</TotalPageNumbers.Provider>
							</SelectedCategoryContext.Provider>
						</AllCategoriesContext.Provider>
					</ProductInfosContext.Provider>
				</ProductIdContext.Provider>
			</CurrentPageNumberContext.Provider>
		</AllProductsContext.Provider>
	);
}
