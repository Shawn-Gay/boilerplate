import axios from 'axios';

const GET_USER = 'GET_USER';

const initalState = {};

const getUser = (user) => ({ type: GET_USER, user });

// export

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
}
