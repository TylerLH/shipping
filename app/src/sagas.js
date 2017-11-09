import {
  takeLatest,
  takeEvery,
  call,
  put,
  fork,
  all
} from 'redux-saga/effects';

import {
  REQUEST_GET_CONTAINERS,
  SUCCESS_GET_CONTAINERS,
  FAILURE_GET_CONTAINERS,
  REQUEST_GET_VESSELS,
  SUCCESS_GET_VESSELS,
  FAILURE_GET_VESSELS,
  REQUEST_GET_VESSEL_PLANS,
  SUCCESS_GET_VESSEL_PLANS,
  FAILURE_GET_VESSEL_PLANS,
  REQUEST_CREATE_VESSEL_PLAN,
  SUCCESS_CREATE_VESSEL_PLAN,
  FAILURE_CREATE_VESSEL_PLAN,
  showNotification
} from './actions';

import api from './api';

/**
 * Containers
 */

function* fetchContainers() {
  try {
    const res = yield call(api.getContainers);
    yield put({ type: SUCCESS_GET_CONTAINERS, payload: res.data });
  } catch (err) {
    yield put({ type: FAILURE_GET_CONTAINERS, payload: err });
  }
}

function* watchFetchContainers() {
  yield takeLatest(REQUEST_GET_CONTAINERS, fetchContainers);
}

/**
 * Vessels
 */

function* fetchVessels() {
  try {
    const res = yield call(api.getVessels);
    yield put({ type: SUCCESS_GET_VESSELS, payload: res.data });
  } catch (err) {
    yield put({ type: FAILURE_GET_VESSELS, error: err });
  }
}

function* watchFetchVessels() {
  yield takeLatest(REQUEST_GET_VESSELS, fetchVessels);
}

/**
 * Vessel Plans
 */

function* fetchVesselPlans() {
  try {
    // Ensure a fresh set of containers and vessels have been fetched
    yield all([call(fetchContainers), call(fetchVessels)]);
    const res = yield call(api.getVesselPlans);
    yield put({ type: SUCCESS_GET_VESSEL_PLANS, payload: res.data });
  } catch (err) {
    yield put({ type: FAILURE_GET_VESSEL_PLANS, payload: err });
  }
}

function* createVesselPlan({ type, payload }) {
  const { vesselId, containerIds } = payload;
  try {
    const res = yield call(api.createVesselPlan, {
      vessel_id: vesselId,
      container_ids: containerIds
    });
    yield put({ type: SUCCESS_CREATE_VESSEL_PLAN, payload: res.data });
    yield put(showNotification('Vessel plan created!'));
  } catch (err) {
    yield put({ type: FAILURE_CREATE_VESSEL_PLAN, payload: err });
    yield put(showNotification(err.message));
  }
}

function* watchFetchVesselPlans() {
  yield takeLatest(REQUEST_GET_VESSEL_PLANS, fetchVesselPlans);
}

function* watchCreateVesselPlans() {
  yield takeEvery(REQUEST_CREATE_VESSEL_PLAN, createVesselPlan);
}

/**
 * Root Saga
 */

export default function* rootSaga() {
  yield fork(watchFetchContainers);
  yield fork(watchFetchVessels);
  yield fork(watchFetchVesselPlans);
  yield fork(watchCreateVesselPlans);
}
