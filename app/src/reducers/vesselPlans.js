import each from 'lodash/each';
import set from 'lodash/set';

import {
  REQUEST_GET_VESSEL_PLANS,
  SUCCESS_GET_VESSEL_PLANS,
  REQUEST_CREATE_VESSEL_PLAN,
  SUCCESS_CREATE_VESSEL_PLAN
} from '../actions';

const initState = {
  isLoading: false,
  isSaving: false,
  items: {},
  activeItem: null
};

export default function vesselPlans(state = initState, { type, payload }) {
  switch (type) {
    case REQUEST_GET_VESSEL_PLANS:
      return { ...state, isLoading: true };
    case SUCCESS_GET_VESSEL_PLANS: {
      let nextItems = {};
      each(payload, vp => set(nextItems, vp.id, vp));
      return { ...state, isLoading: false, items: nextItems };
    }
    case REQUEST_CREATE_VESSEL_PLAN:
      return { ...state, isSaving: true };
    case SUCCESS_CREATE_VESSEL_PLAN: {
      let nextItems = { ...state.items, [payload.id]: payload };
      return { ...state, isSaving: false, items: nextItems };
    }
    default:
      return state;
  }
}
