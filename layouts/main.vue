<template>
    <div class="main-layout">
        <MainHeader class="main-layout-header" />    
        <div class="main-layout-content">
            <MerchantHeader />
            <Nuxt class="main-layout-content-wrapper" />    
        </div>
    </div>
</template>

<script>
import MainHeader from '@/components/main/MainHeader'
import MerchantHeader from '@/components/main/MerchantHeader'
export default {
    components: {
        MainHeader, MerchantHeader
    }
}
</script>