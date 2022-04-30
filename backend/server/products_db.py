import sqlite3
from utils import dict_factory

path = "./database/products/"
database = path + "products.db"

class ProductsDB:
    def __init__(self):
        self.connection = sqlite3.connect(database)
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()
        self.page_numbers = self.update_page_numbers("products")

    #! General
    def get_limit_and_offset(self, page_number):
        limit = 50
        offset = (int(page_number) - 1) * limit
        return limit, offset

    def update_page_numbers(self, table_name):
        self.cursor.execute('''
            SELECT COUNT(*)
            AS total_products
            FROM {}
        '''.format(table_name))

        total_products = self.cursor.fetchone()["total_products"]
        return int(total_products / 50) + 1

    def get_page_numbers_for_current_data(self, table_name):
        self.page_numbers = self.update_page_numbers(table_name)
        return self.page_numbers

    def check_is_best_seller(self, product_id):
        data = [product_id]
        self.cursor.execute('''
            SELECT * FROM products
            WHERE product_id = ?
        ''', data)
        is_best_seller = self.cursor.fetchone()["is_best_seller"]
        return is_best_seller

    #! Products
    def get_all_products_on_page(self, page_number):
        limit, offset = self.get_limit_and_offset(page_number)

        data = [limit, offset]
        self.cursor.execute('''
            SELECT * FROM products
            LIMIT ?
            OFFSET ?
        ''', data)
    
        products = self.cursor.fetchall()
        return products

    def get_product_by_id(self, product_id):
        data = [product_id]

        is_best_seller = self.check_is_best_seller(product_id)

        if is_best_seller == 0:
            self.cursor.execute('''
                SELECT * FROM products
                JOIN product_details
                    ON product_details.product_id = products.product_id
                WHERE products.product_id = ?
            ''', data)
            product = self.cursor.fetchone()
            return product
        else:
            self.cursor.execute('''
                SELECT * FROM products
                JOIN best_sellers_details
                    ON best_sellers_details.product_id = products.product_id
                WHERE products.product_id = ?
            ''', data)
            product = self.cursor.fetchone()
            return product

    def get_products_by_seller_id(self, seller_id):
        data = [seller_id]

        self.cursor.execute('''
            SELECT * FROM products
            JOIN (
                SELECT
                    p1.product_id AS product_details_product_id,
                    p2.product_id AS best_sellers_details_product_id
                FROM 
                    product_details AS p1
                JOIN 
                    best_sellers_details AS p2
                    ON p1.seller_id = p2.seller_id
                WHERE p1.seller_id = ?
            )
            ON products.product_id = product_details_product_id
            OR products.product_id = best_sellers_details_product_id
            GROUP BY products.product_id;
        ''', data)

        products = self.cursor.fetchall()
        
        return products

    #! Categories
    def create_products_by_category_table(self, category):
        # Drop old products_by_category if exists
        self.cursor.execute('''
            DROP TABLE IF EXISTS products_by_category
        ''')

        # Create new products_by_category for the new category
        self.cursor.execute('''
            CREATE TABLE products_by_category AS
            SELECT *
            FROM products
            WHERE category LIKE '%{}%'
        '''.format(category))

    def get_all_products_by_category_on_page(self, category, page_number):
        self.create_products_by_category_table(category)

        limit, offset = self.get_limit_and_offset(page_number)
        data = [limit, offset]

        self.cursor.execute('''
            SELECT * FROM products_by_category
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

    #! Rating
    def create_products_by_rating_order_table(self, table_name, rating_order):
        # Drop old products_by_rating_order if exists
        self.cursor.execute('''
            DROP TABLE IF EXISTS products_by_rating_order
        ''')

        data = [table_name, rating_order]

        # Create new products_by_rating_order for the new rating number
        self.cursor.execute('''
            CREATE TABLE products_by_rating_order AS
            SELECT *
            FROM {}
            ORDER BY rating {}
        '''.format(table_name, rating_order))

    def get_all_products_by_rating_order_on_page(self, table_name, rating_order, page_number):
        self.create_products_by_rating_order_table(table_name, rating_order)

        limit, offset = self.get_limit_and_offset(page_number)
        data = [limit, offset]

        self.cursor.execute('''
            SELECT * FROM products_by_rating_order
            LIMIT ?
            OFFSET ?
        ''', data)

        products = self.cursor.fetchall()
        return products

    #! Price Order
    def create_products_by_price_order_table(self, table_name, price_order):
        # Drop old products_by_price_order if exists
        self.cursor.execute('''
            DROP TABLE IF EXISTS products_by_price_order
        ''')

        data = [table_name, price_order]

        # Create new products_by_price_order for the new price order
        self.cursor.execute('''
            CREATE TABLE products_by_price_order AS
            SELECT *
            FROM {}
            ORDER BY price {}
        '''.format(table_name, price_order))

    def get_all_products_by_price_order_on_page(self, table_name, price_order, page_number):
        self.create_products_by_price_order_table(table_name, price_order)

        limit, offset = self.get_limit_and_offset(page_number)
        data = [limit, offset]

        self.cursor.execute('''
            SELECT * FROM products_by_price_order
            LIMIT ?
            OFFSET ?
        ''', data)

        products = self.cursor.fetchall()
        return products

    #! Search
    def create_products_by_search_table(self, product_name):
        # Drop old products_by_search if exists
        self.cursor.execute('''
            DROP TABLE IF EXISTS products_by_search
        ''')

        # Create new products_by_search for the new search
        self.cursor.execute('''
            CREATE TABLE products_by_search AS
            SELECT *
            FROM products
            WHERE name LIKE '%{}%'
        '''.format(product_name))

    def get_all_products_by_search_on_page(self, product_name, page_number):
        self.create_products_by_search_table(product_name)

        limit, offset = self.get_limit_and_offset(page_number)
        data = [limit, offset]

        self.cursor.execute('''
            SELECT * FROM products_by_search
            LIMIT ?
            OFFSET ?
        ''', data)

        products = self.cursor.fetchall()
        return products
