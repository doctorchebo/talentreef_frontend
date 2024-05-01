import axios from "axios";

const BASE_URL = "http://localhost:9000";

export const fetchAllWidgets = () =>
  axios.get(`${BASE_URL}/v1/widgets/getAll`).then((response) => response.data);

export const addWidget = (widget) =>
  axios
    .post(`${BASE_URL}/v1/widgets/add`, widget)
    .then((response) => response.data);

export const editWidget = (widget) =>
  axios.post(`${BASE_URL}/v1/widgets/edit`, widget)
  .then((response) => response.data);

export const deleteWidget = (name) =>
  axios.post(`${BASE_URL}/v1/widgets/delete/${name}`);
