import { axios } from '@/utils/request'

export default {
  post: (url, params) => {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err.data)
          }
        )
        .catch(err => {
          reject(err.data)
        })
    })
  },

  get: (url, params) => {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err.data)
          }
        )
        .catch(err => {
          reject(err.data)
        })
    })
  }
}
