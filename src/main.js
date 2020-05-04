import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuex from "vuex";
import axios from "../src/utils/dynamicAxios";
import "lib-flexible"; // 引入 flexible用于适配不同屏幕移动端显示
import changeFontSize from "./setHtmlFontSize";
// import 'amfe-flexible'
// import './hotcss.js'

import Vant from "vant"; // 引入vant组件库
import echarts from "echarts"; // 引入echarts用于图表展示
import "vant/lib/index.css";

// 引入自定义公共样式
import css from "./css/index.css";

import { responseCode } from "../src/utils/responseCode"; // 引入后端返回code码
import { SwipeCell } from "vant"; // 左右滑动弹出编辑、删除等
import { Field } from "vant";
import touch from "vue-directive-touch"; // 滑动：长按，左右划等
import { Overlay } from "vant"; // 遮罩层
import { ActionSheet } from "vant"; // 上拉菜单
import { DropdownMenu, DropdownItem } from "vant"; // 下拉菜单
import { Notify } from "vant"; // 顶部提示
import { PullRefresh } from 'vant';   //下拉刷新
// Vue.use(responseCode)
// Vue.use(Notify);
Vue.use(Vuex);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(ActionSheet);
Vue.use(Overlay);
Vue.use(touch);
Vue.use(Field);
Vue.use(SwipeCell);
Vue.use(Vant);
Vue.use(PullRefresh); //下拉刷新
Vue.config.productionTip = false;
Vue.prototype.$axios = axios; // 全局挂载axios
Vue.prototype.$echarts = echarts; // 全局挂载echarts

Vue.prototype.$responseCode = responseCode; // 全局挂载返回的code码
Vue.prototype.$Notify = Notify; // 顶部提示设置位vue方法

Vue.prototype.$changeFontSize = new changeFontSize(); // 全局挂载修改字体大小的js

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
