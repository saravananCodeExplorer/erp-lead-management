import api from './api'

export const getLeads = () => api.get('/leads');

export const getLead = (id) => api.get(`/leads/${id}`);

export const updateLead = (id, leadData) =>
    api.put(`/leads/${id}`, leadData);