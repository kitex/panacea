<template>
  <q-page class="padding">
    <div class="q-pa-md">
      <q-table
        title="Security Scan"
        :data="resp_data"
        :columns="columns"
        row-key="scanresult_id"
        @row-click="onRowClick"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
// https://www.freecodecamp.org/news/how-to-add-charts-and-graphs-to-a-vue-js-application-29f943a45d09/
import { defineComponent } from '@vue/composition-api';

import axios from 'axios';

import { SecurityScan } from '../components/models';

export default defineComponent({
  name: 'SecurityIndex',
  components: {},
  data() {
    return {
      resp_data: new Array<SecurityScan>(),
      selected: [],
      columns: [
        {
          name: 'scan_report_name',
          field: 'scan_report_name',
          label: 'Scan Report Name'
        },
        { name: 'scan_ip', field: 'scan_ip', label: 'Scan IP' },
        {
          name: 'number_of_compliance_plugins',
          label: 'Compliance Plugins',
          field: 'number_of_compliance_plugins'
        },
        {
          name: 'number_of_compliance_plugins_failed',
          field: 'number_of_compliance_plugins_failed',
          label: 'Failed Plugins'
        },
        {
          name: 'number_of_compliance_plugins_passed',
          field: 'number_of_compliance_plugins_passed',
          label: 'Passed Plugins'
        },
        {
          name: 'number_of_compliance_plugins_warning',
          field: 'number_of_compliance_plugins_warning',
          label: 'Warning Plugins'
        }
        /*,
        {
          name: 'scan_end_time',
          field: 'scan_end_time',
          label: 'Scan End Time'
        },

        {
          name: 'scan_start_time',
          field: 'scan_start_time',
          label: 'Scan Start Time'
        },
        {
          name: 'scan_time_elapsed',
          field: 'scan_time_elapsed',
          label: 'Scan Elapsed Time'
        },
        {
          name: 'scanresult_id',
          name: 'scanresult_id',
          label: 'Scan Result ID'
        }*/
      ],
      errored: false,
      loading: false,
      pagination: []
    };
  },
  mounted() {
    // get initial data from server (1st page)
    this.list_compliance_report();
  },
  methods: {
    list_compliance_report() {
      axios.defaults.withCredentials = true;
      axios
        .get('http://localhost:5000/list_compliance_report', {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          //console.log(typeof response.data);
          //console.log(response.data);
          this.resp_data = response.data as Array<SecurityScan>;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    onRowClick(evt: Array<SecurityScan>, row: string) {
      // console.log(row);
      //console.log(typeof row);
      //console.log('clicked on', row);
      void this.$router.push({
        name: 'securityDetails',
        params: {
          items: row
        }
      });
    }
  }
});
</script>

<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  height: 600px

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 100%

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #c1f4cd !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>
