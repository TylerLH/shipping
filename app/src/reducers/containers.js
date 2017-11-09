import each from 'lodash/each';
import has from 'lodash/has';
import set from 'lodash/set';
import unset from 'lodash/unset';
import cloneDeep from 'lodash/cloneDeep';

import {
  REQUEST_GET_CONTAINERS,
  SUCCESS_GET_CONTAINERS,
  TOGGLE_CONTAINER_SELECTION,
  TOGGLE_CONTAINERS_SELECT_ALL,
  CLEAR_CONTAINER_SELECTIONS,
  TOGGLE_VESSEL_PLAN_DIALOG,
  SUCCESS_CREATE_VESSEL_PLAN
} from '../actions';

const initState = {
  isLoading: false,
  items: {},
  isAddingToVesselPlan: false,
  selectedItems: {},
  isAllSelected: false
};

export default function containers(state = initState, { type, payload }) {
  switch (type) {
    case REQUEST_GET_CONTAINERS:
      return { ...state, isLoading: true };
    case SUCCESS_GET_CONTAINERS: {
      let nextItems = {};
      each(payload, c => set(nextItems, c.id, c));
      return { ...state, isLoading: false, items: nextItems };
    }
    case TOGGLE_CONTAINER_SELECTION: {
      let nextSelectedItems = cloneDeep(state.selectedItems);
      if (has(state.selectedItems, payload.id)) {
        unset(nextSelectedItems, payload.id);
      } else {
        set(nextSelectedItems, payload.id, payload);
      }
      return { ...state, selectedItems: nextSelectedItems };
    }
    case CLEAR_CONTAINER_SELECTIONS:
      return { ...state, selectedItems: {}, isAllSelected: false };
    case TOGGLE_CONTAINERS_SELECT_ALL: {
      const nextSelectedItems = state.isAllSelected ? {} : state.items;
      const isAllSelected = !state.isAllSelected;
      return { ...state, selectedItems: nextSelectedItems, isAllSelected };
    }
    case TOGGLE_VESSEL_PLAN_DIALOG:
      return { ...state, isAddingToVesselPlan: !state.isAddingToVesselPlan };
    case SUCCESS_CREATE_VESSEL_PLAN:
      return {
        ...state,
        isAddingToVesselPlan: false,
        selectedItems: {},
        isAllSelected: false
      };
    default:
      return state;
  }
}
