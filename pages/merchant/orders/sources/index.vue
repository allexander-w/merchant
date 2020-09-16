<template>
    <div class="sources">
        <div class="merchant-title sources-title">
            Подключите источники заказов:
        </div>

        <div class="sources-wrapper">
            <div class="sources-card" 
                v-for = '(source, index) in sources'
                :key= 'index'
            >   
                <img :src="require(`~/assets/img/${source.code}.svg`)" alt="" class="sources-card-logo">
                <p class="sources-card-desc">{{source.description}}</p>
                <button @click='plug(source)' class="standart-btn sources-card-btn" :class="{'yellow-standart-button': !source.enabled,  'blue-standart-button': source.enabled}">{{!source.enabled ? 'Подключить' : 'Настроить'}}</button>
                <div class="sources-card-indicator" v-if='source.enabled'>
                    <p>Подключен</p>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
export default {
    middleware: ['auth', 'merchant'],
    layout: 'main',
    data: () => ({
        sources: []
    }),
    methods: {
        plug(source) {
            source.enabled ? this.$router.push(`/merchant/orders/sources/${source.id}`) : this.$router.push({path: `/merchant/orders/sources/${source.id}`, query: {empty: true}})
        }
    },
    async mounted() { 
        this.sources = await (await this.$store.dispatch('markets/GET_MARKETS')).data
        console.log(this.sources)
    }
}
</script>

<style lang="scss">
.sources {
    &-wrapper {
        display: flex;
        flex-wrap: wrap;
    }
    &-title {
        margin-bottom: 32px;
    }
    padding: 32px 0 0 40px;

    &-card {
        margin: 0 16px 16px 0;
        width: 288px;
        height: 280px;
        border-radius: 5px;
        background-color: #fff;
        padding: 32px;
        position: relative;
        transition: .5s;
        &:hover {
            box-shadow: 0px 0px 40px rgba(51, 51, 51, 0.08);
        } 
        &-desc {
            font-size: 16px;
            color: #333333;
            line-height: 24px;
            margin-top: 32px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical; 
             overflow: hidden;
        }
        &-logo {
            display: block;
        }
        &-btn {
            position: absolute;
            bottom: 32px;
        }
        &-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 79px;
            height: 20px;
            background: #34A853;
            border-radius: 2px;
            position: absolute;
            top: 16px;
            right: 16px;

            p{
                padding: 0 5px;
                font-size: 12px;
                color: #FFFFFF;
            }
        }
        
        
    }
}



</style>