<template>
    <div class="signin">
        <img src="~/assets/img/merchantlogo.svg" alt="" class="signin-logo">

        <h3 class="signin-merchant-title">Вход в систему</h3>
        <div class="signin-input">
            <GeneralInput :valid='($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)' :numberKey='5' :func='false' :vModel='email' @vModel='model => email = model' :placeholder='"E-mail"' />
        </div>
        <p v-if='($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)' class="validate-warning">Email некорректный</p>
        <div class="signin-input">
            <GeneralInput :valid='($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)' :numberKey='6' :inputType='"password"' :func='false' :vModel='password' @vModel='model => password = model.trim()' :placeholder='"Пароль"' />
        </div>
       <p v-if="($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)" class="validate-warning">Пароль некорректный</p>

        <div class="signin-settings">
            <Checkbox />
            <div class="signin-link">
                <nuxt-link to='#' >Забыли пароль?</nuxt-link>
            </div>
        </div>

        <button @click='signin' class="yellow-standart-button standart-btn signin-btn">Войти</button>
        <transition name='message'>
            <Message v-if='error' />
        </transition>
    </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import GeneralInput from '@/components/merchant/GeneralInput'
import Checkbox from '@/components/merchant/Checkbox'
import Message from '@/components/Message'

export default {
    middleware: 'trueauth',
    layout: 'auth',
    components: {GeneralInput, Checkbox, Message},
    data: () => ({
        email: '',
        password: '',
        error: false
    }),
    validations:{
        email: {required, email},
        password: {required, minLength: minLength(6)}
    },
    methods: {
        async signin() {
            if(this.$v.$invalid){
                this.$v.$touch()
                return
            }

            const formData = {
                email: this.email,
                password: this.password
            }
            const status = await this.$store.dispatch('auth/SIGN_IN', formData)
            // status === 'success' ? ( )
            if(status === 'success'){
                 this.$router.push('/merchant')
            } else {
                this.error = true
                setTimeout(()=> {
                    this.error = false
                }, 2500)
            }
        }
    }
}
</script>

<style lang="scss">
.signin {
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