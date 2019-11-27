import React from 'react';
import { connect } from 'react-redux';
import { fetchToggleFavorites } from '../actions';
import ErrorModal from './ErrorModal';

class CityCard extends React.Component {

  renderTopCard = () => {
    const { citiesDetails, typeTemperature, fetchToggleFavorites, darkMode } = this.props;
    const isDarkClassBtn = `my-btn ${darkMode ? 'dark' : 'light'}`;
    const isDarkTextBtn = `${citiesDetails.isFavorite ? 'Remove from' : 'Add to'} Favorites`;

    if (!citiesDetails.error) {
      return (
        <div className="top-card">
          <div className="place-headers">
            <img src={citiesDetails.icon} alt="weather-icon"></img>
            <div className="headers-item">
              <h4>{citiesDetails.cityName}</h4>
              <h4>{
                typeTemperature ? citiesDetails.temperature.Imperial.Value : citiesDetails.temperature.Metric.Value}
                <span>&#176;</span>
                {typeTemperature ? 'F' : 'C'}</h4>
            </div>
          </div>
          <div className="favorites">
            <button className={isDarkClassBtn} onClick={() => fetchToggleFavorites(citiesDetails)}>{isDarkTextBtn}</button>
            <i className={`heart fa ${citiesDetails.isFavorite ? 'fa-heart' : 'fa-heart-o'}`}></i>
          </div>
        </div>
      );
    }
  }

  renderForecast = () => {
    const { darkMode, typeTemperature, citiesDetails } = this.props;

    return (
      citiesDetails.forecast.map(({ dayOfWeek, temperature }) => {
        return (
          <div key={dayOfWeek} className={`inner-card daily ${darkMode ? 'dark' : 'light'}`}>
            <h5>{dayOfWeek}</h5>
            <h5>
              {`${typeTemperature ? temperature.fahrenheit : temperature.celsius}`}
              &#176;
              {typeTemperature? 'F' : 'C'}
            </h5>
          </div>
        );
      })
    );
  }

  render() {
    if(!this.props.citiesDetails.error){
      return (
        <div id="city-card" className={`${this.props.darkMode ? 'dark' : 'light'}`}>
          {this.renderTopCard()}
          <div className="weather-text">
            <h1>{this.props.citiesDetails.description}</h1>
          </div>
          <div className="cards-container">
            {this.renderForecast()}
          </div>
        </div>
      );
    }
    else {
      return (
        <div>
          <ErrorModal errors={this.props.citiesDetails.error}/>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ darkMode, typeTemperature, citiesDetails }) => {
  return {
    darkMode,
    typeTemperature,
    citiesDetails
  }
};

export default connect(mapStateToProps, { fetchToggleFavorites })(CityCard);