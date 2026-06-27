<script setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const visible = ref(false);

const open = () => {
  visible.value = true;
};

defineExpose({
  open
});
</script>

<template>
  <Dialog v-model:visible="visible" modal header="User Profile" :style="{ width: '28rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" class="user-dialog">
    <div class="profile-content">
      <!-- Avatar & Header Section -->
      <div class="profile-header">
        <div class="avatar-container">
          <i class="pi pi-user avatar-icon"></i>
        </div>
        <h2 class="user-name">Avishek Sharma</h2>
        <span class="user-role">Engineer</span>
      </div>

      <hr class="divider" />

      <!-- Stats / Tokens Section -->
      <div class="stats-card">
        <div class="stat-header">
          <i class="pi pi-bolt stat-icon"></i>
          <span class="stat-label">Total Tokens</span>
        </div>
        <div class="stat-value-container">
          <span class="stat-value">10,000,000</span>
          <span class="stat-badge">Active</span>
        </div>
        <div class="stat-progress">
          <div class="progress-bar"></div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="dialog-footer">
        <Button label="Close" icon="pi pi-times" severity="secondary" variant="text" @click="visible = false" class="close-btn" />
        <Button label="Manage Account" icon="pi pi-cog" severity="primary" @click="visible = false" class="manage-btn" />
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.profile-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0.5rem 0;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.avatar-container {
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--p-primary-400, #34d399), var(--p-primary-700, #047857));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
  margin-bottom: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.avatar-container:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
}

.avatar-icon {
  font-size: 2.5rem;
  color: #ffffff;
}

.user-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: var(--p-text-color, #1e293b);
  letter-spacing: -0.5px;
}

.user-role {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--p-primary-color, #10b981);
  background: var(--p-primary-50, #ecfdf5);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  margin-top: 0.4rem;
  border: 1px solid var(--p-primary-200, #a7f3d0);
}

html.p-dark .user-role {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.3);
}

.divider {
  border: 0;
  height: 1px;
  background: var(--p-content-border-color, var(--p-surface-200, #e2e8f0));
  margin: 0;
}

.stats-card {
  background: var(--p-surface-100, #f8fafc);
  border: 1px solid var(--p-content-border-color, var(--p-surface-200, #e2e8f0));
  border-radius: 1rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.stats-card:hover {
  transform: translateY(-2px);
  border-color: var(--p-primary-300, #6ee7b7);
}

html.p-dark .stats-card {
  background: var(--p-surface-800, #1e293b);
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-icon {
  color: var(--p-primary-color, #10b981);
  font-size: 1.2rem;
}

.stat-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--p-text-muted-color, var(--p-surface-500, #64748b));
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value-container {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--p-primary-color, #10b981), var(--p-primary-600, #059669));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}

.stat-badge {
  font-size: 0.75rem;
  font-weight: 700;
  color: #ffffff;
  background: var(--p-primary-color, #10b981);
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
}

.stat-progress {
  width: 100%;
  height: 6px;
  background: var(--p-surface-200, #e2e8f0);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.25rem;
}

html.p-dark .stat-progress {
  background: var(--p-surface-700, #334155);
}

.progress-bar {
  width: 85%;
  height: 100%;
  background: linear-gradient(90deg, var(--p-primary-400, #34d399), var(--p-primary-600, #059669));
  border-radius: 3px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.close-btn, .manage-btn {
  font-weight: 600;
  padding: 0.6rem 1.25rem;
  border-radius: 0.5rem;
}
</style>
