import React from 'react';
import { Suggestions } from './Suggestions';
/**
 * A react component that displays an input with autocomplete functionnality
 * @author Adlene Gharbi `adlen025[at]gmail.com`
 *
 */

export class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    // use this cors proxy to bypass the cors errors while fetching data from APIs
    this.CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
    /**
     * Initialize the search state
     */
    this.state = {
      search: '',
      engine: 'google',
      items: [],
      error: false
    };
  }

  /**
   * Get input value each time the input is search is changed, and fetch data accordingly to the value of the input.
   * @param {Event} e
   */
  onChange(e) {
    // input value
    let search = e.target.value;
    this.setState({
      search: search
    });
    this.fetchData();
  }

  fetchData() {
    /**
     * Get data if there is text in the input,
     * if the input is empty, remove cached items from the state (that will lead to hiding the suggestions panel)
     */
    let search = this.state.search;
    if (search !== '') {
      /**
       * fetch data from engine selected from the Select list
       * @default 'google'
       */
      switch (this.state.engine) {
        case 'github':
          this.queryGithubData(search);
          break;
        case 'bing':
          this.queryBingData(search);
          break;
        case 'google':
          this.queryGoogleData(search);
          break;
        default:
          this.queryGoogleData(search);
          break;
      }
    } else {
      this.setState({
        items: []
      });
    }
  }

  /**
   * Handle the change of the selected Engine to fetch the autocomplete data from
   * @param {Event} e
   */
  selectEngine(e) {
    this.setState(
      {
        engine: e.target.value
      },
      () => {
        console.log(this.state, this.state.engine);
        this.fetchData(this.state.search);
      }
    );
    /** re-run fetch data on the newly selected engine
     *
     */
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
          this.setState({
            error
          });
        }
      );
  }
  /**
   * Fetch data from Bing's API
   * @param {String} search
   */
  queryBingData(search) {
    /**
     * Since Bing API returns CORS error while fetching it from client,
     * we use the CORS_PROXY declared in the constructor to bypass it
     */
    fetch(this.CORS_PROXY + 'https://api.bing.com/osjson.aspx?query=' + search)
      /**
       * Parsing result's object to json
       */
      .then(result => result.json())
      .then(
        /**
         * add the 8 first items to state
         */
        result => {
          this.setState({
            items: result[1].splice(0, 8)
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );
  }

  /**
   * Fetch data from Google's API
   * @param {String} search
   */
  queryGoogleData(search) {
    /**
     * Since Google's API returns CORS error while fetching it,
     * we use the CORS_PROXY declared in the constructor to bypass it
     */
    fetch(
      this.CORS_PROXY +
        'http://suggestqueries.google.com/complete/search?&client=firefox&q=' +
        search
    )
      /**
       * Parsing result's object to json
       */
      .then(result => result.json())
      .then(
        /**
         * add the 8 first items to state
         */
        result => {
          this.setState({
            items: result[1].splice(0, 8)
          });
        },
        error => {
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
      <div className="row">
        <div className="input-field col s10">
          <input
            placeholder="Type something"
            id="search"
            type="text"
            className="validate"
            onChange={this.onChange.bind(this)}
          />
          <Suggestions items={this.state.items} />
        </div>
        <div className="input-field col s2">
          <select
            className="browser-default"
            value={this.state.engine}
            onChange={this.selectEngine.bind(this)}
          >
            <option value="default" disabled defaultValue>
              Choose an engine
            </option>
            <option value="google">Google</option>
            <option value="bing">Bing</option>
            <option value="github">Github</option>
          </select>
        </div>
      </div>
    );
  }
}
