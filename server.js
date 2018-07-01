const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");

const menu = {
  1: {
    id: 1,
    name: "Creamy Latte",
    description:
      "A coffee obsession often starts with the latte. Smooth and creamy, it combines the subtle strength of espresso with freshly steamed milk",
    price: 3.5
  },
  2: {
    id: 2,
    name: "Flat white",
    description:
      "This one is the barista’s pride and joy. It’s rich, full flavoured coffee with a velvet smooth texture that’s finished with the perfect florette",
    price: 3
  },
  3: {
    id: 3,
    name: "Americano",
    description:
      "Created using our signature Mocha Italia Espresso, lengthened with hot water to give a smooth finish. Enjoy straight up or add a splash of milk.",
    price: 4
  },
  4: {
    id: 4,
    name: "Cortado",
    description:
      "A small but mighty coffee. A rich, intense cup topped off with textured milk. It packs the biggest punch of all our coffees. To finish, we sign it off with a heart.",
    price: 4
  },
  5: {
    id: 5,
    name: "Cappucino",
    description:
      "Our classic cappuccino is a warm blanket of silky milk with a smooth espresso and dusting of chocolate. It’s the frothiest of coffees – and if you want even frothier, just ask your barista.",
    price: 4.5
  },
  6: {
    id: 6,
    name: "Intense Espresso",
    description:
      "Our short, dark, handsome hero is the heartbeat of all Costa Coffees. It’s an elegant simple shot of Espresso with the wonderful aroma of warm toast.",
    price: 5
  }
};

app.get("/menu", function(req, res) {
  res.json(menu);
});

app.get("/menu/:menuItemId", function(req, res) {
  const item = menu[req.params.menuItemId];
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

app.post("/submitOrder", function(req, res) {
  const result = Object.keys(req.body.order).map(item => {
    const { name, price } = menu[item];
    console.log(req.body.order);
    return ` ${
      req.body.customerId
    } thanks for ordering ${item} of ${name} for ${price} each ${item * price}`;
  });
  // console.log(req.body);
  console.log(result);
  res.json(result);
});

app.get("/", function(req, res) {
  // res.render("index");
  res.sendfile(__dirname + "/static/index.html");
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
