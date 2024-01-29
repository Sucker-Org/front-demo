/*
 * @Email: allen0101stanton@outlook.com
 * @Author: Eric
 * @Description: 
 */
// store/modules/user.js
const userModule = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
});

export default userModule;
