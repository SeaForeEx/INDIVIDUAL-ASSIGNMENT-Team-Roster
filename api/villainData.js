import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createVillain = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/villains.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getVillain = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/villains.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

const getSingleVillain = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/villains/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateVillain = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/villains/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteVillain = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/villains/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createVillain,
  getVillain,
  getSingleVillain,
  updateVillain,
  deleteVillain,
};
