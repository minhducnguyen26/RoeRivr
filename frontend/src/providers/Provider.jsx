import React, { useContext, useEffect, useState } from "react";

const path = "http://localhost:8080";

const IsLoadingContext = React.createContext({});
export function useIsLoadingContext() {
	return useContext(IsLoadingContext);
}

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

const SetSelectedCategoryContext = React.createContext({});
export function useSetSelectedCategoryContext() {
	return useContext(SetSelectedCategoryContext);
}

const SelectedCategoryContext = React.createContext({});
export function useSelectedCategoryContext() {
	return useContext(SelectedCategoryContext);
}

const TotalPageNumbersContext = React.createContext({});
export function useTotalPageNumbersContext() {
	return useContext(TotalPageNumbersContext);
}

const TableNameContext = React.createContext({});
export function useTableNameContext() {
	return useContext(TableNameContext);
}

const RatingOrderContext = React.createContext({});
export function useRatingOrderContext() {
	return useContext(RatingOrderContext);
}

const PriceOrderContext = React.createContext({});
export function usePriceOrderContext() {
	return useContext(PriceOrderContext);
}

const SearchProductContext = React.createContext({});
export function useSearchProductContext() {
	return useContext(SearchProductContext);
}

export function MainProvider({ children }) {
	const [isLoading, setIsLoading] = useState(true);
	const [tableName, setTableName] = useState("products");

	//! Categories Filter
	const [selectedCategory, setSelectedCategory] = useState("");

	useEffect(() => {
		if (selectedCategory !== "") {
			setIsLoading(true);
			fetch(`${path}/categories/${selectedCategory}`)
				.then((res) => res.json())
				.then((res) => {
					if (tableName === "products_by_category") {
						setData(res);
					}

					// Update the total page numbers
					fetch(`${path}/page_numbers/${tableName}`)
						.then((res) => res.json())
						.then((res) => {
							setTotalPageNumbers(res);
							setIsLoading(false);
						});

					setIsLoading(false);
				});
		}
	}, [selectedCategory, tableName]);

	//! All Products
	const [data, setData] = useState([]);
	const [currentPageNumber, setCurrentPageNumber] = useState(1);

	useEffect(() => {
		if (tableName === "products") {
			setIsLoading(true);
			fetch(`${path}/products/${currentPageNumber}`)
				.then((res) => res.json())
				.then((res) => {
					setData(res);
					setIsLoading(false);
				});
		} else if (tableName === "products_by_category") {
			setIsLoading(true);
			fetch(`${path}/categories/${selectedCategory}/${currentPageNumber}`)
				.then((res) => res.json())
				.then((res) => {
					setData(res);
					setIsLoading(false);
				});
		}
	}, [currentPageNumber, tableName, selectedCategory]);

	//! Single Product
	const [productId, setProductId] = useState("");
	const [productInfos, setProductInfos] = useState(null);

	useEffect(() => {
		if (productId !== "") {
			setIsLoading(true);
			fetch(`${path}/products/${currentPageNumber}/${productId}`)
				.then((res) => res.json())
				.then((res) => {
					setProductInfos(res);
					setIsLoading(false);
				});
		}
	}, [currentPageNumber, productId]);

	//! Page Numbers
	const [totalPageNumbers, setTotalPageNumbers] = useState(0);

	useEffect(() => {
		setIsLoading(true);
		fetch(`${path}/page_numbers/${tableName}`)
			.then((res) => res.json())
			.then((res) => {
				setTotalPageNumbers(res);
				setIsLoading(false);
			});
	}, [tableName]);

	//! Categories
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		fetch(`${path}/categories`)
			.then((res) => res.json())
			.then((res) => {
				setCategories(res);
				setIsLoading(false);
			});
	}, []);

	//! Rating Order
	const [ratingOrder, setRatingOrder] = useState("");

	useEffect(() => {
		if (ratingOrder !== "") {
			setIsLoading(true);
			fetch(`${path}/rating/${tableName}/${ratingOrder}/${currentPageNumber}`)
				.then((res) => res.json())
				.then((res) => {
					setData(res);
					setIsLoading(false);
				});
		}
	}, [ratingOrder, currentPageNumber, tableName]);

	//! Price Order
	const [priceOrder, setPriceOrder] = useState("");

	useEffect(() => {
		if (priceOrder !== "") {
			setIsLoading(true);
			fetch(`${path}/price/${tableName}/${priceOrder}/${currentPageNumber}`)
				.then((res) => res.json())
				.then((res) => {
					setData(res);
					setIsLoading(false);
				});
		}
	}, [priceOrder, currentPageNumber, tableName]);

	//! Search
	const [searchProduct, setSearchProduct] = useState("");

	useEffect(() => {
		if (searchProduct !== "") {
			setIsLoading(true);
			fetch(`${path}/search/${searchProduct}/${currentPageNumber}`)
				.then((res) => res.json())
				.then((res) => {
					setData(res);
					setIsLoading(false);
				});
		}
	}, [searchProduct, currentPageNumber, tableName]);

	return (
		<IsLoadingContext.Provider value={isLoading}>
			<AllProductsContext.Provider value={data}>
				<CurrentPageNumberContext.Provider value={[currentPageNumber, setCurrentPageNumber]}>
					<ProductIdContext.Provider value={setProductId}>
						<ProductInfosContext.Provider value={productInfos}>
							<AllCategoriesContext.Provider value={categories}>
								<SetSelectedCategoryContext.Provider value={setSelectedCategory}>
									<SelectedCategoryContext.Provider value={selectedCategory}>
										<TotalPageNumbersContext.Provider value={[totalPageNumbers, setTotalPageNumbers]}>
											<TableNameContext.Provider value={[tableName, setTableName]}>
												<RatingOrderContext.Provider value={[ratingOrder, setRatingOrder]}>
													<PriceOrderContext.Provider value={[priceOrder, setPriceOrder]}>
														<SearchProductContext.Provider value={setSearchProduct}>{children}</SearchProductContext.Provider>
													</PriceOrderContext.Provider>
												</RatingOrderContext.Provider>
											</TableNameContext.Provider>
										</TotalPageNumbersContext.Provider>
									</SelectedCategoryContext.Provider>
								</SetSelectedCategoryContext.Provider>
							</AllCategoriesContext.Provider>
						</ProductInfosContext.Provider>
					</ProductIdContext.Provider>
				</CurrentPageNumberContext.Provider>
			</AllProductsContext.Provider>
		</IsLoadingContext.Provider>
	);
}
