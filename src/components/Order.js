import React from "react";

class Order extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTotal: 0
    };

    this.getSubtotal = this.getSubtotal.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
  }

  getSubtotal() {
    const totalPrices = Object.keys(this.props.currentOrder).map(id => {
      return this.props.menu[id].price * this.props.currentOrder[id];
    });
    let sumOfPrices = 0;
    totalPrices.forEach(function(item) {
      sumOfPrices += item;
    });
    return sumOfPrices;
  }

  sendOrder(event) {
    const orderToSend = {
      customerId: "Cutomer 1",
      order: this.props.currentOrder
    };

    event.preventDefault();
    fetch("/submitOrder", {
      method: "post",
      body: JSON.stringify(orderToSend),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  render() {
    const subtotal = this.getSubtotal();
    const deliveryFee = 5;
    return (
      <div className="order">
        <h2>Order: </h2>
        <ul>
          {Object.entries(this.props.currentOrder).map(([id, quantity]) => {
            //re-learn object desctructuring
            return (
              <div key={id} className="container">
                <li className="list">
                  {this.props.menu[id].name}: €{parseInt(
                    quantity * this.props.menu[id].price,
                    10
                  ).toFixed(2)}
                </li>
                <li className="list">
                  Quantity:{quantity * this.props.menu[id].id}
                </li>
              </div>
            );
          })}
        </ul>
        <p> Subtotal:€{parseInt(subtotal, 10).toFixed(2)} </p>
        <p>Delivery fee:€{parseInt(deliveryFee, 10).toFixed(2)}</p>
        <h2>Total:€{parseInt(subtotal + deliveryFee, 10).toFixed(2)}</h2>
        <button className="item__button" onClick={this.sendOrder}>
          Place order
        </button>
      </div>
    );
  }
}

export default Order;
