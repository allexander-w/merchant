<template>
    <div class="plug-source">
        <div class="merchant-title plug-source-title">
            Подключение источника:
        </div>

        <div class="plug-source-body">
            <img src="~/assets/img/kaspi.svg" alt="">

            <GeneralInput :numberKey='1' :needInfo='false' :vModel='token' @vModel='model => token = model' :placeholder='"Токен"' />
            <GeneralInput :numberKey='2' :dis='true' :needInfo='true' :vModel='webhook' @vModel='model => webhook = model' :placeholder='"Веб-хук"' />

        </div>
        <div class="plug-source-body">
            <div class="merchant-title plug-source-title">Соответствие стадий:</div> 
            <GeneralDropdown :currentElement='$route.params.params.category.toString()' @choosedItem='funnelHandler' :items='statuses' :placeholder = '"Воронка"' />

            <div class="plug-source-subtitle">Стадии:</div> 
            <GeneralDropdown @deleteElem='deleteItem' :validateArray='choosedElements' @beginChoose='currentChoosedItems' :name ='"NEW"' :currentElement='$route.params.params.statuses.NEW' @choosedItem='chooseHandler' :items='currentStatus.statuses' :placeholder = '"Новый"' />
            <GeneralDropdown @deleteElem='deleteItem' :validateArray='choosedElements' @beginChoose='currentChoosedItems' :name ='"SIGN_REQUIRED"' :currentElement='$route.params.params.statuses.SIGN_REQUIRED' @choosedItem='chooseHandler' :items='currentStatus.statuses' :placeholder = '"На подписании"' />
            <GeneralDropdown @deleteElem='deleteItem' :validateArray='choosedElements' @beginChoose='currentChoosedItems' :name ='"PICKUP"' :currentElement='$route.params.params.statuses.PICKUP' @choosedItem='chooseHandler' :items='currentStatus.statuses' :placeholder = '"Самовывоз"' />
            <GeneralDropdown @deleteElem='deleteItem' :validateArray='choosedElements' @beginChoose='currentChoosedItems' :name ='"DELIVERY"' :currentElement='$route.params.params.statuses.DELIVERY' @choosedItem='chooseHandler' :items='currentStatus.statuses' :placeholder = '"Доставка"' />
            <GeneralDropdown @deleteElem='deleteItem' :validateArray='choosedElements' @beginChoose='currentChoosedItems' :name ='"KASPI_DELIVERY"' :currentElement='$route.params.params.statuses.KASPI_DELIVERY' @choosedItem='chooseHandler' :items='currentStatus.statuses' :placeholder = '"Kaspi доставка"' />
            <GeneralDropdown @deleteElem='deleteItem' :validateArray='choosedElements' @beginChoose='currentChoosedItems' :name ='"ARCHIVE"' :currentElement='$route.params.params.statuses.ARCHIVE' @choosedItem='chooseHandler' :items='currentStatus.statuses' :placeholder = '"Архив"' />

            <button @click='sendHandler' class="standart-btn yellow-standart-button">Подключить</button>
        </div>
    </div>
</template>

<script>
import _ from '@/plugs/request.plug'
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
        delivery: '',
        statuses: [],
        currentStatus: {},
        market: {},
        choosedElements: []
    }),
    watch: {
        funnel(){
            this.$route.params.params.statuses = {
                ARCHIVE: '',
                DELIVERY: '',
                KASPI_DELIVERY: '',
                NEW: '',
                PICKUP: '',
                SIGN_REQUIRED: ''
            }
            this.changeStatus()
            this.choosedElements = [{'_': '_doc'}]
            console.log('CHOOSED EL',this.choosedElements);
            console.log(this.currentStatus);
        }
    },
    methods: {
        deleteItem(name){
            this.choosedElements = this.choosedElements.filter(item => !item.hasOwnProperty(name))
            console.log('deleted array: ',this.choosedElements)
        },
        currentChoosedItems({item, name}){
            this.choosedElements = [...this.choosedElements, {[name]: item.id, id: item.id}]
            this.choosedElements = this.choosedElements.filter((elem, pos) => {
                return this.choosedElements.indexOf(elem) == pos
            })
            console.log(this.choosedElements)
        },
        funnelHandler(id) {
            this.funnel = id.item.id
            console.log(this.funnel)
        },
        chooseHandler({item, name}) {
            this.choosedElements = this.choosedElements.filter(item => Object.keys(item)[0] !== '_')
            this.choosedElements = [...this.choosedElements, {[name]: item.id, 'id': item.id}]
            console.log(this.choosedElements)
        },
        async sendHandler() {
            if (this.choosedElements.length < 6) {
                alert ('Заполните все поля')
                return
            }
            const statuses = {}
            this.choosedElements.map(item => {
                statuses[Object.keys(item)[0]] = item.id
                delete item['id']
            })
            let body = {
                "merchant_id": JSON.parse(localStorage.getItem('merchant')).merchantId.toString(),
                "market_id": this.$route.params.sourceId.toString(),
                "property_id": this.$route.params.propertyId.toString(),
                "token": this.$route.params.token,
                "category": this.funnel.toString() || this.$route.params.params.category.toString(),
                "statuses": statuses
            }
            const data = await this.$store.dispatch('markets/SAVE_MARKET', body)
            if (data.status === 'success'){
                this.$router.push('/merchant/orders/sources')
            } else {
                alert ('Заполните все поля')
                return
            }
            
        },
        setStatus() {
            this.statuses.map(status => {
                if (status.ID === this.$route.params.params.category) {
                    this.currentStatus = status
                }
            })
            this.currentStatus.statuses.map(item => {
                item.name = item.title
            })
        },
        changeStatus(){
            this.statuses.map(status => {
                if (status.ID === this.funnel) {
                    this.currentStatus = status
                }
            })
            this.currentStatus.statuses.map(item => {
                item.name = item.title
            })
        }
    },
    async mounted() {
        await (await this.$store.dispatch('markets/GET_MARKETS')).data.map(item => {
            if(item.id === this.$route.params.id) {this.market = item.properties}
        })
        this.token = this.market.token
        this.webhook = `${_.mainUrl}app/hook?id={{ID}}`
        this.statuses = await (await this.$store.dispatch('merchants/MERCHANT_STATUSES')).data
        this.setStatus()

        console.log('Market: ', this.market);
        console.log(this.statuses)
        console.log(this.$route.params)
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