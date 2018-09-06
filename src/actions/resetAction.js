import axios from "axios";

function error(errors) {
  return {
    type: "RESET_FAILED",
    errors
  };
}
export default function reset(email) {
  return dispatch => {
    axios
      .post("https://authors-haven-api.herokuapp.com/api/v1/reset-password/", {
        email
      })
      .then(response => {
        dispatch({ type: "RESET_REQUEST", payload: response.data });
      })
      .catch(errors => {
        dispatch(error(errors.response.data.errors));
      });
  };
}
