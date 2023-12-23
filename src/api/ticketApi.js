import api from "./axiosConfig";

export const GET_TICKETS_BY_USERS = async () => {
  try {
    const response = await api.get("/tickets/getUserTickets");
    return response.data.payload;
  } catch (error) {
    throw error;
  }
};

export const DELETE_TICKET = async (id) => {
  try {
    const response = await api.delete(`/tickets/deleteTicket/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const PRINT_TICKET = async (body) => {
  try {
    const response = await api.post(`/tickets/printTicket`, body);
    return response.data.payload;
  } catch (error) {
    throw error;
  }
};

export const POST_TICKET = async (ticketData) => {
  try {
    const response = await api.post("/tickets/saveTicket", ticketData);
    return response;
  } catch (error) {
    throw error;
  }
};

