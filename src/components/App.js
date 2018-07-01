import React from "react";
import Menu from "./Menu";
import Header from "./Header";
import Order from "./Order";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menu: {},
      currentOrder: {}
    };

    this.orderReceiver = this.orderReceiver.bind(this);
  }

  componentDidMount() {
    const url = "/menu";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({ menu: data });
      });
  }

  orderReceiver(id) {
    const itemQuantity = this.state.currentOrder[id] || 0;
    const currentOrder = Object.assign({}, this.state.currentOrder, {
      [id]: itemQuantity + 1
    });
    // console.log(currentOrder);
    this.setState({ currentOrder });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="row">
          <div className="menu">
            <h2> Menu </h2>
            <ul className="list">
              {Object.values(this.state.menu).map(menuItem => (
                <Menu
                  menuItem={menuItem}
                  key={menuItem.id}
                  onOrderClick={this.orderReceiver}
                />
              ))}
            </ul>
          </div>
          <Order
            currentOrder={this.state.currentOrder}
            menu={this.state.menu}
          />
        </div>
      </div>
    );
  }
}

export default App;
