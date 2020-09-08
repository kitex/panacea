<template>
  <q-page class="padding"> </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import 'leaflet/dist/leaflet.css';

export default defineComponent({
  name: 'PageIndex',
  components: {}
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
</style>
