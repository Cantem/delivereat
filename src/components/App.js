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
    console.log("mounted");
    const url = "http://localhost:8080/menu";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ menu: data });
      });
  }

  orderReceiver(id) {
    const currentOrder = Object.assign({}, this.state.currentOrder, {
      [id]: this.state.currentOrder[id] ? this.state.currentOrder[id] + 1 : 1
    });
    this.setState({ currentOrder });
  }

  //   const {addToOrder, removeFromOrder} = orderReceiver();

  render() {
    console.log(this.state.currentOrder);
    return (
      <div>
        <Header />
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
        <Order />
      </div>
    );
  }
}

export default App;
