<template>
    <div class="main-header">
        <ul class="upper-navigation">
            <li class="header-navigation-item">
                <img src="../../assets/img/logoheader.svg" alt="">
            </li>
        </ul>

        <ul class="down-navigation">
            <!-- <li class="header-navigation-item"
                v-for =' (navItem, index) in downNavigation'
                :key = 'index'
                :class="{'active-header-nav-item': navItem.active}"
                @click="selectHandler(navItem)"
            >
                <i class='header-nav-icon' :class="navItem.icon"></i>
            </li> -->
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
            {id: 1, icon: 'far fa-shopping-cart', desc: 'Описание', active: true},
            {id: 2, icon: 'fal fa-boxes-alt', desc: 'Описание', active: false},
            {id: 3, icon: 'far fa-dolly', desc: 'Описание', active: false},
        ],
        downNavigation: [
            {id: 4, icon: 'fal fa-user-circle', desc: 'Описание', path: '/merchant/user-settings', active: false},
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