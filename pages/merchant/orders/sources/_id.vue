<template>
    <div class="plug-source">
        <div class="merchant-title plug-source-title">
            Подключение источника:
        </div>
        <!-- NOT EMPTY:  -->
        <div class="plug-source-body">
            <img src="~/assets/img/kaspi.svg" alt="">

            <GeneralInput :numberKey='1' :needInfo='false' :vModel='token' @vModel='model => token = model' :placeholder='"Токен"' />
            <GeneralInput :numberKey='2' :dis='true' :needInfo='true' :vModel='webhook' @vModel='model => webhook = model' :placeholder='"Веб-хук"' />

        </div>

        <!-- NOT EMPTY BODY: -->
        <div class="plug-source-body" v-if='isLoad'>
            <div class="merchant-title plug-source-title">Соответствие стадий:</div> 
            <WarningMessage :description='"Заказы переведенные в стадию, не указанную в списке, не отслеживаются!"' />
            <DropdownSources :dataObject='market' 
                            :items='statuses' 
                            :placeholder = '"Воронка"' 
                            @choosedItem='changeFunnel'
                            
            />

            <div class="plug-source-subtitle">Стадии:</div> 
            <DropdownSources @deleteElem='deleteItem' :choosedElements='choosedElements' @beginChoose='beginEls' :changing='true' @choosedItem='changeStadies' :dataObject='market' :name='"NEW"' :items='stadies' :placeholder = '"Новый"' />
            <DropdownSources @deleteElem='deleteItem' :choosedElements='choosedElements' @beginChoose='beginEls' :changing='true' @choosedItem='changeStadies' :dataObject='market' :name='"SIGN_REQUIRED"' :items='stadies' :placeholder = '"На подписании"' />
            <DropdownSources @deleteElem='deleteItem' :choosedElements='choosedElements' @beginChoose='beginEls' :changing='true' @choosedItem='changeStadies' :dataObject='market' :name='"PICKUP"' :items='stadies' :placeholder = '"Самовывоз"' />
            <DropdownSources @deleteElem='deleteItem' :choosedElements='choosedElements' @beginChoose='beginEls' :changing='true' @choosedItem='changeStadies' :dataObject='market' :name='"DELIVERY"' :items='stadies' :placeholder = '"Доставка"' />
            <DropdownSources @deleteElem='deleteItem' :choosedElements='choosedElements' @beginChoose='beginEls' :changing='true' @choosedItem='changeStadies' :dataObject='market' :name='"KASPI_DELIVERY"' :items='stadies' :placeholder = '"Kaspi доставка"' />
            <DropdownSources @deleteElem='deleteItem' :choosedElements='choosedElements' @beginChoose='beginEls' :changing='true' @choosedItem='changeStadies' :dataObject='market' :name='"ARCHIVE"' :items='stadies' :placeholder = '"Архив"' />

            <button class="standart-btn yellow-standart-button" @click="sendHandler">Подключить</button>
        </div>

        <div class="plug-source-body" v-if='isEmpty'>
            <div class="merchant-title plug-source-title">Соответствие стадий:</div> 
            <WarningMessage :description='"Заказы переведенные в стадию, не указанную в списке, не отслеживаются!"' />
            <DropdownSources :dataObject='market' 
                            :items='statuses' 
                            :placeholder = '"Воронка"' 
                            @choosedItem='changeFunnel'
                            
            />

            <div class="plug-source-subtitle">Стадии:</div> 
            <DropdownSources @deleteElem='deleteItem' :choosedElements='choosedElements' :changing='true' @choosedItem='changeStadies' :dataObject='market' :name='"NEW"' :items='stadies' :placeholder = '"Новый"' />
            <DropdownSources @deleteElem='deleteItem' :choosedElements='choosedElements' :changing='true' @choosedItem='changeStadies' :dataObject='market' :name='"SIGN_REQUIRED"' :items='stadies' :placeholder = '"На подписании"' />
            <DropdownSources @deleteElem='deleteItem' :choosedElements='choosedElements' :changing='true' @choosedItem='changeStadies' :dataObject='market' :name='"DELIVERY"' :items='stadies' :placeholder = '"Доставка"' />
            <DropdownSources @deleteElem='deleteItem' :choosedElements='choosedElements' :changing='true' @choosedItem='changeStadies' :dataObject='market' :name='"PICKUP"' :items='stadies' :placeholder = '"Самовывоз"' />
            <DropdownSources @deleteElem='deleteItem' :choosedElements='choosedElements' :changing='true' @choosedItem='changeStadies' :dataObject='market' :name='"KASPI_DELIVERY"' :items='stadies' :placeholder = '"Kaspi доставка"' />
            <DropdownSources @deleteElem='deleteItem' :choosedElements='choosedElements' :changing='true' @choosedItem='changeStadies' :dataObject='market' :name='"ARCHIVE"' :items='stadies' :placeholder = '"Архив"' />

            <button class="standart-btn yellow-standart-button" @click="sendHandler">Подключить</button>
        </div>
    </div>
</template>

<script>
import _ from '@/plugs/request.plug'
import GeneralInput from '@/components/merchant/GeneralInput'
import DropdownSources from '@/components/merchant/DropdownSources'
import WarningMessage from '@/components/merchant/WarningMessage'

export default {
    middleware: ['auth', 'merchant'],
    layout: 'main',
     data: () => ({
        token: '',
        webhook: '',
        funnel: '',
        statuses: [],
        stadies: [],
        market: {},
        isLoad: false,
        choosedElements: [],
        isEmpty: false 
    }),
    components: {GeneralInput, DropdownSources, WarningMessage},
    methods: {
        deleteItem(name){
            this.choosedElements = this.choosedElements.filter(item => !item.hasOwnProperty(name))
            console.log('deleted array: ',this.choosedElements)
        },
        beginEls({item, name}){
            this.choosedElements = [...this.choosedElements, {[name]: item.id, id: item.id}]
            this.choosedElements = this.choosedElements.filter((elem, pos) => {
                return this.choosedElements.indexOf(elem) == pos
            })
        },
        // Funnel dropdown: 
        changeFunnel(item){
            // Set method "name" of object
            item.statuses.map(status => {
                status.name = status.NAME
            })
            // If store id change, all stadies is empty
            this.$store.dispatch('sources/SEND_ID')
            this.stadies = item.statuses
            this.funnel = item.id

            this.choosedElements = [{'_': 'empty'}]
        },
        changeStadies({item, name}){
            this.choosedElements = this.choosedElements.filter(item => Object.keys(item)[0] !== '_')
            this.choosedElements = [...this.choosedElements, {[name]: item.id, 'id': item.id}]

            console.log(this.choosedElements);
        },
        async sendHandler() {
            if (this.choosedElements.length < 6) {
                alert ('Заполните все поля')
                return
            }
            // Array in object: 
            const statuses = {}
            
            this.choosedElements.map(item => {
                statuses[Object.keys(item)[0]] = item.id
                delete item['id']
            })

            let body = {
                "merchant_id": this.market.merchant_id.toString(),
                "market_id": this.market.market_id.toString(),
                "property_id": this.market.id.toString(),
                "token": this.market.token,
                "category": this.funnel.toString(),
                "statuses": statuses
            }
            console.log(this.market)
            console.log(body);

            // const data = await this.$store.dispatch('markets/SAVE_MARKET', body)
            // data.status === 'success' ? this.$router.push('/merchant/orders/sources') : alert ('Заполните все поля')
        },
    },
    async mounted() {
            // Get all markets:
            const marketData = await this.$store.dispatch('markets/GET_MARKETS')

            // Choose need market:
            marketData.data.map(item => {
                if(item.id.toString() === this.$route.params.id) {
                    console.log(item);
                    if(item.properties) {
                        
                        this.market = item.properties
                    }
                }
            })
            // Set token and webhook
            this.webhook = `${_.mainUrl}app/hook?id={{ID}}`

            Object.keys(this.market).length ? console.log('true') : console.log('false')

            // Get all statuses: 
            this.statuses = await (await this.$store.dispatch('merchants/MERCHANT_STATUSES')).data
            console.log(this.statuses)
            // Set funnel dropdown
            if(Object.keys(this.market).length){
                this.statuses.map(item => {
                    if(item.id.toString() === this.market.params.category.toString()){
                        this.changeFunnel(item)
                    }
                })
            }
            
            if(this.$route.query.empty){
                this.isEmpty = true
                
            } else {
                this.token = this.market.token
                this.isLoad = true
            }
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