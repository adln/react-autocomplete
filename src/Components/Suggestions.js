import React from 'react';

export class Suggestions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 0
    };
    this.keyboardNavigation = this.keyboardNavigation.bind(this);
  }
  /**
   * Suggestions items list keyboard navigation
   * @param {Event} e 
   */
  keyboardNavigation(e) {
    let current_selected = this.state.selected;
    /**
     * If the arrow down key is clicked, we increment the hovered index.
     */
    if (e.key === 'ArrowDown') {
        let new_selected = current_selected + 1;
        /**
         * If the lastly hovered item is the last on the list, we go back to the first (to make the navigation circular)
         */
        if(new_selected > this.props.items.length - 1) new_selected = 0;

      this.setState({
        selected: new_selected
      });
    }
    /**
     * If the arrow up key is clicked, we decrease the hovered index.
     */
    if (e.key === 'ArrowUp') {
        let new_selected = current_selected - 1;
        /**
         * If the lastly hovered item is the first on the list, we go to the last item (to make the navigation circular)
         */
        if(new_selected < 0) new_selected = this.props.items.length - 1;
      this.setState({
        selected: new_selected
      });
    }
  }
  componentDidMount() {
      /**
       * register the event listener for keydown
       */
    document.addEventListener('keydown', this.keyboardNavigation, false);
  }

  componentWillUnmount() {
      /**
       * unregister the event listener for keydown
       */
    document.removeEventListener('keydown', this.escFunction, false);
  }

  /**
   * function that gets data passed to the component as props
   * and display the suggestion list
   */
  displayItems() {
    /**
     * Display each item inside the suggestion array as a new <li />
     */
    return this.props.items.map((i, index) => {
      return (
        <li key={index + new Date().getTime()} className={this.state.selected === index ? 'selected' : ''}>
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
