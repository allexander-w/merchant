<template>
    <div class="sources">
        <div class="merchant-title sources-title">
            Подключите источники заказов:
        </div>

        <div class="sources-wrapper">
            <div class="sources-card" 
                v-for = '(source, index) in sources'
                :key= 'index'
                @click = 'plug(source)'
            >   
                <img :src="require(`~/assets/img/${source.logo}.svg`)" alt="" class="sources-card-logo">

                <p class="sources-card-desc">{{source.desc}}</p>
                <button class="standart-btn sources-card-btn" :class="{'yellow-standart-button': source.button === 'yellow',  'blue-standart-button': source.button === 'blue'}">{{source.button === 'yellow' ? 'Подключить' : 'Настроить'}}</button>
                <div class="sources-card-indicator" v-if='source.turn'>
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
        sources: [
            {id: 1, logo: 'kaspicard', turn: false, desc: 'Обрабатывайте заказы из Kaspi.kz в вашей CRM-системе.', button: 'yellow'},
            {id: 2, logo: 'kaspicard', turn: true, desc: 'Обрабатывайте заказы из Kaspi.kz в вашей CRM-системе.', button: 'blue'},
            {id: 3, logo: 'kaspicard', turn: false, desc: 'Обрабатывайте заказы из Kaspi.kz в вашей CRM-системе.', button: 'yellow'},
        ]
    }),
    methods: {
        plug(source) {
            source.turn ? console.log('Настройки') : this.$router.push({ name: `merchant-orders-sources-id` , params: { id: source.id, sourceId: source.id}})
        }
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