import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationName: '',
      temperature: '',
      weatherDescription: '',
      isloading: true
    }
  }

  async getWeather(long, lat) {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3de6162d3745365b168ade2bbe4e1d66`;
    let result = await fetch(url);
    let locData = await result.json();

    this.setState({
      locationName: locData.name,
      temperature: locData.main.temp - 273.15,
      weatherDescription: locData.weather[0].description,
      isloading: false
    }
    )
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const coordinates = position.coords;
      const long = coordinates.longitude;
      const lat = coordinates.latitude;
      this.getWeather(long, lat)
    });
  }


  render() {
      return <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="text-uppercase">my weather app</h1>
        </div>
        <div className="App-body pt-5">
              <h2>{this.state.locationName}</h2>
          <h3 className="text-warning">{this.state.temperature} &deg;C</h3>
          <h3>{this.state.weatherDescription}</h3>
        </div>
        <div className="App-footer"></div>
      </div>
  }
}
export default App;
