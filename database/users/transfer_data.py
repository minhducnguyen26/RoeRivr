import sqlite3
import csv

local_path = "./database/users/"
datasets_path = "./database/datasets/"

# Connect to the database
database = local_path + "users.db"
connection = sqlite3.connect(database)
cursor = connection.cursor()

# Transfer the data from the csv file to the database
def transfer_data(filename):
    with open(filename, 'r') as csv_file:
        csv_reader = csv.reader(csv_file)

        for row in csv_reader:
            # Skip the header row
            if row[0] == 'id':
                continue

            first_name = row[1]
            last_name = row[2]
            email = row[3]
            password = row[4]
            address = row[5]

            # Insert the data into the database - "users" table
            try:
                cursor.execute('''
                    INSERT INTO users (first_name,last_name,email,password,address)
                    VALUES (?, ?, ?, ?, ?)
                ''', (first_name,last_name,email,password,address))
                connection.commit()
            except sqlite3.IntegrityError:
                connection.rollback()
                
if __name__ == '__main__':
    filename = datasets_path + "users_dataset.csv"
    transfer_data(filename)
    
    connection.close()
    
    print("users.db - Data transfer complete!")