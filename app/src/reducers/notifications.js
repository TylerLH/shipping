import { SHOW_NOTIFICATION, CLEAR_NOTIFICATION } from '../actions';

const initState = {
  message: '',
  isOpen: false
};

export default function notifications(state = initState, { type, payload }) {
  switch (type) {
    case SHOW_NOTIFICATION:
      return { ...state, message: payload, isOpen: true };
    case CLEAR_NOTIFICATION:
      return initState;
    default:
      return state;
  }
}
