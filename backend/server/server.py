
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import json
from products_db import ProductsDB

class MyRequestHandler(BaseHTTPRequestHandler):
    def handleNotFound(self):
        self.send_response(404)
        self.send_header("Content-Type", "text/plain")
        self.end_headers()
        self.wfile.write(bytes("SERVER NOT FOUND.", "utf-8"))

    #! Products
    def handle_get_all_products_on_page(self, page_number):
        db = ProductsDB()
        products = db.get_all_products_on_page(page_number)
        self.handle_GET_response(products)

    def handle_get_product_by_id(self, product_id):
        db = ProductsDB()
        product = db.get_product_by_id(product_id)
        self.handle_GET_response(product)

    #! Categories
    def handle_get_all_categories(self):
        db = ProductsDB()
        categories = db.get_all_categories()
        self.handle_GET_response(categories)

    def handle_get_all_products_by_category_on_page(self, category, page_number):
        db = ProductsDB()
        products = db.get_all_products_by_category_on_page(category, page_number)
        self.handle_GET_response(products)

    #! Page Number
    def handle_get_page_numbers_for_current_data(self, table_name):
        db = ProductsDB()
        page_numbers = db.get_page_numbers_for_current_data(table_name)
        self.handle_GET_response(page_numbers)

    #! Rating
    def handle_get_all_products_by_rating_order_on_page(self, table_name, rating_order, page_number):
        db = ProductsDB()
        products = db.get_all_products_by_rating_order_on_page(table_name, rating_order, page_number)
        self.handle_GET_response(products)

    #! Price Order
    def handle_get_all_products_by_price_order_on_page(self, table_name, price_order, page_number):
        db = ProductsDB()
        products = db.get_all_products_by_price_order_on_page(table_name, price_order, page_number)
        self.handle_GET_response(products)

    #! Search
    def handle_get_all_products_by_search_on_page(self, product_name, page_number):
        db = ProductsDB()
        products = db.get_all_products_by_search_on_page(product_name, page_number)
        self.handle_GET_response(products)

    #! Endpoints
    def do_GET(self):
        print("The request path is:", self.path)

        path_parts = self.path.split("/")
        route = path_parts[1]

        #! Products
        if route == "products":
            # "/products"
            if len(path_parts) == 2:
                self.handle_get_all_products_on_page(1)
            
            # "/products/<page_number>"
            elif len(path_parts) == 3:
                page_number = path_parts[2]
                self.handle_get_all_products_on_page(page_number)

            # "/products/<page_number>/<product_id>"
            elif len(path_parts) == 4:
                product_id = path_parts[3]
                self.handle_get_product_by_id(product_id)

        #! Categories
        elif route == "categories":
            # "/categories"
            if len(path_parts) == 2:
                self.handle_get_all_categories()

            # "/categories/<category>"
            elif len(path_parts) == 3:
                category = path_parts[2]
                self.handle_get_all_products_by_category_on_page(category, 1)

            # "/categories/<category>/<page_number>"
            elif len(path_parts) == 4:
                category = path_parts[2]
                page_number = path_parts[3]
                self.handle_get_all_products_by_category_on_page(category, page_number)

        #! Page Number
        elif route == "page_numbers":
            # "/page_numbers/<table_name>"
            if len(path_parts) == 3:
                table_name = path_parts[2]
                self.handle_get_page_numbers_for_current_data(table_name)

        #! Rating
        elif route == "rating":
            # "/rating/<table_name>/<rating_order>/<page_number>"
            if len(path_parts) == 5:
                table_name = path_parts[2]
                rating_order = path_parts[3]
                page_number = path_parts[4]
                self.handle_get_all_products_by_rating_order_on_page(table_name, rating_order, page_number)

        #! Price Order
        elif route == "price":
            # "/price/<table_name>/<price_order>/<page_number>"
            if len(path_parts) == 5:
                table_name = path_parts[2]
                price_order = path_parts[3]
                page_number = path_parts[4]
                self.handle_get_all_products_by_price_order_on_page(table_name, price_order, page_number)

        #! Search
        elif route == "search":
            # "/search/<product_name>/<page_number>"
            if len(path_parts) == 4:
                product_name = path_parts[2]
                page_number = path_parts[3]
                self.handle_get_all_products_by_search_on_page(product_name, page_number)

    def handle_GET_response(self, response):
        if response != None:
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(bytes(json.dumps(response), "utf-8"))
        else:
            self.handleNotFound()

def server():
    # 127.0.0.1 is local IP address
    # 8080 is the port number
    listen = ("127.0.0.1", 8080)
    server = HTTPServer(listen, MyRequestHandler)
    print("The server is running on port 8080...")
    server.serve_forever()

server()