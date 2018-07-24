# flask-to-do

This is basic to-do app using flask + react + docker. To run this on local machine, follow these steps after cloning the repository. Assuming that docker & docker-compose are already configured on your machine. 

## Install npm dependencies
```
yarn install
```

## To start and load the front-end app from docker container. 
```
yarn run build
docker-compose up --build
```
You will be able to access the app on http://localhost:4000

## To run UI in webpack-dev-server & backend in docker container.
```
docker-compose up --build
yarn run serve
```
You will be able to access the app on http://localhost:8080
