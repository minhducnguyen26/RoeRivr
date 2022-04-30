all:
	@echo Pick an option from Makefile

#! Products Database
new_products_db:
	rm ./database/products/products.db
	sqlite3 ./database/products/products.db < ./database/products/products_schema.sql

sqlite3_products_db:
	sqlite3 ./database/products/products.db

transfer_products_db:
	python3 ./database/products/transfer_data.py

#! Sellers Database
new_sellers_db:
	rm ./database/sellers/sellers.db
	sqlite3 ./database/sellers/sellers.db < ./database/sellers/sellers_schema.sql

sqlite3_sellers_db:
	sqlite3 ./database/sellers/sellers.db

transfer_sellers_db:
	python3 ./database/sellers/transfer_data.py

#! Users Database
new_users_db:
	rm ./database/users/users.db
	sqlite3 ./database/users/users.db < ./database/users/users_schema.sql

sqlite3_users_db:
	sqlite3 ./database/users/users.db

transfer_users_db:
	python3 ./database/users/transfer_data.py

#! Run the server
run_server:
	python3 ./server/server.py