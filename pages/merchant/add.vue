<template>
    <div class="merchant-create">
        <div class="merchant-title merchant-create-title">Создание мерчанта: </div>
        <div class="merchant-create-card">
            <GeneralInput :valid='$v.merchName.$dirty && !$v.merchName.required' :numberKey='3' :func='false' :needInfo='false' :vModel='merchName' @vModel='model => merchName = model' :placeholder='"Название мерчанта"' />
            <p v-if='$v.merchName.$dirty && !$v.merchName.required' class="validate-warning"> Введите название </p>

            <GeneralDropdown @choosedItem='({type}) => typeCRM = type' :placeholder = '"Ваша CRM"' :items = 'typeofCRM' />

            <WarningMessage v-if='typeCRM === "bitrix"' :description = '"Перед созданием, обязательно установите приложение в ваш Битрикс24."' />

            <GeneralInput :valid='$v.crmAddress.$dirty && !$v.crmAddress.required' @buttonHandler='turnOn' :numberKey='5' :button='true' :func='true' :needInfo='true' :vModel='crmAddress' @vModel='model => crmAddress = model' :placeholder='"Адрес (домен) вашей CRM"' />
            <p class="validate-warning" v-if='$v.crmAddress.$dirty && !$v.crmAddress.required'> Не оставляйте поле пустым! </p>
             <button class="standart-btn yellow-standart-button" @click="createMerchant">Создать мерчант</button>
        </div>
    </div>
</template>

<script>
import { required} from 'vuelidate/lib/validators'
import GeneralInput from '@/components/merchant/GeneralInput'
import GeneralDropdown from '@/components/merchant/GeneralDropdown'
import WarningMessage from '@/components/merchant/WarningMessage'

export default {
    middleware: 'auth',
    layout: 'empty',
    components: {GeneralInput, GeneralDropdown, WarningMessage},
    data: () => ({
        merchName: '',
        crmAddress: '',
        typeCRM: 'bitrix',
        typeofCRM: [
            {id: 1, name: 'Битрикс24', type: 'bitrix'},
            {id: 2, name: 'AmoCRM', type: 'amo'}
        ]
    }),
    validations: {
        merchName: {required},
        crmAddress: {required}
    },
    methods: {
        async createMerchant() {
            if(this.$v.$invalid){
                this.$v.$touch()
                return
            }

            const formData = {
                name: this.merchName,
                type: this.typeCRM,
                domain: this.crmAddress
            }
            console.log(formData)
            const data = await this.$store.dispatch('merchants/CREATE_MERCHANT', formData)
            data.status === 'success' ? this.$router.push('/merchant') : console.log('Ошибка')
        },
        turnOn(){
            const a = `https://${this.crmAddress}/marketplace/detail/itl.merchant/`
            console.log(a)
        } 
    }
}
</script>

<style lang="scss">
.merchant-create {
    padding: 32px 40px;
    &-title {
        margin-bottom: 32px;
    }
    &-card {
        width: 50%;
        background-color: #fff;
        border-radius: 5px;
        padding: 10px 32px 40px 32px;
    }
}
</style>