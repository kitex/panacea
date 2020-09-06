<template>
  <q-page class="padding">
    <mapcomponent> </mapcomponent>
  </q-page>
</template>

<script lang="ts">
import mapcomponent from 'components/MapComponent.vue';

import { defineComponent } from '@vue/composition-api';

import 'leaflet/dist/leaflet.css';

export default defineComponent({
  name: 'PageIndex',
  components: { mapcomponent }
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
