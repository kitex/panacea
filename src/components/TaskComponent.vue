<template>
  <li>
    <div>{{ index }}.{{ task.name }}</div>
    <small>{{ task.dueDate }} @ {{ task.dueTime }}</small>
    <button @click="deleteTask(index)">x-{{ index }}</button>
  </li>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Task',
  props: ['task', 'index', 'deleteTask']
});
</script>
