<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Panacea
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8"> </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          :title="link.title"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue';

const linksData = [
  {
    title: 'NOC',
    caption: 'network operations',
    icon: 'rss_feed',
    link: '/noc'
  },
  {
    title: 'Customer Support',
    caption: 'customer support',
    icon: 'favorite',
    link: '/cs'
  },
  {
    title: 'Network Planning',
    caption: 'Network planning and Strategy',
    icon: 'record_voice_over',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'OSS',
    caption: 'Operation Support System',
    icon: 'public',
    link: '/#/oss'
  },
  {
    title: 'Security',
    caption: 'security',
    icon: 'security',
    link: '/#/oss'
  }
];

import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'MainLayout',
  components: { EssentialLink },
  setup() {
    const leftDrawerOpen = ref(false);
    const essentialLinks = ref(linksData);
    return { leftDrawerOpen, essentialLinks };
  }
});
</script>
