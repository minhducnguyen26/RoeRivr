import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import { MainProvider } from "./providers/Provider";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<MainProvider>
		<BrowserRouter>
			<Routes>
				{/* Products */}
				<Route path="/" element={<Home />} />
				<Route path="/:page_number" element={<Home />} />

				{/* Products By Category */}
				<Route path="/categories/:category" element={<Home />} />
				<Route path="/categories/:category/:page_number" element={<Home />} />

				{/* Products By Rating Order */}
				<Route path="/rating/:rating_order" element={<Home />} />
				<Route path="/products/rating/:rating_order" element={<Home />} />
				<Route path="/products/:page_number/rating/:rating_order" element={<Home />} />
				<Route path="/categories/:category/rating/:rating_order" element={<Home />} />
				<Route path="/categories/:category/:page_number/rating/:rating_order" element={<Home />} />

				{/* Products By Price Order */}
				<Route path="/price/:price_order" element={<Home />} />
				<Route path="/products/price/:price_order" element={<Home />} />
				<Route path="/products/:page_number/price/:price_order" element={<Home />} />
				<Route path="/categories/:category/price/:price_order" element={<Home />} />
				<Route path="/categories/:category/:page_number/price/:price_order" element={<Home />} />

				{/* Products By Search Name */}
				<Route path="/search/:search_value" element={<Home />} />

				{/* Product Detail */}
				<Route path="/product/:product_id" element={<Product />} />
				<Route path="/:page_number/product/:product_id" element={<Product />} />
				<Route path="/categories/:category/product/:product_id" element={<Product />} />
				<Route path="/categories/:category/:page_number/product/:product_id" element={<Product />} />
				<Route path="/rating/:rating_order/product/:product_id" element={<Product />} />
				<Route path="/rating/:rating_order/:page_number/product/:product_id" element={<Product />} />
				<Route path="/price/:price_order/product/:product_id" element={<Product />} />
				<Route path="/price/:price_order/:page_number/product/:product_id" element={<Product />} />
				<Route path="/search/:search_value/product/:product_id" element={<Product />} />
				<Route path="/search/:search_value/:page_number/product/:product_id" element={<Product />} />
			</Routes>
		</BrowserRouter>
	</MainProvider>
);
