<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Task from './Task.vue';

const emit = defineEmits(['select-task']);

// Mock initial tasks list with rich variety of statuses and comment counts
const tasks = ref([
  {
    id: 1,
    title: 'Initialize Authentication Flow',
    description: 'Set up OAuth2 login integration and verify user session tokens across all microservices.',
    status: 'open',
    agentComments: 3,
    userComments: 5
  },
  {
    id: 2,
    title: 'Database Sharding & Migration',
    description: 'Partition user records across regional clusters to optimize latency and comply with data sovereignty regulations.',
    status: 'hold',
    agentComments: 4,
    userComments: 1
  },
  {
    id: 3,
    title: 'Security Vulnerability Patch',
    description: 'Update Log4j and OpenSSL dependencies across all active docker containers in staging and production environments.',
    status: 'resolved',
    agentComments: 7,
    userComments: 8
  },
  {
    id: 4,
    title: 'Payment Gateway Integration',
    description: 'Implement Stripe webhook listeners to handle recurring subscription successes and payment failure retries.',
    status: 'open',
    agentComments: 2,
    userComments: 3
  },
  {
    id: 5,
    title: 'GraphQL API Caching',
    description: 'Add Redis caching layer for heavy GraphQL queries on the dashboard analytics page to reduce database load.',
    status: 'hold',
    agentComments: 5,
    userComments: 2
  }
]);

const searchQuery = ref('');
const currentFilter = ref('all'); // 'all', 'open', 'hold', 'resolved'
const selectedTaskId = ref(1);

const panelRef = ref(null);
const isWidePanel = ref(false);
let resizeObserver = null;

const checkPanelWidth = (panelWidth) => {
  // Calculate if Left Panel is 50% or more of the total window width
  const totalWidth = window.innerWidth;
  isWidePanel.value = panelWidth >= (totalWidth * 0.5);
};

onMounted(() => {
  if (panelRef.value) {
    resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        checkPanelWidth(entry.contentRect.width);
      }
    });
    resizeObserver.observe(panelRef.value);
  }
});

onBeforeUnmount(() => {
  if (resizeObserver && panelRef.value) {
    resizeObserver.unobserve(panelRef.value);
    resizeObserver.disconnect();
  }
});

const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesFilter = currentFilter.value === 'all' || task.status === currentFilter.value;
    return matchesSearch && matchesFilter;
  });
});

const handleSelectTask = (task) => {
  selectedTaskId.value = task.id;
  emit('select-task', task);
};
</script>

<template>
  <aside ref="panelRef" :class="['left-panel', { 'wide-panel': isWidePanel }]">
    <!-- Panel Header: Title and New Task Button -->
    <div class="panel-header">
      <div class="title-container">
        <h2 class="panel-title">Tasks</h2>
        <span class="task-count">{{ filteredTasks.length }}</span>
      </div>
      <Button icon="pi pi-plus" label="New Task" severity="primary" size="small" class="new-task-btn" />
    </div>

    <!-- Search Bar -->
    <div class="search-container">
      <span class="p-input-icon-left search-wrapper">
        <i class="pi pi-search search-icon" />
        <InputText v-model="searchQuery" placeholder="Search tasks..." class="search-input" />
      </span>
    </div>

    <!-- Status Filter Tabs -->
    <div class="filter-tabs">
      <button :class="['filter-tab', { active: currentFilter === 'all' }]" @click="currentFilter = 'all'">
        All
      </button>
      <button :class="['filter-tab', { active: currentFilter === 'open' }]" @click="currentFilter = 'open'">
        Open
      </button>
      <button :class="['filter-tab', { active: currentFilter === 'hold' }]" @click="currentFilter = 'hold'">
        Hold
      </button>
      <button :class="['filter-tab', { active: currentFilter === 'resolved' }]" @click="currentFilter = 'resolved'">
        Resolved
      </button>
    </div>

    <!-- Task List -->
    <div class="task-list-container">
      <div v-if="filteredTasks.length === 0" class="empty-state">
        <i class="pi pi-inbox empty-icon"></i>
        <p class="empty-text">No tasks found matching your criteria.</p>
      </div>
      <div v-else :class="['task-list', { 'task-grid-2': isWidePanel }]">
        <div
          v-for="task in filteredTasks"
          :key="task.id"
          :class="['task-wrapper', { 'selected-task': selectedTaskId === task.id }]"
          @click="handleSelectTask(task)"
        >
          <Task :task="task" />
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.left-panel {
  box-sizing: border-box;
  container-type: inline-size;
  container-name: leftpanel;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-width: 0; /* Critical for flex child overflow prevention */
  background: var(--p-surface-card, var(--p-surface-0, #ffffff));
  border-right: 1px solid var(--p-content-border-color, var(--p-surface-200, #e2e8f0));
  overflow: hidden;
}

html.p-dark .left-panel {
  background: var(--p-surface-900, #0f172a);
  border-color: var(--p-surface-800, #1e293b);
}

/* Header */
.panel-header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--p-content-border-color, var(--p-surface-200, #e2e8f0));
  width: 100%;
  min-width: 0;
}

html.p-dark .panel-header {
  border-color: var(--p-surface-800, #1e293b);
}

.title-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}

.panel-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--p-text-color, #1e293b);
  margin: 0;
  letter-spacing: -0.4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

html.p-dark .panel-title {
  color: var(--p-surface-0, #f8fafc);
}

.task-count {
  font-size: 0.85rem;
  font-weight: 700;
  background: var(--p-primary-50, #ecfdf5);
  color: var(--p-primary-700, #047857);
  padding: 0.2rem 0.6rem;
  border-radius: 1rem;
  border: 1px solid var(--p-primary-200, #a7f3d0);
  flex-shrink: 0;
}

html.p-dark .task-count {
  background: rgba(16, 185, 129, 0.2);
  color: var(--p-primary-400, #34d399);
  border-color: rgba(16, 185, 129, 0.3);
}

.new-task-btn {
  font-weight: 600;
  border-radius: 0.5rem;
  flex-shrink: 0;
}

/* Search Bar */
.search-container {
  box-sizing: border-box;
  padding: 1rem 1.25rem 0.5rem 1.25rem;
  width: 100%;
  min-width: 0;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: var(--p-text-muted-color, var(--p-surface-400, #94a3b8));
}

.search-input {
  width: 100%;
  padding-left: 2.5rem;
  border-radius: 0.75rem;
  font-size: 0.95rem;
  border: 1px solid var(--p-content-border-color, var(--p-surface-200, #e2e8f0));
  background: var(--p-surface-100, #f8fafc);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-input:focus {
  border-color: var(--p-primary-color, #10b981);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
  outline: none;
}

html.p-dark .search-input {
  background: var(--p-surface-800, #1e293b);
  border-color: var(--p-surface-700, #334155);
  color: var(--p-surface-0, #f8fafc);
}

/* Filter Tabs */
.filter-tabs {
  box-sizing: border-box;
  display: flex;
  gap: 0.25rem;
  padding: 0.5rem 1.25rem 1rem 1.25rem;
  border-bottom: 1px solid var(--p-content-border-color, var(--p-surface-200, #e2e8f0));
  width: 100%;
  min-width: 0;
  overflow-x: auto;
}

html.p-dark .filter-tabs {
  border-color: var(--p-surface-800, #1e293b);
}

.filter-tab {
  flex: 1;
  padding: 0.4rem 0.5rem;
  font-size: 0.82rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  background: transparent;
  color: var(--p-text-muted-color, var(--p-surface-500, #64748b));
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  text-align: center;
  white-space: nowrap;
  min-width: 0;
}

.filter-tab:hover {
  background: var(--p-surface-100, #f1f5f9);
  color: var(--p-text-color, #1e293b);
}

html.p-dark .filter-tab:hover {
  background: var(--p-surface-800, #1e293b);
  color: var(--p-surface-200, #e2e8f0);
}

.filter-tab.active {
  background: var(--p-primary-color, #10b981);
  color: #ffffff;
  font-weight: 700;
}

/* Task List Container & Dynamic Grid */
.task-list-container {
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden; /* Prevent any accidental horizontal scrollbar */
  padding: 1.25rem;
  background: var(--p-surface-50, #f8fafc);
  width: 100%;
  min-width: 0;
}

html.p-dark .task-list-container {
  background: var(--p-surface-900, #0f172a);
}

.task-list {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, 1fr); /* minmax(0, 1fr) ensures grid items shrink perfectly */
  gap: 1.25rem;
  width: 100%;
  min-width: 0;
  align-items: start;
}

/* Triggered via Vue ResizeObserver when panel is >= 50% of window width */
.task-list.task-grid-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.task-wrapper {
  box-sizing: border-box;
  transition: transform 0.2s ease;
  border-radius: 1rem;
  padding: 2px; /* For selected state border highlight */
  height: 100%;
  width: 100%;
  min-width: 0;
}

.task-wrapper :deep(.task-card) {
  height: 100%; /* Ensure cards stretch equally in 2-column grid */
}

.task-wrapper.selected-task {
  background: linear-gradient(135deg, var(--p-primary-color, #10b981), var(--p-primary-600, #059669));
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.25);
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: var(--p-text-muted-color, var(--p-surface-400, #94a3b8));
  padding: 2rem;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.7;
}

.empty-text {
  font-size: 1rem;
  margin: 0;
}
</style>
