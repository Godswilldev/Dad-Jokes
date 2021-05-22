import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid/v4";
import Joke from "./Joke";

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };

  state = {
    jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
    loading: true,
    // seenJokes: new Set(this.state.jokes.map((j) => j.id)),
  };

  componentDidMount = async () => {
    if (this.state.jokes.length === 0) {
      this.getJokes();
      this.setState({ loading: false });
    } else {
      this.setState({ loading: false });
    }
  };
  getJokes = async () => {
    try {
      let jokes = [];
      while (jokes.length < this.props.numJokesToGet) {
        let { data } = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        });
        jokes.push({ text: data.joke, id: uuid(), votes: 0 });
      }
      this.setState(
        (curState) => ({
          loading: false,
          jokes: [...curState.jokes, ...jokes],
        }),
        () =>
          window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
      );
    } catch (error) {
      console.log("error from catch", error);
    }
  };

  handleVote = (id, delta) =>
    this.setState(
      (curState) => ({
        jokes: curState.jokes.map((j) =>
          j.id === id ? { ...j, votes: j.votes + delta } : j
        ),
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );

  handleClick = () => {
    this.setState({ loading: true });
    this.getJokes();
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    } else {
      let sortedJokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
      return (
        <div className="jokelist">
          <div className="jokelist__sidebar">
            <h1 className="jokelist__sidebar--title">
              <span>fat</span> jokes
            </h1>
            <img
              className="jokelist__sidebar--img"
              src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
              alt="jokelist__img"
            />
            <button
              onClick={this.handleClick}
              className="jokelist__sidebar--btn"
            >
              Fetch Jokes
            </button>
          </div>
          <div className="jokelist__jokes">
            {sortedJokes.map((j) => (
              <Joke
                key={j.id}
                text={j.text}
                votes={j.votes}
                upvotes={() => this.handleVote(j.id, 1)}
                downvotes={() => this.handleVote(j.id, -1)}
              />
            ))}
          </div>
        </div>
      );
    }
  }
}

export default JokeList;
