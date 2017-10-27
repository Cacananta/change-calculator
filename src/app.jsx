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
      <div>
        <header className="change-header">
          <h1 id="header-h1">Change Calculator</h1>
        </header>
        <div className="input-divs clearfix">
          <div id="order-div">
            <h1>Customer Total:</h1>
            <input id="order-input" type="text" placeholder="Customer Order Total" name="amountDue" onChange={this.handleChange} />
          </div>

          <div id="received-div">
            <h1>Amount Received For Order:</h1>
            <input id="received-input" type="text" placeholder="Money Received" name="amountReceived" onChange={this.handleChange} />
          </div>
        </div>
        <div id="calculate-div">
          <button id="calculate-button" className="btn" onClick={this.handleSubmit}>CALCULATE CHANGE</button>
          <h1 className="totalChange">The total change due is ${this.state.changeDue}</h1>
        </div>
        <div id="paper-div">
          <h1>Paper Bill Change:</h1>
          <div>
            <h2>$20</h2>
            <h3 className="change">{this.state.billDenoms['twenties']}</h3>
          </div>
          <div>
            <h2>$10</h2>
            <h3 className="change">{this.state.billDenoms['tens']}</h3>
          </div>
          <div>
            <h2>$5</h2>
            <h3 className="change">{this.state.billDenoms['fives']}</h3>
          </div>
          <div>
            <h2>$1</h2>
            <h3 className="change">{this.state.billDenoms['ones']}</h3>
          </div>
        </div>

        <div id="coin-div">
          <h1>Coin Change:</h1>
          <div>
            <h2>Quarters</h2>
            <h3 className="change">{this.state.coinDenoms['quarters']}</h3>
          </div>
          <div>
            <h2>Dimes</h2>
            <h3 className="change">{this.state.coinDenoms['dimes']}</h3>
          </div>
          <div>
            <h2>Nickels</h2>
            <h3 className="change">{this.state.coinDenoms['nickels']}</h3>
          </div>
          <div>
            <h2>Pennies</h2>
            <h3 className="change">{this.state.coinDenoms['pennies']}</h3>
          </div>
        </div>
      </div>
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

