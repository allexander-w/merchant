<template>
    <div class="merchant-index">
        <div class="merchant-title merchant-index-title">Ваши мерчанты: </div>
        
        <div class="merchant-index-wrapper">
            <div class="merchant-index-card" 
                v-for='(merchant, index) in merchants'
                :key = 'index'
                @click='inMerchant(merchant)'
            >
                <img src="~/assets/img/B24.svg" alt="" class="merchant-index-card-logo">
                <div class="merchant-index-card-title">
                    {{merchant.name}}
                </div>
                <p class="merchant-index-card-balance">
                    Баланс: {{merchant.balance}} Т
                </p>
                <p class="merchant-index-card-upload">
                    Последняя выгрузка: {{$convert(merchant.updated_at)}}
                </p>
            </div>
            
            <div class="merchant-index-add">
                <p class="merchant-index-add-text">Создайте мерчант и превратите свою CRM в центр интернет-продаж!</p>
                <button class="standart-btn yellow-standart-button merchant-index-add-btn" @click='$router.push("/merchant/add")'>Создать</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    layout: 'empty',
    middleware: 'auth',
    data: () => ({
        merchants: []
    }),
    methods: {
        inMerchant({name}) {
            localStorage.setItem('merchantName', name)
            this.$router.push("/merchant/orders")
        }
    },
    async mounted() {
        this.merchants = []
        const data = await this.$store.dispatch('merchants/GET_MERCHANTS')
        this.merchants = data.data[0].merchants
    }
}
</script>

<style lang="scss">
.merchant-index {
    &-wrapper {
        display: flex;
        flex-wrap: wrap;
    }
    &-title {
        margin-bottom: 32px;
    }
    padding: 32px 40px;
    &-add {
        width: 288px;
        height: 208px;
        background-color: #fff;
        border-radius: 5px;
        padding: 24px 32px;
        position: relative;
        &-text {
            line-height: 24px;
            color: #333333;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical; 
             overflow: hidden;
        }

        &-btn {
            position: absolute;
            bottom: 24px;
        }
    }
    &-card {
        margin: 0 16px 16px 0;
        width: 400px;
        height: 208px;
        background-color: #fff;
        border-radius: 5px;
        padding: 24px 32px;
        position: relative;

        &-logo {
            display: block;
            margin-bottom: 24px;
        }
        &-title {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            font-size: 30px;
            color: #005CCC;
            cursor: pointer;
        }
        &-balance {
            font-size: 16px;
            color: rgba(#333333, .6);
        }
        &-upload {
            position: absolute;
            bottom: 24px;
            font-size: 12px;
            color: rgba(#333333, .6);
        }
    }
}
</style>