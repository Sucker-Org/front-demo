/*
 * @Email: allen0101stanton@outlook.com
 * @Author: Eric
 * @Description: 
 */
// store/index.js
import create from 'zustand';
import userModule from './modules/user';
import appModule from './modules/app';

const useStore = create((set) => ({
  ...userModule(set),
  ...appModule(set),
}));

export default useStore;
