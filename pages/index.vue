<template>
  <div class="retail">
    <section class="retail-header">
      <div class="container">
        <Header />
        <div class="retail-header-main">
          <h3 class="retail-header-title">Один сервис для управления и автоматизации интернет торговли.</h3>
          <p class="retail-header-desc big-paragraph">Наведите порядок в продажах! Мгновенно обрабатывайте заказы с торговых площадок, автоматизируйте учёт товаров и синхронизацию с маркетплейсами, повышайте лояльность с CRM. </p>
          <nuxt-link to='/signup'>
            <button class="retail-header-btn standart-btn">Протестировать бесплатно</button>
          </nuxt-link>
        </div>
      </div>
    </section>

    <section class='retail-description'>
      <div class="container">
        <RetailItems />
      </div>
    </section>

    <section class="retail-orders">
      <div class="container">
        <OrderSlider />
      </div>
    </section>

    <section class="retail-fast-start">
      <div class="container">
        <h3 class="fast-start-title main-title">
          Быстрый старт
        </h3>
        <p class="fast-start-desc small-paragrapgh">
          На каждом этапе вы получите подробную инструкцию и помощь наших специалистов. Весь процесс займет не больше пару дней. 
        </p>
        
        <FastStartSteps />
      </div>
    </section>
    <div class="line"></div>
    <section class="retail-services">
      <div class="container">
        <div class="retail-services-info-wrapper">
          <div class="retail-services-info">
            <h3 class="retail-services-title main-title">
              Интегрируйте сервисы, которые вы уже используете.
            </h3>
            <p class="retail-services-description small-paragraph">Подключите необходимые бизнес-инструменты к itl.merchant и сделайте его вашим центром управления интернет-продажами.</p>
            <div class="service-links-wrapper">
              <div class="service-link"
                  v-for = '(link, index) in links'
                  :key = 'index'
              >
                  <p class="retail-services-link"
                      @click = 'openDesc(link)'
                      :class='{"active-link-service": link.active}'
                  >{{link.title}}</p>
                  <transition name='open-desc'>
                      <div class="retail-services-desc" v-if='link.active'>
                          <p class="small-paragraph">Освойте новые рынки сбыта — это дело пары кликов.</p>
                      </div>
                  </transition>
              </div>
          </div>
          </div>
            <ServicesBlocks :services = 'links[curLink].services' class="retail-services-info-blocks" />
        </div>
      </div>
    </section> 

    <section class="retail-plans">
      <div class="container">
        <h3 class="retail-plans-title main-title">Тарифные планы</h3> 
        <RetailPlans />
      </div>
    </section>

    <section class="retail-payback">
      <div class="container">
        <h3 class="retail-payback-title">За счет чего окупятся ваши вложения:</h3>
        
        <PaybackCards />
      </div>
    </section> 

    <section class="retail-reviews">
      <div class="container">
        <div class="retail-reviews-title main-title">Отзывы</div>
        <p class="retail-reviews-title big-paragraph">Посмотрите, что наши клиенты скажут о нас:</p>

        <Reviews />
      </div>
    </section>

    <section class="retail-footer">
      <div class="container">
        <div class="retail-footer-title main-title">
          Попробуйте itl.merchant в действии!
        </div>

        <p class="retail-footer-desc big-paragraph">30 дней бесплатно, без каких-либо ограничений.</p>

        <button class="standart-btn retail-footer-btn">Протестировать бесплатно</button>

        <div class="retail-footer-underfooter">
          <p>© 2020 itl.merchant. ТОО ITL KZ</p>
          <div class="right-underfooter">
            <nuxt-link to='#'>Политика обработки персональных данных</nuxt-link>
            <nuxt-link to='#'>Оферта и Лицензионный договор</nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from '@/components/Header'
import RetailItems from '@/components/RetailItems'
import FastStartSteps from '@/components/FastStartSteps'
import RetailPlans from '@/components/RetailPlans'
import PaybackCards from '@/components/PaybackCards'
import Reviews from '@/components/Reviews'
import ServicesBlocks from '@/components/ServicesBlocks'
import OrderSlider from '@/components/OrderSlider'

export default {
  components: {OrderSlider,ServicesBlocks,Header,RetailItems,FastStartSteps, RetailPlans, PaybackCards, Reviews},
  data: () => ({
    curLink: 0,
    links: [
      {
        id: 0,
        title: 'Торговые площади',
        desc: 'Освойте новые рынки сбыта — это дело пары кликов.', 
        active: true,
        services: [
            {logo: 'kaspi', color: '239, 70, 53', isSoon: false},
            {logo: 'satuserv', color: '114, 42, 139', isSoon: false},
            {logo: 'wildberries', color: '173, 17, 156', isSoon: true},
            {logo: 'fortemarket', color: '173, 17, 156', isSoon: true}
        ]
      },
      {
        id: 1,
        title: 'Cлужбы доставки', 
        desc: 'Освойте новые рынки сбыта — это дело пары кликов.', 
        active: false,           
        services: [
            {logo: 'bitrix24', color: '11, 187, 239', isSoon: false},
            {logo: 'amocrm', color: '50, 157, 199', isSoon: false},
            {logo: '1c', color: '217, 25, 32', isSoon: false},
            {logo: 'retail', color: '238, 52, 51', isSoon: true},
            {logo: '1cbitrix', color: '238, 52, 51', isSoon: true},
            {logo: 'alpha', color: '201, 36, 51', isSoon: true},
        ]
      },
      {
        id: 2,
        title: 'Приложения и сервисы', 
        desc: 'Освойте новые рынки сбыта — это дело пары кликов.', 
        active: false,
        services: [
            {logo: 'dpd', color: '239, 70, 53', isSoon: true},
            {logo: 'cdek', color: '65, 104, 158', isSoon: true},
        ]
      }
    ]
  }),
  methods: {
    openDesc(link) {
      this.links.map(item => {
          item.active = false
      })
      link.active = true
      this.curLink = link.id
    }
  }
}
</script>

<style lang="scss" scoped>
.dashline{
  position: absolute;
  bottom: 190px;
}
.open-desc-enter-active {
  transition: all .3s ease;
}
.open-desc-leave-active {
  transition: all .3s ease;
}
.open-desc-enter, .open-desc-leave-to {
  height: 0;
  opacity: 0;
}
.active-link-service {
    color: #333333;
}
</style>