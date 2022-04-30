import "./Seller.css";

import NavBar from "../../components/NavBar/NavBar";

import { Link } from "react-router-dom";
import { useIsLoadingContext, useSellerInfosContext, useProductsBySellerContext, useProductIdContext } from "../../providers/Provider";
import { getDisplayPrice, getRatingStar, verifyField } from "../../providers/utils";

function SellerInfos() {
	const isLoading = useIsLoadingContext();
	const sellerInfos = useSellerInfosContext();
	const productsBySeller = useProductsBySellerContext();
	const setProductId = useProductIdContext();

	if (sellerInfos === null) {
		return null;
	}

	return (
		<div className="Seller">
			{isLoading && (
				<div className="Loading">
					<i className="las la-spinner Rotate"></i>
				</div>
			)}

			<NavBar />

			<div className="Body">
				<div className="SellerInfos">
					<div className="SectionWrapper">
						<div className="SectionTitle">Brand Name:</div>
						<div className="SellerDetailValue">{verifyField(sellerInfos.brand_name)}</div>
					</div>

					<div className="SectionWrapper">
						<div className="SectionTitle">Seller Id:</div>
						<div className="SellerDetailValue">{verifyField(sellerInfos.seller_id)}</div>
					</div>

					<div className="SectionWrapper">
						<div className="SectionTitle">Monthly Revenue:</div>
						<div className="SellerDetailValue">{verifyField(sellerInfos.monthly_revenue)}</div>
					</div>

					<div className="SectionWrapper">
						<div className="SectionTitle">Sales Rank:</div>
						<div className="SellerDetailValue">{verifyField(sellerInfos.sales_rank)}</div>
					</div>

					<div className="SectionWrapper">
						<div className="SectionTitle">Seller Type:</div>
						<div className="SellerDetailValue">{verifyField(sellerInfos.seller_type)}</div>
					</div>
				</div>

				<div className="Products">
					{productsBySeller.map((product) => (
						<Link to={`product/${product.product_id}`} className="SingleProductWrapper" key={product.id} onClick={() => setProductId(product.product_id)}>
							<div className="SingleProductImage">
								<img src={product.image_url} alt={product.name} />
							</div>
							<div className="SingleProductName">{product.name}</div>
							<div className="SingleProductRating">
								<img className="SingleProductRatingImage" src={getRatingStar(product.rating)} alt={product.name} />
							</div>
							<div className="SingleProductPrice">{getDisplayPrice(product.price)}</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

export default SellerInfos;
