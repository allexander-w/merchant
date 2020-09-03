<template>
    <div class="signup">
        <img src="~/assets/img/merchantlogo.svg" alt="" class="signup-logo">

        <h3 class="signup-merchant-title">Регистрация</h3>
        <p class="signup-merchant-desc">Заполните все поля для создания аккаунта.</p>
        <div class="signup-input">
            <GeneralInput :numberKey='5' :func='false' :vModel='name' @vModel='model => name = model' :placeholder='"Имя"' />
        </div>
        <div class="signup-input">
            <GeneralInput :numberKey='6' :func='false' :vModel='email' @vModel='model => email = model' :placeholder='"E-mail"' />
        </div>
        <div class="signup-input">
            <GeneralInput :numberKey='7' :func='false' :vModel='phoneNumber' @vModel='model => phoneNumber = model' :placeholder='"Мобильный телефон"' />
        </div>
        <div class="signup-input">
            <GeneralInput :numberKey='8' :func='false' :inputType='"password"' :vModel='password' @vModel='model => password = model' :placeholder='"Пароль"' />
        </div>

        <button @click='submitHandler' class="yellow-standart-button standart-btn signup-btn">Регистрация</button>
        <p class="signup-policy">Нажимая на кнопку, вы соглашаетесь с <nuxt-link to='#'>условиями Оферты и лицензионного договора</nuxt-link> и <nuxt-link to='#'>Политикой обработки персональных данных.</nuxt-link></p> 
    </div>
</template>

<script>
import GeneralInput from '@/components/merchant/GeneralInput'

export default {
    middleware: 'trueauth',
    layout: 'auth',
    components: {GeneralInput},
    data: () => ({
        name: '',
        email: '',
        phoneNumber: '',
        password: ''
    }),
    methods: {
        submitHandler() {
            const formData = {
                name: this.name,
                email: this.email,
                number: this.phoneNumber,
                password: this.password
            }

            console.log(formData);
        }
    }
}
</script>

<style lang="scss">
.signup {
    &-btn {
        width: 360px;
        margin-top: 10px;
    }
    &-input {
        width: 360px;
    }
    &-policy {
        font-size: 12px;
        line-height: 16px;
        color: #333333;
        max-width: 360px;
        margin-top: 24px;
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
}

@media screen and (max-width: 1366px) {
.signup {
   
    &-logo {
        margin-bottom: 48px;
    }
}
}
</style>