import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { fetchDarkMode, fetchTemperature } from '../actions';

const Switches = ({ isDark, isCelsius, fetchDarkMode, fetchTemperature}) => {
  return (
    <div id="switches">
      <div>
        <Form.Check 
          type="switch"
          id="night-mode"
          label={isDark ? 'Dark' : 'Light'}
          checked={isDark}
          onChange={() => fetchDarkMode(!isDark)}
        />
      </div>
      <div>
        <Form.Check 
          type="switch"
          id="temperature-type"
          label={`${isCelsius ? 'Fahrenheit' : 'Celsius'}`}
          checked={isCelsius}
          onChange={() => fetchTemperature(!isCelsius)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ typeTemperature, darkMode }) => {
  return {
    isCelsius: typeTemperature,
    isDark: darkMode
  };
}
export default connect(mapStateToProps, { fetchDarkMode, fetchTemperature })(Switches);