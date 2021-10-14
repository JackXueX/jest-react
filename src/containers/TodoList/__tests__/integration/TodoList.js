import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import TodoList from '../../index';
import { findTestWrapper } from '../../../../utils/testUtils';
import store from '../../../../store/createStore';
// eslint-disable-next-line jest/no-mocks-import
import axios from '../../__mocks__/axios';

beforeEach(() => {
  axios.success = true;
});

// eslint-disable-next-line jest/valid-title
it(`
  1. 输入框输入内容
  2. 点击回车
  3. 列表中展示用户输入的内容项
`, () => {
  const wrapper = mount(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
  
  const inputElem = findTestWrapper(wrapper, 'header-input');
  const content = 'Dell Lee';
  inputElem.simulate('change', {
    target: { value: content }
  });
  inputElem.simulate('keyUp', {
    keyCode: 13
  });

  const listItems = findTestWrapper(wrapper, 'list-item');
  expect(listItems.length).toEqual(1);
  expect(listItems.text()).toContain(content);
});

/**
 * {
 *  data: [{
 *    status: 'div,
 *    value: 'dell lee
 * }]
 *  success: true
 * }
 */

// eslint-disable-next-line jest/valid-title
it(`
1. 用户打开页面，请求正常
2. 应该展示接口返回的数据
`, (done) => {
  const wrapper = mount(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );

  process.nextTick(() => {
    wrapper.update();
    const listItem = findTestWrapper(wrapper, 'list-item');
    expect(listItem.length).toBe(1);
    done();
  });
});

// eslint-disable-next-line jest/valid-title
it(`
1. 用户打开页面，请求异常
2. 页面列表无内容，应该能把页面展示出来
`, (done) => {

  axios.success = false;

  const wrapper = mount(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );

  process.nextTick(() => {
    wrapper.update();
    const listItem = findTestWrapper(wrapper, 'list-item');
    expect(listItem.length).toBe(0);
    done();
  });
});