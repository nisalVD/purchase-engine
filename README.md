# Discount Engine

App is deployed [Purchase Engine](https://master--purchase-engine.netlify.app/)

## How to use

To run tests do

```
npm run test
```

to run dev

```
npm run dev

```

## routes

```
  POST /.netlify/functions/login
```

expected body,

```
{
  "email": "hello@example.com",
  "password": "password"
}

```
can login with details above
to get a jwt with bangaroo sydney to test out the $100 discount

```
  POST /.netlify/functions/purchase
```
expected headers
```
  Authorization: Bearer <token>
```
expected body
```
{
  "price": 10003.23,
  "description": "this is a purchase",
  "productSKU": "foo"
}

```

```
POST /.netlify/functions/signup
```
expected body
```
{
  "email": "person@example.com",
  "password": "abc123",
  "name": "person",
  "phoneNumber": "1232131",
  "deliveryAddress": "100 bar street"
}
```
will return a jwt with the specified fields

postman workspace to try out the requests
[Workspace](https://www.postman.com/gold-water-3832/workspace/bb17f423-9b52-4c5c-9230-a1112af2ba78/request/3528627-d84c13a3-f444-4d51-8284-11014fe81a0b)
