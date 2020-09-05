<template>
    <div class="merch-header">
        <div class="merch-header-links">
            <nuxt-link class="merch-header-link"
                v-for = '(menuItem, index) in menu'
                :key='index'
                :to='menuItem.path'
                :exact='menuItem.exact'
                active-class="merch-header-active-link"
            >
                {{menuItem.name}}
            </nuxt-link>
        </div>

        <div class="merch-header-dropdowns">
            <div class="merch-header-dropdown-cash-wrapper" v-click-outside="hideCash">
                <div class="merch-header-dropdown-cash" :class="{'active-dropdown': isOpenCash}"  @click="isOpenCash = true">
                    <i class="fas fa-tenge dropdown-icon"></i> <span class="merch-header-dropdown-text">Баланс: {{balance}} Т </span> <i class="fas fa-caret-down"></i>
                </div>
                <div class="dropdown-cash-body" :class="{'active-dropdown': isOpenCash}" v-show='isOpenCash'>
                    <div class="dropdown-cash-orders dropdown-cash-block" 
                        v-for="(dropdown, index) in dropdownData"
                        :key = 'index'
                    >
                        <div class="dropdown-cash-orders-wrapper">
                            <p class="dropdown-cash-orders-text">
                                {{dropdown.name}}: {{dropdown.used}} из {{dropdown.total}}
                            </p> 
                            <div class="dropdown-cash-orders-progressbar">
                                <div class="dropdown-cash-orders-progressbar-active" :style='`width: ${ 181 * ( (dropdown.used / (dropdown.total / 100)) / 100 ) }px`'>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dropdown-cash-block dropdown-add">
                        Пополнить счет
                    </div>
                    
                </div>
            </div>
            
            <div class="merch-header-dropdown-name-wrapper" v-click-outside="hideName">
                <div class="merch-header-dropdown-name" :class="{'active-dropdown': isOpenName}"  @click="isOpenName = true">
                    <i class="far fa-id-card-alt dropdown-icon"></i><span class="merch-header-dropdown-text"> {{merchantName || 'Название'}} </span> <i class="fas fa-caret-down"></i>
                </div>
                <div class="dropdown-name-body" :class="{'active-dropdown': isOpenName}" v-show='isOpenName'>
                    <div class="dropdown-name-body-item"
                        v-for="(item, index) in userData"
                        :key='index'
                        @click='$router.push(item.path)'
                    >
                        {{item.name}}
                    </div>
                    <div class="dropdown-name-body-item last-btn-dropdown" @click='$router.push("/merchant")'>
                        Сменить мерчант
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
    data: () => ({
        ordersMenu: [
            {id: 1, name: 'Заказы', active: true, path: '/merchant/orders', exact: true},
            {id: 2, name: 'Источники', active: false, path: '/merchant/orders/sources', exact: false},
        ],
        userMenu: [
            {id: 1, name: 'Профиль', active: true, path: '/merchant/user', exact: true},
            {id: 2, name: 'Ключи API', active: false, path: '/merchant/user/apikeys', exact: false},
        ],
        partnersMenu: [
            {id: 1, name: 'Клиенты', active: true, path: '/merchant/partners', exact: true},
            {id: 2, name: 'История операций', active: false, path: '/merchant/partners/history', exact: false},
            {id: 3, name: 'Отчетные документы', active: false, path: '/merchant/partners/docs', exact: false},
            {id: 4, name: 'Договор', active: false, path: '/merchant/partners/moremore', exact: false},
        ],
        dropdownData: [
            {id: 1, name: 'Заказы', used: 146, total: 500},
            {id: 2, name: 'Товары', used: 2456, total: 5000},
            {id: 3, name: 'Доставки', used: 246, total: 500}
        ],
        userData: [
            {id: 1, name: 'Профиль компании', path: '/merchant/user'},
            {id: 2, name: 'Баланс и платежи', path: '/merchant/user'},
        ],
        isOpenCash: false,
        isOpenName: false,
        balance: 0
    }),
    directives: {
        ClickOutside
    },
    computed: {
        merchantName() {
            return JSON.parse(localStorage.getItem('merchant')).merchantName
        },
        menu() {
            
            if ( this.$route.name.includes('merchant-orders') ) { return this.ordersMenu }
            if ( this.$route.name.includes('merchant-partners') ) { return this.partnersMenu }
            if ( this.$route.name.includes('merchant-user') ) { return this.userMenu }

            return this.ordersMenu
        }
    },
    methods: {
        selectHandler(item) {
            this.menu.map(item => item.active = false)
            item.active = true

            this.$router.push(item.path)
        },
        hideCash() {
            this.isOpenCash = false
        },
        hideName() {
            this.isOpenName = false
        }
    },
    async mounted() {
        this.balance = await (await this.$store.dispatch('merchants/MERCHANT')).data[0].balance
    }
}
</script>

<style lang="scss">
.merch-header {
    display: flex;
    justify-content: space-between;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid rgba(#0E6CDD, .15);
    background-color: #F1F6FD;

   
    &-links {
        display: flex;
        padding-left: 40px;
    }
    &-link {
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #333333;
        
        padding: 0 16px;
        margin-right: 24px;
        &:last-child{
            margin-right: 0;
        }
    }
    
    &-dropdowns {
        display: flex;
    }
    &-dropdown-text {
        padding: 0 16px;
        font-size: 18px;
        color: #333333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 245px;
    }
    &-active-link {
        border-bottom: 1px solid #0E6CDD;
        color: #005CCC;
    }
    &-dropdown-cash {
        &-wrapper {
            position: relative;
            min-width: 245px;
        }
        height: 80px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid rgba(#0E6CDD, .15);
        border-left: 1px solid rgba(#0E6CDD, .15);
    }
    &-dropdown-name {
        
        &-wrapper {
            position: relative;
            min-width: 297px;
        }
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
}
.active-dropdown {
    background-color: #fff;
    box-shadow: 0px 0px 40px rgba(51, 51, 51, 0.08);
}
.dropdown-cash {
    &-block {
        height: 72px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid rgba(#0E6CDD, .1);
    }
    &-orders {
        &-progressbar {
            width: 181px;
            height: 5px;
            background: rgba(#0E6CDD, .15);
            border-radius: 2px;
            &-active {
               
                height: 5px;
                background: #0E6CDD;
                border-radius: 2px; 
            }
        }
    }
}
.dropdown-cash-body {
    position: absolute;
    z-index: 2;
    min-height: 280px;
    min-width: inherit;
    background-color: #fff;
    box-shadow: 0px 0px 40px rgba(51, 51, 51, 0.08);
}
.dropdown-name-body {
    position: absolute;
    z-index: 2;
    min-height: 140px;
    min-width: inherit;
    background-color: #fff;
    box-shadow: 0px 0px 40px rgba(51, 51, 51, 0.08);
    padding-bottom: 12px;
    &-item{
            height: 50px;
            cursor: pointer;
            padding-left: 32px;
            display: flex;
            align-items: center;
            color: #333333;
            transition: .3s ease;

            &:hover {
                color: #005CCC;
            }
        }
}
.active-dropdown {
    border: 0px solid #fff;
    background-color: #fff;
    box-shadow: 0px 30px 40px rgba(51, 51, 51, 0.08);
}
.dropdown-icon {
    color: #0E6CDD;
}
.dropdown-add {
    border-bottom: 0px solid #000;
    font-size: 16px;
    color: #005CCC;
    cursor: pointer;
}
.last-btn-dropdown {
    border-top: 1px solid rgba(#0E6CDD, .1);
}
</style>