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

        <q-file
          multiple
          borderless
          v-model="evidence_file"
          label="Upload Evidence File"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

        <q-file
          multiple
          borderless
          v-model="evidence_image"
          label="Upload Evidence Image"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

        <q-btn
          label="Download Evidence File"
          :loading="loading1"
          color="brown"
          @click.prevent="downloadFile(1)"
          icon="camera_front"
        >
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Loading...
          </template>
        </q-btn>

        <q-btn
          label="Download Evidence Image"
          :loading="loading2"
          color="black"
          @click.prevent="downloadImage(2)"
          icon="camera_rear"
        >
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Loading...
          </template>
        </q-btn>
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
import { SecurityEvidence, ComplianceEvidence } from '../components/models';

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
      loading1: false,
      loading2: false,
      get_file_type: '',
      data: [],
      evidence_file: [],
      evidence_image: [],
      evidence_file_name: '',
      evidence_image_name: '',
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
      scanresult_id: '',
      remarks: '',
      sn: '',
      evidence_sn: 0,
      errored: false,
      loading: false,
      pagination: []
    };
  },
  mounted() {
    let se: SecurityEvidence = this.securityEvidence as SecurityEvidence;
    this.compliance_check_actual_value = se.compliance_check_actual_value;
    this.compliance_check_info = se.compliance_check_info;
    this.compliance_check_name = se.compliance_check_name;
    this.compliance_check_result = se.compliance_check_result;
    this.compliance_check_solution = se.compliance_check_solution;
    this.host_resolved_ip = se.host_resolved_ip;
    this.scan_report_name = se.scan_report_name;
    this.scanresult_id = se.scanresult_id;
    this.sn = se.sn;

    //axios.defaults.withCredentials = true;
    axios
      .get('list_compliance_evidence', {
        headers: {
          'Content-Type': 'multipart/form-data',
          compliance_check_name: this.compliance_check_name,
          host_resolved_ip: this.host_resolved_ip
        }
      })
      .then(response => {
        //console.log('Getting evidence details');
        //console.log(this.compliance_check_name);
        //console.log(this.host_resolved_ip);
        let ce: ComplianceEvidence = response.data as ComplianceEvidence;
        //console.log(ce.evidence_remarks);
        this.remarks = ce.evidence_remarks;
        this.evidence_file_name = ce.evidence_file_name;
        this.evidence_image_name = ce.evidence_image_name;
        this.evidence_sn = ce.sn;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    onSubmit() {
      axios.defaults.withCredentials = true;
      this.formData.append('sn', this.evidence_sn.toString());
      this.formData.append('host_resolved_ip', this.host_resolved_ip);
      this.formData.append('scan_report_name', this.scan_report_name);
      this.formData.append('evidence_remarks', this.remarks);
      console.log(this.remarks);
      this.formData.append('compliance_check_name', this.compliance_check_name);
      this.formData.append('evidence_file', this.evidence_file[0]);
      this.formData.append('evidence_image', this.evidence_image[0]);
      axios
        .post('post_compliance_evidence', this.formData, {
          headers: {
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
    },
    downloadFile(number: number) {
      // console.log(`loading${number}`);
      // we set loading state
      this[`loading${number}`] = true;
      if (number == 1) {
        this.get_file_type = this.evidence_file_name;
      } else {
        this.get_file_type = this.evidence_image_name;
      }
      console.log(this.get_file_type);
      //axios.defaults.withCredentials = true;
      //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      axios
        .get('load_file', {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Cache-Control': 'no-cache',
            filename: this.get_file_type
          },
          responseType: 'blob'
        })
        .then(response => {
          console.log(response.data);
          const url = URL.createObjectURL(
            new Blob([response.data], {
              type: 'application/vnd.ms-excel'
            })
          );

          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('id', 'dwn_load_ahref');
          link.setAttribute('download', this.get_file_type);
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
      this[`loading${number}`] = false;
      //console.log(this[`loading${number}`]);
    },
    downloadImage(number: number) {
      // console.log(`loading${number}`);
      // we set loading state
      this[`loading${number}`] = true;
      if (number == 1) {
        this.get_file_type = this.evidence_file_name;
      } else {
        this.get_file_type = this.evidence_image_name;
      }
      // console.log(this.get_file_type);
      axios.defaults.withCredentials = true;
      //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      axios
        .get('load_image', {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Cache-Control': 'no-cache',
            filename: this.get_file_type
          },
          responseType: 'blob'
        })
        .then(response => {
          //console.log(response.data);
          const url = URL.createObjectURL(
            new Blob(
              [response.data]
              /*, {
              type: 'application/vnd.ms-excel'
            }*/
            )
          );
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', this.get_file_type);
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));

      this[`loading${number}`] = false;
      // console.log(this[`loading${number}`]);
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
