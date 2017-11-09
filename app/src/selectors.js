import { createSelector } from 'reselect';

export const getContainers = state => state.containers.items;
export const getSelectedContainers = state => state.containers.selectedItems;

export const getNumContainers = createSelector(
  getContainers,
  items => Object.values(items).length
);

export const getNumSelectedContainers = createSelector(
  getSelectedContainers,
  items => Object.values(items).length
);

export const getVessels = state => state.vessels.items;
export const getVesselPlans = state => state.vesselPlans.items;

// Get vessel plans, populated with vessel & container data
export const getPopulatedVesselPlans = createSelector(
  getContainers,
  getVessels,
  getVesselPlans,
  (containers, vessels, vesselPlans) => {
    return Object.values(vesselPlans).map(vpData => {
      const vesselPlan = {
        id: vpData.id,
        containers: [],
        vessel: null
      };
      vesselPlan.containers = vpData.container_ids.map(id => containers[id]);
      vesselPlan.vessel = vessels[vpData.vessel_id];
      return vesselPlan;
    });
  }
);
