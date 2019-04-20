import * as types from "./actionTypes";

export function beginApiCall() {
  return { type: types.BEGIN_API_CALL };
}

export function endApiCall() {
  return { type: types.END_API_CALL };
}

export function errorApiCall(error) {
  return { type: types.ERROR_API_CALL, error: error };
}
