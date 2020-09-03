<template>
    <div class="plug-source">
        <div class="merchant-title plug-source-title">
            Подключение источника:
        </div>

        <div class="plug-source-body">
            <img src="~/assets/img/kaspicard.svg" alt="">

            <GeneralInput :numberKey='1' :needInfo='false' :vModel='token' @vModel='model => token = model' :placeholder='"Токен"' />
            <GeneralInput :numberKey='2' :needInfo='true' :vModel='webhook' @vModel='model => webhook = model' :placeholder='"Веб-хук"' />

        </div>
        <div class="plug-source-body">
            <div class="merchant-title plug-source-title">Соответствие стадий:</div> 
            <GeneralDropdown @choosedItem='funnelHandler' :placeholder = '"Воронка"' />

            <div class="plug-source-subtitle">Стадии:</div> 
            <GeneralDropdown @choosedItem='newSourceHandler' :placeholder = '"Новый"' />
            <GeneralDropdown @choosedItem='onSigningHandler' :placeholder = '"На подписании"' />
            <GeneralDropdown @choosedItem='deliveryHandler' :placeholder = '"Доставка"' />

            <button @click='sendHandler' class="standart-btn yellow-standart-button">Подключить</button>
        </div>
    </div>
</template>

<script>
import GeneralInput from '@/components/merchant/GeneralInput'
import GeneralDropdown from '@/components/merchant/GeneralDropdown'

export default {
    validate ({params}) {
       return params.id === params.sourceId
    },
    middleware: ['auth', 'merchant'],
    layout: 'main',
    components: {GeneralInput, GeneralDropdown},
    data: () => ({
        token: '',
        webhook: '',
        funnel: '',
        newSource: '',
        onSigning: '',
        delivery: ''

    }),
    methods: {
        funnelHandler({name}) {
            this.funnel = name
        },
        newSourceHandler({name}) {
            this.newSource = name
        },
        onSigningHandler({name}) {
            this.onSigning = name
        },
        deliveryHandler({name}) {
            this.delivery = name
        },
        sendHandler() {
            const formData = {
                funnel: this.funnel,
                newSource: this.newSource,
                onSigning: this.onSigning,
                delivery: this.delivery,
                token: this.token,
                webhook: this.webhook
            }

            console.log(formData)
        }
    },
    mounted() {
        this.token = `TOKEN ${this.$route.params.id}`
    }
}
</script>

<style lang="scss">
.plug-source {
    padding: 32px 0 40px 40px;
    &-title {
        margin-bottom: 32px;
    }
    &-subtitle {
        font-size: 20px;
        color: #333333;
    }
    &-input {
        margin: 20px 0; 
    }
    &-body {
        width: 864px;
        background-color: #fff;
        border-radius: 5px;
        padding: 32px;
        margin-bottom: 8px;
    }
}
</style>