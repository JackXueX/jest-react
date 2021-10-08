import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleInputChnage = this.handleInputChnage.bind(this);
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
    this.state = {
      value: ''
    }
  }

  handleInputChnage(e) {
    this.setState({
      value: e.target.value
    })
  }

  handleInputKeyUp(e) {
    const { value } = this.state;
    if (e.keyCode === 13 && value) {
      this.props.addUndoItem(value);
      this.setState({
        value: ''
      })
    }
  }

  render() {
    const { value } = this.state;
    return (
      <div className="header">
        <div className="header-content">
          TodoList
          <input 
            placeholder="add todo"
            className="header-input"
            data-test='input' 
            value={value} 
            onChange={this.handleInputChnage} 
            onKeyUp={this.handleInputKeyUp}
          />
        </div>
      </div>
    )
  }
}

export default Header;