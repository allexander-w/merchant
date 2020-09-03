<template>
    <div class="merchant-create">
        <div class="merchant-title merchant-create-title">Создание мерчанта: </div>
        <div class="merchant-create-card">
            <GeneralInput :numberKey='3' :needInfo='false' :vModel='merchName' @vModel='model => merchName = model' :placeholder='"Название мерчанта"' />
            <GeneralDropdown :placeholder = '"Ваша CRM"' />

            <WarningMessage :description = '"Перед созданием,  обязательно установите приложение в ваш Битрикс24."' />

            <GeneralInput :numberKey='5' :button='true' :needInfo='true' :vModel='crmAddress' @vModel='model => crmAddress = model' :placeholder='"Адрес (домен) вашей CRM "' />
            
             <button class="standart-btn yellow-standart-button">Создать мерчант</button>
            
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
        crmAddress: ''
    })
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