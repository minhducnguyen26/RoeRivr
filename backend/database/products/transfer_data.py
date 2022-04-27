import sqlite3
import csv
import random
from numpy import arange

import sys
sys.path.append('./database/sellers/') 
from get_seller_ids import get_seller_ids

local_path = "./database/products/"
datasets_path = "./database/datasets/"

# Connect to the database
database = local_path + "products.db"
connection = sqlite3.connect(database)
cursor = connection.cursor()

def verify_value(value):
    if value == '':
        return 'No Data'
    return value

# Transfer the data from the csv file to the database
def transfer_products_data(filename):
    with open(filename, 'r') as csv_file:
        csv_reader = csv.reader(csv_file)

        for row in csv_reader:
            # Skip the header row
            if row[0] == 'Uniq Id':
                continue

            # Get the seller ids
            seller_ids = get_seller_ids()
            seller_id = random.choice(seller_ids)

            #! Product's Basic Infos
            product_id = verify_value(row[0])            
            name = verify_value(row[1])
            category = verify_value(row[4])
            price = verify_value(row[7])
            image_url = verify_value(row[15])
            rating = random.choice(arange(0, 5.5, 0.5))
            is_best_seller = 0

            # Insert the data into the database - "products" table
            try:
                cursor.execute('''
                    INSERT INTO products (product_id, name, category, price, image_url, rating, is_best_seller) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ''', (product_id, name, category, price, image_url, rating, is_best_seller))
                connection.commit()
            except sqlite3.IntegrityError:
                connection.rollback()

            #! Product's Details
            model_number = verify_value(row[9])
            about_product = verify_value(row[10])
            product_specification = verify_value(row[11])
            technical_details = verify_value(row[12])
            shipping_weight = verify_value(row[13])
            product_dimensions = verify_value(row[14])
            upc_ean_code = verify_value(row[5])
            seller_id = seller_id[0]
            product_url = verify_value(row[18])

            # Insert the data into the database - "product_details" table
            try:
                cursor.execute('''
                    INSERT INTO product_details (product_id, model_number, about_product, product_specification, technical_details, shipping_weight, product_dimensions, upc_ean_code, seller_id, product_url)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (product_id, model_number, about_product, product_specification, technical_details, shipping_weight, product_dimensions, upc_ean_code, seller_id, product_url))
                connection.commit()
            except sqlite3.IntegrityError:
                connection.rollback()
                
# Transfer the data from the csv file to the database
def transfer_best_sellers_data(filename):
    with open(filename, 'r') as csv_file:
        csv_reader = csv.reader(csv_file)

        for row in csv_reader:
            # Skip the header row
            if row[0] == 'ASIN':
                continue

            #! Best Seller's Basic Infos
            product_id = verify_value(row[0] + row[21])            
            name = verify_value(row[3])
            category = verify_value(row[2])
            price = verify_value(row[8])
            image_url = verify_value(row[4])
            rating = verify_value(row[16])
            is_best_seller = 1

            # Insert the data into the database - "products" table
            try:
                cursor.execute('''
                    INSERT INTO products (product_id, name, category, price, image_url, rating, is_best_seller) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ''', (product_id, name, category, price, image_url, rating, is_best_seller))
                connection.commit()
            except sqlite3.IntegrityError:
                connection.rollback()

            #! Best Seller's Details
            fba_fee = verify_value(row[9])
            fbm_fee = verify_value(row[10])
            height = verify_value(row[11])
            length = verify_value(row[12])
            width = verify_value(row[13])
            weight = verify_value(row[14])
            review_count = verify_value(row[15])
            seller_id = verify_value(row[7])

            # Insert the data into the database - "best_sellers_details" table
            try:
                cursor.execute('''
                    INSERT INTO best_sellers_details (product_id, fba_fee, fbm_fee, height, length, width, weight, review_count, seller_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (product_id, fba_fee, fbm_fee, height, length, width, weight, review_count, seller_id))
                connection.commit()
            except sqlite3.IntegrityError:
                connection.rollback()

if __name__ == '__main__':
    products_data = datasets_path + "amazon_dataset.csv"
    transfer_products_data(products_data)

    best_sellers_data = datasets_path + "best_sellers_dataset.csv"
    transfer_best_sellers_data(best_sellers_data)

    connection.close()
    
    print("products.db - Data transfer complete!")