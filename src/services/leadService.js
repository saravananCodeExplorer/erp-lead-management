import api from './api'

export const getLeads = () => api.get('./leads');

export const getLead = (id) => api.get(`/leads/${id}`);

export const updateLead = (id, date) =>
    api.put(`/lead/${id}`, date);