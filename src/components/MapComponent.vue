<template>
  <div>
    <div>
      <form>
        <table class="table">
          <tr>
            <td>
              <label>Network Data</label>
            </td>
            <td>
              <input type="file" id="network_file" ref="network_file" />
            </td>
          </tr>
          <tr>
            <td>
              <label>Customer Location</label>
            </td>
            <td>
              <input type="file" id="cust_file" ref="cust_file" />
            </td>
          </tr>

          <tr>
            <td>
              <label>Buffer Distance</label>
            </td>
            <td>
              <input type="checkbox" id="checkbox" v-model="checked" />
              <input
                v-if="checked"
                class="form-control"
                v-model="buffer_distance"
                placeholder="Buffer Distance"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Unit</label>
            </td>
            <td>
              <select class="form-control" v-model="unit">
                <option value="kilometers">kilometers</option>
                <option value="meters">meters</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <button type="submit" class="btn btn-primary">Submit</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
    <div id="mapid"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default defineComponent({
  name: 'MapComponent',
  props: ['task', 'index', 'deleteTask'],
  data() {
    return {
      tecp_message: 'Lets Find Nearest Point of Interest!',
      cust_file_csv: '',
      network_file_csv: '',
      result_data: {},
      buffer_distance: 0,
      checked: false,
      marker1: {},
      marker2: {},
      circle_marker: {},
      line: {},
      unit: 'kilometers'
    };
  },
  methods: {}
});
</script>
