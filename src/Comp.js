import React, { Component } from 'react';
import './App.css';
import moment from "moment";

class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      price: props.price,
      lastUpdate: moment().valueOf(),
      stat: "new"
    };
  }
  componentWillReceiveProps(nextProps) {
    let stat;
    const {price} = nextProps;
    const oldPrice = this.props.price;

    if(price > oldPrice){
      stat = "up";
    }
    else if(price < oldPrice){
      stat = "down";
    }

    let updateObj = {
      price,
      lastUpdate: moment().valueOf()
    }

    if(stat){
      updateObj['stat'] = stat
    }
    this.setState(updateObj)
  }
  render() {
    const {name, price, stat, lastUpdate} = this.state;
    return (
      <div className="stock-item">
        <p className="stock-name">
          {name}
        </p>
        <p className={"stock-price " + stat}>
          {price}
        </p>
        <p className="stock-last-update">{moment().from(lastUpdate)}</p>
      </div>
    );
  }
}

export default Comp;
