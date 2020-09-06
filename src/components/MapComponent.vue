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
              <input type="checkb" v-model="checked" />
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
import axios from 'axios';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default defineComponent({
  name: 'MapComponent',
  props: ['task', 'index', 'deleteTask'],
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      tecp_message: 'Lets Find Nearest Point of Interest!',
      result_data: {},
      buffer_distance: 0,
      checked: false,
      marker1: {},
      marker2: {},
      circle_marker: {},
      line: {},
      unit: 'kilometers',
      formData: new FormData()
    };
  },
  methods: {
    uploadfiles() {
      var network_filelist = (this.$refs.network_file as HTMLInputElement)
        .files;
      if (network_filelist !== null) {
        this.formData.append('network_sites', network_filelist[0]);
      }
      var requestedSitesList = (this.$refs.cust_file as HTMLInputElement).files;
      if (requestedSitesList !== null) {
        this.formData.append('requested_sites', requestedSitesList[0]);
      }

      var distance_tmp = this.buffer_distance;
      if (this.unit == 'kilometers') {
        distance_tmp = this.buffer_distance * 1000;
      }
      this.formData.append('buffer_distance', distance_tmp.toString());
      if (this.checked) {
        this.sites_within_radius(this.formData);
      } else {
        this.nearby_sites(this.formData);
      }

      console.log('File uploaded!');
    },
    sites_within_radius(formData: FormData) {
      axios
        .post('http://localhost:5000/sites_within_radius', formData, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          // this.result_data = response.data;
          this.result_data = JSON.parse(response.data) as JSON;
          console.log(typeof this.result_data);
          // console.log(typeof this.result_data.columns);
          // console.log(this.result_data);
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    nearby_sites(formData: FormData) {
      axios
        .post('http://localhost:5000/nearby_sites', formData, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          // this.result_data = response.data;

          this.result_data = JSON.parse(response.data) as JSON;
          //  console.log(typeof this.result_data);
          //  console.log(typeof this.result_data.columns);
          console.log(this.result_data);
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  }
});

var map = L.map('mapid').setView([27.65389, 85.236627], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
</script>
