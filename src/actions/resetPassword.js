import axios from "axios";

function error(errors) {
  return {
    type: "RESET_FAILED",
    errors
  };
}

export default function changePassword(data) {
  return dispatch => {
    dispatch({ type: "RESET_REQUEST_START" });
    axios
      .put(
        "https://authors-haven-api.herokuapp.com/api/v1/reset-password-done/",
        data
      )
      .then(response => {
        dispatch({ type: "RESET_REQUEST", payload: response.data });
      })
      .catch(errors => {
        dispatch(error(errors.response.data.errors));
      });
  };
}
