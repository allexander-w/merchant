<template>
  <div class="retail">
    <section class="retail-header">
      <div class="container">
        <Header />
        <div class="retail-header-main">
          <h3 class="retail-header-title">Один сервис для управления и автоматизации интернет торговли.</h3>
          <p class="retail-header-desc big-paragraph">Наведите порядок в продажах! Мгновенно обрабатывайте заказы с торговых площадок, автоматизируйте учёт товаров и синхронизацию с маркетплейсами, повышайте лояльность с CRM. </p>
          <button class="retail-header-btn standart-btn" @click="$router.push('/signup')">Протестировать бесплатно</button>
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
        <OrdersHeader @chooseHandler = 'selectHandler' />

        <div class="order-slider">
          <OrderView :currentSlide='slider' />
        </div>
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
           
            <ServiceLinks />
          </div>
          <div class="retail-services-info-blocks">
            <ServicesBlocks />
          </div>
          
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
            <p>Политика обработки персональных данных</p>
            <p>Оферта и Лицензионный договор</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from '@/components/Header'
import RetailItems from '@/components/RetailItems'
import OrdersHeader from '@/components/OrdersHeader'
import OrderView from '@/components/OrderView'
import FastStartSteps from '@/components/FastStartSteps'
import RetailPlans from '@/components/RetailPlans'
import PaybackCards from '@/components/PaybackCards'
import Reviews from '@/components/Reviews'
import ServicesBlocks from '@/components/ServicesBlocks'
import ServiceLinks from '@/components/ServiceLinks'

export default {
  components: {ServiceLinks,ServicesBlocks,Header,RetailItems,OrderView,OrdersHeader,FastStartSteps, RetailPlans, PaybackCards, Reviews},
  data: () => ({
    slider: 1
  }),
  methods: {
    selectHandler(id) {
      this.slider = id
    }
  }

}
</script>

<style lang="scss" scoped>
.order-slider {
  width: 100%;
  overflow: hidden;
}
</style>