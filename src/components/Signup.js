import React from "react";

class Signup extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(parsedResponse =>
        localStorage.setItem("token", parsedResponse.token)
      );
    if (localStorage.token) {
      fetch("http://localhost:3000/profile", {
        headers: { Authorization: localStorage.token }
      })
        .then(res => res.json())
        .then(profileInfo => {
          this.props.getUser(profileInfo);
          this.props.history.push("/");
        });
    }
  };

  handleChange = e => {
    // console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="login-signup">
              <form onSubmit={this.handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Name"
          name="username"
        />

        <input
          type="text"
          value={this.state.password}
          onChange={this.handleChange}
          placeholder="Password"
          name="password"
        />
        <input type="submit" value="Sign Up!" />
      </form>
      </div>
    );
  }
}

export default Signup;
