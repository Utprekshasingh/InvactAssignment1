let express = require("express");
let cors = require("cors");

let app = express();
app.use(cors());

// Server side values
let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate =2;

// Endpoint 1
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let total = newItemPrice + cartTotal;
  res.send(total.toString())
})

// Endpoint 2
app.get('/membership-discount', (req, res) => {
  let isMember = req.query.isMember;
  let cartTotal = parseFloat(req.query.cartTotal);
  if(isMember === "true"){
    cartTotal = cartTotal - (cartTotal * discountPercentage)/100; 
  }
  res.send(cartTotal.toString())
})

// Endpoint 3
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  cartTotal = (cartTotal * taxRate)/100; 
  res.send(cartTotal.toString());
});

// Endpoint 4
app.get('/estimate-delivery', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let shippingMethod = req.query.shippingMethod;
  let deliveryTime;
  if(shippingMethod === "standard"){
    deliveryTime = distance/50;
  }
  else if(shippingMethod === "express"){
    deliveryTime = distance/100;
  }
  res.send(deliveryTime.toString());
});

// Endpoint 5
app.get('/shipping-cost', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let weight = parseFloat(req.query.weight);
  let cost = weight*distance*0.1;
  res.send(cost.toString());
});

// Endpoint 6
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let points = purchaseAmount * loyaltyRate;
  res.send(points.toString());
});

let port = 3010;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

