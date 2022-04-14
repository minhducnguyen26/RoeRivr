
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

    def handle_get_all_products_on_page(self, page_number):
        db = ProductsDB()
        products = db.get_all_products_on_page(page_number)
        self.handle_GET_response(products)

    def handle_get_product_by_id(self, product_id):
        db = ProductsDB()
        product = db.get_product_by_id(product_id)
        self.handle_GET_response(product)

    def do_GET(self):
        print("The request path is:", self.path)

        path_parts = self.path.split("/")
        route = path_parts[1]

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
        else:
            self.handleNotFound()

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