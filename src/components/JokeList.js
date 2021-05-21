import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };
  state = {
    jokes: [],
  };
  componentDidMount = async () => {
    let jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      try {
        let { data } = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        });
        jokes.push({ text: data.joke, id: data.id, votes: 0 });
      } catch (error) {
        console.log("error from catch", error);
      }
    }
    this.setState({
      jokes: jokes,
    });
  };

  handleVote = (id, delta) =>
    this.setState((curState) => ({
      jokes: curState.jokes.map((j) =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      ),
    }));

  render() {
    return (
      <div className="jokelist">
        <div className="jokelist__sidebar">
          <h1 className="jokelist__sidebar--title">
            <span>dad</span> jokes
          </h1>
          <img
            className="jokelist__sidebar--img"
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="jokelist__img"
          />
          <button className="jokelist__sidebar--btn">Fetch Jokes</button>
        </div>
        <div className="jokelist__jokes">
          {this.state.jokes.map((j) => (
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

export default JokeList;
