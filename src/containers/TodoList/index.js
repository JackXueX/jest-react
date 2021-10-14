import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import UndoList from './components/UndoList';
import './style.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.addUndoItem = this.addUndoItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.state = {
      undoList: []
    }
  }

  componentDidMount() {
    axios.get('/undoList.json').then(res => {
      console.log("res--", res);
      this.setState({
        undoList: res.data
      })
    }).catch(e => {
      console.log(e);
    });
  }

  addUndoItem(value) {
    this.setState({
      undoList: [...this.state.undoList, {
        status: 'div',
        value
      }]
    })
  }

  deleteItem(index) {
    const newlist = [...this.state.undoList];
    newlist.splice(index, 1);
    this.setState({
      undoList: newlist
    });
  }

  changeStatus(index) {
    const newlist = this.state.undoList.map((item, listIndex) => {
      if (index === listIndex) {
        return {
          ...item,
          status: 'input'
        }
      }
      return {
        ...item,
        status: 'div'
      }
    });

    this.setState({ undoList: newlist })
  }

  handleBlur(index) {
    const newlist = this.state.undoList.map((item, listIndex) => {
      if (index === listIndex) {
        return {
          ...item,
          status: 'div'
        }
      }
      return item
    });

    this.setState({ undoList: newlist })
  }

  valueChange(index, value) {
    const newlist = this.state.undoList.map((item, listIndex) => {
      if (index === listIndex) {
        return {
          ...item,
          value
        }
      }
      return item
    });

    this.setState({ undoList: newlist })
  }

  render() {
    const { undoList } = this.state;
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
        <UndoList 
          list={undoList} 
          deleteItem={this.deleteItem} 
          changeStatus={this.changeStatus} 
          handleBlur={this.handleBlur} 
          valueChange={this.valueChange}
        />
      </div>
    )
  }
}

export default TodoList;