<template>
    <div class="retail-items">
        <div class="retail-item"
            v-for='(item, index) in items'
            :key= 'index'
        >
            <i :class="item.icon" class="retail-items-ic"></i>

            <div class="items-title">
                {{item.title}}
            </div>

            <p class="items-desc small-paragraph">
                {{item.desc}}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        items: [
            {icon: 'fal fa-rabbit-fast', title: 'В разы повысьте вашу производительность', desc: 'То, что раньше занимало полчаса, вы сможете сделать в два клика. itl.merchant сам создаст заказ и клиента, проверит на дубли, синхронизирует статусы заказа, сформирует фиды. '},
            {icon: 'far fa-bullseye-arrow', title: 'Принимайте верные решения за счет аналитики', desc: 'Забудьте о работе в нескольких системах. Объедините всю команду в вашей CRM и принимайте решения быстрее благодаря хранению ключевых данных в одном месте.'},
            {icon: 'far fa-grin-hearts', title: 'Предоставьте вашим клиентам лучший сервис', desc: 'Получите лояльных клиентов, готовых покупать снова и снова, с минимальными усилиями. Itl.merchant поможет вам с ввязке с вашей CRM.'}
        ]
    })
}
</script>

<style lang="scss">
.retail-items-ic {
    font-size: 48px;
    color: #0E6CDD;
    margin-bottom: 24px;
}
</style>