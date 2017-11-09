import each from 'lodash/each';
import set from 'lodash/set';

import {
  REQUEST_GET_VESSELS,
  SUCCESS_GET_VESSELS,
  TOGGLE_VESSEL_SELECTION,
  SUCCESS_CREATE_VESSEL_PLAN
} from '../actions';

const initState = {
  isLoading: false,
  items: {},
  selectedItem: null
};

export default function vessels(state = initState, { type, payload }) {
  switch (type) {
    case REQUEST_GET_VESSELS:
      return { ...state, isLoading: true };
    case SUCCESS_GET_VESSELS: {
      let nextItems = {};
      each(payload, v => set(nextItems, v.id, v));
      return { ...state, isLoading: false, items: nextItems };
    }
    case TOGGLE_VESSEL_SELECTION: {
      let nextSelectedVessel = payload;
      if (nextSelectedVessel === state.selectedItem) {
        nextSelectedVessel = null;
      }
      return { ...state, selectedItem: nextSelectedVessel };
    }
    case SUCCESS_CREATE_VESSEL_PLAN:
      return { ...state, selectedItem: null };
    default:
      return state;
  }
}
