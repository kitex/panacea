<template>
  <div>
    <div class="row" style="height:100vh">
      <div class="col border-grey">
        <l-map
          v-if="showMap"
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          style="height: 100%"
          @update:zoom="zoomUpdate"
        >
          <l-tile-layer :url="url" :attribution="attribution" />
          <l-marker :lat-lng="withPopup">
            <l-popup>
              <div @click="innerClick">
                I am a popup
                <p v-show="showParagraph">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque sed pretium nisl, ut sagittis sapien. Sed vel
                  sollicitudin nisi. Donec finibus semper metus id malesuada.
                </p>
              </div>
            </l-popup>
          </l-marker>
          <l-marker :lat-lng="withTooltip">
            <l-tooltip :options="{ permanent: true, interactive: true }">
              <div @click="innerClick">
                I am a tooltip
                <p v-show="showParagraph">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque sed pretium nisl, ut sagittis sapien. Sed vel
                  sollicitudin nisi. Donec finibus semper metus id malesuada.
                </p>
              </div>
            </l-tooltip>
          </l-marker>
        </l-map>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import axios from 'axios';

import { latLng, Icon } from 'leaflet';

import 'leaflet/dist/leaflet.css';

import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from 'vue2-leaflet';

type D = Icon.Default & {
  _getIconUrl: string;
};

Icon.Default.mergeOptions({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

delete (Icon.Default.prototype as D)._getIconUrl;

export default defineComponent({
  name: 'mapcomponent',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
  data() {
    return {
      network_files: [],
      customer_files: [],
      options: ['kilometers', 'meters'],
      tecp_message: 'Lets Find Nearest Point of Interest!',
      result_data: {},
      buffer_distance: 0,
      checked: false,
      marker1: {},
      marker2: {},
      circle_marker: {},
      line: {},
      unit: 'kilometers',
      formData: new FormData(),
      loading: false,
      errored: false,
      zoom: 13,
      center: latLng(47.41322, -1.219482),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    };
  },
  methods: {
    zoomUpdate(zoom: number) {
      this.currentZoom = zoom;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert('Click!');
    },
    uploadfiles() {
      if (this.network_files !== null) {
        this.formData.append('network_sites', this.network_files[0]);
      }

      if (this.customer_files !== null) {
        this.formData.append('requested_sites', this.customer_files[0]);
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
</script>
