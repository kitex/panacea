<template>
  <q-page class="padding">
    <mapcomponent></mapcomponent>
  </q-page>
</template>

<script lang="ts">
import MapComponent from 'components/MapComponent.vue';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'PageIndex',
  components: { MapComponent },
  data() {
    return {
      message: 'The message',
      counter: 0,
      tasks: [
        {
          id: 1,
          name: 'go to med',
          dueDate: '2020/05/10',
          dueTime: '18:20'
        },
        {
          id: 2,
          name: 'buy med',
          dueDate: '2020/05/11',
          dueTime: '05:20'
        },
        {
          id: 3,
          name: 'pay med',
          dueDate: '2020/05/12',
          dueTime: '10:20'
        }
      ]
    };
  },
  computed: {
    messageUpperCase(): string {
      console.log('messageUppdreCasae called');
      return this.message.toUpperCase().concat(this.counter.toString());
    },
    errorstyle() {
      if (this.message.length > 22) {
        return {
          color: 'red',
          background: 'pink'
        };
      }
    }
  },
  methods: {
    clearMessage() {
      this.message = '';
    },
    handleKeyUp(event: Event) {
      console.log(typeof event);
      console.log(event);
    },
    alertMessage() {
      console.log('alertMessage called');
      alert(this.message);
    }
  },
  filters: {
    messageLowercase(value: string) {
      return value.toLowerCase();
    }
  },
  directives: {
    autofocus: {
      inserted(el) {
        console.log('input inserted');
        el.focus();
      }
    }
  },
  beforeCreate() {
    console.log('before created');
  },
  created() {
    console.log(' created');
  },
  beforeMount() {
    console.log(' beforeMount');
  },
  mounted() {
    console.log(' mounted');
    console.log(this.$refs);
    (this.$refs.messageInput as HTMLElement).className = 'bg-green';
  },
  beforeUpdate() {
    console.log(' beforeUpdate');
  },
  updated() {
    console.log(' updated');
  },
  beforeDestroy() {
    console.log(' beforeDestroy');
  },
  destroyed() {
    console.log(' destroyed');
  }
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
