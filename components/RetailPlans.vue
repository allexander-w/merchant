<template>
    <div class="retail-plans-cards ">
        <div class="retail-plans-card"
            v-for = '(card, index) in cards'
            :key ='index'
        >
            <h3 class="retail-plans-card-title">{{card.title}}</h3>
            <p class="retail-plans-card-desc small-paragraph">{{card.desc}}</p>
            <p class="retail-plans-card-price">{{card.price}}</p>
            <p class="retail-plans-card-warn">{{card.warn}}</p>  
            <div class="retail-plans-card-select">
                <Select :data = 'card.select' v-if='card.select.length' />
            </div>

            <button class="retail-plans-card-button standart-btn" :class="{'transparent-btn': card.buttonType === 'transparent'}">
                {{card.button}}
            </button>
        </div>
    </div>
</template>

<script>
import Select from '@/components/Select'


export default {
    
    data: () => ({
        cards: [
            {
                title: 'Заказы',
                desc: 'Синхронизация заказов из маркетплейсов и торговых площадок с вашей CRM-системой.',
                price: '10 000 Т',
                warn: 'в месяц, не влючая НДС',
                button: 'Протестировать бесплатно',
                buttonType: 'fill',
                select: [
                    {propone: '10000', proptwo: '150 заказов в месяц'},
                    {propone: '25000', proptwo: '500 заказов в месяц'}
                ]
            },
            {
                title: 'Товары',
                desc: 'Синхронизация товаров из вашей 1С с маркетплейсами и CRM-системой.',
                price: '5 000 Т',
                warn: 'в месяц, не влючая НДС',
                button: 'Протестировать бесплатно',
                buttonType: 'fill',
                select: [
                    {propone: '12500', proptwo: '150 заказов в месяц'},
                    {propone: '30000', proptwo: '500 заказов в месяц'}
                ]
            },
            {
                title: 'Торговый учет',
                desc: 'Автоматизируете учёт товаров от поставки до продажи на маркетплейсах и торговых площадках. ',
                price: '5 500 Т',
                warn: 'в месяц, не влючая НДС',
                button: 'Уведомить о запуске',
                buttonType: 'transparent',
                select: []
            }
        ]
    }),
    components: {
        Select
    }
}
</script>
