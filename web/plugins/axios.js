export default function ({ $axios }) {
  /**
   * If an error is thrown during the request this method will be called.
   *
   * Axios returns a promise. If we do not resolve it in an interceptor we will
   * not be able to use async/ await and have to use try catch
   */
  // eslint-disable-next-line handle-callback-err
  $axios.onError((error) => {
    return Promise.reject(error)
  })
}
