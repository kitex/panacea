<template>
  <q-page class="padding">
    <div class="q-pa-md">
      <q-table
        title="Scan Details"
        :data="resp_data"
        :columns="columns"
        row-key="scan_ip"
        :separator="separator"
        @row-click="onRowClick"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
// https://www.freecodecamp.org/news/how-to-add-charts-and-graphs-to-a-vue-js-application-29f943a45d09/
import { defineComponent } from '@vue/composition-api';

import axios from 'axios';

import { SecurityEvidence } from '../components/models';

export default defineComponent({
  name: 'SecurityDetails',
  components: {},
  props: ['items'],
  template: '<div>User {{ items }}</div>',
  data() {
    return {
      separator: 'cell',
      resp_data: Array<SecurityEvidence>(),
      title: '',
      columns: [
        {
          name: 'compliance_check_name',
          field: 'compliance_check_name',
          label: 'Control Name',
          align: 'center',
          style: 'width: 10%'
        },
        {
          name: 'compliance_check_actual_value',
          field: 'compliance_check_actual_value',
          label: 'Compliance Check Actual Value',
          align: 'center',
          style: 'width: 45%'
        },
        {
          name: 'compliance_check_solution',
          field: 'compliance_check_solution',
          label: 'Solution',
          align: 'center',
          style: 'width: 40%'
        },
        {
          name: 'compliance_check_result',
          field: 'compliance_check_result',
          label: 'Result',
          align: 'center',
          style: 'width: 5%'
        }
      ],
      errored: false,
      loading: false,
      pagination: []
    };
  },
  mounted() {
    this.list_compliance_report();
  },
  methods: {
    list_compliance_report() {
      //console.log(this.items);
      let items: SecurityEvidence = this.items as SecurityEvidence;
      //console.log(items.scanresult_id);
      this.title = items.scan_report_name;
      axios.defaults.withCredentials = true;
      axios
        .get('list_compliance_detail/' + items.scanresult_id, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          this.resp_data = response.data as Array<SecurityEvidence>;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    onRowClick(evt: Array<SecurityEvidence>, row: string) {
      // console.log('clicked on', row);
      void this.$router.push({
        name: 'securityEvidence',
        params: {
          securityEvidence: row
        }
      });
    }
  }
});
</script>

<style lang="sass">

.q-table td, .q-table th
    white-space: normal !important

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
