<template>
    <div class="merchant-user">
        <div class="merchant-title merchant-user-title">
            Заполните данные компании:
        </div>
        <div class="merchant-user-body">
            <div class="merchant-title merchant-user-title">
                Реквизиты
            </div>
            <GeneralInput :valid='$v.organizationName.$dirty && !$v.organizationName.required' :vModel='organizationName' @vModel='model => organizationName = model' :func='false' :numberKey='8' :placeholder = '"Название организации"' />
            <GeneralInput :valid='$v.BIN.$dirty && !$v.BIN.required' :vModel='BIN' @vModel='model => BIN = model' :func='false' :numberKey='9' :placeholder = '"БИН"' />
            <GeneralInput :valid='$v.BIK.$dirty && !$v.BIK.required' :vModel='BIK' @vModel='model => BIK = model' :func='false' :numberKey='10' :placeholder = '"БИК Банка"' />
            <GeneralInput :valid='$v.payloadNum.$dirty && !$v.payloadNum.required' :vModel='payloadNum' @vModel='model => payloadNum = model' :func='false' :numberKey='11' :placeholder = '"Номер счета"' />
            <GeneralInput :valid='$v.legalAddress.$dirty && !$v.legalAddress.required' :vModel='legalAddress' @vModel='model => legalAddress = model' :func='false' :numberKey='12' :placeholder = '"Юридический адрес"' />
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

        <div class="merchant-user-body">
            <table class="user-table">
                <tbody class="user-table-body">
                    <tr class="user-table-tr">
                        <td class="user-table-td user-table-key">Название</td>
                        <td class="user-table-td user-table-value">Значение</td>
                    </tr>
                </tbody>
            </table>
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
        organizationName: '',
        BIN: '',
        BIK: '',
        payloadNum: '',
        legalAddress: ''
    }),
    validations: {
        organizationName: {required},
        BIN: {required},
        BIK: {required},
        payloadNum: {required},
        legalAddress: {required},
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


}
.user-table{
    width: 100%;
    border-collapse:collapse;
    color: #333;
}
.user-table, .user-table-td, th {
    border: none;
}
.user-table-td {
    width: 30px;
    padding: 6px 0;
    cursor: default;
}
.user-table-tr {
    height: 42px;
    border-bottom: none;
}
.user-table-body .user-table-tr:hover {
    background: transparent;
}
.user-table-key {
    color: rgba(#333333, .6);
}
</style>
