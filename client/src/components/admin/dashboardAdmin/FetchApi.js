import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const DashboardData = async () => {
  try {
    const response = await axios.post(`${apiURL}/api/customize/dashboard-data`);
    return response.data;
  } catch (error) {
    // Handle the error gracefully
    console.error("Error fetching dashboard data:", error);
    throw error; // Rethrow the error to propagate it to the calling code
  }
};

export const getSliderImages = async () => {
  try {
    const response = await axios.get(`${apiURL}/api/customize/get-slide-image`);
    return response.data;
    console.log(response.data);
  } catch (error) {
    // Handle the error gracefully
    console.error("Error fetching slider images:", error);
    return []; // Return an empty array or another appropriate default value
  }
};
export const postUploadImage = async (formData) => {
  try {
    let res = await axios.post(
      `${apiURL}/api/customize/upload-slide-image`,
      formData
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postDeleteImage = async (id) => {
  try {
    let res = await axios.post(`${apiURL}/api/customize/delete-slide-image`, {
      id,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
