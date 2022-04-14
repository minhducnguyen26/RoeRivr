CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    product_id TEXT NOT NULL,
    name TEXT NOT NULL, 
    category TEXT,
    selling_price INTEGER,
    rating REAL
);

CREATE TABLE product_details (
    id INTEGER PRIMARY KEY,
    product_id TEXT NULL,
    model_number TEXT,
    about_product TEXT,
    product_specification TEXT,
    technical_details TEXT,
    shipping_weight TEXT,
    product_dimensions TEXT,
    upc_ean_code TEXT,
    is_amazon_seller TEXT,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE product_url_links (
    id INTEGER PRIMARY KEY,
    product_id TEXT NOT NULL,
    image_url TEXT,
    product_url TEXT,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);