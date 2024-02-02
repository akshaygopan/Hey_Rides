import Alert from "../utils/Alert";
import instance from "./instance";

const REQUEST_HEADER = (access_token) => {
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      token: `${access_token}`,
    },
  };
};

const getAccessToken = () => {
  let hey_rides_auth = localStorage.getItem("hey_rides_auth")
    ? JSON.parse(localStorage.getItem("hey_rides_auth"))
    : null;
  let access_token = hey_rides_auth ? hey_rides_auth.access_token : "";
  return access_token;
};

// ERROR HANDLER
const handleError = (error) => {
  if (error && error.response && error.response.status) {
    console.error(error);

    switch (error.response.status) {
      case 400:
        Alert(
          error.response.data.error.message,
          "",
          () => {},
          false,
          () => {},
          () => {},
          true,
          "Ok"
        );
        break;
      case 401:
        Alert(
          error.response.data.error.message,
          "",
          logout(),
          false,
          () => {},
          logout(),
          true,
          "Ok"
        );
        break;
      case 403:
        Alert(
          error.response.data.error.message,
          "",
          () => {},
          false,
          () => {},
          () => {},
          true,
          "Ok"
        );
        break;
      case 404:
        Alert(
          error.response.data.error.message,
          "",
          () => {},
          false,
          () => {},
          () => {},
          true,
          "Ok"
        );
        break;
      case 500:
        Alert(
          error.response.data.error.message,
          "",
          () => {},
          false,
          () => {},
          () => {},
          true,
          "Ok"
        );
        break;
      case 502:
        Alert(
          "Server error",
          "",
          () => {},
          false,
          () => {},
          () => {},
          true,
          "Ok"
        );
        break;
      default:
        Alert(
          "Something went wrong. Please try again after some time.",
          "",
          () => {},
          false,
          () => {},
          () => {},
          true,
          "Ok"
        );
    }
  } else {
    Alert(
      "Something went wrong. Please try again after some time.",
      "",
      () => {},
      false,
      () => {},
      () => {},
      true,
      "Ok"
    );
  }
};

const logout = () => {
  localStorage.removeItem("hey_rides_auth");
  window.location.href = "/";
};

// GET method API function
const getData = async (path, isheader = true) => {
  let header = REQUEST_HEADER(getAccessToken());

  let response = null;
  isheader
    ? (response = await instance.get(path, header).catch(handleError))
    : (response = await instance.get(path).catch(handleError));

  if (response && response.data && response.status && response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

// PUT method API function
const putData = async (path, data, isheader = true) => {
  let header = REQUEST_HEADER(getAccessToken());

  let response = null;
  isheader
    ? (response = await instance.put(path, data, header).catch(handleError))
    : (response = await instance.put(path, data).catch(handleError));

  if (response && response.data && response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

// POST method API function
const postData = async (path, data, isheader = true) => {
  let header = REQUEST_HEADER(getAccessToken());

  let response = null;
  isheader
    ? (response = await instance.post(path, data, header).catch(handleError))
    : (response = await instance.post(path, data).catch(handleError));

  if (response && response.data && response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

// POST method API function
const deleteData = async (path, isheader = true) => {
  let header = REQUEST_HEADER(getAccessToken());

  let response = null;
  isheader
    ? (response = await instance.delete(path, header).catch(handleError))
    : (response = await instance.delete(path).catch(handleError));

  if (response && response.data && response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

export { getData, putData, postData, logout, deleteData };
