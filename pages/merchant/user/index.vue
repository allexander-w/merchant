<template>
    <div class="merchant-user">
        USER SETTINGS
    </div>
</template>

<script>
export default {
    layout: 'main',
    middleware: ['auth', 'merchant']
}
</script>