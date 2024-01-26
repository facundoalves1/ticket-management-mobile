import api from "./axiosConfig";

export const GET_ITEM_BY_BARCODE = async (barcode) => {
  try {
    const response = await api.get(`/items/getItemByBarcode/${barcode}`);
    return response.data.payload;
  } catch (error) {
    throw error;
  }
};
