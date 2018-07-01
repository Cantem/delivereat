import React from "react";

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onOrderClick(this.props.menuItem.id);
  }

  render() {
    return (
      <div className="item">
        <li className="item__name">{this.props.menuItem.name}</li>
        <p className="item__description">{this.props.menuItem.description}</p>
        <p className="item__price">€{this.props.menuItem.price.toFixed(2)}</p>
        <button
          className="item__button"
          onClick={this.handleClick}
          type="button"
        >
          Add to order
        </button>
      </div>
    );
  }
}

export default Menu;
