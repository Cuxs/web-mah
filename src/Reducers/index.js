import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import toggleMenu from './menuReducers.js';
import login from './login';
import teamReducers from './teamReducers.js';
import showModals from './showModals';
import notificationReducers from './notificationReducers.js';
import tableReducers from './tableReducers.js';
import blogReducers from './blogReducers.js';
import colorReducer from './colorReducer';
import userReducers from './userReducers';

import headerStyleReducers from './style-switcher-reducers/headerStyleReducers.js';
import headerActiveStyleReducer from './style-switcher-reducers/headeractiveReducer.js';
import sidebarStyleReducers from './style-switcher-reducers/sidebarStyleReducers.js';
import sidebarActiveStyleReducer from './style-switcher-reducers/sidebarActiveReducer.js';
import headerBannerStyleReducers from './style-switcher-reducers/headerBannerStyleReducers.js';
import headerBannerActiveStyleReducer from './style-switcher-reducers/headerBannerActiveReducer.js';

const allReducers = combineReducers({
  loadingBar: loadingBarReducer,
  colorReducer,
  userReducers,
  login,
  blogs: blogReducers,
  notifications: notificationReducers,
  menu: toggleMenu,
  teams: teamReducers,
  showModals,
  tableData: tableReducers,
  headerStyle: headerStyleReducers,
  headerActiveStyle: headerActiveStyleReducer,
  headerBannerStyle: headerBannerStyleReducers,
  headerBAnnerActiveStyle: headerBannerActiveStyleReducer,
  sidebarStyle: sidebarStyleReducers,
  sidebarActiveStyle: sidebarActiveStyleReducer,
});

export default allReducers;
