## how to setup the database and the project :
The Database port =127.0.0.1
create a database using psql with a username : postgres
and a password: 1234 
// CREATE USER postgres WITH PASSWORD '1234';
then create a database called : store_backend_dev 
//CREATE DATABASE store_backend_dev;
and for testing :store_backend_test
//CREATE DATABASE store_backend_test;
//create a varaible name  ENV = dev 

//run the script :npm install 
to install all the packages 
//the project is running on the port : "0.0.0.0:3000"

Other env varaible needed to run the project :
BCRYPT_PASSWORD=your-secret-password
SALT_ROUNDS=10
TOKEN_SECRET= alohomora123!
## Run the migartions :
run db_migarte -c 4 to create all the tables in your database .

## Run the project :
by running the scrip npm start the server will lanch and you can test all the endpoint provided in the `Requirments.md` 

## for testing :
for testing you must run the following scripts : npm run tsc 
to compile the .ts file to .js to run jasmine 
then run : npm test 
for testing there will be 19 suites provided for each model and the required endpoints only 


