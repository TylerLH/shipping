import { createAction } from 'redux-actions';

/**
 * App
 */

export const TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION';

export const toggleNavigation = createAction(TOGGLE_NAVIGATION);

/**
 * Snackbar
 */

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

export const showNotification = createAction(
  SHOW_NOTIFICATION,
  message => message
);
export const clearNotification = createAction(CLEAR_NOTIFICATION);

/**
 * Containers
 */

export const REQUEST_GET_CONTAINERS = 'REQUEST_GET_CONTAINERS';
export const SUCCESS_GET_CONTAINERS = 'SUCCESS_GET_CONTAINERS';
export const FAILURE_GET_CONTAINERS = 'FAILURE_GET_CONTAINERS';
export const TOGGLE_CONTAINER_SELECTION = 'TOGGLE_CONTAINER_SELECTION';
export const CLEAR_CONTAINER_SELECTIONS = 'CLEAR_CONTAINER_SELECTIONS';
export const TOGGLE_CONTAINERS_SELECT_ALL = 'TOGGLE_CONTAINERS_SELECT_ALL';
export const TOGGLE_VESSEL_PLAN_DIALOG = 'TOGGLE_VESSEL_PLAN_DIALOG';

export const fetchContainers = createAction(REQUEST_GET_CONTAINERS);
export const toggleContainerSelection = createAction(
  TOGGLE_CONTAINER_SELECTION,
  container => container
);
export const toggleContainersSelectAll = createAction(
  TOGGLE_CONTAINERS_SELECT_ALL
);
export const clearContainerSelections = createAction(
  CLEAR_CONTAINER_SELECTIONS
);
export const toggleVesselPlanDialog = createAction(TOGGLE_VESSEL_PLAN_DIALOG);

/**
 * Vessels
 */

export const REQUEST_GET_VESSELS = 'REQUEST_GET_VESSELS';
export const SUCCESS_GET_VESSELS = 'SUCCESS_GET_VESSELS';
export const FAILURE_GET_VESSELS = 'FAILURE_GET_VESSELS';
export const TOGGLE_VESSEL_SELECTION = 'TOGGLE_VESSEL_SELECTION';

export const fetchVessels = createAction(REQUEST_GET_VESSELS);
export const toggleVesselSelection = createAction(
  TOGGLE_VESSEL_SELECTION,
  vessel => vessel
);

/**
 * Vessel Plans
 */

export const REQUEST_GET_VESSEL_PLANS = 'REQUEST_GET_VESSEL_PLANS';
export const SUCCESS_GET_VESSEL_PLANS = 'SUCCESS_GET_VESSEL_PLANS';
export const FAILURE_GET_VESSEL_PLANS = 'FAILURE_GET_VESSEL_PLANS';
export const TOGGLE_PLAN_SELECTION = 'TOGGLE_PLAN_SELECTION';
export const REQUEST_CREATE_VESSEL_PLAN = 'REQUEST_CREATE_VESSEL_PLAN';
export const SUCCESS_CREATE_VESSEL_PLAN = 'SUCCESS_CREATE_VESSEL_PLAN';
export const FAILURE_CREATE_VESSEL_PLAN = 'FAILURE_CREATE_VESSEL_PLAN';

export const fetchVesselPlans = createAction(REQUEST_GET_VESSEL_PLANS);
export const togglePlanSelection = createAction(TOGGLE_PLAN_SELECTION);
export const createVesselPlan = createAction(
  REQUEST_CREATE_VESSEL_PLAN,
  (vesselId, containerIds) => ({ vesselId, containerIds })
);
