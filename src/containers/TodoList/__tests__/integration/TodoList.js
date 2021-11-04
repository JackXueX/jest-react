import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import TodoList from '../../index';
import { findTestWrapper } from '../../../../utils/testUtils';
import store from '../../../../store/createStore';

beforeEach(() => {
  // 模拟setTimeout
  jest.useFakeTimers();
})

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
1. 用户打开页面
2. 5秒后
3. 应该展示接口返回的数据
`, (done) => {
  const wrapper = mount(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );

  /*
  setTimeout(() => {
    // 业务逻辑
  }, 5000)
  */
  // 此段代码主要模拟的是5秒后的过程
  jest.runAllTimers();
  expect(setTimeout).toHaveBeenCalledTimes(1);

  // 让代码异步为异步测试用例
  process.nextTick(() => {
    wrapper.update();
    const listItem = findTestWrapper(wrapper, 'list-item');
    expect(listItem.length).toBe(1);
    done();
  });
});