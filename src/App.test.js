import React from 'react';
import App from '../src/App';
import { shallow } from 'enzyme'

describe('component APP test', () => {
  it('测试hello world', () => {
    const wrapper = shallow(<App />);
    // console.log(wrapper.find('.app-container').length);
    // expect(wrapper.find('.app-container').length).toBe(1);
    // console.log(wrapper.find('.app-container').prop('title'));
    // expect(wrapper.find('.app-container').prop('title')).toBe('dell lee');

    // expect(wrapper.find('[data-test="container]').prop('title')).toBe('dell lee');

    // console.log(wrapper.debug());
    // 测试和代码逻辑解藕
    // expect(wrapper.find('[data-test="container"]').prop('title')).toBe('dell lee');

    // const container = wrapper.find('[data-test="container"]');

    // expect(container).toExist();
    // expect(container).toHaveProp('title', 'dell lee');

    // 对于敏感内容的修改
    expect(wrapper).toMatchSnapshot();

  })
})