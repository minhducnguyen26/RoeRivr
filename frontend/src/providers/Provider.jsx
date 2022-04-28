import React, { useContext, useEffect, useState } from "react";

const path = "http://localhost:8080";

const AllProductsContext = React.createContext({});
export function useAllProductsContext() {
	return useContext(AllProductsContext);
}

const PageNumberContext = React.createContext({});
export function usePageNumberContext() {
	return useContext(PageNumberContext);
}

const ProductIdContext = React.createContext({});
export function useProductIdContext() {
	return useContext(ProductIdContext);
}

const ProductInfosContext = React.createContext({});
export function useProductInfosContext() {
	return useContext(ProductInfosContext);
}

const CategoriesContext = React.createContext({});
export function useCategoryContext() {
	return useContext(CategoriesContext);
}

export function MainProvider({ children }) {
	//! All Products
	const [data, setData] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);

	useEffect(() => {
		fetch(`${path}/products/${pageNumber}`)
			.then((res) => res.json())
			.then((res) => {
				setData(res);
			});
	}, [pageNumber]);

	//! Single Product
	const [productId, setProductId] = useState("4c69b61db1fc16e7013b43fc926e502d");
	const [productInfos, setProductInfos] = useState(null);

	useEffect(() => {
		fetch(`${path}/products/${pageNumber}/${productId}`)
			.then((res) => res.json())
			.then((res) => {
				setProductInfos(res);
			});
	}, [pageNumber, productId]);

	//! Categories
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetch(`${path}/categories`)
			.then((res) => res.json())
			.then((res) => {
				setCategories(res);
			});
	}, []);

	return (
		<AllProductsContext.Provider value={data}>
			<PageNumberContext.Provider value={[pageNumber, setPageNumber]}>
				<ProductIdContext.Provider value={setProductId}>
					<ProductInfosContext.Provider value={productInfos}>
						<CategoriesContext.Provider value={categories}>{children}</CategoriesContext.Provider>
					</ProductInfosContext.Provider>
				</ProductIdContext.Provider>
			</PageNumberContext.Provider>
		</AllProductsContext.Provider>
	);
}
