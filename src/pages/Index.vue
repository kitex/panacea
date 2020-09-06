<template>
  <q-page class="padding">
    <task
      v-for="(task, index) in tasks"
      :task="task"
      :index="index"
      :deleteTask="deleteTask"
      :key="task.id"
    ></task>
    <button style="position:absolute;right:10px" @click="counter++">
      {{ counter }}
    </button>
    <input
      v-model="message"
      @keyup.enter="alertMessage"
      @keyup.esc="handleKeyUp"
      v-autofocus
      v-bind:class="{ error: message.length > 22 }"
      :style="errorstyle"
      ref="messageInput"
    />
    <div>{{ message.length }}</div>

    <button @click="clearMessage">Clear</button>

    <h5 class="border-grey" v-if="message.length">{{ message }}</h5>
    <h6 v-else>no message entered</h6>

    <hr />
    <p>Upper case message : {{ messageUpperCase }}</p>
    <p>Lower case message : {{ message | messageLowercase }}</p>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/CompositionComponent.vue';
import Task from 'components/TaskComponent.vue';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'PageIndex',
  components: { ExampleComponent, Task },
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
  },
  setup() {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1'
      },
      {
        id: 2,
        content: 'ct2'
      },
      {
        id: 3,
        content: 'ct3'
      },
      {
        id: 4,
        content: 'ct4'
      },
      {
        id: 5,
        content: 'ct5'
      }
    ]);
    const meta = ref<Meta>({
      totalCount: 1200
    });
    return { todos, meta };
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
