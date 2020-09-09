<template>
  <q-page class="padding">
    <div class="q-pa-md">
      <q-table
        class="my-sticky-virtscroll-table"
        virtual-scroll
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        :virtual-scroll-sticky-size-start="48"
        row-key="index"
        title="Minimum Baseline Security Scan Report"
        :data="data"
        @row-click="onRowClick"
        :columns="columns"
      />
    </div>
    <div class="row" style="height: 600px">
      <div class="col"><v-chart :options="polar" /></div>
      <div class="col"><v-chart :options="bar" /></div>
    </div>
  </q-page>
</template>

<script lang="ts">
// https://www.freecodecamp.org/news/how-to-add-charts-and-graphs-to-a-vue-js-application-29f943a45d09/
import { defineComponent } from '@vue/composition-api';
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/polar';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';

const seed = [
  {
    name: 'MBSS 1',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'MBSS 2',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'MBSS 3',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'MBSS 4',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'MBSS 5',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'MBSS 6',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'MBSS 7',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'MBSS 8',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'MBSS 9',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'MBSS 10',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
];
console.log('I am running');
// we generate lots of rows here
let data: any[] = [];
for (let i = 0; i < 1000; i++) {
  data = data.concat(seed.slice(0).map(r => ({ ...r })));
}
data.forEach((row, index) => {
  row.index = index;
});

// we are not going to change this array,
// so why not freeze it to avoid Vue adding overhead
// with state change detection
Object.freeze(data);

let pdata = [];

for (let i = 0; i <= 360; i++) {
  let t = (i / 180) * Math.PI;
  let r = Math.sin(2 * t) * Math.cos(2 * t);
  pdata.push([r, i]);
}

export default defineComponent({
  name: 'Security',
  components: { 'v-chart': ECharts },
  data() {
    return {
      polar: {
        title: {
          text: 'Major Security Risks'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: pdata
          }
        ],
        animationDuration: 2000
      },
      bar: {
        xAxis: {
          data: ['Critical', 'Major', 'High', 'Low', 'Info']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'bar',
            data: [5, 20, 33, 24, 80]
          }
        ],
        title: {
          text: 'Controls By Category'
        }
      },
      data,

      pagination: {
        rowsPerPage: 0
      },

      columns: [
        {
          name: 'index',
          label: '#',
          field: 'index'
        },
        {
          name: 'name',
          required: true,
          label: 'MBSS Controls',
          align: 'left',
          field: (row: { name: any }) => row.name,
          format: (val: any) => `${val}`,
          sortable: true
        },
        {
          name: 'calories',
          align: 'center',
          label: 'Category',
          field: 'calories',
          sortable: true
        },
        { name: 'fat', label: 'Fail/Pass', field: 'fat', sortable: true }
      ]
    };
  },
  methods: {
    onRowClick(evt, row) {
      console.log('clicked on', row);
      let routeData = this.$router.resolve({
        name: 'securityDetails',
        query: { data: 'someData' }
      });
      window.open(routeData.href, '_blank');
    }
  }
});
</script>

<style lang="sass">
.my-sticky-virtscroll-table
  /* height or max-height is important */
  height: 410px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0
</style>
