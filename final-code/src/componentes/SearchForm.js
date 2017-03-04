import React, { Component } from 'react';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    }
  }

  onInputChange = e => {
    this.setState({
      search: e.target.value
    });
  }

  onSubmitForm = e => {
    e.preventDefault();

    this.props.onSearch(this.state.search);
  }

  componentWillUnmount() {
    console.log('adiooos 😢');
    this.props.onClose();
  }


  render() {
    return (
      <form className="search-box__form" onSubmit={this.onSubmitForm}>
        <input
          type="text"
          // value=""
          className="search-box__input"
          placeholder="search movie..."
          onChange={this.onInputChange}
        />
        <input type="submit" value="search" className="search-box__submit" onClick={this.onSubmitForm} />
      </form>
    );
  }
}

export default SearchForm;
