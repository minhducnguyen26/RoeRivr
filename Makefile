#! Products Database
new_products_db:
	rm ./database/products/products.db
	sqlite3 ./database/products/products.db < ./database/products/products_schema.sql

sqlite3_products_db:
	sqlite3 ./database/products/products.db

# Transfer the data from the csv file to the database
transfer:
	python3 ./database/products/transfer_data.py

#! Users Database
new_users_db:
	rm ./database/users/users.db
	sqlite3 ./database/users/users.db < ./database/users/users_schema.sql

sqlite3_users_db:
	sqlite3 ./database/users/users.db

#! Run the server
run_server:
	python3 ./server/server.py