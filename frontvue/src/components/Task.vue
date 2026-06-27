<script setup>
import { computed } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    default: () => ({
      title: 'Initialize Authentication Flow',
      description: 'Set up OAuth2 login integration and verify user session tokens across all microservices.',
      status: 'open', // 'open', 'hold', 'resolved'
      agentComments: 3,
      userComments: 5
    })
  }
});

// Normalized task properties with fallbacks
const title = computed(() => props.task?.title || 'Untitled Task');
const description = computed(() => props.task?.description || 'No description provided.');
const status = computed(() => (props.task?.status || 'open').toLowerCase());
const agentComments = computed(() => props.task?.agentComments || 0);
const userComments = computed(() => props.task?.userComments || 0);

// Status Badge Configuration Helper
const statusConfig = computed(() => {
  switch (status.value) {
    case 'resolved':
      return {
        label: 'Resolved',
        icon: 'pi pi-check-circle',
        badgeClass: 'status-resolved'
      };
    case 'hold':
      return {
        label: 'On Hold',
        icon: 'pi pi-clock',
        badgeClass: 'status-hold'
      };
    case 'open':
    default:
      return {
        label: 'Open',
        icon: 'pi pi-exclamation-circle',
        badgeClass: 'status-open'
      };
  }
});
</script>

<template>
  <div class="task-card">
    <!-- Top Section: Title and Status Badge -->
    <div class="task-header">
      <h3 class="task-title">{{ title }}</h3>
      <div :class="['status-badge', statusConfig.badgeClass]">
        <i :class="statusConfig.icon"></i>
        <span class="badge-text">{{ statusConfig.label }}</span>
      </div>
    </div>

    <!-- Middle Section: Description -->
    <div class="task-body">
      <p class="task-description">{{ description }}</p>
    </div>

    <hr class="task-divider" />

    <!-- Bottom Section: Comments Row (2 Columns) -->
    <div class="task-footer">
      <!-- Column 1: Agent Comments -->
      <div class="comment-col agent-col">
        <div class="col-label">
          <i class="pi pi-desktop agent-icon"></i>
          <span class="label-text">Agent Comments</span>
        </div>
        <span class="comment-count agent-count">{{ agentComments }}</span>
      </div>

      <!-- Column 2: User Comments -->
      <div class="comment-col user-col">
        <div class="col-label">
          <i class="pi pi-user user-icon"></i>
          <span class="label-text">User Comments</span>
        </div>
        <span class="comment-count user-count">{{ userComments }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  box-sizing: border-box;
  width: 100%;
  min-width: 0; /* Prevents flex/grid item from refusing to shrink */
  background: var(--p-surface-card, var(--p-surface-0, #ffffff));
  border: 1px solid var(--p-content-border-color, var(--p-surface-200, #e2e8f0));
  border-radius: 1rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.task-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  border-color: var(--p-primary-400, #34d399);
}

html.p-dark .task-card {
  background: var(--p-surface-800, #1e293b);
  border-color: var(--p-surface-700, #334155);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

html.p-dark .task-card:hover {
  border-color: var(--p-primary-500, #10b981);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);
}

/* Header Section */
.task-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  min-width: 0;
}

.task-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--p-text-color, #1e293b);
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.3px;
  flex: 1;
  min-width: 0;
  word-break: break-word;
}

html.p-dark .task-title {
  color: var(--p-surface-0, #f8fafc);
}

/* Status Badge Styling */
.status-badge {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.75rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
  border: 1px solid transparent;
}

/* Open Status (Vibrant Blue) */
.status-open {
  background-color: #eff6ff;
  color: #2563eb;
  border-color: #bfdbfe;
}
html.p-dark .status-open {
  background-color: rgba(37, 99, 235, 0.15);
  color: #60a5fa;
  border-color: rgba(59, 130, 246, 0.3);
}

/* Hold Status (Vibrant Orange) */
.status-hold {
  background-color: #fffbeb;
  color: #d97706;
  border-color: #fde68a;
}
html.p-dark .status-hold {
  background-color: rgba(217, 119, 6, 0.15);
  color: #fbbf24;
  border-color: rgba(245, 158, 11, 0.3);
}

/* Resolved Status (Vibrant Green) */
.status-resolved {
  background-color: #ecfdf5;
  color: #059669;
  border-color: #a7f3d0;
}
html.p-dark .status-resolved {
  background-color: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border-color: rgba(16, 185, 129, 0.3);
}

/* Body Section */
.task-body {
  width: 100%;
  min-width: 0;
}

.task-description {
  font-size: 0.92rem;
  color: var(--p-text-muted-color, var(--p-surface-500, #64748b));
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

html.p-dark .task-description {
  color: var(--p-surface-400, #94a3b8);
}

/* Divider */
.task-divider {
  border: 0;
  height: 1px;
  background: var(--p-content-border-color, var(--p-surface-200, #e2e8f0));
  margin: 0;
  width: 100%;
}

html.p-dark .task-divider {
  background: var(--p-surface-700, #334155);
}

/* Footer Section (2 Columns) */
.task-footer {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); /* minmax(0, 1fr) fixes the CSS grid overflow bug */
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  min-width: 0;
}

.comment-col {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.35rem;
  background: var(--p-surface-100, #f8fafc);
  padding: 0.5rem 0.65rem;
  border-radius: 0.6rem;
  border: 1px solid var(--p-surface-200, #e2e8f0);
  transition: background-color 0.2s ease, border-color 0.2s ease;
  min-width: 0;
  overflow: hidden;
}

.comment-col:hover {
  background: var(--p-surface-200, #f1f5f9);
}

html.p-dark .comment-col {
  background: var(--p-surface-900, #0f172a);
  border-color: var(--p-surface-800, #1e293b);
}

html.p-dark .comment-col:hover {
  background: var(--p-surface-800, #1e293b);
}

.col-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--p-text-muted-color, var(--p-surface-600, #475569));
  min-width: 0;
  overflow: hidden;
}

html.p-dark .col-label {
  color: var(--p-surface-400, #94a3b8);
}

.label-text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  min-width: 0;
}

.agent-icon {
  color: var(--p-primary-color, #10b981);
  font-size: 1rem;
  flex-shrink: 0;
}

.user-icon {
  color: #8b5cf6;
  font-size: 1rem;
  flex-shrink: 0;
}

.comment-count {
  font-size: 0.9rem;
  font-weight: 800;
  padding: 0.15rem 0.5rem;
  border-radius: 0.4rem;
  min-width: 1.5rem;
  text-align: center;
  flex-shrink: 0;
}

.agent-count {
  background: var(--p-primary-50, #ecfdf5);
  color: var(--p-primary-700, #047857);
}
html.p-dark .agent-count {
  background: rgba(16, 185, 129, 0.2);
  color: var(--p-primary-400, #34d399);
}

.user-count {
  background: #f3e8ff;
  color: #6b21a8;
}
html.p-dark .user-count {
  background: rgba(139, 92, 246, 0.2);
  color: #c4b5fd;
}

/* Responsive adjustments for extremely tight widths */
@container leftpanel (max-width: 320px) {
  .badge-text {
    display: none; /* Show only icon on extremely narrow panel */
  }
  .label-text {
    display: none; /* Show only icon and number on extremely narrow panel */
  }
}
</style>
