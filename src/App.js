import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CompWrapper from './CompWrapper';
import _ from 'underscore';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      latestData: []
    };
    this.data = [
      [["APPL", 10], ["MICR", 20], ["REWS", 31], ["QWRV", 89], ["GSDB", 21]],
      [["APPL", 12], ["REWS", 645], ["QWRV", 6], ["GSDB", 43]],
      [["APPL", 30], ["MICR", 30], ["REWS", 21], ["QWRV", 89], ["GSDB", 654]],
      [["APPL", 20], ["MICR", 20], , ["QWRV", 4], ["GSDB", 21], ["QWRV", 40]],
      [["APPL", 31], ["MICR", 20], ["REWS", 5], ["QWRV", 2], ["GSDB", 4]],
      [["APPL", 10], ["MICR", 20], ["REWS", 31], , ["GSDB", 21]],
      [["APPL", 54], ["MICR", 40], ["REWS", 321], ["REWS", 31], ["QWRV", 1], ["GSDB", 55]],
      [["APPL", 12], ["MICR", 50], ["REWS", 645], ["QWRV", 6], ["GSDB", 43]],
      [["MICR", 30], ["REWS", 21], ["QWRV", 89], ["GSDB", 654], ["GSDB", 65]],
      [["APPL", 31], ["MICR", 20], ["REWS", 5], ["QWRV", 2], ["GSDB", 4]],
      [["APPL", 54], ["MICR", 40], ["REWS", 321], ["QWRV", 1], ["GSDB", 55]],
    ];
    this.connectSocket()
  }

  convertArrayToObject = (arr) => {
    let obj = {};
    arr.forEach((item) => {
      obj[item[0]] = item[1]
    });
    return obj
  }

  convertObjectToArray = (obj) => {
    let arr = [];
    _.each(obj, (val, key) => {
      arr.push([key, parseFloat(parseFloat(val).toFixed(2))])
    });
    return arr;
  }

  processData = (newData) => {
    let { latestData } = this.state;
    let oldObj = this.convertArrayToObject(latestData);
    let newObj = this.convertArrayToObject(newData);
    var finalData = this.convertObjectToArray(Object.assign(oldObj, newObj))
    this.setState({ latestData: finalData })
  }

  connectSocket = () => {
    this.connection = new WebSocket('ws://stocks.mnet.website');
    this.connection.onmessage = evt => {
      let data = JSON.parse(evt.data);
      this.processData(data);
    };
  }
  render() {
    const { number, latestData } = this.state;
    return (
      <div className="App">
        <p>Live Stock Exchange</p>
        <div>
            <div className="stock-header">
              <p className="stock-name">
                Name
              </p>
              <p className="stock-price ">
                Price
              </p>
              <p className="stock-last-update">
                Last updated at
              </p>
            </div>
          <CompWrapper data={latestData} />
        </div>
      </div>
    );
  }
}

export default App;
