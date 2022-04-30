import sqlite3
from utils import dict_factory

path = "./database/sellers/"
database = path + "sellers.db"

class SellersDB:
    def __init__(self):
        self.connection = sqlite3.connect(database)
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()

    def get_seller_by_id(self, seller_id):
        data = [seller_id]

        self.cursor.execute('''
            SELECT * FROM sellers
            WHERE seller_id = ?
        ''', data)
        seller = self.cursor.fetchone()
        return seller