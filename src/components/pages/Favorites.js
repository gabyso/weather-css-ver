import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import history from '../../history';
import Switches from '../Switches';
import { GetCurrentWeather } from '../../apis/weatherApi';
import { fetchSelectedCity, fetchDarkMode, fetchTemperature } from '../../actions';
import { GetFavorites } from '../../weatherLocalStorage';
import ErrorModal from '../ErrorModal';

class Favorites extends React.Component {
  state = { favorites: null, error: false };

  componentDidMount() {
    this.updateFavorites();
  }

  updateFavorites = async () => {
    const favorsStorage = GetFavorites();
    let favorites = [];
    let cities = Object.keys(favorsStorage);
    let hasError = false;

    for(var i = 0; i < cities.length; i++) {
      const cityName = cities[i];
      const cityId = favorsStorage[cityName];
      const citieWeather = await GetCurrentWeather(cityId);
      favorites.push({ cityName, ...citieWeather, cityId });
      if(!hasError && citieWeather.error) {
        hasError = citieWeather.error;
      }
    }
    this.setState({ favorites, error: hasError });
  }

  renderHome = city => {
    this.props.fetchSelectedCity(city)
    history.push('/');
  }

  renderFavorites = () => {
    const { favorites } = this.state;
    const { typeTemperature } = this.props;
    
    if(favorites.length) {
      return favorites.map(city => {
        let tempVal;
        if(city.error) {
          tempVal = '--'
        }
        else {
          tempVal = typeTemperature ? city.temperature.Imperial.Value : city.temperature.Metric.Value;
        }
        return (
          <div 
            className={`inner-card favorite ${this.props.darkMode ? 'dark' : 'light'}`}
            onClick={() => this.renderHome(city)} 
            key={city.cityName} 
          >
            <h3>{city.cityName}</h3>
            <h5>{tempVal}
              <span>&#176;</span>
              {typeTemperature ? 'F' : 'C'}
            </h5>
            <h4>{!city.error ? city.description : 'Failed getting weather'}</h4>
            <img src={!city.error ? city.icon : ''} alt="weather-icon"></img>
          </div>
        );
      });
    }
    return <div>Favorites list is empty!</div>;
  }

  render() {
    const { darkMode } = this.props;

    if(!this.state.favorites) {
      return (
        <div className={`main ${darkMode ? 'dark' : 'light'}`}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    }
    return (
      <div className={`main ${darkMode ? 'dark' : 'light'}`}>
        <Switches />
        <div className="cards-container">
          {this.renderFavorites()}
          {this.state.error ? <ErrorModal errors={this.state.error} /> : ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ darkMode, typeTemperature }) => {
  return { darkMode, typeTemperature };
}
export default connect(mapStateToProps, { fetchSelectedCity, fetchDarkMode, fetchTemperature })(Favorites);