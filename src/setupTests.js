// src/setupTests.ts

// 导入 jest-enzyme 手动建立 enzyme 与 jest 的连接
import 'jest-enzyme'

// 启动 enzyme 并添加对应 react 版本的适配器
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });