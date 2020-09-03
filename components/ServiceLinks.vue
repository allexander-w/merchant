<template>
    <div class="service-links-wrapper">
        <div class="service-link"
            v-for = '(link, index) in links'
            :key = 'index'
        >
            <p class="retail-services-link"
                @click = 'openDesc(link)'
                :class='{"active-link-service": link.active}'
            >{{link.title}}</p>
            <transition name='open-desc'>
                <p class="retail-services-desc small-paragraph" v-if='link.active'>Освойте новые рынки сбыта — это дело пары кликов.</p>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        links: [
            {title: 'Торговые площади', desc: 'Освойте новые рынки сбыта — это дело пары кликов.', active: true},
            {title: 'Cлужбы доставки', desc: 'Освойте новые рынки сбыта — это дело пары кликов.', active: false},
            {title: 'Приложения и сервисы', desc: 'Освойте новые рынки сбыта — это дело пары кликов.', active: false}
        ]
    }),
    methods: {
        openDesc(link) {
            this.links.map(item => {
                item.active = false
            })

            link.active = true
        }
    }
}
</script>

<style lang="scss">


.open-desc-enter-active {
  transition: all .3s ease;
}
.open-desc-leave-active {
  transition: all .3s ease;
}
.open-desc-enter, .open-desc-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
.active-link-service {
    color: #333333;
}
</style>