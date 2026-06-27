<script setup>
import { ref, computed } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

const props = defineProps({
  activeTask: {
    type: Object,
    default: () => ({
      id: 1,
      title: 'Initialize Authentication Flow',
      description: 'Set up OAuth2 login integration and verify user session tokens across all microservices.',
      status: 'open',
      agentComments: 3,
      userComments: 5
    })
  }
});

const newMessage = ref('');
const messages = ref([
  { id: 1, sender: 'agent', author: 'Avishek Sharma (Agent)', avatar: 'pi pi-desktop', text: 'Hey team, I started looking into the OAuth2 integration. We need to confirm the token expiration policy.', time: '10:25 AM' },
  { id: 2, sender: 'user', author: 'Client User', avatar: 'pi pi-user', text: 'Can we keep the refresh token valid for 30 days by default?', time: '10:28 AM' },
  { id: 3, sender: 'agent', author: 'Avishek Sharma (Agent)', avatar: 'pi pi-desktop', text: 'Yes, absolutely. I will configure the JWT rotation accordingly and update the staging environment today.', time: '10:32 AM' }
]);

const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  messages.value.push({
    id: Date.now(),
    sender: 'agent',
    author: 'Avishek Sharma (Agent)',
    avatar: 'pi pi-desktop',
    text: newMessage.value.trim(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
  newMessage.value = '';
};
</script>

<template>
  <section class="chat-panel">
    <div v-if="!activeTask" class="no-task-selected">
      <i class="pi pi-comments empty-chat-icon"></i>
      <h3>No Task Selected</h3>
      <p>Select a task from the left panel to view details and start chatting.</p>
    </div>
    
    <div v-else class="chat-container">
      <!-- Chat Header -->
      <div class="chat-header">
        <div class="header-info">
          <div class="task-meta">
            <span class="task-id">TASK-{{ activeTask.id }}</span>
            <span :class="['status-pill', `status-${activeTask.status.toLowerCase()}`]">{{ activeTask.status }}</span>
          </div>
          <h2 class="chat-title">{{ activeTask.title }}</h2>
          <p class="chat-desc">{{ activeTask.description }}</p>
        </div>
        <div class="header-actions">
          <Button icon="pi pi-paperclip" severity="secondary" variant="text" rounded aria-label="Attach File" class="action-btn" />
          <Button icon="pi pi-ellipsis-v" severity="secondary" variant="text" rounded aria-label="More Options" class="action-btn" />
        </div>
      </div>

      <!-- Messages Area -->
      <div class="messages-area">
        <div v-for="msg in messages" :key="msg.id" :class="['message-bubble', `msg-${msg.sender}`]">
          <div class="msg-avatar">
            <i :class="msg.avatar"></i>
          </div>
          <div class="msg-content">
            <div class="msg-meta">
              <span class="msg-author">{{ msg.author }}</span>
              <span class="msg-time">{{ msg.time }}</span>
            </div>
            <div class="msg-text">{{ msg.text }}</div>
          </div>
        </div>
      </div>

      <!-- Input Bar -->
      <div class="chat-input-bar">
        <div class="input-wrapper">
          <InputText v-model="newMessage" placeholder="Type your message..." @keyup.enter="sendMessage" class="message-input" />
          <Button icon="pi pi-send" severity="primary" @click="sendMessage" class="send-btn" aria-label="Send Message" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.chat-panel {
  flex: 1;
  height: 100%;
  background: var(--p-surface-50, #f8fafc);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

html.p-dark .chat-panel {
  background: var(--p-surface-900, #0f172a);
}

.no-task-selected {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--p-text-muted-color, var(--p-surface-500, #64748b));
  text-align: center;
  padding: 2rem;
}

.empty-chat-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.6;
  color: var(--p-primary-color, #10b981);
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

/* Chat Header */
.chat-header {
  background: var(--p-surface-card, var(--p-surface-0, #ffffff));
  padding: 1.25rem 2rem;
  border-bottom: 1px solid var(--p-content-border-color, var(--p-surface-200, #e2e8f0));
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

html.p-dark .chat-header {
  background: var(--p-surface-900, #0f172a);
  border-color: var(--p-surface-800, #1e293b);
}

.header-info {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.task-id {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--p-text-muted-color, var(--p-surface-500, #64748b));
  background: var(--p-surface-100, #f1f5f9);
  padding: 0.15rem 0.5rem;
  border-radius: 0.4rem;
}

html.p-dark .task-id {
  background: var(--p-surface-800, #1e293b);
  color: var(--p-surface-400, #94a3b8);
}

.status-pill {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.15rem 0.6rem;
  border-radius: 1rem;
}

.status-open { background: #eff6ff; color: #2563eb; }
.status-hold { background: #fffbeb; color: #d97706; }
.status-resolved { background: #ecfdf5; color: #059669; }

html.p-dark .status-open { background: rgba(37, 99, 235, 0.15); color: #60a5fa; }
html.p-dark .status-hold { background: rgba(217, 119, 6, 0.15); color: #fbbf24; }
html.p-dark .status-resolved { background: rgba(16, 185, 129, 0.15); color: #34d399; }

.chat-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--p-text-color, #1e293b);
  margin: 0;
  letter-spacing: -0.3px;
}

html.p-dark .chat-title {
  color: var(--p-surface-0, #f8fafc);
}

.chat-desc {
  font-size: 0.95rem;
  color: var(--p-text-muted-color, var(--p-surface-500, #64748b));
  margin: 0;
  line-height: 1.5;
}

html.p-dark .chat-desc {
  color: var(--p-surface-400, #94a3b8);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Messages Area */
.messages-area {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.message-bubble {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  max-width: 80%;
}

.msg-agent {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.msg-user {
  align-self: flex-start;
}

.msg-avatar {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.msg-agent .msg-avatar {
  background: var(--p-primary-500, #10b981);
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.25);
}

.msg-user .msg-avatar {
  background: #8b5cf6;
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(139, 92, 246, 0.25);
}

.msg-content {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.msg-agent .msg-content {
  align-items: flex-end;
}

.msg-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.82rem;
  color: var(--p-text-muted-color, var(--p-surface-500, #64748b));
}

.msg-author {
  font-weight: 700;
  color: var(--p-text-color, #334155);
}

html.p-dark .msg-author {
  color: var(--p-surface-300, #cbd5e1);
}

.msg-text {
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  font-size: 0.98rem;
  line-height: 1.5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.msg-agent .msg-text {
  background: var(--p-primary-color, #10b981);
  color: #ffffff;
  border-top-right-radius: 0.25rem;
}

.msg-user .msg-text {
  background: var(--p-surface-card, var(--p-surface-0, #ffffff));
  color: var(--p-text-color, #1e293b);
  border: 1px solid var(--p-content-border-color, var(--p-surface-200, #e2e8f0));
  border-top-left-radius: 0.25rem;
}

html.p-dark .msg-user .msg-text {
  background: var(--p-surface-800, #1e293b);
  border-color: var(--p-surface-700, #334155);
  color: var(--p-surface-0, #f8fafc);
}

/* Input Bar */
.chat-input-bar {
  background: var(--p-surface-card, var(--p-surface-0, #ffffff));
  padding: 1.25rem 2rem;
  border-top: 1px solid var(--p-content-border-color, var(--p-surface-200, #e2e8f0));
}

html.p-dark .chat-input-bar {
  background: var(--p-surface-900, #0f172a);
  border-color: var(--p-surface-800, #1e293b);
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--p-surface-100, #f8fafc);
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
  background: var(--p-surface-800, #1e293b);
  border-color: var(--p-surface-700, #334155);
}

.message-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: var(--p-text-color, #1e293b);
  padding: 0.5rem 0;
  box-shadow: none;
}

.message-input:focus {
  outline: none;
  box-shadow: none;
}

html.p-dark .message-input {
  color: var(--p-surface-0, #f8fafc);
}

.send-btn {
  border-radius: 0.75rem;
  padding: 0.75rem 1.25rem;
}
</style>
