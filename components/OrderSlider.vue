<template>
    <div class="wrapper-slider">
        <div class="order-header">
            <div class="order-header-item"
                v-for = '(item, index) in slides'
                :key ='`index${index}`'
                :class="{'active-order-header-item': item.active}"
                @click="chooseHandler(item)"
                
            >
                <i class="cart-icon" :style ='item.active ? { "--icon-color" : `rgba(14, 108, 221, 1)`} : {"--icon-color": "rgba(14, 108, 221, .5)"}' :class='item.icon' ></i> <span class="order-header-item-name">{{item.name}}</span>
            </div>
        </div>
        <div class="order-slider">
            <div class="empty-fragment order-view-slider">
            <transition-group name="list">
            <div class="order-view" 
                v-for = '(item, index) in sliderFragment'
                :key='`key${index}`'
            >   
                    <div class="order-view-wrapper">
                        <p class="slider-soon" v-if='item.isSoon'>Скоро!</p>
                        <h3 class="order-view-title main-title">
                            {{item.title}}
                        </h3>
                        <p class="order-view-desc small-paragraph">
                            {{item.descone}}
                        </p>
                        <p class="order-view-desc small-paragraph">
                            {{item.desctwo}}
                        </p>
                        <p class="order-view-desc small-paragraph">
                            {{item.descthree}}
                        </p>
                    </div>
                        <img class="image-body" :src="require(`~/assets/img/${item.img}.png`)" alt="">
                </div>
            </transition-group>
            </div>
        </div>
 
    




    </div>
</template>

<script>
export default {
     data: () => ({
        slides: [
            {
                id: 1, 
                icon: 'fad fa-shopping-cart', 
                name: 'Обрабатывайте заказы', 
                active: true,
                data:{
                    id: 1,
                    isSoon: false, 
                    title: 'Больше заказов, меньше менеджеров. Обрабатывайте заказы с десятков источников в вашей CRM. ',
                    descone: 'Заказы со всех торговых площадок попадают в единый список и распределяются между менеджерами в вашей CRM.',
                    desctwo: 'У каждого клиента единая история сделки, вне зависимости от канала. ',
                    descthree: 'Операторы работают в режиме одного окна. Управление торговлей станет еще эффективнее и проще. ',
                    img: 'order' 
                }
            },
            {
                id: 2, 
                icon: 'fal fa-boxes-alt', 
                name: 'Синхронизируйте товары', 
                active: false,
                data:{
                    id: 2,
                    isSoon: false, 
                    title: 'Автоматически выгружайте ваши товары в маркетплейсы в пару кликов.',
                    descone: 'С помощью itl.merchant можно легко автоматизировать процесс синхронизации вашей товарной базы из 1С с торговой площадкой и маркетплейсом.',
                    desctwo: 'Забудьте о дорогостоящей доработке 1с для каждой торговой площадки, подключите вашу 1С к itl.merchant и получите всегда актуальный каталог на всех торговых площадках.',
                    descthree: '',
                    img: 'product' 
                }
            },
            {
                id: 3, 
                icon: 'far fa-dolly', 
                name: 'Ведите складской учет', 
                active: false,
                data:{
                    id: 3,
                    isSoon: true, 
                    title: 'Автоматизируете процесс логистики ваших заказов.',
                    descone: ' Автоматизируйте отправку и контроль заказов через службы доставки и транспортные компании с помощью itl.merchant. ',
                    desctwo: 'Система поможет с созданием заявки в транспортную компанию, сама синхронизирует статусы доставки и уведомит об этом клиента и менеджера.',
                    descthree: 'И все это в режиме одного окна в вашей CRM! Управление логистикой станет еще эффективнее и проще.',
                    img: 'order' 
                }
            },
            {
                id: 4, 
                icon: 'fal fa-file-invoice-dollar', 
                name: 'Контролируйте продажи', 
                active: false,
                data:{
                    id: 4,
                    isSoon: true, 
                    title: 'Узнавайте об оплате счетов быстрее бухгалтера.',
                    descone: 'Теперь у вас  есть возможность отслеживать состояние выставленных счетов , не выходя из CRM.',
                    desctwo: 'Больше не придется в ручном режиме информировать менеджеров о платежах или дебиторской задолженности клиентов. Сотрудники смогут видеть статус оплаты  по своим сделкам в онлайн-режиме.',
                    img: 'delivery' 
                }
            },
        ],
        currentSlide: 1,
        moved: false, 
        sliderFragment: [],
        stop: false
    }),
    methods: {
        
        chooseHandler(item) {
            if(this.stop || item.id === this.sliderFragment[0].id) {
                return
            }
            // active class:
            this.slides.map(slide => {slide.active = false})
            item.active= true
            this.stop= true
            // Add in array current slide and transform:
            this.sliderFragment.shift()
            setTimeout(()=> {
                this.sliderFragment.push(item.data)
                this.stop = false
            }, 400)
        }
    },
    mounted() {
        // Add begin active element in array with slides
        this.sliderFragment.push(this.slides[0].data)
    }
    
}
</script>

<style lang="scss">
.order-slider {
  width: 100%;
  overflow: hidden;
}

.list-enter-active  {
  transition: all .6s;
}
.list-leave-active {
    transition: .6s;
}
.list-enter{
  transform: translateX(100%);
}
.list-leave-to {
  transform: translateX(-100%);
}
.slider-soon {
    width: 74px;
    height: 32px;
    background: #FFD740;
    border-radius: 5px;
    text-align: center;

    font-size: 14px;
    color: #333333;
    margin-bottom: 24px;
}
.cart-icon {
    color: var(--icon-color);
    font-size: 24px;
    margin-right: 24px;
}

</style>