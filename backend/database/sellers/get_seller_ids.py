import sqlite3

local_path = "./database/sellers/"
datasets_path = "./database/datasets/"

# Connect to the database
database = local_path + "sellers.db"
connection = sqlite3.connect(database)
cursor = connection.cursor()

def get_seller_ids():
    try:
        cursor.execute("SELECT DISTINCT seller_id FROM sellers")
        connection.commit()
    except sqlite3.IntegrityError:
        connection.rollback()

    seller_ids = cursor.fetchall()
    return seller_ids