# Symfony 3.4 & Ionic 3 (Website & Rest API)
========================


This project has been created by `Symfony 3.4`  and `Ionic 3` frameworks and its just a `Demo`

## installation

Follow these steps : 

- 1 Clone or Download the Project
  * `$ git clone https://github.com/wiselh/Symfony3-Ionic3.git ProjectName`

- 2 Install packages
  * `$ cd symfony` then `$ composer install` to install all symfony packages.
  * `$ cd ionicApp` then `$ npm install` to install all ionic packages.

- 3 Setup database  
  * `$ cd backend` then `$ php bin/console doctrine:database:create`
  * `$ php bin/console doctrine:schema:update --force`
  * `$ php bin/console doctrine:fixtures:load` will create first user : username = `admin` & password = `0000`
 
- 4 Finally Run the App
  * `$ php bin/console serve:run`
  * `ionic serve -l`

### Enjoy!  
                                              Happy Coding
