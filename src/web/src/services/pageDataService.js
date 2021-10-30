import axios from "axios";

const baseUrl = "/api/PageData/";

const getAllPageData = async () => {
  const pdResponse = await axios.get(baseUrl);
  return pdResponse.data;
};

const getPageDataByKey = async (key) => {
  const pdResponse = await axios.get(baseUrl + key);
  return pdResponse.data;
};

const getPageDataKeys = async () => {
  const res = await axios.get(baseUrl + "keys");
  return res.data;
};

const postPageData = async (data) => {
  console.log(data);
  const pdResponse = await axios.post(baseUrl, data);
  return pdResponse.status;
};

const putPageData = async (data) => {
  const pdResponse = await axios.put(baseUrl + data.key, data);
  return pdResponse.status;
};

const deletePageData = async (key) => {
  const pdResponse = await axios.delete(baseUrl + key);
  return pdResponse.status;
};

const pageDataService = {
  getAllPageData,
  getPageDataByKey,
  getPageDataKeys,
  postPageData,
  putPageData,
  deletePageData,
};

export default pageDataService;
