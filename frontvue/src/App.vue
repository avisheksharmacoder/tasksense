<script setup>
import Navbar from './components/Navbar.vue';
import MainUI from './components/MainUI.vue';

</script>

<template>
<Navbar />
<MainUI />

</template>

<style>
:root {
  --font-family: 'Quicksand', sans-serif;
}

body {
  font-family: var(--font-family);
  background-color: var(--p-surface-50, #f8fafc);
  color: var(--p-surface-900, #0f172a);
  margin: 0;
  padding: 0;
  transition: background-color 0.3s, color 0.3s;
}

html.p-dark body {
  background-color: var(--p-surface-950, #020617);
  color: var(--p-surface-0, #ffffff);
}

* {
  font-family: var(--font-family);
}
</style>
