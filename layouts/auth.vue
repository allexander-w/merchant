<template>
    <div class="auth-layout">
        <div class="auth-layout-decoration">
        </div>
        <div class="auth-layout-form">
            <Nuxt />
        </div>
    </div>
</template>

<style lang="scss">
.auth-layout {
    display: grid;
    grid-template: minmax(100vh, auto) / 1fr 1fr;
    &-decoration {
        background-image: url('../assets/img/bgauth.png');
        background-repeat: no-repeat;
        background-size: cover;
    }
    &-form {
        background-color: #fff;
        padding: 48px 72px;            
    }
}

</style>