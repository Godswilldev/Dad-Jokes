import React, { Component } from "react";

class Joke extends Component {
  render() {
    return (
      <div className="joke">
        <div className="joke__btns">
          <i className="fas fa-arrow-up"></i>
          <p>{this.props.votes} </p>
          <i className="fas fa-arrow-down"></i>
        </div>
        <div className="joke__text">
          <p>{this.props.text} </p>
        </div>
      </div>
    );
  }
}

export default Joke;
