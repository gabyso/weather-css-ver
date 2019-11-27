import React from 'react';
import { connect } from 'react-redux';
import { fetchCityDetails, fetchSelectedCity, fetchToggleFavorites, fetchDarkMode, fetchTemperature } from '../../actions';
import { Spinner } from 'react-bootstrap';
import Switches from '../Switches';
import Search from '../Search';
import CityCard from '../CityCard';
import { GetCityFromLocation } from '../../apis/weatherApi';

const INIT_CITY = { cityName: 'Tel Aviv', cityId: '215854'};

class Home extends React.Component {

  componentDidMount() {
    const { citiesDetails, selectedCity, fetchSelectedCity, fetchCityDetails } = this.props;

    if(!selectedCity) {
      if (!navigator.geolocation) {
        fetchSelectedCity(INIT_CITY);
      }
      else {
        navigator.geolocation.getCurrentPosition(
          location => this.getLocation(location), 
          error => fetchSelectedCity(INIT_CITY))
      }
    }
    else if(!citiesDetails || selectedCity.cityName !== citiesDetails.cityName) {
      fetchCityDetails(selectedCity)
    }
  }

  componentDidUpdate() {
    const { citiesDetails, selectedCity } = this.props;

    if(!citiesDetails || selectedCity.cityName !== citiesDetails.cityName) {
      this.props.fetchCityDetails(selectedCity);
    }
  }

  getLocation = async location => {
    const { longitude, latitude } = location.coords;
    const localCity = await GetCityFromLocation(`${latitude},${longitude}`);
    if(!localCity.error) {
        this.props.fetchSelectedCity(localCity);
    }
    else this.props.fetchSelectedCity(INIT_CITY);
  }; 

  render() {
    const { citiesDetails, darkMode } = this.props;
    
    if(!citiesDetails) {
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
        <Search fetchSelectedCity={this.props.fetchSelectedCity}/>
        <CityCard />
      </div>
    );
  }
}

const mapStateToProps = ({ citiesDetails, selectedCity, darkMode }) => {
  return {
      citiesDetails,
      selectedCity,
      darkMode
  }
};

export default connect(mapStateToProps, { fetchCityDetails, fetchSelectedCity, fetchToggleFavorites, fetchDarkMode, fetchTemperature })(Home);