import sqlite3
import csv

local_path = "./database/sellers/"
datasets_path = "./database/datasets/"

# Connect to the database
database = local_path + "sellers.db"
connection = sqlite3.connect(database)
cursor = connection.cursor()

def verify_value(value):
    if value == '':
        return 'Amazon'
    return value

# Transfer the data from the csv file to the database
def transfer_data(filename):
    with open(filename, 'r') as csv_file:
        csv_reader = csv.reader(csv_file)

        for row in csv_reader:
            # Skip the header row
            if row[0] == 'ASIN':
                continue

            seller_id = verify_value(row[7])
            brand_name = verify_value(row[6])
            sales_rank = verify_value(row[17])
            seller_type = verify_value(row[19])
            monthly_revenue = verify_value(row[22])

            # Insert the data into the database - "sellers" table
            try:
                cursor.execute('''
                    INSERT INTO sellers (seller_id, brand_name, sales_rank, seller_type, monthly_revenue)
                    SELECT ?, ?, ?, ?, ?
                    WHERE NOT EXISTS (
                        SELECT * FROM sellers 
                        WHERE seller_id = ?
                    )
                    ''', (seller_id, brand_name, sales_rank, seller_type, monthly_revenue, seller_id))
                connection.commit()
            except sqlite3.IntegrityError:
                connection.rollback()
                
if __name__ == '__main__':
    filename = datasets_path + "best_sellers_dataset.csv"
    transfer_data(filename)
    
    connection.close()
    
    print("sellers.db - Data transfer complete!")