import "./Product.css";

import NavBar from "../../components/NavBar/NavBar";

import { Link } from "react-router-dom";
import { useProductInfosContext, useIsLoadingContext, useSellerIdContext } from "../../providers/Provider";
import { getDisplayPrice, getRatingStar, verifyField } from "../../providers/utils";

function ProductInfos() {
	const productInfos = useProductInfosContext();
	const isLoading = useIsLoadingContext();
	const setSellerId = useSellerIdContext();

	if (productInfos === null) {
		return null;
	}

	const displayPrice = getDisplayPrice(productInfos.price);
	const productDescriptionsList = productInfos.about_product ? productInfos.about_product.split("| ") : [];

	return (
		<div className="Product">
			{isLoading && (
				<div className="Loading">
					<i className="las la-spinner Rotate"></i>
				</div>
			)}

			<NavBar />

			<div className="ProductBodyWrapper">
				<div className="ProductImage">
					<img src={productInfos.image_url} alt={productInfos.name} />
				</div>
				<div className="ProductInfosMainWrapper">
					{/* Basic Infos Section */}
					<div className="ProductName">{productInfos.name}</div>
					<div className="ProductRating">
						<img className="ProductRatingImage" src={getRatingStar(productInfos.rating)} alt={productInfos.name} />
					</div>

					<div className="PriceAndAddButton">
						<div className="ProductPrice">{displayPrice}</div>
						<div className="AddButton">Add to cart</div>
					</div>

					<div className="Separator"></div>

					{/* Details Section */}
					<div className="ProductDetailsSection">
						<div className="SectionTitle">Details:</div>

						{/* Shared Fields */}
						<div className="DetailField">
							<div className="DetailLabel">Product ID:</div>
							<div className="DetailValue">{productInfos.product_id}</div>
						</div>

						<div className="DetailField">
							<div className="DetailLabel">Category:</div>
							<div className="DetailValue">{verifyField(productInfos.category)}</div>
						</div>

						<div className="DetailField">
							<div className="DetailLabel">Seller ID:</div>
							<Link to={`/seller/${productInfos.seller_id}`} className="DetailValue SellerId" onClick={() => setSellerId(productInfos.seller_id)}>
								{verifyField(productInfos.seller_id)}
								<i className="las la-external-link-alt"></i>
							</Link>
						</div>

						<div className="DetailField">
							<div className="DetailLabel">Is Best Seller:</div>
							<div className="DetailValue">{verifyField(productInfos.is_best_seller === 1 ? "Yes" : "No")}</div>
						</div>

						{/* Products Details Table */}
						{productInfos.is_best_seller === 0 && (
							<>
								<div className="DetailField">
									<div className="DetailLabel">Product URL:</div>
									<a href={productInfos.product_url} target="_blank" rel="noreferrer" className="DetailValue">
										You can purchase the item from Amazon.com
										<i className="las la-external-link-alt"></i>
									</a>
								</div>

								<div className="DetailField">
									<div className="DetailLabel">Model Number:</div>
									<div className="DetailValue">{verifyField(productInfos.model_number)}</div>
								</div>

								<div className="DetailField">
									<div className="DetailLabel">Dimensions:</div>
									<div className="DetailValue">{verifyField(productInfos.product_dimensions)}</div>
								</div>

								<div className="DetailField">
									<div className="DetailLabel">Shipping Weight:</div>
									<div className="DetailValue">{verifyField(productInfos.shipping_weight)}</div>
								</div>

								<div className="DetailField">
									<div className="DetailLabel">Technical Details:</div>
									<div className="DetailValue">{verifyField(productInfos.technical_details)}</div>
								</div>

								<div className="DetailField">
									<div className="DetailLabel">UPC/EAN Code:</div>
									<div className="DetailValue">{verifyField(productInfos.upc_ean_code)}</div>
								</div>
							</>
						)}

						{/* Best Sellers Details Table */}
						{productInfos.is_best_seller === 1 && (
							<>
								<div className="DetailField">
									<div className="DetailLabel">Review Count:</div>
									<div className="DetailValue">{verifyField(productInfos.review_count)}</div>
								</div>

								<div className="DetailField">
									<div className="DetailLabel">Height:</div>
									<div className="DetailValue">{verifyField(productInfos.height)}</div>
								</div>

								<div className="DetailField">
									<div className="DetailLabel">Width:</div>
									<div className="DetailValue">{verifyField(productInfos.width)}</div>
								</div>

								<div className="DetailField">
									<div className="DetailLabel">Length:</div>
									<div className="DetailValue">{verifyField(productInfos.length)}</div>
								</div>

								<div className="DetailField">
									<div className="DetailLabel">Weight:</div>
									<div className="DetailValue">{verifyField(productInfos.weight)}</div>
								</div>

								<div className="DetailField">
									<div className="DetailLabel">FBA Fee:</div>
									<div className="DetailValue">{verifyField(productInfos.fba_fee)}</div>
								</div>

								<div className="DetailField">
									<div className="DetailLabel">FBM Fee:</div>
									<div className="DetailValue">{verifyField(productInfos.fbm_fee)}</div>
								</div>
							</>
						)}
					</div>

					<div className="Separator"></div>

					{/* Description Section */}
					<div className="ProductDetailsSection">
						<div className="SectionTitle">About this item: {productInfos.about_product ? "" : "No Data"}</div>
						{productDescriptionsList.map((description, index) => (
							<li className="ProductDescription" key={index}>
								{description}
							</li>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductInfos;
