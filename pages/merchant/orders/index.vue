<template>
    <div class="merchant">
        <div class="merchant-search">
            <div class="merchant-search-input-wrapper">
                <i class="fas fa-search merchant-search-icon"></i>
                <input type="text" placeholder="Поиск заказа" class="merchant-search-input">
            </div>
            <button class="standart-btn merchant-add-btn"><i class="fal fa-plus"></i> Добавить </button>
        </div>

        <div class="merchant-table">    
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Название</td>
                        <td>Источник</td>
                        <td>Дата</td>
                        <td>Стадия</td>
                        <td>Сумма</td>
                        <td class="merchant-table-unload-head">Выгружен</td>
                        <td class="merchant-table-unload-head">Завершен</td>
                        <td class="merchant-table-button-head">-</td>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>230967843</td>
                        <td>Заказ №123456789</td>
                        <td>Kaspi</td>
                        <td>22.01.2019</td>
                        <td>На подписании</td>
                        <td>999 999 ₸</td>
                        <td class="merchant-table-unload"><i class="fal fa-check check-icon"></i></td>
                        <td class="merchant-table-unload"><i class="fal fa-check check-icon"></i></td>
                        <td class="merchant-table-button-wrapper">
                            <div class="merchant-table-button-inner"
                                v-click-outside="uploadHide"
                            >
                                <div class="merchant-table-button"
                                    @click='isUpload = true'
                                >
                                    <i class="far fa-upload"></i>
                                </div>
                                <transition name="table-button">
                                    <div class="merchant-table-upload-menu" v-show='isUpload'>
                                        Выгрузить в CRM
                                    </div>
                                </transition>
                            </div>

                            <div class="merchant-table-button-inner"
                                v-click-outside="menuHide"
                            >
                                <div class="merchant-table-button"
                                    @click='isMenu = true'
                                >
                                    <i class="fal fa-ellipsis-v"></i>
                                </div>
                                <transition name="table-menu">
                                    <div class="merchant-table-addition-menu" v-show='isMenu'>
                                        <ul>
                                            <li class="merchant-table-addition-menu-item"><i class="fal fa-plus"></i> Пункт</li>
                                            <li class="merchant-table-addition-menu-item"><i class="fal fa-plus"></i> Пункт</li>
                                        </ul>
                                    </div>
                                </transition>
                            </div>


                            
                        </td>
                    </tr>
                    
                    
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
    middleware: ['auth', 'merchant'],
    data: () => ({
        isUpload: false,
        isMenu: false
    }),
    layout: 'main',
    methods: {
        uploadHide () {
            this.isUpload = false
        },
        menuHide() {
            this.isMenu = false
        }
    },
    directives: {
        ClickOutside
    }
}
</script>

<style lang="scss">
.check-icon {
    color: #34A853;
}
.table-button-enter-active {
  transition: all .3s ease;
}
.table-button-leave-active {
  transition: all .3s ease;
}
.table-button-enter, .table-button-leave-to {
    transform: scale(1, 0);
    transform-origin: bottom;
    opacity: 0;
}

.table-menu-enter-active {
  transition: all .3s ease;
}
.table-menu-leave-active {
  transition: all .3s ease;
}
.table-menu-enter, .table-menu-leave-to {
    transform: scale(1, 0);
    transform-origin: top;
    opacity: 0;
}
.merchant {
    width: 100%;
    
    &-add-btn {
        padding: 0 10px;
        width: 141px;
        height: 40px;
        background: #FFD740;
        border-radius: 5px;
    }
    &-table-upload-menu{
        position: absolute;
        background-color: #fff;
        width: 125px;
        padding: 0 5px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        top: -42px;
        box-shadow: 0px 0px 40px rgba(51, 51, 51, 0.08);
        font-size: 13px;
        left: -80px;
        color: #333333;
        border-radius: 4px;

        &::after {
            content: '';
            width: 24px;
            height: 6px;
            position: absolute;
            right: 12px; top: 20px;
            border: 24px solid transparent;
            border-left: 8px solid #fff;
            transform: rotate(90deg);
        }
    }
     &-table-addition-menu{
        border-radius: 4px;
        position: absolute;
        background-color: #fff;
        width: 177px;
        min-height: 92px;
        padding: 20px;
        display: flex;
        top: 42px;
        box-shadow: 0px 0px 40px rgba(51, 51, 51, 0.08);
        right: -16px;
        font-size: 16px;
        color: #333333;
        ul {
            width: inherit;
            
        }

        &-item {
            padding: 12px 0;
            margin: 0 -20px;
            padding: 20px;
            &:hover {
                background: rgba(#005CCC, .1);
                
                
            }
        }
        &::after {
            content: '';
            width: 24px;
            height: 6px;
            position: absolute;
            right: 16px; top: -38px;
            border: 24px solid transparent;
            border-left: 8px solid #fff;
            transform: rotate(-90deg);
        }
    }
    
    &-table-button {
        width: 32px;
        height: 32px;
        background: rgba(#005CCC, .1);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        &-inner {
            position: relative;
        }

        i {
            color: #0E6CDD;
        }

        &-head {
            width: 160px;
        }
        &-wrapper {
            display: flex;
            justify-content: space-between;
        }
    }
    &-table-unload {
        text-align: center;
        
        &-head {
            width: 80px;
        }
    }
    &-add-icon {
        margin-right: 8px;
    }
    &-search {
        padding: 0 32px;
        display: flex;
        justify-content: space-between;
        height: 81px;
        align-items: center;
        &-icon {
            font-size: 16px;
            color: rgba(#00479C, .3);
        }
        
        &-input {
            border: none;
            outline: none;
            background-color: transparent;
            font-size: 16px;
            width: 90%;
            color: #333333;
            padding-left: 16px;
            &::placeholder {
                font-size: 16px;
                color: rgba(#00479C, .3);
            }

            &-wrapper {
                flex-grow: 1;
                border: none;
            }
        }
    }
}

table {width: 100%; border-collapse: collapse;}
table td {padding: 12px 32px;}
table thead tr {
    font-size: 16px;
    color: rgba(#00479C, .4);
    border-top: 1px solid #e8e9eb;
    height: 56px;
    border-bottom: 1px solid #e8e9eb;
}
table tr {
    height: 64px;
    background-color: #fff;
    border-bottom: 1px solid #e8e9eb;
    
}
table tbody tr {
    cursor: pointer;
}
table tbody tr:hover {background: #e8f6ff;}
@media screen and (max-width: 1366px) {
    table thead tr {
        font-size: 14px;
    }
    table tbody td {
        font-size: 14px;
    }
}
</style>