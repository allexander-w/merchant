<template>
    <div class="merchant-user">
        <div class="merchant-title merchant-user-title">
            Заполните данные компании:
        </div>
        <div class="empty-wrapper" v-if='!isData'>
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
                <GeneralInput :valid='$v.contact.$dirty && !$v.contact.required' :vModel='contact' @vModel='model => contact = model' :func='false' :numberKey='13' :placeholder = '"Контактное лицо"' />
                <GeneralInput :valid='($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)' :vModel='email' @vModel='model => email = model' :func='false' :numberKey='14' :placeholder = '"Электронная почта"' />
                <GeneralInput :valid='$v.phone.$dirty && !$v.phone.required' :vModel='phone' @vModel='model => phone = model' :func='false' :numberKey='15' :placeholder = '"Номер мобильного телефона"' />

                <button @click='saveData' class='yellow-standart-button standart-btn'>Сохранить</button>
            </div>
        </div>

        <div class="merchant-user-body" v-if='isData'>
            <table class="user-table">
                <tbody class="user-table-body">
                    <tr class="user-table-tr">
                        <td class="user-table-td user-table-key">Название организации</td>
                        <td class="user-table-td user-table-value">{{dataRequisits.name}}</td>
                    </tr>
                    <tr class="user-table-tr">
                        <td class="user-table-td user-table-key">БИН</td>
                        <td class="user-table-td user-table-value">{{dataRequisits.BIN}}</td>
                    </tr>
                    <tr class="user-table-tr">
                        <td class="user-table-td user-table-key">БИК банка</td>
                        <td class="user-table-td user-table-value">{{dataRequisits.BIK}}</td>
                    </tr>
                    <tr class="user-table-tr">
                        <td class="user-table-td user-table-key">Номер счета</td>
                        <td class="user-table-td user-table-value">{{dataRequisits.account}}</td>
                    </tr>
                    <tr class="user-table-tr">
                        <td class="user-table-td user-table-key">Юридический адрес</td>
                        <td class="user-table-td user-table-value">{{dataRequisits.address}}</td>
                    </tr>
                    <tr class="user-table-tr">
                        <td class="user-table-td user-table-key">Контактное лицо</td>
                        <td class="user-table-td user-table-value">{{dataContact.contact}}</td>
                    </tr>
                    <tr class="user-table-tr">
                        <td class="user-table-td user-table-key">Электронная почта</td>
                        <td class="user-table-td user-table-value">{{dataContact.email}}</td>
                    </tr>
                    <tr class="user-table-tr">
                        <td class="user-table-td user-table-key">Номер мобильного телефона</td>
                        <td class="user-table-td user-table-value">{{dataContact.phone}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <button @click="test">TEST! </button>
    </div>
</template>

<script>
import GeneralInput from '@/components/merchant/GeneralInput'
import { required, minLength, email} from "vuelidate/lib/validators"

export default {
    layout: 'main',
    middleware: ['auth', 'merchant'],
    components: {GeneralInput},
    data: () => ({
        organizationName: '',
        BIN: '',
        BIK: '',
        payloadNum: '',
        legalAddress: '',
        contact: '',
        email: '',
        phone: '',
        load: false,
        isData: false,
        dataContact: {},
        dataRequisits: {}
    }),
    validations: {
        organizationName: {required},
        BIN: {required},
        BIK: {required},
        payloadNum: {required},
        legalAddress: {required},
        contact: {required},
        email: {required, email},
        phone: {required}
    },
    methods: {
        async test(){
            
            const data = await this.$store.dispatch('markets/GET_PRODUCTS', 1)
            console.log(data);
        },
        async saveData(){
             if (this.$v.$invalid){
                this.$v.$touch()
                console.log('opa opa');
                return
            }

            const requesits = {
                "merchant_id": JSON.parse(localStorage.getItem('merchant')).merchantId,
                "name":  this.organizationName,
                "BIN": this.BIN,
                "BIK": this.BIK,
                "account": this.payloadNum,
                "address": this.legalAddress,
                "contact": this.contact,
                "email": this.email,
                "phone": this.phone
            }

            console.log(requesits)
            const data = await this.$store.dispatch('merchants/MERCHANT_REQUISITES_EDIT', requesits)
            console.log(data)
        },

        async getRequisites() {
            this.load = true
            const data = await this.$store.dispatch('merchants/GET_REQUISITES')
            
            console.log(data)

            if (data.data['contact_person '] && data.data.requisites) {
                this.dataContact = data.data['contact_person ']
                this.dataRequisits = data.data.requisites
                this.isData = true
                console.log(this.isData);
            }
            this.load = false
        }
    },
    async mounted(){
        this.getRequisites()
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
