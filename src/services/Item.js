import {API} from '../config';
import axios from 'axios';

const Item = {
  all: async () => {
    // Only getting first list items for current UI
    return axios.get(`${API}/lists`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.data[0])
    .catch((error) => {
      console.error(error);
    });
  },
  reorder: async (_id, item, position) => {
    return axios.put(`${API}/lists/${_id}/reorder`, {
      item, position,
    },
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.data)
    .catch((error) => {
      console.error(error);
    });
  },
};

export default Item;
