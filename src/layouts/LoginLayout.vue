<template>
  <q-layout view="lHh Lpr lFf">
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
    link: '/#/noc'
  },
  {
    title: 'Customer Support',
    caption: 'customer support',
    icon: 'favorite',
    link: '/#/Customersupport'
  },
  {
    title: 'Network Planning',
    caption: 'Network planning and Strategy',
    icon: 'record_voice_over',
    link: '/#/Networkplanning'
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
    link: '/#/security'
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
