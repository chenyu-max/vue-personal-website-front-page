<template>
    <div class="home-container" ref="container" @wheel="handleWheel" v-loading="loading">
        <ul class="carousel-container" :style="{marginTop}" @transitionend="handleTransitionEnd">
            <li v-for="item in data" :key="item.id">
                <CarouseItem :carousel="item"></CarouseItem>
            </li>
        </ul>

        <div class="icon icon-up" v-show="index >= 1" @click="switchTo(index - 1)">
            <Icon type="arrowUp"></Icon>
        </div>
        <div class="icon icon-down" v-show="index < data.length -1 " @click="switchTo(index + 1)">
            <Icon type="arrowDown"></Icon>
        </div>

        <ul class="indicator">
            <li v-for="(item, i) in data"
                :key="item.id"
                :class="{
              active: index === i
          }"
                @click="switchTo(i)"
            ></li>
        </ul>

    </div>
</template>

<script>
import CarouseItem from "./CarouseItem";
import Icon from "@/components/Icon";
import {mapState} from "vuex";

export default {
    name: "Home",
    components: {
        CarouseItem,
        Icon
    },
    data() {
        return {
            index: 0, // 当前显示的是第几张轮播图 从0 开始
            containerHeight: 0, // 整个容器的高度
            switching: false, // 是否正在翻页切换中
        }
    },
    computed: {
        // 计算需要位移多少距离
        marginTop() {
            return -this.index * this.containerHeight + "px";
        },
        ...mapState("banner", ['loading', 'data']),
    },
    mounted() {
        // 获得容器的高度
        this.containerHeight = this.$refs.container.clientHeight;
        // 生成dom 之后 在挂载之前 如果容器的高度发生了改变，那么，改变容器的高度
        window.addEventListener("resize", this.handleResize);
    },
    destroyed() {
        // 销毁组件的时候，同时移除
        window.removeEventListener("resize", this.handleResize);
    },
    created() {
        this.$store.dispatch("banner/fetchBanner");
    },
    methods: {
        switchTo(i) {
            this.index = i;
        },
        handleWheel(e) {
            if (this.switching) {
                return;
            }
            if (e.deltaY < -5 && this.index > 0) {
                // 往上滚动
                this.switching = true;
                this.index--;
            } else if (e.deltaY > 5 && this.index < this.data.length - 1) {
                // 往下滚动
                this.switching = true;
                this.index++;
            }
        },
        // 在过渡动画结束的时候，switching（正在切换）改为false
        handleTransitionEnd() {
            this.switching = false;
        },
        handleResize() {
            this.containerHeight = this.$refs.container.clientHeight;
        },
    }
}
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";

.home-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    // BFC 避免外边距合并

    //测试
    //width: 60%;
    //height: 40%;
    //overflow: visible;
    //border: 2px solid #008c8c;
    //margin: 100px auto;


    ul {
        margin: 0;
        list-style: none;
        padding: 0;
    }
}

.carousel-container {
    width: 100%;
    height: 100%;
    transition: .5s;

    li {
        width: 100%;
        height: 100%;
    }

}

.indicator {
    .self-center();
    transform: translateY(-50%);
    left: auto;
    right: 20px;

    li {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: @words;
        cursor: pointer;
        margin-bottom: 10px;
        border: 1px solid #fff;
        box-sizing: border-box;
        transition: all .5s;

        &.active {
            background-color: #fff;
        }
    }

}

.icon {
    .self-center();
    font-size: 30px;
    color: @gray;
    @gap: 25px;
    cursor: pointer;
    transform: translateX(-50%);

    &-up {
        top: @gap;
        animation: jump-up 2s infinite;
    }

    &-down {
        top: auto;
        bottom: @gap;
        animation: jump-down 2s infinite;
    }

    @jump: 5px;
    @keyframes jump-up {
        0% {
            transform: translate(-50%, @jump);
        }
        50% {
            transform: translate(-50%, -@jump);
        }
        100% {
            transform: translate(-50%, @jump);
        }
    }
    @keyframes jump-down {
        0% {
            transform: translate(-50%, -@jump);
        }
        50% {
            transform: translate(-50%, @jump);
        }
        100% {
            transform: translate(-50%, -@jump);
        }
    }

}

</style>