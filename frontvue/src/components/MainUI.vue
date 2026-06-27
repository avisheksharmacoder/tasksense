<script setup>
import { ref } from 'vue';
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
    <div class="panels-wrapper">
      <!-- Left Panel (Task List & Filters) -->
      <div class="sidebar-column">
        <LeftPanel @select-task="onSelectTask" />
      </div>

      <!-- Right Panel (Chat & Task Details) -->
      <div class="chat-column">
        <ChatPanel :activeTask="currentActiveTask" />
      </div>
    </div>
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

.panels-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}

.sidebar-column {
  width: 420px;
  min-width: 360px;
  height: 100%;
  flex-shrink: 0;
  z-index: 10;
  box-shadow: 1px 0 12px rgba(0, 0, 0, 0.03);
}

.chat-column {
  flex: 1;
  height: 100%;
  min-width: 0; /* Prevents flex item from overflowing */
  display: flex;
  flex-direction: column;
}

/* Responsive Layout Adjustments */
@media (max-width: 991px) {
  .sidebar-column {
    width: 350px;
  }
}

@media (max-width: 768px) {
  .panels-wrapper {
    flex-direction: column;
  }
  .sidebar-column {
    width: 100%;
    height: 45%;
    border-right: none;
    border-bottom: 1px solid var(--p-content-border-color, var(--p-surface-200, #e2e8f0));
  }
  .chat-column {
    height: 55%;
  }
}
</style>