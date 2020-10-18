<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Ncell Axiata</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="username"
                label="Username"
              />
              <q-input
                square
                filled
                clearable
                v-model="password"
                type="password"
                label="Password"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="light-green-7"
              size="lg"
              class="full-width"
              label="Login"
              @click="check_user_isvalid()"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">For All by APM</p>
          </q-card-section>
          <q-banner v-if="msg.length > 0" inline-actions class="text-red">
            {{ msg }}
          </q-banner>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import axios from 'axios';

import { msg_response } from '../components/models';

import 'leaflet/dist/leaflet.css';

export default defineComponent({
  name: 'PageIndex',
  components: {},
  data() {
    return {
      username: '',
      password: '',
      formData: new FormData(),
      msg: '',
      errored: false,
      loading: false
    };
  },
  methods: {
    check_user_isvalid() {
      this.formData.append('username', this.username);
      this.formData.append('password', this.password);
      axios.defaults.withCredentials = true;
      axios
        .post('check_user_isvalid', this.formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          let resp_data = response.data as msg_response;

          console.log(resp_data);
          console.log(typeof resp_data);

          if (resp_data.message == true) {
            void this.$router.push({ name: 'portal' });
          } else {
            this.msg = 'Invalid Credentials!';
          }
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  }
});
</script>

<style>
.border-grey {
  border: 1px solid grey;
}
input,
button {
  font-size: 25px;
}
.error {
  color: red;
  background: pink;
}
.q-card {
  width: 360px;
}
</style>
