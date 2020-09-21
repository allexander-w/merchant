<template>
    <div class="retail-payback-cards">
        <div class="retail-payback-card" 
            v-for = '(card, index) in cards'
            :key='index'
        >
            <h3 class="retail-payback-card-title">
                {{card.title}}
            </h3>
            <p class="retail-payback-card-desc small-paragraph">{{card.desc}}</p>
            <div class="retail-payback-card-list">
                <p class="retail-payback-card-list-item"
                    v-for ='(item, index) in card.list'
                    :key ='`list${index}`'
                ><i class="far fa-check-circle check-icon"></i>{{item.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        cards: [
            {
                title: 'Сотрудники смогут сделать больше работы за то же время.',
                desc: 'Автоматизация ускоряет выполнение многих задач в сотни раз и сокращает почти до нуля количество ошибок. Многие рутинные задачи решаются без менеджеров.',
                list: [
                    {name: 'Меньше сотрудников нужно для той же работы'},
                    {name: 'Больше результатов при тех же расходах'}
                ]
            },
            {
                title: 'Порядок в процессах приведет к росту ключевых показателей.',
                desc: 'В хаосе невозможен рост и развитие бизнеса. Крупный бизнес развивается на фундаменте эффективно выстроенной системы процессов, Именно система позволяет стабильно расти.',
                list: [
                    {name: 'Устраняются места, которые «съедают» прибыль.'},
                    {name: '“Система” работает в десятки раз лучше хаоса.'}
                ]
            }
        ]
    })
}
</script>