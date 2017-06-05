import { REQUEST_DEVICES, RECEIVE_DEVICES } from '../actions/Room';

function devices(state = {
  isFetching: false,
  devices: []
}, action) {
  switch (action.type) {
    case REQUEST_DEVICES:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_DEVICES:
      return Object.assign({}, state, {
        isFetching: false,
        devices: action.devices
      });
    default:
      return state;
  };
}
