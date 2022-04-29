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

const RatingNumberContext = React.createContext({});
export function useRatingNumberContext() {
	return useContext(RatingNumberContext);
}

const PriceOrderContext = React.createContext({});
export function usePriceOrderContext() {
	return useContext(PriceOrderContext);
}

export function MainProvider({ children }) {
	const [isLoading, setIsLoading] = useState(true);
	const [tableName, setTableName] = useState("products");

	//! Categories Filter
	const [selectedCategory, setSelectedCategory] = useState(" ");

	useEffect(() => {
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
			});
	}, [selectedCategory, tableName]);

	//! All Products
	const [data, setData] = useState([]);
	const [currentPageNumber, setCurrentPageNumber] = useState(1);

	useEffect(() => {
		setIsLoading(true);

		if (tableName === "products") {
			fetch(`${path}/products/${currentPageNumber}`)
				.then((res) => res.json())
				.then((res) => {
					setData(res);
					setIsLoading(false);
				});
		} else if (tableName === "products_by_category") {
			fetch(`${path}/categories/${selectedCategory}/${currentPageNumber}`)
				.then((res) => res.json())
				.then((res) => {
					setData(res);
					setIsLoading(false);
				});
		}
	}, [currentPageNumber, tableName, selectedCategory]);

	//! Single Product
	const [productId, setProductId] = useState("4c69b61db1fc16e7013b43fc926e502d");
	const [productInfos, setProductInfos] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		fetch(`${path}/products/${currentPageNumber}/${productId}`)
			.then((res) => res.json())
			.then((res) => {
				setProductInfos(res);
				setIsLoading(false);
			});
	}, [currentPageNumber, productId]);

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

	//! Sorted Product By Rating Number
	const [ratingNumber, setRatingNumber] = useState(0);

	useEffect(() => {
		setIsLoading(true);
		fetch(`${path}/rating/${tableName}/${ratingNumber}/${currentPageNumber}`)
			.then((res) => res.json())
			.then((res) => {
				setData(res);
				setIsLoading(false);
			});
	}, [ratingNumber, currentPageNumber, tableName]);

	//! Sorted Product By Price Order
	const [priceOrder, setPriceOrder] = useState(0);

	useEffect(() => {
		setIsLoading(true);
		fetch(`${path}/price/${tableName}/${priceOrder}/${currentPageNumber}`)
			.then((res) => res.json())
			.then((res) => {
				setData(res);
				setIsLoading(false);
			});
	}, [priceOrder, currentPageNumber, tableName]);

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
												<RatingNumberContext.Provider value={setRatingNumber}>
													<PriceOrderContext.Provider value={setPriceOrder}>{children}</PriceOrderContext.Provider>
												</RatingNumberContext.Provider>
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
