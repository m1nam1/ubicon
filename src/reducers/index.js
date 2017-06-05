import { combineReducers } from 'redux';

import routes from './routes';
import devices from './Room';

const rootReducer = combineReducers({
  routes,
  devices
});

export default rootReducer;
