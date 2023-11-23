<template>
    <div :class="{ stuck: scrolled }">
        <Header></Header>
    </div>
    <div class="main-content">
        <Main></Main>
    </div>
    <div>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from '../components/header/Header.vue';
import Main from '../components/Main.vue';
import Footer from '../components/Footer.vue';
import './globalDefaultLayoutStyle.scss';
export default {
    components: {
        Header,
        Main,
        Footer,
    },
    data() {
        return {
            scrolled: false,
            showScrollButton: false,
        };
    },
    mounted() {
        window.addEventListener('scroll', this.scrollFunction);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollFunction);
    },
    methods: {
        scrollFunction() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                this.scrolled = true;
            } else {
                this.scrolled = false;
            }
            if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
                this.showScrollButton = true;
            } else {
                this.showScrollButton = false;
            }
        },
    },
};
</script>

<style lang="scss">
.stuck {
    top: 0;
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;
    animation: scrollheader 0.7s ease;
    z-index: 8;
}

@keyframes scrollheader {
    from {
        top: -80px;
    }
    to {
        top: 0;
    }
}
.main-content {
    z-index: 2;
}
.btn-back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: block;
}
</style>
