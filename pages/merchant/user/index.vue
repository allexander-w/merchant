<template>
    <div class="merchant-user">
        <div class="merchant-title merchant-user-title">
            Заполните данные компании:
        </div>
        <div class="merchant-user-body">
            <div class="merchant-title merchant-user-title">
                Реквизиты
            </div>
            <div class="divb" :class="{'merchant-user-invalid': $v.organizationName.$dirty && !$v.organizationName.required}"><GeneralInput  :vModel='organizationName' @vModel='model => organizationName = model' :func='false' :numberKey='8' :placeholder = '"Название организации"' /></div>
            <GeneralInput :func='false' :numberKey='9' :placeholder = '"БИН"' />
            <GeneralInput :func='false' :numberKey='10' :placeholder = '"БИК Банка"' />
            <GeneralInput :func='false' :numberKey='11' :placeholder = '"Номер счета"' />
            <GeneralInput :func='false' :numberKey='12' :placeholder = '"Юридический адрес"' />
        </div>
        <div class="merchant-user-body">
            <div class="merchant-title merchant-user-title">
                Контактные данные
            </div>
            <GeneralInput :func='false' :numberKey='13' :placeholder = '"Контактное лицо"' />
            <GeneralInput :func='false' :numberKey='14' :placeholder = '"Электронная почта"' />
            <GeneralInput :func='false' :numberKey='15' :placeholder = '"Номер мобильного телефона"' />
            
            <button @click='saveData' class='yellow-standart-button standart-btn'>Сохранить</button>
        </div>
    </div>
</template>

<script>
import GeneralInput from '@/components/merchant/GeneralInput'
import { required, minLength } from "vuelidate/lib/validators"

export default {
    layout: 'main',
    middleware: ['auth', 'merchant'],
    components: {GeneralInput},
    data: () => ({
        organizationName: ''
    }),
    validations: {
        organizationName: {required}
    },
    methods: {
        saveData(){
             if (this.$v.$invalid){
                this.$v.$touch()
                console.log('opa opa');
                return
            }
        }
    },
    async mounted(){
        // requesits
    }
}
</script>

<style lang="scss">

.merchant-user{
    padding: 32px 40px;
    &-title{
        margin-bottom: 32px;
    }
    &-body {
        margin-bottom: 8px;
        width: 864px;
        padding: 32px;
        background-color: #fff;
        border-radius: 5px;
    }
    &-invalid {
        border: 1px solid red;
    }
    
}
</style>