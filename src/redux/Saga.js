import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {ASYN_DATA, LIST_POLL} from './Action/Type';
import {asyncData, addListPoll} from './Action/Action';
import axios from 'axios';

async function requestAllUsers() {
  const response = await axios.get(
    'https://secure-refuge-14993.herokuapp.com/list_users',
  );
  return response;
}
function* fetchUserList() {
  try {
    const data = yield call(requestAllUsers);
    yield put(asyncData(data.data.data));
  } catch (e) {}
}

async function requestAllPoll() {
  const response = await axios.get(
    'https://secure-refuge-14993.herokuapp.com/list_polls',
  );
  return response;
}

function* fetchPollList() {
  try {
    const data = yield call(requestAllPoll);
    yield put(addListPoll(data.data.data));
  } catch (error) {
    console.log('niketan', error);
  }
}

function* Saga() {
  yield takeLatest(ASYN_DATA, fetchUserList);
  yield takeLatest(LIST_POLL, fetchPollList);
}

export default Saga;
