import sqlite3

path = "./database/products/"
database = path + "products.db"

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

class ProductsDB:
    def __init__(self):
        self.connection = sqlite3.connect(database)
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()
        self.page_numbers = self.update_page_numbers("products")

    def get_limit_and_offset(self, page_number):
        limit = 50
        offset = (int(page_number) - 1) * limit
        return limit, offset

    def update_page_numbers(self, table_name):
        self.cursor.execute('''
            SELECT COUNT(*) FROM {}
        '''.format(table_name))

        self.page_numbers = self.cursor.fetchone()["COUNT(*)"]

    def get_page_numbers(self):
        return self.page_numbers

    def get_all_products_on_page(self, page_number):
        limit, offset = self.get_limit_and_offset(page_number)

        data = [limit, offset]
        self.cursor.execute('''
            SELECT * FROM products
            JOIN product_url_links
                ON product_url_links.product_id = products.product_id
            LIMIT ?
            OFFSET ?
        ''', data)
    
        products = self.cursor.fetchall()
        return products

    def get_product_by_id(self, product_id):
        data = [product_id]

        self.cursor.execute('''
            SELECT * FROM products
            JOIN product_details
                ON product_details.product_id = products.product_id
            JOIN product_url_links
                ON product_url_links.product_id = products.product_id
            WHERE products.product_id = ?
        ''', data)

        product = self.cursor.fetchone()
        return product

    def create_product_by_category_table(self, category):
        # Drop old products_by_category if exists
        self.cursor.execute('''
            DROP TABLE IF EXISTS products_by_category
        ''')

        # Create new products_by_category for the new category
        self.cursor.execute('''
            CREATE TEMPORARY TABLE products_by_category AS
            SELECT 
                products.product_id AS product_id,
                products.name AS product_name,
                products.category AS category,
                products.selling_price AS selling_price,
                products.rating AS rating,
                product_url_links.image_url AS image_url,
                product_url_links.product_url AS product_url
            FROM products
            JOIN product_url_links
                ON product_url_links.product_id = products.product_id
            WHERE products.category = ?
        ''', [category])

        self.update_page_numbers("products_by_category")

    def get_all_products_by_category_on_page(self, page_number):
        limit, offset = self.get_limit_and_offset(page_number)
        data = [limit, offset]

        self.cursor.execute('''
            SELECT * FROM products_by_category
            LIMIT ?
            OFFSET ?
        ''', data)

        products = self.cursor.fetchall()
        return products

    def get_sorted_product_by_price_order_on_page(self, table_name, price_order, page_number):
        limit, offset = self.get_limit_and_offset(page_number)
        data = [limit, offset]

        # price_order == "ASC" or "DESC"
        if table_name == "products":
            self.cursor.execute('''
                SELECT * FROM products
                JOIN product_url_links
                    ON product_url_links.product_id = products.product_id
                ORDER BY selling_price {}
                LIMIT ?
                OFFSET ?
            '''.format(price_order), data)
        
        elif table_name == "products_by_category":  
            self.cursor.execute('''
                SELECT * FROM products_by_category
                ORDER BY selling_price {}
                LIMIT ?
                OFFSET ?
            '''.format(price_order), data)

        products = self.cursor.fetchall()
        return products
    
    def get_sorted_product_by_rating_number_on_page(self, table_name, rating_number, page_number):
        limit, offset = self.get_limit_and_offset(page_number)
        data = [rating_number, limit, offset]

        if table_name == "products":
            self.cursor.execute('''
                SELECT * FROM products
                JOIN product_url_links
                    ON product_url_links.product_id = products.product_id
                WHERE products.rating >= ?
                LIMIT ?
                OFFSET ?
            ''', data)
        
        elif table_name == "products_by_category":
            self.cursor.execute('''
                SELECT * FROM products_by_category
                WHERE rating >= ?
                LIMIT ?
                OFFSET ?
            ''', data)

        products = self.cursor.fetchall()
        return products

    def get_all_categories(self):
        self.cursor.execute('''
            SELECT DISTINCT category FROM products
        ''')

        categories = self.cursor.fetchall()
        return categories

    def get_all_ratings(self):
        self.cursor.execute('''
            SELECT DISTINCT rating FROM products
        ''')

        ratings = self.cursor.fetchall()
        return ratings