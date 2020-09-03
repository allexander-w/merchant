<template>
    <div class="main-checkbox">
        <div class="main-checkbox-self" @click='checked = !checked'><i class="fal fa-check main-checkbox-icon" v-if='checked'></i></div>
        <p class="main-checkbox-desc">Запомнить меня</p>
    </div>
</template>

<script>
export default {
    data: () => ({
        checked: false
    })
}
</script>

<style lang="scss">
.main-checkbox {
    display: flex;
    &-self {
        border: 1px solid rgba(#0E6CDD, .2);
        border-radius: 5px;
        height: 32px;
        width: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 16px;
    }
    &-icon {
        color: #0E6CDD;
    }
    &-desc {
        color: #333333;
    }
}
</style>