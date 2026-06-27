<script setup>
import { ref, computed } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  task: {
    type: Object,
    default: () => ({
      id: 1,
      title: 'Initialize Authentication Flow',
      description: 'Set up OAuth2 login integration and verify user session tokens across all microservices.',
      status: 'open',
      agentComments: 3,
      userComments: 5,
      assignedTo: 'Alex Rivera (Lead Arch)',
      agentName: 'Avishek Sharma (AI Agent)'
    })
  }
});

const emit = defineEmits(['update:visible']);

// Computed properties with robust fallbacks
const taskData = computed(() => {
  const t = props.task || {};
  return {
    id: t.id || 1,
    title: t.title || 'Untitled Task',
    description: t.description || 'No description provided for this task.',
    status: (t.status || 'open').toLowerCase(),
    assignedTo: t.assignedTo || 'Alex Rivera (Lead Arch)',
    agentName: t.agentName || 'Avishek Sharma (AI Agent)'
  };
});

// Dummy comments simulating the conversation between AI Agent and User
const comments = ref([
  {
    id: 1,
    sender: 'agent',
    author: 'Avishek Sharma (AI Agent)',
    avatar: 'pi pi-desktop',
    text: 'I have analyzed the task requirements and initiated the automated pre-checks for OAuth2 endpoint compatibility.',
    time: '10:25 AM'
  },
  {
    id: 2,
    sender: 'user',
    author: 'Alex Rivera (Lead Arch)',
    avatar: 'pi pi-user',
    text: 'Great. Please ensure the token verification includes the new JWT validation middleware.',
    time: '10:28 AM'
  },
  {
    id: 3,
    sender: 'agent',
    author: 'Avishek Sharma (AI Agent)',
    avatar: 'pi pi-desktop',
    text: 'Confirmed. The JWT validation middleware is successfully integrated. Standby for final staging deployment logs.',
    time: '10:32 AM'
  }
]);

const newCommentText = ref('');

const addComment = () => {
  if (!newCommentText.value.trim()) return;
  comments.value.push({
    id: Date.now(),
    sender: 'user',
    author: taskData.value.assignedTo,
    avatar: 'pi pi-user',
    text: newCommentText.value.trim(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
  newCommentText.value = '';
};

// Handle dialog visibility update
const onUpdateVisible = (val) => {
  emit('update:visible', val);
};
</script>

<template>
  <Dialog
    :visible="visible"
    @update:visible="onUpdateVisible"
    modal
    header="Task Details & Activity"
    :style="{ width: '55rem', maxWidth: '95vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    class="task-detail-dialog"
    dismissableMask
  >
    <div class="task-detail-container">
      <!-- Top Card: Task Detail Overview -->
      <div class="detail-card">
        <div class="card-header">
          <span class="task-id">TASK-{{ taskData.id }}</span>
          <span :class="['status-pill', `status-${taskData.status}`]">{{ taskData.status }}</span>
        </div>

        <div class="card-body">
          <h2 class="task-title">{{ taskData.title }}</h2>
          <p class="task-desc">{{ taskData.description }}</p>
        </div>

        <hr class="card-divider" />

        <div class="card-footer">
          <div class="meta-item">
            <div class="meta-avatar user-avatar">
              <i class="pi pi-user"></i>
            </div>
            <div class="meta-info">
              <span class="meta-label">Assigned To</span>
              <span class="meta-value">{{ taskData.assignedTo }}</span>
            </div>
          </div>

          <div class="meta-item">
            <div class="meta-avatar agent-avatar">
              <i class="pi pi-desktop"></i>
            </div>
            <div class="meta-info">
              <span class="meta-label">AI Agent</span>
              <span class="meta-value">{{ taskData.agentName }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section: Comments / Conversation -->
      <div class="comments-section">
        <div class="comments-header">
          <div class="comments-title-wrapper">
            <i class="pi pi-comments comments-icon"></i>
            <h3 class="comments-title">Conversation History</h3>
          </div>
          <span class="comments-count">{{ comments.length }} messages</span>
        </div>

        <div class="comments-list">
          <div
            v-for="comment in comments"
            :key="comment.id"
            :class="['comment-item', `comment-${comment.sender}`]"
          >
            <div class="comment-avatar">
              <i :class="comment.avatar"></i>
            </div>
            <div class="comment-content">
              <div class="comment-meta">
                <span class="comment-author">{{ comment.author }}</span>
                <span class="comment-time">{{ comment.time }}</span>
              </div>
              <div class="comment-bubble">
                {{ comment.text }}
              </div>
            </div>
          </div>
        </div>

        <!-- Add Comment Input Bar -->
        <div class="add-comment-bar">
          <div class="input-wrapper">
            <InputText
              v-model="newCommentText"
              placeholder="Write a reply..."
              @keyup.enter="addComment"
              class="comment-input"
            />
            <Button
              icon="pi pi-send"
              severity="primary"
              @click="addComment"
              class="send-btn"
              aria-label="Send Comment"
            />
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.task-detail-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0.5rem 0 1rem 0;
}

/* Detail Card Styling (Rich aesthetics & glassmorphism feel) */
.detail-card {
  background: var(--p-surface-card, var(--p-surface-0, #ffffff));
  border: 1px solid var(--p-content-border-color, var(--p-surface-200, #e2e8f0));
  border-radius: 1.25rem;
  padding: 1.75rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.detail-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.08);
}

html.p-dark .detail-card {
  background: var(--p-surface-900, #0f172a);
  border-color: var(--p-surface-800, #1e293b);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

/* Card Header */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.task-id {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--p-text-muted-color, var(--p-surface-500, #64748b));
  background: var(--p-surface-100, #f1f5f9);
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  letter-spacing: 0.5px;
}

html.p-dark .task-id {
  background: var(--p-surface-800, #1e293b);
  color: var(--p-surface-400, #94a3b8);
}

.status-pill {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.25rem 0.85rem;
  border-radius: 1rem;
  letter-spacing: 0.5px;
}

.status-open { background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; }
.status-hold { background: #fffbeb; color: #d97706; border: 1px solid #fde68a; }
.status-resolved { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }

html.p-dark .status-open { background: rgba(37, 99, 235, 0.15); color: #60a5fa; border-color: rgba(59, 130, 246, 0.3); }
html.p-dark .status-hold { background: rgba(217, 119, 6, 0.15); color: #fbbf24; border-color: rgba(245, 158, 11, 0.3); }
html.p-dark .status-resolved { background: rgba(16, 185, 129, 0.15); color: #34d399; border-color: rgba(16, 185, 129, 0.3); }

/* Card Body */
.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--p-text-color, #1e293b);
  margin: 0;
  letter-spacing: -0.4px;
  line-height: 1.3;
}

html.p-dark .task-title {
  color: var(--p-surface-0, #f8fafc);
}

.task-desc {
  font-size: 1.05rem;
  color: var(--p-text-muted-color, var(--p-surface-600, #475569));
  margin: 0;
  line-height: 1.6;
}

html.p-dark .task-desc {
  color: var(--p-surface-300, #cbd5e1);
}

/* Divider */
.card-divider {
  border: 0;
  height: 1px;
  background: var(--p-content-border-color, var(--p-surface-200, #e2e8f0));
  margin: 1.5rem 0;
}

html.p-dark .card-divider {
  background: var(--p-surface-800, #1e293b);
}

/* Card Footer (Metadata) */
.card-footer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--p-surface-50, #f8fafc);
  padding: 0.75rem 1rem;
  border-radius: 0.85rem;
  border: 1px solid var(--p-surface-100, #f1f5f9);
  transition: background-color 0.2s ease;
}

.meta-item:hover {
  background: var(--p-surface-100, #f1f5f9);
}

html.p-dark .meta-item {
  background: var(--p-surface-800, #1e293b);
  border-color: var(--p-surface-700, #334155);
}

html.p-dark .meta-item:hover {
  background: var(--p-surface-700, #334155);
}

.meta-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.user-avatar {
  background: #f3e8ff;
  color: #8b5cf6;
}

html.p-dark .user-avatar {
  background: rgba(139, 92, 246, 0.2);
  color: #c4b5fd;
}

.agent-avatar {
  background: var(--p-primary-50, #ecfdf5);
  color: var(--p-primary-700, #047857);
}

html.p-dark .agent-avatar {
  background: rgba(16, 185, 129, 0.2);
  color: var(--p-primary-400, #34d399);
}

.meta-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  overflow: hidden;
}

.meta-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--p-text-muted-color, var(--p-surface-500, #64748b));
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.meta-value {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--p-text-color, #1e293b);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

html.p-dark .meta-value {
  color: var(--p-surface-0, #f8fafc);
}

/* Comments Section */
.comments-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comments-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--p-content-border-color, var(--p-surface-200, #e2e8f0));
  padding-bottom: 0.75rem;
}

html.p-dark .comments-header {
  border-color: var(--p-surface-800, #1e293b);
}

.comments-title-wrapper {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.comments-icon {
  font-size: 1.25rem;
  color: var(--p-primary-color, #10b981);
}

.comments-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--p-text-color, #1e293b);
  margin: 0;
}

html.p-dark .comments-title {
  color: var(--p-surface-0, #f8fafc);
}

.comments-count {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--p-text-muted-color, var(--p-surface-500, #64748b));
  background: var(--p-surface-100, #f1f5f9);
  padding: 0.2rem 0.6rem;
  border-radius: 1rem;
}

html.p-dark .comments-count {
  background: var(--p-surface-800, #1e293b);
  color: var(--p-surface-400, #94a3b8);
}

/* Comments List */
.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.comment-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.comment-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.comment-agent .comment-avatar {
  background: var(--p-primary-500, #10b981);
  color: #ffffff;
}

.comment-user .comment-avatar {
  background: #8b5cf6;
  color: #ffffff;
}

.comment-content {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
}

.comment-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
}

.comment-author {
  font-weight: 700;
  color: var(--p-text-color, #334155);
}

html.p-dark .comment-author {
  color: var(--p-surface-200, #e2e8f0);
}

.comment-time {
  color: var(--p-text-muted-color, var(--p-surface-400, #94a3b8));
  font-size: 0.8.rem;
}

.comment-bubble {
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  font-size: 0.98rem;
  line-height: 1.5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  width: fit-content;
  max-width: 90%;
}

.comment-agent .comment-bubble {
  background: var(--p-primary-50, #ecfdf5);
  color: var(--p-primary-900, #064e3b);
  border: 1px solid var(--p-primary-200, #a7f3d0);
  border-top-left-radius: 0.25rem;
}

html.p-dark .comment-agent .comment-bubble {
  background: rgba(16, 185, 129, 0.15);
  color: var(--p-primary-100, #d1fae5);
  border-color: rgba(16, 185, 129, 0.3);
}

.comment-user .comment-bubble {
  background: var(--p-surface-100, #f1f5f9);
  color: var(--p-text-color, #1e293b);
  border: 1px solid var(--p-surface-200, #e2e8f0);
  border-top-left-radius: 0.25rem;
}

html.p-dark .comment-user .comment-bubble {
  background: var(--p-surface-800, #1e293b);
  color: var(--p-surface-100, #f1f5f9);
  border-color: var(--p-surface-700, #334155);
}

/* Add Comment Bar */
.add-comment-bar {
  margin-top: 0.5rem;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--p-surface-50, #f8fafc);
  border: 1px solid var(--p-content-border-color, var(--p-surface-200, #e2e8f0));
  border-radius: 1rem;
  padding: 0.4rem 0.4rem 0.4rem 1.25rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input-wrapper:focus-within {
  border-color: var(--p-primary-color, #10b981);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
}

html.p-dark .input-wrapper {
  background: var(--p-surface-900, #0f172a);
  border-color: var(--p-surface-700, #334155);
}

.comment-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: var(--p-text-color, #1e293b);
  padding: 0.5rem 0;
  box-shadow: none;
}

.comment-input:focus {
  outline: none;
  box-shadow: none;
}

html.p-dark .comment-input {
  color: var(--p-surface-0, #f8fafc);
}

.send-btn {
  border-radius: 0.75rem;
  padding: 0.75rem 1.25rem;
}
</style>
