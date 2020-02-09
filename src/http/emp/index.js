import http from '../index';

export function fetchCarriers() {
    return http.get('/carriers')
        .then(response => response)
        .catch(error => error.response);
};

export function getCarrierById(id) {
    return http.get(`/carriers/${id}`)
        .then(response => response)
        .catch(error => error.response);
};

export function addNewCarrier(data) {
    return http.post('/carriers', data)
        .then(response => response)
        .catch(error => error.response);
};

export function editCarrierById(id, data) {
    return http.put(`/carriers/${id}`, data)
        .then(response => response)
        .catch(error => error.response);
};

export function deleteCarrierById(id) {
  return http.delete(`/carriers/${id}`)
      .then(response => response)
      .catch(error => error.response);
}
