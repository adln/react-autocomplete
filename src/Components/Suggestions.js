import React from 'react';

export class Suggestions extends React.Component {
  /**
   * function that gets data passed to the component as props
   * and display the suggestion list
   */
  displayItems() {
      /**
       * Display each item inside the suggestion array as a new <li />
       */
    return this.props.items.map(i => {
      return (
        <li key={i}>
          <a>{i}</a>
        </li>
      );
    });
  }
  /**
   * Render the list of suggestion items
   */
  render() {
    return (
      <ul className="autocomplete-content dropdown-content">
        {this.displayItems()}
      </ul>
    );
  }
}
