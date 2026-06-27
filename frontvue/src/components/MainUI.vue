<script setup>
import { ref } from 'vue';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import LeftPanel from './LeftPanel.vue';
import ChatPanel from './ChatPanel.vue';

// Track the currently selected task to pass to ChatPanel
const currentActiveTask = ref({
  id: 1,
  title: 'Initialize Authentication Flow',
  description: 'Set up OAuth2 login integration and verify user session tokens across all microservices.',
  status: 'open',
  agentComments: 3,
  userComments: 5
});

const onSelectTask = (task) => {
  currentActiveTask.value = task;
};
</script>

<template>
  <main class="main-ui-container">
    <Splitter class="panels-splitter" layout="horizontal">
      <!-- Left Panel (Task List & Filters) -->
      <SplitterPanel :size="32" :minSize="22" class="sidebar-panel">
        <LeftPanel @select-task="onSelectTask" />
      </SplitterPanel>

      <!-- Right Panel (Chat & Task Details) -->
      <SplitterPanel :size="68" :minSize="40" class="chat-panel-wrapper">
        <ChatPanel :activeTask="currentActiveTask" />
      </SplitterPanel>
    </Splitter>
  </main>
</template>

<style scoped>
.main-ui-container {
  display: flex;
  width: 100%;
  height: calc(100vh - 65px); /* Subtract Navbar height */
  background: var(--p-surface-ground, var(--p-surface-100, #f1f5f9));
  overflow: hidden;
}

html.p-dark .main-ui-container {
  background: var(--p-surface-950, #020617);
}

/* Splitter Container */
.panels-splitter {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
}

.sidebar-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  z-index: 10;
}

.chat-panel-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
</style>

<style>
/* Custom PrimeVue Splitter Gutter Styling for Rich Aesthetics */
.panels-splitter .p-splitter-gutter {
  background: var(--p-content-border-color, var(--p-surface-200, #e2e8f0)) !important;
  width: 6px !important;
  transition: background-color 0.2s ease;
}

.panels-splitter .p-splitter-gutter:hover {
  background: var(--p-primary-300, #6ee7b7) !important;
}

html.p-dark .panels-splitter .p-splitter-gutter {
  background: var(--p-surface-800, #1e293b) !important;
}

html.p-dark .panels-splitter .p-splitter-gutter:hover {
  background: var(--p-primary-600, #059669) !important;
}
</style>