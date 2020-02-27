1. run the server.

Server :

a. for running  :
-> nodemon server.js (OR) npm start

b. start to migrate database :
-> npx sequelize-cli db:migrate

c. start seeder to insert datas of users and rooms :
-> npx sequelize-cli db:seed:all

2. run the client

a. sign in :

role user :

	1. email : mei@gmail.com
	pwd : mei
	role: admin
	
	2. email : ana@gmail.com
	pwd : ana
	role: resepsionis
	
	3. email : nuri@gmail.com
	pwd : nuri
	role : resepsionis
	
b. signup -> for a signup, the client automatically gets the role as user/customers
