import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
  }

  handleInputKeyUp(e) {
    const { value } = this.props;
    if (e.keyCode === 13 && value) {
      this.props.addUndoItem(value);
      this.props.handleInputChnage('');
    }
  }

  render() {
    const { value, handleInputChnage } = this.props;
    return (
      <div className="header">
        <div className="header-content">
          TodoList
          <input 
            placeholder="add todo"
            className="header-input"
            data-test='header-input' 
            value={value} 
            onChange={e => handleInputChnage(e.target.value)} 
            onKeyUp={this.handleInputKeyUp}
          />
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    value: state.todo.inputValue
  }
}

const mapDispatch = (dispatch) => ({
  handleInputChnage(value) {
    dispatch(actions.changeInputValue(value));
  },
  handleInputKeyUp(e, value) {
    if (e.keyCode === 13 && value) {
      this.props.addUndoItem(value);
      this.setState({
        value: ''
      })
    }
  }
})

export default connect(mapState, mapDispatch)(Header);