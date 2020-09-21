<template>
  <div class="message-wrapper">
    <div class="message-body">
      <p>{{message}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.message-wrapper {
  position: fixed;
  top: 48px;
  right: 48px;
}
.message-body {
  display: flex;
  align-items: center;
  height: 48px;
  border-radius: 5px;
  background-color: #0E6CDD;
  p {
    
    padding: 0 20px;
    color: #fff;
  }
}
</style>