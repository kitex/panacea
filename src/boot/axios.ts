
import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export default boot(({ Vue }) => {
  
  
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const apiurl = `${process.env.FLASK_IP}:${process.env.FLASK_PORT}`;
  axios.defaults.baseURL = apiurl
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axios;
});
