import React, { Component } from 'react';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountDue: '',
      amountReceived: '',
      changeDue: '',
      billDenoms: {},
      coinDenoms: {}
    }

    this.calculateBills = this.calculateBills.bind(this);
    this.calculateCoins = this.calculateCoins.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  calculateBills() {
    var billsDue = Math.floor(this.state.changeDue);
    var billDenominations = [20, 10, 5, 1];
    var billDenoms = {}
    var billArray = [];
    for (var i = 0; i < billDenominations.length; i++) {
      billArray.push(Math.floor(billsDue / billDenominations[i]));
      billsDue %= billDenominations[i];
    }

    billDenoms['twenties'] = billArray[0]
    billDenoms['tens'] = billArray[1]
    billDenoms['fives'] = billArray[2]
    billDenoms['ones'] = billArray[3]

    this.setState({
      billDenoms: billDenoms
    })
  }

  calculateCoins() {
    var coinsDue = ((this.state.changeDue - Math.floor(this.state.changeDue)) * 100).toFixed(2);
    var coinDenominations = [25, 10, 5, 1];
    var coinDenoms = {}
    var coinArray = []
    for (var i = 0; i < coinDenominations.length; i++) {
      coinArray.push(Math.floor(coinsDue / coinDenominations[i]));
      coinsDue %= coinDenominations[i];
    }

    coinDenoms['quarters'] = coinArray[0]
    coinDenoms['dimes'] = coinArray[1]
    coinDenoms['nickels'] = coinArray[2]
    coinDenoms['pennies'] = coinArray[3]

    this.setState({
      coinDenoms: coinDenoms
    })
  }

  handleChange(e) {
    var stateName = e.target.getAttribute('name');
    var stateValue = parseFloat(e.target.value);
    this.setState(Object.assign(this.state, { [stateName]: stateValue }));
  }

  handleSubmit(e) {
    e.preventDefault();
    var changeDue = (this.state.amountReceived - this.state.amountDue).toFixed(2);
    this.setState(Object.assign(this.state, { changeDue: parseFloat(changeDue) }));
    this.calculateBills();
    this.calculateCoins();

    // if (this.state.changeDue < 0) {
    //   alert('The customer didn\'t give you enough money to cover their order.');
    // }
  }

  render() {
    return (
      <div >
        <div className="container">
          <div className="jumbotron jumbotron-fluid">
            <header className="change-header ">
              <h1 className="text-center" id="header-h1">Change Calculator</h1>
            </header>
          </div>
        </div>
        <div className="container">
          {/* ROW 1: INPUTS */}
          <div className="row">
            <div className="col-lg-6 text-center">
              <h1>Customer Total:</h1>
              <input id="order-input" type="text" placeholder="Customer Order Total" name="amountDue" onChange={this.handleChange} />
            </div>
            <div className="col-lg-6 text-center">
              <h1>Amount Received For Order:</h1>
              <input id="received-input" type="text" placeholder="Money Received" name="amountReceived" onChange={this.handleChange} />
            </div>
          </div>
          {/* ROW 2: BUTTON */}
          <div className="row my-3">
            <div className="col-lg-12 text-center">
              <button id="calculate-button" type="button" className="btn btn-primary btn-lg" onClick={this.handleSubmit}>CALCULATE CHANGE</button>
            </div>
          </div>
          {/* ROW 3: CALCULATED CHANGE */}
          <div className="row my-3">
            <div className="col-lg-12 text-center">
              <h1 className="totalChange">The total change due is ${this.state.changeDue}</h1>
            </div>
          </div>
          {/* ROW 4: CHANGE */}
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h3>Paper Bill Change:</h3>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <h4>$20: {this.state.billDenoms['twenties']}</h4>
                  </li>
                  <li className="list-group-item">
                    <h4>$10: {this.state.billDenoms['tens']}</h4>
                  </li>
                  <li className="list-group-item">
                    <h4>$5: {this.state.billDenoms['fives']}</h4>
                  </li>
                  <li className="list-group-item">
                    <h4>$1: {this.state.billDenoms['ones']}</h4>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h3>Coin Change:</h3>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <h4>Quarters: {this.state.coinDenoms['quarters']}</h4>
                  </li>
                  <li className="list-group-item">
                    <h4>Dimes: {this.state.coinDenoms['dimes']}</h4>
                  </li>
                  <li className="list-group-item">
                    <h4>Nickels: {this.state.coinDenoms['nickels']}</h4>
                  </li>
                  <li className="list-group-item">
                    <h4>Pennies: {this.state.coinDenoms['pennies']}</h4>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;

//NOTES:

// this.setState({
//       billArray: billArray
//     })
//   }

//CODE GRAVEYARD:

