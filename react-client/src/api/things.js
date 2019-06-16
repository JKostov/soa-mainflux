import axios from '.';

export function getThings() {
  return axios.get('/things');
}

export function getMessages(thingId, channelId) {
  return axios.get(`/things/${thingId}/messages/${channelId}`);
}
