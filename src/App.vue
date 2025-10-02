<template>
  <div class="min-h-screen text-white flex flex-col relative">

    <div class="absolute inset-0 vaporwave-gradient z-0"></div>
    <div class="absolute inset-0 grid-bg opacity-20 z-0"></div>
    <div class="absolute inset-0 scan-line z-0"></div>

    <div class="relative z-10 flex flex-col flex-grow">

      <header>
        <Navbar />
      </header>

      <main class="flex-grow">
        <RouterView />
      </main>
      
      <Notification/>

      <Footer />

    </div>
  </div>
</template>


<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Notification from './components/Notification.vue';



  export default{
    name: 'App',
    components: {
      Navbar,
      Footer,
      Notification
    }
}
</script>
