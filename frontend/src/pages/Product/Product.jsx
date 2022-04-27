import { useProductInfosContext } from "../../providers/Provider";

function ProductInfos() {
	const productInfos = useProductInfosContext();
	console.log(productInfos);

	return "Hello";
}

export default ProductInfos;
