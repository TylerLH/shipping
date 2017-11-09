import axios from 'axios';

class API {
  getContainers = () => axios.get('/containers');
  getVessels = () => axios.get('/vessels');
  getVesselPlans = () => axios.get('/vessel_plans');
  createVesselPlan = ({ vessel_id, container_ids }) =>
    axios.post('/vessel_plans', { vessel_id, container_ids });
}

export default new API();
