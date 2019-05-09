<template>
  <div>
      <div>
          <salechart class="le"></salechart>
          <valuechart class="ri"></valuechart>
      </div>
      <solidchart></solidchart>
  </div>

</template>
<script>
  import salechart from '@/components/reportechart/salechart'
  import valuechart from '@/components/reportechart/valuechart'
  import solidchart from '@/components/reportechart/solidchart'
  export default {
    data() {
      return {
      }
    },
    components: {
      salechart,
      solidchart,
      valuechart,
    },
  }
</script>
<style>
  .le{
    float: left;
}
  .ri{
    float: right;
  }
</style>
