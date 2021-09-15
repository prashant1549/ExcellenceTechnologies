import {
  ACCESS_TOKEN,
  CREATE_PROJECT,
  ALL_PROJECT,
  USER_PROFILE,
  CREATE_EMPLOYEE,
  ALL_EMPLOYEE,
} from './Type';

export const createEmployee = data => ({
  type: CREATE_EMPLOYEE,
  data: data,
});
export const allEmployee = data => ({
  type: ALL_EMPLOYEE,
  data: data,
});

export const accessToken = token => ({
  type: ACCESS_TOKEN,
  token: token,
});
export const userProfile = user => ({
  type: USER_PROFILE,
  user: user,
});
export const allProjects = data => ({
  type: ALL_PROJECT,
  data: data,
});
export const createProject = data => ({
  type: CREATE_PROJECT,
  data: data,
});
