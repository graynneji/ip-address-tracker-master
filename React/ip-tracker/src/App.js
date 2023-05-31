import { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      geograph: [],
    };
  }
  async componentDidMount() {
    try {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_xKWaomCkKIieL4m49RzOLCr5gy4Uz&ipAddress=102.89.47.251`
      );
      const data = await response.json();
      console.log(data);
      this.setState(() => {
        return { geograph: data };
      });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    console.log(this.state, "HIIII");
    return (
      <div>
        <h1>{this.state.geograph.ip}</h1>
        <h2>{this.state.geograph.isp}</h2>
      </div>
    );
  }
}

export default App;
