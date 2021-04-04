<template>
    <div class="app-container">
        <Layout>
            <template #left>
                <div class="aside">
                    <SiteAside/>
                </div>
            </template>
            <template #default>
                <RouterView/>
            </template>
        </Layout>
        <ToTop/>
    </div>
</template>

<script>

import Layout from "./components/Layout";
import SiteAside from "./components/SiteAside";
import ToTop from "./components/ToTop";

export default {
    components: {
        Layout,
        SiteAside,
        ToTop,
    },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";

.app-container {
    .self-fill(fixed);
}

.aside {
    width: 250px;
    height: 100%;

    ::-webkit-scrollbar-thumb {
        background: #737af6;
        border-radius: 10px;
    }

    ::-webkit-scrollbar {
        width: 4px;
        height: 3px;
    }

}
</style>
