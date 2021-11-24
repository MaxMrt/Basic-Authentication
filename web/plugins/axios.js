export default async function ({ $axios, store }) {
  $axios.onRequest((config) => {
    if (store.state.myAuth.token)
      config.headers.common['Authorization'] = store.state.myAuth.token;
  });

  $axios.onError((error) => {
    if (error.response.status === 500) {
      redirect('/error');
    }
    return Promise.reject(error);
  });
}
