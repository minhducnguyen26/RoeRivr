import "./Products.css";

import { Link } from "react-router-dom";
import { useDataContext, useProductIdContext } from "../../providers/Provider";

function Products() {
	const dataContext = useDataContext();
	const data = dataContext;

	const productIdContext = useProductIdContext();
	const setProductId = productIdContext;

	return (
		<div className="Products">
			{data.map((product) => (
				<Link to={`product/${product.product_id}`} className="SingleProductWrapper" key={product.id} onClick={() => setProductId(product.product_id)}>
					<div className="ProductImage">
						<img src={product.image_url} alt={product.name} />
					</div>
					<div className="ProductName">{product.name}</div>
					<div className="ProductRating">Rating: {product.rating}/5</div>
					<div className="ProductPrice">
						{typeof product.price === "number" ? "$" : ""}
						{product.price.length > 15 ? "$19.99" : product.price}
					</div>
				</Link>
			))}
		</div>
	);
}

export default Products;
