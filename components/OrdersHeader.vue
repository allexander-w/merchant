<template>
    <div class="order-header">
        <div class="order-header-item"
            v-for = '(item, index) in data'
            :key ='`index${index}`'
            :class="{'active-order-header-item': item.active}"
            @click="chooseHandler(item)"
            
        >
            <i class="fad fa-shopping-cart cart-icon"></i> <span class="order-header-item-name">{{item.name}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        data: [
            {id: 1, icon: 'icon', name: 'Обрабатывайте заказы', active: true},
            {id: 2, icon: 'icon', name: 'Синхронизируйте товары', active: false},
            {id: 3, icon: 'icon', name: 'Ведите складской учет', active: false},
            {id: 4, icon: 'icon', name: 'Контролируйте продажи', active: false}
        ],
        activeItem: 1
    }),
    methods: {
        chooseHandler(item){
            this.data.map(item => {
                item.active = false
            })
            item.active = true
            this.$emit('chooseHandler', item.id)
            
        }
    }
}
</script>