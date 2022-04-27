import React, { useContext, useEffect, useState } from "react";

const path = "http://localhost:8080/";

const DataContext = React.createContext({});
export function useDataContext() {
	return useContext(DataContext);
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

export function ProductsProvider({ children }) {
	const [data, setData] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);

	const [productId, setProductId] = useState("4c69b61db1fc16e7013b43fc926e502d");
	const [productInfos, setProductInfos] = useState(null);

	useEffect(() => {
		fetch(path + "products/" + pageNumber)
			.then((res) => res.json())
			.then((res) => {
				setData(res);
			});
	}, [pageNumber]);

	useEffect(() => {
		fetch(`${path}products/${pageNumber}/${productId}`)
			.then((res) => res.json())
			.then((res) => {
				setProductInfos(res);
			});
	}, [pageNumber, productId]);

	return (
		<DataContext.Provider value={data}>
			<PageNumberContext.Provider value={[pageNumber, setPageNumber]}>
				<ProductIdContext.Provider value={setProductId}>
					<ProductInfosContext.Provider value={productInfos}>{children}</ProductInfosContext.Provider>
				</ProductIdContext.Provider>
			</PageNumberContext.Provider>
		</DataContext.Provider>
	);
}
