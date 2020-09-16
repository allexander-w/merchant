<template>
    <div class="services-blocks-wrapper">
        <div class="services-block"
            v-for='(service,index) in services'
            :key = 'index'
            :style ='{
                "--bg": `rgba(${service.color}, .06`,
                "--bghover": `rgba(${service.color}, .1`
            }'
        >
            <div class="service-soon" v-if = 'service.isSoon'>
                <p>Скоро</p>
            </div>
            <img :src="require(`../assets/img/${service.logo}.svg`)" alt="" v-if='!service.nologo'>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        services: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style lang="scss">

.services-block {
    background-color: var(--bg);
    transition: .3s ease-out;
}
.services-block:hover {
    background-color: var(--bghover);
}
</style>