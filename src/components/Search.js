import React from 'react';
import { connect } from 'react-redux';
import { asyncContainer, Typeahead } from 'react-bootstrap-typeahead';
import { GetCitiesOptions } from '../apis/weatherApi';
import { fetchSelectedCity } from '../actions';

const AsyncTypeahead = asyncContainer(Typeahead);

class Search extends React.Component {
  state = { isLoading: false, options: null };

  onSearch = async query => {
    if(query) {
      this.setState({
        isLoading: true,
        options: await GetCitiesOptions(query)
      });
    }
  }

  onChange = city => {
    if(city) {
      this.props.fetchSelectedCity(city);
    }
  };

  render() {
    const { isLoading, options } = this.state;
    return (
      <div id="search">
        <i className={`fa search fa-search ${this.props.isDark ? 'dark' : 'light'}`}></i>
        <AsyncTypeahead
          id='input-city'
          isLoading={isLoading}
          onSearch={this.onSearch}
          options={options ? Object.keys(options) : []}
          onChange={cities => this.onChange(options[cities[0]])} // cities is an array of single selected city
        />
      </div>
    );
  }
}

const mapStateToProps = ({ darkMode }) => {
  return {
    isDark: darkMode
  };
}

export default connect(mapStateToProps, { fetchSelectedCity })(Search);