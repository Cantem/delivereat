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
    return (
      <div className="order">
        <h2>Order: </h2>
        <ul>
          {Object.entries(this.props.currentOrder).map(([id, quantity]) => {
            //re-learn object desctructuring
            // this.getSubtotal(); // thought it was a good idea to update the subtotal here
            return (
              <div key={id} className="container">
                <li className="list">
                  {this.props.menu[id].name}: €{quantity *
                    this.props.menu[id].price}
                </li>
                <li className="list">
                  Quantity:{quantity * this.props.menu[id].id}
                </li>
              </div>
            );
          })}
        </ul>
        <p>Subtotal: {this.state.currentTotal}</p>
        <p>Delivery fee: €5.00</p>
        <h2>Total:</h2>
        <button className="item__button" onClick={this.sendOrder}>
          Place order
        </button>
      </div>
    );
  }
}

export default Order;
