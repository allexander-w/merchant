<template>
    <div class="main-header">
        <ul class="upper-navigation">
            <li class="header-navigation-item">
                <img src="../../assets/img/logoheader.svg" alt="">
            </li>
            <nuxt-link  class="header-navigation-item"
                v-for =' (navItem, index) in upNavigation'
                :key = 'index'
                active-class="active-header-nav-item"
                :to='navItem.path'
            >
                <i class='header-nav-icon' :class="navItem.icon"></i>
            </nuxt-link>
        </ul>

        <ul class="down-navigation">
            <nuxt-link class="header-navigation-item"
                v-for =' (navItem, index) in downNavigation'
                :key = 'index'
                active-class="active-header-nav-item"
                :to='navItem.path'
            >
                <i class='header-nav-icon' :class="navItem.icon"></i>
            </nuxt-link>
        </ul>
    </div>
</template>
<script>
export default {
    data: () => ({
        upNavigation: [
            {id: 1, icon: 'far fa-shopping-cart', desc: 'Описание', path: '/merchant/orders'},
            {id: 2, icon: 'fal fa-boxes-alt', desc: 'Описание', path: '#'},
            {id: 3, icon: 'far fa-dolly', desc: 'Описание', path: '##'},
        ],
        downNavigation: [
            {id: 4, icon: 'far fa-handshake', desc: 'Описание', path: '/merchant/partners'},
            {id: 5, icon: 'fal fa-user-circle', desc: 'Описание', path: '/merchant/user'},
        ]

    }),
    methods: {
        selectHandler(item) {
            this.upNavigation.map(item => {
                item.active = false
            })
            this.downNavigation.map(item => {
                item.active = false
            })

            item.active = true
        }
    }
}
</script>