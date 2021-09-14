<template>
  <div>
    <app-header />
    <div class="main-content">
      <Nuxt />
    </div>
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '~/components/Header.vue'; 
import AppFooter from '~/components/Footer.vue'; 
export default {
  components: { AppHeader, AppFooter }

}
</script>

<style scoped>
.main-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>