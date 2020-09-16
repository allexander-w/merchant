<template>
    <div class="wrapper-slider">
        <div class="order-header">
            <div class="order-header-item"
                v-for = '(item, index) in slides'
                :key ='`index${index}`'
                :class="{'active-order-header-item': item.active}"
                @click="chooseHandler(item)"
                
            >
                <i class="fad fa-shopping-cart cart-icon"></i> <span class="order-header-item-name">{{item.name}}</span>
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
                        <!-- <div class="image_body"> -->
                            <img class="image-body" :src="require(`~/assets/img/${item.img}.png`)" alt="">
                        <!-- </div> -->
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
                icon: 'icon', 
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
                icon: 'icon', 
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
                icon: 'icon', 
                name: 'Ведите складской учет', 
                active: false,
                data:{
                    id: 3,
                    isSoon: false, 
                    title: '3Больше заказов, меньше менеджеров. Обрабатывайте заказы с десятков источников в вашей CRM.',
                    descone: 'Заказы со всех офлайн или онлайн источников попадают в единый список и распределяются между операторами. У каждого клиента единая история коммуникаций, вне зависимости от канала: будь то сайт или магазин для розницы.',
                    desctwo: 'Операторы работают в режиме одного окна — для просмотра товарных остатков магазина, выставления оплаты, оформления доставки и других действий не нужно покидать сервис. Управление торговлей станет эффективнее. ',
                    img: 'order' 
                }
            },
            {
                id: 4, 
                icon: 'icon', 
                name: 'Контролируйте продажи', 
                active: false,
                data:{
                    id: 4,
                    isSoon: true, 
                    title: '4Больше заказов, меньше менеджеров. Обрабатывайте заказы с десятков источников в вашей CRM.',
                    descone: 'Заказы со всех офлайн или онлайн источников попадают в единый список и распределяются между операторами. У каждого клиента единая история коммуникаций, вне зависимости от канала: будь то сайт или магазин для розницы.',
                    desctwo: 'Операторы работают в режиме одного окна — для просмотра товарных остатков магазина, выставления оплаты, оформления доставки и других действий не нужно покидать сервис. Управление торговлей станет эффективнее. ',
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

</style>