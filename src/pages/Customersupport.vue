<template>
  <q-page class="padding">
    <noccomponent> </noccomponent>
  </q-page>
</template>

<script lang="ts">
import noccomponent from 'components/NocComponent.vue';

import { defineComponent } from '@vue/composition-api';

import 'leaflet/dist/leaflet.css';

export default defineComponent({
  name: 'PageIndex',
  components: { noccomponent }
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
