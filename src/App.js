import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.test };
    this.updateStore = this.updateStore.bind(this);
  }

  updateStore(event) {
    const text = event.target.value;
    this.props.testStore(text);
  }

  render() {
    const { test } = this.props.test;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to AH</h1>
        </header>
        <form>
          <input type="text" onChange={this.updateStore} />
          {test && <p>{test}</p>}
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ test }) => ({ test });
const mapDispatchToProps = dispatch => ({
  testStore: test => dispatch(actions.testStore(test))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
