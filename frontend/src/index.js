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
				<Route path="/" element={<Home />} />
				<Route path="/:page_number" element={<Home />} />
				<Route path="/categories/:category" element={<Home />} />
				<Route path="/categories/:category/:page_number" element={<Home />} />

				<Route path="/product/:product_id" element={<Product />} />
				<Route path="/:page_number/product/:product_id" element={<Product />} />
				<Route path="/categories/:category/product/:product_id" element={<Product />} />
			</Routes>
		</BrowserRouter>
	</MainProvider>
);
