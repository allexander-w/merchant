<template>
    <div class="signin">
        <img src="~/assets/img/merchantlogo.svg" alt="" class="signin-logo">

        <h3 class="signin-merchant-title">Вход в систему</h3>
        <div class="signin-input">
            <GeneralInput :numberKey='5' :func='false' :vModel='email' @vModel='model => email = model' :placeholder='"E-mail"' />
        </div>
        <!--<p class="signin-warning">Email некорректный</p>-->
        <div class="signin-input">
            <GeneralInput :numberKey='6' :inputType='"password"' :func='false' :vModel='password' @vModel='model => password = model' :placeholder='"Пароль"' />
        </div>
       <!-- <p class="signin-warning">Пароль некорректный</p> -->

        <div class="signin-settings">
            <Checkbox />
            <div class="signin-link">
                <nuxt-link to='#' >Забыли пароль?</nuxt-link>
            </div>
        </div>

        <button @click='signin' class="yellow-standart-button standart-btn signin-btn">Войти</button>
    </div>
</template>

<script>
import GeneralInput from '@/components/merchant/GeneralInput'
import Checkbox from '@/components/merchant/Checkbox'

export default {
    middleware: 'trueauth',
    layout: 'auth',
    components: {GeneralInput, Checkbox},
    data: () => ({
        email: '',
        password: ''
    }),
    methods: {
        async signin() {
            const formData = {
                email: this.email,
                password: this.password
            }
            const status = await this.$store.dispatch('auth/SIGN_IN', formData)
            status === 'success' ? this.$router.push('/merchant') : console.log('Ошибка');
        }
    }
}
</script>

<style lang="scss">
.signin {
    &-warning {
        font-size: 13px;
        margin-top: -32px;
    }
    &-btn {
        margin-top: 32px;
        width: 360px;
    }
    &-input {
        width: 360px;
    }
    &-logo {
        margin-bottom: 96px;
    }
    &-merchant-title {
        font-size: 24px;
        color: #333333;
        font-weight: normal;
    }
    &-desc {
        font-size: 16px;
        color: #333333;
    }
    &-settings {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 360px;
    }

}

@media screen and (max-width: 1366px) {
.signin {
    
    &-logo {
        margin-bottom: 48px;
    }
    
}
}
</style>