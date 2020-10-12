import Axios from 'axios'
import { expect } from 'chai';

require('dotenv').config()

const getHeader = (token = false) => {
  let headers;
  if (token) {
    headers = { 'Authorization': `Bearer ${process.env.GOFOREST_ACCESS_TOKEN}` };
  }
  return headers
}

const axios = Axios.create({
  baseURL: 'https://gorest.co.in/public-api/',

})
const get = (url, isSecure) => {
  return axios.get(url, { headers: getHeader(isSecure) });
}


const post = (url, data, isSecure) => {
  return axios.post(url, data, { headers: getHeader(isSecure) });
}

const put = (url, data, isSecure) => {
  return axios.put(url, data, { headers: getHeader(isSecure) });
}

const remove = (url, isSecure) => {
  return axios.delete(url, { headers: getHeader(isSecure) });
}
describe('User', () => {
  it('DELETE /users/:id', (done) => {
    remove('users/215', true)
      .then(remove => {
        expect(remove.data.data).to.be.eq(null)
        done();
      }).catch(err => {
        done(err);
      });
  });

  it('PUT /users/:id', (done) => {
    const updatedData = {
      name: 'Ashok Ganika'
    }
    put('users/12', updatedData, true)
      .then(user => {
        expect(user.data.data).to.deep.include(updatedData);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('POST /users', (done) => {
    const data =
    {
      email: `test-${Math.floor(Math.random() * 7867)}@gmail.com`,
      name: "fdss",
      gender: "Male",
      status: "Active"
    }
    post('users', data, true)
      .then(user => {
        // data.email = 'ram@gmail.com';
        // expect(user.data.data.email).to.be.eq(data.email);
        // expect(user.data.data.name).to.be.eq(data.name);
        // expect(user.data.data.gender).to.be.eq(data.gender);
        // expect(user.data.data.status).to.be.eq(data.status);
        expect(user.data.data).to.deep.include(data);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('GET /users', (done) => {
    axios.get(`users?Access-Token=${process.env.GOFOREST_ACCESS_TOKEN}`)
      .then(user => {
        expect(user.data.data).to.be.a('array');
        expect(user.data.data).to.be.not.empty;
        expect(user.data.data).to.be.length.lessThan(21, 'must be less than 21 users');
        done();
      })
      .catch(err => {
        done(err);
      });
  })
});

