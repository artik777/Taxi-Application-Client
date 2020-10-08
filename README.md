# This is my Frontend for Taxi Application.

## Website

```
https://taxicodeacademy.web.app
https://taxicodeacademy.web.app/admin
```

## Tech stack

Vue.js, Vuetify, Vuex

## Deployment

Firebase

## Features for users
- All inputs have validation.
- https://taxicodeacademy.web.app you can see all services and to make and order you need to login
- https://taxicodeacademy.web.app/comments you can see all comments, to write you need to login
- https://taxicodeacademy.web.app/login when you login, on localstorage apears token.
- https://taxicodeacademy.web.app/register you can register.
- When you make and order, cars amount decreases

## Features for admin

- https://taxicodeacademy.web.app/adminlogin you can login to admin dashboard
- https://taxicodeacademy.web.app/admin you can see all your taxi cars, you can delete and modify.
- https://taxicodeacademy.web.app/add you can add new car.
- https://taxicodeacademy.web.app/adminregistration you can create new admin user
- https://taxicodeacademy.web.app/orders you can see all orders, change status to completed or canceled, also see your profit in profit table.
- https://taxicodeacademy.web.app/admincomments you can delete comments
- When you confirm order status to Completed or Canceled, cars amount increases on https://taxicodeacademy.web.app


## Installation

````
Install all npm dependecies
```console
npm install

````
## Configuration File

- Register firebase account https://firebase.google.com
- Copy firebase sdk key yo secret.js

```
  apiKey: "YOUR-KEY",
  authDomain:  "YOUR-KEY",
  databaseURL:  "YOUR-KEY",
  projectId:  "YOUR-KEY",
  storageBucket:  "YOUR-KEY",
  messagingSenderId:  "YOUR-KEY",
  appId:  "YOUR-KEY",
```

## Deploy to firebase

```console
npm run build
```

```console
firebase login
```

```console
firebase init
```

```console
firebase deploy
```
