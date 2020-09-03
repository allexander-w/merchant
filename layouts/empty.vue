<template>
    <div class="main-layout">
        <EmptyHeader class="main-layout-header" />    
        <div class="main-layout-content">
            <Nuxt class="main-layout-content-wrapper" />    
        </div>
    </div>
</template>

<script>
import EmptyHeader from '@/components/merchant/EmptyHeader'
import MerchantHeader from '@/components/main/MerchantHeader'

export default {
    components: {
        EmptyHeader, MerchantHeader
    }
}
</script>