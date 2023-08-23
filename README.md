<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Run in development

## Clone the repository and move to the directory

## Installation
Install all the dependencies with:
```bash
yarn install
```

## Install Nest CLI

```bash
npm i -g @nestjs/cli
```

## Start the Database (You will need Docker) 

```bash
docker-compose up -d
```

## Running the app

```bash
# development
yarn run start

# watch mode
yarn run start:dev
```

## The app run on this ports by default
```
 http://localhost:3000/
```

## Endpoints
POST Create new user
{
    "email": "YourUser@hotmail.com",
    "password": "Hola123@@",
    "fullName": "YourUser",
    "age": 28
}
```
 localhost:3000/api/auth/signup
```
POST Login with existing user
{
    "email": "YouUser@hotmail.com",
    "password": "Hola123@@"
}
```
 localhost:3000/api/auth/login
```
POST Encode url (You will have no access if you have not a JWT) 
{
    "longUrl":"https://geekbears.com/defining-an-mvp-for-non-technical-founders/"
}
```
 localhost:3000/api/encrypt-url
```
POST Decode url (You will have no access if you have not a JWT) 
{
     "shortUrl":"https://geekbears.com/da/9h3bBTQW"
}
```
 localhost:3000/api/encrypt-url/getOriginal
```

## To check the documentation with swagger

```
http://localhost:3000/api/docs
```
## Tech Stack

- MongoDB
- Nest JS
