import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <h1 className="title">
          <i>Deliver</i>
          <i>drink</i>
        </h1>
      </header>
    );
  }
}

export default Header;
