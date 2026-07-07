import api from './api'

export const getLeads = () => api.get('./leads');

export const getLead = (id) => api.get(`/lead/${id}`);

export const updateLead = (id, date) =>
    api.put(`/lead/${id}`, date);