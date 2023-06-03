<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Search from './components/Search.vue';
</script>

<template>
  <main class="main flex-wrap">

    <Search/>


  </main>


</template>

<style scoped>
*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
.main{
  background: rgb(255,255,255);
/* background: linear-gradient( rgba(255,255,255,1) 0%, rgba(8,8,8,1) 100%); */
background: linear-gradient(to bottom, rgba(8,8,8,1) 0%, rgb(223, 217, 217) 100%);

min-height: 100vh;

 display: flex;
   align-items: center;
  justify-content: center;
}
</style>