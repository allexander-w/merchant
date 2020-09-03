<template>
    <div class="select-dropdown-wrapper">
        <div class="select-header" v-click-outside="hide" @click='isOpen = true' :class='{"active-select": isOpen}'>
            <span class="select-header-name">{{header}}</span>
            <div class="select-icon">
                <img src="../assets/img/up.svg" alt="">
                <img src="../assets/img/down.svg" alt="">
            </div>
        </div>
        <transition name='open-dropdown'>
            <div class="select-dropdown" v-show='isOpen'>
                <div class="select-dropdown-item" 
                    v-for = '(item, index) in data'
                    :key = 'index'
                    @click='makeSelect(item)'
                >
                    <p class="property-one">
                        {{item.propone}}
                    </p>
                    <p class="property-two">
                        {{item.proptwo}}
                    </p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },
    directives: {
        ClickOutside
    },
    data: () => ({
        isOpen: false,
        header: 'name'
    }),
    methods: {
        makeSelect(item) {
            this.header = item.propone
            this.isOpen = false
        },
        hide() {
            this.isOpen= false
        }
    },
    mounted() {
        this.header = this.data[0].propone;
    }
}
</script>

<style lang="scss">
.open-dropdown-enter-active, .open-dropdown-leave-active {
  transition: all .3s ease;
}
.open-dropdown-enter, .open-dropdown-leave-to  {
  height: 0;
  opacity: 0;
}
</style>