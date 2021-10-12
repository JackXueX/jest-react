import React from 'react';
import Header from '../../components/Header';

import { shallow } from 'enzyme';
import { findTestWrapper } from '../../../../utils/testUtils'

describe('Header 组件', () => {
  it('渲染样式正常', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });

  it('包含一个 input 框', () => {
    const wrapper = shallow(<Header />);
    const inputEle = findTestWrapper(wrapper, 'input');
    expect(inputEle.length).toBe(1);
  });

  it('input 框内容， 初始化应该为空', () => {
    const wrapper = shallow(<Header />);
    const inputEle = findTestWrapper(wrapper, 'input');
    expect(inputEle.prop('value')).toEqual('');
  });

  it('input 框内容， 当用户输入时，会跟随变化', () => {
    const wrapper = shallow(<Header />);
    const inputEle = findTestWrapper(wrapper, 'input');

    // 单元测试
    const userInput = '今天要学习 Jest';
    inputEle.simulate('change', {
      target: {
        value: userInput
      }
    });
    expect(wrapper.state('value')).toEqual(userInput);

    // 集成测试
    // const newInputEle = wrapper.find("[data-test='input']");
    // expect(newInputEle.prop('value')).toBe(userInput);
  });

  it('input 框输入回车时，如果 input 无内容，无操作', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem = {fn} />);
    const inputEle = findTestWrapper(wrapper, 'input');
    wrapper.setState({
      value: ''
    })
    inputEle.simulate('keyUp', {
      keyCode: 13
    });
    expect(fn).not.toHaveBeenCalled();
  });

  it('input 框输入回车时，如果 input 有内容，函数应该被调用， 最后应该清除掉', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem = {fn} />);
    const inputEle = findTestWrapper(wrapper, 'input');
    wrapper.setState({
      value: '学习 React'
    })
    inputEle.simulate('keyUp', {
      keyCode: 13
    });
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenLastCalledWith('学习 React');
    const newInputEle = findTestWrapper(wrapper, 'input');;
    expect(newInputEle.prop('value')).toBe('');
  });

})