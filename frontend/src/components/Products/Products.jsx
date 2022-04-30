import "./Products.css";

import { Link } from "react-router-dom";
import { useAllProductsContext, useProductIdContext } from "../../providers/Provider";

import { getDisplayPrice, getRatingStar } from "../../providers/utils";

function Products() {
	const AllProductsContext = useAllProductsContext();
	const data = AllProductsContext;

	const setProductId = useProductIdContext();

	return (
		<div className="Products">
			{data.map((product) => (
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
	);
}

export default Products;
