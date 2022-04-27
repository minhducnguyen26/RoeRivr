CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    product_id TEXT NOT NULL,
    name TEXT NOT NULL, 
    category TEXT NOT NULL,
    price INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    rating REAL NOT NULL,
    is_best_seller INTEGER NOT NULL
);

CREATE TABLE product_details (
    id INTEGER PRIMARY KEY,
    product_id TEXT NOT NULL,
    model_number TEXT NOT NULL,
    about_product TEXT NOT NULL,
    product_specification TEXT NOT NULL,
    technical_details TEXT NOT NULL,
    shipping_weight TEXT NOT NULL,
    product_dimensions TEXT NOT NULL,
    upc_ean_code TEXT NOT NULL,
    seller_id TEXT NOT NULL,
    product_url TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (seller_id) REFERENCES sellers(seller_id)
);

CREATE TABLE best_sellers_details (
    id INTEGER PRIMARY KEY,
    product_id TEXT NOT NULL,
    fba_fee REAL NOT NULL,
    fbm_fee REAL NOT NULL,
    height REAL NOT NULL,
    length REAL NOT NULL,
    width REAL NOT NULL,
    weight REAL NOT NULL,
    review_count INTEGER NOT NULL,
    seller_id TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES best_sellers(product_id),
    FOREIGN KEY (seller_id) REFERENCES sellers(seller_id)
);