import React from "react";

class Order extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTotal: 0,
      quantity: 0
    };

    this.getSubtotal = this.getSubtotal.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
  }

  getSubtotal() {
    this.setState((prevState, props) => ({
      currentTotal: prevState.currentTotal + props.menu[id].price
    }));
  }

  sendOrder(event) {
    const orderToSend = {
      customerId: "camelea",
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
    return (
      <div className="order">
        <h2>Order: </h2>
        <ul>
          {Object.entries(this.props.currentOrder).map(([id, quantity]) => {
            //re-learn object desctructuring
            // this.getSubtotal(); // thought it was a good idea to update the subtotal here
            return (
              <li key={id}>
                {this.props.menu[id].name}: €{quantity *
                  this.props.menu[id].price}
                quantity:{quantity * this.props.menu[id].id}
              </li>
            );
          })}
        </ul>
        <p>Subtotal: {this.state.currentTotal}</p>
        <p>Delivery fee: €5.00</p>
        <h2>Total:</h2>
        <button onClick={this.sendOrder}> place order</button>
      </div>
    );
  }
}

export default Order;
