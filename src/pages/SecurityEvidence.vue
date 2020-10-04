<template>
  <q-page class="padding">
    <div class="q-pa-md">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-field color="purple-12" label="Scan Report Name" stack-label />
        <q-input v-model="scan_report_name" filled readonly="readonly" />

        <q-field color="purple-12" label="Scan Result ID" stack-label />
        <q-input v-model="scanresult_id" filled readonly="readonly" />

        <q-field
          color="purple-12"
          label="Compliance Check Actual"
          stack-label
        />
        <q-input
          v-model="compliance_check_actual_value"
          filled
          readonly="readonly"
          type="textarea"
        />

        <q-field color="purple-12" label="Compliance Check Info" stack-label />
        <q-input
          v-model="compliance_check_info"
          type="textarea"
          filled
          readonly="readonly"
        />

        <q-field color="purple-12" label="Compliance Check Name" stack-label />
        <q-input
          v-model="compliance_check_name"
          type="textarea"
          filled
          readonly="readonly"
        />

        <q-field
          color="purple-12"
          label="Compliance Check Result"
          stack-label
        />
        <q-input v-model="compliance_check_result" filled readonly="readonly" />

        <q-field
          color="purple-12"
          label="Compliance Check Solution"
          stack-label
        />
        <q-input
          v-model="compliance_check_solution"
          filled
          readonly="readonly"
        />

        <q-field color="purple-12" label="Host Resolved" stack-label />
        <q-input v-model="host_resolved_ip" filled readonly="readonly" />

        <q-field color="purple-12" label="Remarks" stack-label />
        <q-input v-model="remarks" filled type="textarea" />

        <q-file borderless v-model="evidence_file" label="Upload Evidence File">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

        <q-file
          borderless
          v-model="evidence_image"
          label="Upload Evidence File"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
// https://www.freecodecamp.org/news/how-to-add-charts-and-graphs-to-a-vue-js-application-29f943a45d09/
import { defineComponent } from '@vue/composition-api';
import axios from 'axios';
import { SecurityEvidence } from './components/models';

console.log('I am running');
// we generate lots of rows here

export default defineComponent({
  name: 'SecurityDetails',
  components: {},
  props: {
    securityEvidence: {
      type: Object as () => SecurityEvidence,
      default: () => ['securityEvidence']
    }
  },
  data() {
    return {
      separator: 'cell',
      data: [],
      evidence_file: [],
      evidence_image: [],
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
      formData: new FormData(),

      compliance_check_actual_value: '',
      compliance_check_info: '',
      compliance_check_name: '',
      compliance_check_result: '',
      compliance_check_solution: '',
      host_resolved_ip: '',
      scan_report_name: '',
      scanresult_id: 0,
      remarks: '',
      sn: 0,
      errored: false,
      loading: false,
      pagination: []
    };
  },
  mounted() {
    this.compliance_check_actual_value = this.securityEvidence.compliance_check_actual_value;
    this.compliance_check_info = this.securityEvidence.compliance_check_info;
    this.compliance_check_name = this.securityEvidence.compliance_check_name;
    this.compliance_check_result = this.securityEvidence.compliance_check_result;
    this.compliance_check_solution = this.securityEvidence.compliance_check_solution;
    this.host_resolved_ip = this.securityEvidence.host_resolved_ip;
    this.scan_report_name = this.securityEvidence.scan_report_name;
    this.scanresult_id = this.securityEvidence.scanresult_id;
    this.sn = this.securityEvidence.sn;
  },
  methods: {
    onSubmit() {
      axios.defaults.withCredentials = true;
      this.formData.append('host_resolved_ip', String(12));
      this.formData.append('evidence_remarks', this.remarks);
      console.log(this.evidence_file);
      this.formData.append('evidence_file', this.evidence_file);
      this.formData.append('evidence_image', this.evidence_image);
      axios
        .post('http://localhost:5000/post_compliance_evidence', this.formData, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log(response.data);
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
