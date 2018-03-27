import React from 'react';
import { Suggestions } from './Suggestions';
/**
 * A react component that displays an input with autocomplete functionnality
 * @author Adlene Gharbi
 */

export class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    /**
     * Initialize the search state
     */
    this.state = {
      search: '',
      items: [],
      error: false
    };
  }

  /**
   * Get input value each time the input is search is changed, and update the state.
   * @param {Event} e
   */
  onChange(e) {
    // input value
    let search = e.target.value;
    /**
     * Get data if there is a querty in the input,
     * if the input is empty, remove cached items from the state (that will lead to hiding the suggestions panel)
     */
    if(search !== ''){
        this.queryGithubData(search);
    }else{
        this.setState({
            items: []
        });
    }
  }
  /**
   * Fetch autocomplete data from Github's API to query repositories
   * @param {String} search
   */
  queryGithubData(search) {
    /**
     * Query the github API
     *
     * @type Promise
     * @returns result or error
     */
    fetch(
      'https://api.github.com/search/repositories?q=' +
        search +
        '&sort=stars&order=desc'
    )
      /**
       * Parsing result object to json
       */
      .then(res => res.json())
      .then(
        result => {
          if (result.items) {
            /**
             * Limit the results to 8 items and return only their names
             */
            let res = result.items.splice(0, 8).map(e => {
              return e.name;
            });
            /**
             * add results to state
             */
            this.setState({
              items: res
            });
          }
        },
        error => {
          console.log(error);
          this.setState({
            error
          });
        }
      );
  }

  /**
   * Render the input
   */
  render() {
    return (
      <div className="input-field col s6">
        <input
          placeholder="Type something"
          id="search"
          type="text"
          className="validate"
          onChange={this.onChange.bind(this)}
        />
        <Suggestions items={this.state.items} />
      </div>
    );
  }
}
