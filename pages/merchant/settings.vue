<template>
    <div class="merchant-create">
        <div class="merchant-title merchant-create-title">Настройки: </div>
        <div class="merchant-create-card loader" v-if = 'load'></div>
        <div class="merchant-create-card" v-if='!load'>
            <GeneralInput :valid='$v.merchName.$dirty && !$v.merchName.required' :numberKey='3' :func='false' :needInfo='false' :vModel='merchName' @vModel='model => merchName = model' :placeholder='"Название мерчанта"' />
            <p v-if='$v.merchName.$dirty && !$v.merchName.required' class="validate-warning"> Введите название </p>

            <GeneralDropdown :dropdownItem='typeCRM' @choosedItem='({type}) => typeCRM = type' :placeholder = '"Ваша CRM"' :items = 'typeofCRM' />

            <WarningMessage v-if='typeCRM === "bitrix"' :description = '"Перед созданием, обязательно установите приложение в ваш Битрикс24."' />

            <GeneralInput :valid='$v.crmAddress.$dirty && !$v.crmAddress.required' @buttonHandler='turnOn' :numberKey='5' :button='true' :func='true' :needInfo='true' :vModel='crmAddress' @vModel='model => crmAddress = model' :placeholder='"Адрес (домен) вашей CRM"' />
            <p class="validate-warning" v-if='$v.crmAddress.$dirty && !$v.crmAddress.required'> Не оставляйте поле пустым! </p>
             <button class="standart-btn yellow-standart-button" @click="createMerchant">Сохранить</button>
        </div>

        <transition name='message'>
            <Message v-if='messageInfo.success && !messageInfo.error' :message='"Успешно отредактировано"' />
            <Message v-if='!messageInfo.success && messageInfo.error' :message='"Что-то пошло не так, попробуйте снова!"' />
        </transition>
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
        messageInfo: {
          success: false,
          error: false
        },
        merchName: '',
        crmAddress: '',
        typeCRM: 'bitrix',
        load: false,
        merchId: 0,
        
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
                merchant_id: this.merchId,
                name: this.merchName,
                type: this.typeCRM,
                domain: this.crmAddress
            }
           
            const data = await this.$store.dispatch('merchants/MERCHANT_EDIT', formData)

            if(data.status === 'success') {
              this.messageInfo.success = true
              setTimeout(()=> {
                this.messageInfo.success = false
                this.$router.push('/merchant')
              }, 2500)
            } 
            else{
              this.messageInfo.error = true
              setTimeout(()=> {
                this.messageInfo.error = false
              }, 2500)
            }
        },
        turnOn(){
            const a = `https://${this.crmAddress}/marketplace/detail/itl.merchant/`
            console.log(a)
        },
       async loadMerchantData() {
          this.load = true
          const data = await this.$store.dispatch('merchants/MERCHANT')
          const merchData = data.data[0]
          console.log(data.data[0])
          this.typeCRM = merchData.type
          this.merchName = merchData.name
          this.crmAddress = merchData.domain
          this.merchId = merchData.id
          this.load = false
        }
    },
    mounted() {
      this.loadMerchantData()
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
        width: 700px;
        background-color: #fff;
        border-radius: 5px;
        padding: 10px 32px 40px 32px;
    }
}
</style>