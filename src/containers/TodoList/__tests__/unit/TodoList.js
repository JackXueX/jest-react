import React from 'react';
import TodoList from '../../index';
import { shallow } from 'enzyme'

describe('TodoList组件', () => {
  it('初始化列表为空', () => {
    const wrapper = shallow(<TodoList />);
    expect(wrapper.state('undoList')).toEqual([]);;
  });

  it('Header 组件存在 addUndoItem 属性', () => {
    const wrapper = shallow(<TodoList />);
    const Header = wrapper.find('Header');
    // expect(Header.prop('addUndoItem')).toBe(wrapper.instance().addUndoItem);

    expect(Header.prop('addUndoItem')).toBeTruthy();
  });

  it('当 addUndoItem 被调用时， undoList 数据项增加', () => {
    const wrapper = shallow(<TodoList />);
    // const Header = wrapper.find('Header');
    // const addFunc = Header.prop('addUndoItem');
    const { addUndoItem } = wrapper.instance();
    const content = '学习 React';
    addUndoItem(content);

    expect(wrapper.state('undoList').length).toBe(1);
    expect(wrapper.state('undoList')[0]).toEqual({
      status: 'div',
      value: content
    });
  });

  it('undoList 组件应该接受 list、 deleteItem、changeStatus、handleBlur、valueChange参数', () => {
    const wrapper = shallow(<TodoList />);
    const UndoList = wrapper.find('UndoList');
    expect(UndoList.prop('list')).toBeTruthy();
    expect(UndoList.prop('deleteItem')).toBeTruthy();
    expect(UndoList.prop('changeStatus')).toBeTruthy();
    expect(UndoList.prop('handleBlur')).toBeTruthy();
    expect(UndoList.prop('valueChange')).toBeTruthy();
  });

  it('deleteItem方法被调用， undoList 数据项被删除', () => {
    const wrapper = shallow(<TodoList />);
    const data = [{
      status: 'div',
      value: '学习jest'
    }, {
      status: 'div',
      value: '学习TDD'
    }, {
      status: 'div',
      value: '学习单元测试'
    }];
    wrapper.setState({
      undoList: data
    });

    wrapper.instance().deleteItem(1);
    expect(wrapper.state('undoList')).toEqual([data[0], data[2]]);
  });

  it('changeStatus 方法被调用，undoList 数据项status被修改', () => {
    const wrapper = shallow(<TodoList />);
    const data = [{
      status: 'div',
      value: '学习jest'
    }, {
      status: 'div',
      value: '学习TDD'
    }, {
      status: 'div',
      value: '学习单元测试'
    }];
    wrapper.setState({
      undoList: data
    });

    wrapper.instance().changeStatus(1);
    expect(wrapper.state('undoList')[1]).toEqual({
      ...data[1],
      status: 'input'
    });
  });

  it('handleBlur 方法被调用，undoList 数据项status被修改', () => {
    const wrapper = shallow(<TodoList />);
    const data = [{
      status: 'input',
      value: '学习jest'
    }, {
      status: 'div',
      value: '学习TDD'
    }, {
      status: 'div',
      value: '学习单元测试'
    }];
    wrapper.setState({
      undoList: data
    });

    wrapper.instance().handleBlur(0);
    expect(wrapper.state('undoList')[0]).toEqual({
      ...data[0],
      status: 'div'
    });
  });

  it('valueChange 方法被调用， undolist 数据项 value 被修改', () => {
    const wrapper = shallow(<TodoList />);
    const data = [{
      status: 'input',
      value: '学习jest'
    }, {
      status: 'div',
      value: '学习TDD'
    }];

    const value = 'dell lee';

    wrapper.setState({
      undoList: data
    });

    wrapper.instance().valueChange(0, value);
    expect(wrapper.state('undoList')[0]).toEqual({
      ...data[0],
      value
    });
  });
})