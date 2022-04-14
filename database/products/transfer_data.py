import sqlite3
import csv
import random
from numpy import arange

path = "./database/products/"

# Connect to the database
database = path + "products.db"
connection = sqlite3.connect(database)
cursor = connection.cursor()

def verify_value(value):
    if value == '':
        return 'No Data'
    return value

# Transfer the data from the csv file to the database
def transfer_data(filename):
    with open(filename, 'r') as csv_file:
        csv_reader = csv.reader(csv_file)

        for row in csv_reader:
            # Skip the header row
            if row[0] == 'Uniq Id':
                continue

            #! Product's Basic Infos
            id = verify_value(row[0])            
            name = verify_value(row[1])
            category = verify_value(row[4])
            selling_price = verify_value(row[7])
            rating = random.choice(arange(0, 5.5, 0.5))

            # Insert the data into the database - "products" table
            try:
                cursor.execute("INSERT INTO products (product_id, name, category, selling_price, rating) VALUES (?, ?, ?, ?, ?)", (id, name, category, selling_price, rating))
                connection.commit()
            except sqlite3.IntegrityError:
                connection.rollback()

            #! Product's details
            model_number = verify_value(row[9])
            about_product = verify_value(row[10])
            product_specification = verify_value(row[11])
            technical_details = verify_value(row[12])
            shipping_weight = verify_value(row[13])
            product_dimensions = verify_value(row[14])
            upc_ean_code = verify_value(row[5])
            is_amazon_seller = verify_value(row[25])

            # Insert the data into the database - "product_details" table
            try:
                cursor.execute("INSERT INTO product_details (product_id, model_number, about_product, product_specification, technical_details, shipping_weight, product_dimensions, upc_ean_code, is_amazon_seller) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", (id, model_number, about_product, product_specification, technical_details, shipping_weight, product_dimensions, upc_ean_code, is_amazon_seller))
                connection.commit()
            except sqlite3.IntegrityError:
                connection.rollback()

            #! Product's URL links
            image_url = verify_value(row[15])
            product_url = verify_value(row[18])

            # Insert the data into the database - "product_url_links" table
            try:
                cursor.execute("INSERT INTO product_url_links (product_id, image_url, product_url) VALUES (?, ?, ?)", (id, image_url, product_url))
                connection.commit()
            except sqlite3.IntegrityError:
                connection.rollback()
                
if __name__ == '__main__':
    filename = path + "amazon_dataset.csv"
    transfer_data(filename)