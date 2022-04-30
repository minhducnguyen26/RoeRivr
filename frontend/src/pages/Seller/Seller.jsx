import "./Seller.css";

import { useSellerInfosContext, useProductsBySellerContext } from "../../providers/Provider";

function SellerInfos() {
	const sellerInfos = useSellerInfosContext();
	const productsBySeller = useProductsBySellerContext();

	//TODO: Implement the seller infos

	return (
		<div className="SellerDetailsWrapper">
			<div className="SellerInfos">Infos:</div>
			<div className="SellerProducts">Products:</div>
		</div>
	);
}

export default SellerInfos;
