CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    address TEXT NOT NULL,
    account_type TEXT NOT NULL
);

CREATE TABLE user_orders (
    id INTEGER PRIMARY KEY,
    user_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE user_reviews (
    id INTEGER PRIMARY KEY,
    user_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    rating INTEGER NOT NULL,
    review TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);