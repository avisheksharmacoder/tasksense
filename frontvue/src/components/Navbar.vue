<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import UserDialog from './UserDialog.vue';

const mobileMenuOpen = ref(false);
const isDarkMode = ref(false);
const userDialogRef = ref(null);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('p-dark');
};

const openUserDialog = () => {
  if (userDialogRef.value) {
    userDialogRef.value.open();
  }
  mobileMenuOpen.value = false;
};
</script>

<template>
  <nav class="navbar">
    <!-- Left Section: Logo as Home Link -->
    <div class="navbar-left">
      <router-link to="/" class="logo-container">
        <span class="logo-text">TaskSense</span>
      </router-link>
    </div>

    <!-- Right Section: Dark Mode, Config & Profile (Desktop) -->
    <div class="navbar-right desktop-only">
      <Button :icon="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'" severity="primary" variant="text" rounded :aria-label="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'" @click="toggleDarkMode" class="icon-btn" />
      <Button icon="pi pi-cog" severity="primary" variant="text" rounded aria-label="Configuration" class="icon-btn" />
      <Button icon="pi pi-user" severity="primary" variant="text" rounded aria-label="User Profile" @click="openUserDialog" class="icon-btn" />
    </div>

    <!-- Mobile Burger Button -->
    <div class="mobile-only">
      <Button icon="pi pi-bars" severity="primary" variant="text" rounded aria-label="Menu" @click="toggleMobileMenu" class="burger-btn" />
    </div>

    <!-- Mobile Drawer / Menu -->
    <Drawer v-model:visible="mobileMenuOpen" header="TaskSense" position="right" class="mobile-drawer">
      <div class="mobile-menu-items">
        <Button :label="isDarkMode ? 'Light Mode' : 'Dark Mode'" :icon="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'" severity="primary" variant="text" class="mobile-nav-btn" @click="toggleDarkMode" />
        <Button label="Config" icon="pi pi-cog" severity="primary" variant="text" class="mobile-nav-btn" @click="mobileMenuOpen = false" />
        <Button label="Profile" icon="pi pi-user" severity="primary" variant="text" class="mobile-nav-btn" @click="openUserDialog" />
      </div>
    </Drawer>

    <!-- User Profile Dialog -->
    <UserDialog ref="userDialogRef" />
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background: var(--p-surface-card, var(--p-surface-0, rgba(255, 255, 255, 0.8)));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--p-content-border-color, var(--p-surface-200, #e2e8f0));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: background-color 0.3s, border-color 0.3s;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.logo-container:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}

.logo-container:active {
  transform: scale(0.98);
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--p-primary-color, #10b981), var(--p-primary-600, #059669));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
  user-select: none;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon-btn {
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.icon-btn:hover {
  transform: rotate(15deg) scale(1.05);
}

.burger-btn {
  transition: transform 0.2s ease;
}

.burger-btn:active {
  transform: scale(0.95);
}

.mobile-only {
  display: none;
}

.mobile-menu-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
}

.mobile-nav-btn {
  width: 100%;
  justify-content: flex-start;
  font-weight: 600;
  padding: 0.75rem 1rem;
}

/* Responsive Media Queries */
@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }
  .mobile-only {
    display: block;
  }
  .navbar {
    padding: 0.75rem 1rem;
  }
}
</style>

<style>
/* Explicit unscoped dark mode override to guarantee navbar styling changes when html has .p-dark */
html.p-dark .navbar {
  background: var(--p-surface-900, rgba(15, 23, 42, 0.8)) !important;
  border-bottom: 1px solid var(--p-surface-800, #1e293b) !important;
}
</style>
