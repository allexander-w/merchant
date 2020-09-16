<template>
    <div class="signup">
        <img src="~/assets/img/merchantlogo.svg" alt="" class="signup-logo">

        <h3 class="signup-merchant-title">Регистрация</h3>
        <p class="signup-merchant-desc">Заполните все поля для создания аккаунта.</p>
        <div class="signup-input">
            <GeneralInput :valid='$v.name.$dirty && !$v.name.required' :numberKey='5' :func='false' :vModel='name' @vModel='model => name = model' :placeholder='"Имя"' />
                <p v-if='$v.name.$dirty && !$v.name.required' class="validate-warning">Поле не должно быть пустым</p>
        </div>
        <div class="signup-input">
            <GeneralInput :valid='($v.phoneNumber.$dirty && !$v.email.required) || ($v.phoneNumber.$dirty && !$v.email.email)' :numberKey='6' :func='false' :vModel='email' @vModel='model => email = model' :placeholder='"E-mail"' />
                <p v-if='$v.email.$dirty && !$v.email.required' class="validate-warning">Поле не должно быть пустым</p>
                <p v-if='$v.email.$dirty && !$v.email.email' class="validate-warning">Введите корректный email</p>  
        </div>
        <div class="signup-input">
            <GeneralInput :valid='($v.phoneNumber.$dirty && !$v.phoneNumber.required) || ($v.phoneNumber.$dirty && !$v.phoneNumber.numeric) || ($v.phoneNumber.$dirty && !$v.phoneNumber.maxLength) || ($v.phoneNumber.$dirty && !$v.phoneNumber.minLength)'
                :numberKey='7' :func='false' :vModel='phoneNumber' @vModel='model => phoneNumber = model' :placeholder='"Мобильный телефон"' />
            <p v-if='$v.phoneNumber.$dirty && !$v.phoneNumber.required' class="validate-warning">Поле не должно быть пустым</p>  
            <p v-if='$v.phoneNumber.$dirty && !$v.phoneNumber.numeric' class="validate-warning">Номер состоит из цифр!</p>
            <p v-if='($v.phoneNumber.$dirty && !$v.phoneNumber.maxLength) && !($v.phoneNumber.$dirty && !$v.phoneNumber.numeric)' class="validate-warning">Длина не должна превышать 11 цифр</p>  
            <p v-if='($v.phoneNumber.$dirty && !$v.phoneNumber.minLength) && !($v.phoneNumber.$dirty && !$v.phoneNumber.numeric)' class="validate-warning">Номер не состоит из 11 цифр!</p>  
        </div>
        <div class="signup-input">
            <GeneralInput :valid='($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)' :numberKey='8' :func='false' :inputType='"password"' :vModel='password' @vModel='model => password = model' :placeholder='"Пароль"' />
                 <p v-if='$v.password.$dirty && !$v.password.minLength' class="validate-warning">Минимум 6 символов!</p>
                 <p v-if='$v.password.$dirty && !$v.password.required' class="validate-warning">Поле не должно быть пустым</p>
       </div>

        <button @click='submitHandler' class="yellow-standart-button standart-btn signup-btn">Регистрация</button>
        <p class="signup-policy">Нажимая на кнопку, вы соглашаетесь с <nuxt-link to='#'>условиями Оферты и лицензионного договора</nuxt-link> и <nuxt-link to='#'>Политикой обработки персональных данных.</nuxt-link></p> 
    </div>
</template>

<script>
import { required, minLength, email, numeric, maxLength } from 'vuelidate/lib/validators'
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
    validations:{
        email: {required, email},
        password: {required, minLength: minLength(6)},
        phoneNumber: {required, numeric, maxLength: maxLength(11), minLength: minLength(11)},
        name: {required}
    },
    methods: { 
        
        submitHandler() {
            if (this.$v.$invalid){
                this.$v.$touch()
                return
            }

            const formData = {
                name: this.name,
                email: this.email,
                phone: this.phoneNumber,
                password: this.password,
                password_confirmation: this.password
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
