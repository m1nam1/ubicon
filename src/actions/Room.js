import * as config from '../config';

export const REQUEST_DEVICES = 'REQUEST_DEVICES';
export function requestDevices(room_id) {
  return {
    type: REQUEST_DEVICES
  };
}

export const RECEIVE_DEVICES = 'RECEIVE_DEVICES';
export function receiveDevices(json) {
  return {
    type: RECEIVE_DEVICES,
    devices: json.device
  };
}

export function fetchDevices(room_id) {
  return dispatch => {
    dispatch(requestDevices(room_id));
    const url = `${config.server}/rooms/${room_id}/attribute/`;
    console.log(url);
    return fetch(url, {
      method: 'GET',
      headers: { 'X-UIDC-Authorization-Token': config.access_token }
    })
      .then(response => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
      })
      .then(json => dispatch(receiveDevices(json)))
      .catch(err => console.error(err));
  };
}
