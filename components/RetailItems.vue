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
            {icon: 'far fa-grin-hearts', title: 'В разы повысьте вашу производительность', desc: 'То, что раньше занимало полчаса, вы сможете сделать в два клика.  Сервис сделает сложные расчеты, сформирует пакет документов, выставит счет, отправит письмо и смс.'},
            {icon: 'far fa-bullseye-arrow', title: 'Принимайте верные решения за счет аналитики', desc: 'То, что раньше занимало полчаса, вы сможете сделать в два клика.  Сервис сделает сложные расчеты, сформирует пакет документов, выставит счет, отправит письмо и смс.'},
            {icon: 'fal fa-rabbit-fast', title: 'Предоставьте вашим клиентам лучший сервис', desc: 'То, что раньше занимало полчаса, вы сможете сделать в два клика.  Сервис сделает сложные расчеты, сформирует пакет документов, выставит счет, отправит письмо и смс.'}
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