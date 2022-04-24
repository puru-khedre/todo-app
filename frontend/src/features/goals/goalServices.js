import axios from "axios";

const API_URL = "/api/goals/";

//* set goals
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(API_URL, goalData, config);

  return data;
};

//* get all the user goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(API_URL, config);

  return data;
};

//* delete user goal
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.delete(API_URL + goalId, config);

  return data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
};

export default goalService;
