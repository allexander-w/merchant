<template>
    <div class="merchant-create">
        <div class="merchant-title merchant-create-title">Создание мерчанта: </div>
        <div class="merchant-create-card">
            <GeneralInput :numberKey='3' :needInfo='false' :vModel='merchName' @vModel='model => merchName = model' :placeholder='"Название мерчанта"' />
            <GeneralDropdown @choosedItem='({type}) => typeCRM = type' :placeholder = '"Ваша CRM"' :items = 'typeofCRM' />

            <WarningMessage v-if='typeCRM === "bitrix"' :description = '"Перед созданием, обязательно установите приложение в ваш Битрикс24."' />

            <GeneralInput :numberKey='5' :button='button' :func='button' :needInfo='true' :vModel='crmAddress' @vModel='model => crmAddress = model' :placeholder='"Адрес (домен) вашей CRM"' />
            
             <button class="standart-btn yellow-standart-button" @click="createMerchant">Создать мерчант</button>
        </div>
    </div>
</template>

<script>
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
    methods: {
        async createMerchant() {
            const formData = {
                name: this.merchName,
                type: this.typeCRM,
                domain: this.crmAddress
            }
            console.log(formData)
            const data = await this.$store.dispatch('merchants/CREATE_MERCHANT', formData)
            console.log(data)
            this.$router.push('/merchant')
        } 
    },
    computed: {
        button() {
            if(this.typeCRM === 'bitrix'){
                return false} 
            else {
                return true
            } 
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