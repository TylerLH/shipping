import { TOGGLE_NAVIGATION } from '../actions';

const initState = {
  isNavigationOpen: false
};

export default function app(state = initState, { type, payload }) {
  switch (type) {
    case TOGGLE_NAVIGATION:
      return { ...state, isNavigationOpen: !state.isNavigationOpen };
    default:
      return state;
  }
}
