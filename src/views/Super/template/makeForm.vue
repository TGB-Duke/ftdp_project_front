<!--
*@描述:拖拽主页面
*@版本:V1.0
*@作者:白爱民
*@Date:2020年3月25日16:49:10
*@最后修改人:herry
*@LastEditTime:2020年3月25日16:49:15
*@说明：
1. 还需要分别添加两个相同的如何记录， 
2. 页面已经存在时和当当拖拽过来如何判断
-->

<template>
  <div>
    <!-- 抬头 -->
    <div class="title commonColor">
      <div class="buttonLeft" @click="returnPage()">返回</div>
      <div class="buttonRight" @click="nextStep()">下一步</div>
      <div class="titleName">编辑模板</div>
    </div>

    <!-- 页面框内容 -->
    <div id="addTemplate" class="allTemplate" v-touch:right="eventFun">
      <div v-for="(item ,i) in templateList ">
        <div v-if="templateList[i] =='0'">
          <img @click="spliceList(i)" :src="cross" alt />
          <div @click="showUser()">
            <user :isTrueList="isTrueUserList" class="publicAll user"></user>
          </div>
        </div>
        <div v-if="templateList[i] =='1'">
          <img @click="spliceList(i)" :src="cross" alt />
          <div @click="showInfoShow()">
            <infoShow class="publicAll infoShow"></infoShow>
          </div>
        </div>

        <div v-if="templateList[i] =='2'">
          <img @click="spliceList(i)" :src="cross" alt />

          <numberIndex class="publicAll numberIndex"></numberIndex>
        </div>
      </div>
    </div>

    <!-- 修改user页面底部弹框 -->
    <siteUser
      :siteUserShowP="siteUserShow"
      :isTrueListP="isTrueUserList"
      @listenUserToMakeForm="listenUser"
    ></siteUser>

    <!-- 修改infoShow页面底部弹框 -->
    <siteInfoShow></siteInfoShow>

    <!-- 左滑弹出框 -->
    <van-popup v-model="showPopup" position="left" :style="{ height: '100%' }">
      <div id="sidebar">
        <!-- 侧边栏 -->
        <sidebar @listenToMakeForm="listenToMakeForm"></sidebar>
      </div>
    </van-popup>
  </div>
</template>
<style scoped>
img {
  width: 25px;
  height: 25px;
  /* float: right; */
  /* margin: 20px; */
  position: absolute;
  left: 300px;
}
.commonColor {
  background: #fecd2a;
}

.title {
  overflow: hidden;
  border: 1px solid #fecd2a;
  width: auto;
  height: 48px;
  /* background: #FECD2A; */
}
.buttonLeft {
  float: left;
  width: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-bottom: auto;
  font-size: 20px;
}
.buttonRight {
  float: right;
  width: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-bottom: auto;
  font-size: 20px;
}
.titleName {
  margin: 10px auto 10px;
  font-size: 20px;
  width: 100px;
}

.allTemplate {
  height: 550px;
  border: 2px solid #fecd2a;
  margin: 30px;
  background-color: #fff;
}
.publicAll {
  background-color: #fff;
  border: 0 solid #e0e9ea;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
}

>>> .body {
  border: 0;
  margin: 0;
}
.user {
  /* width: 85%; */
}
.infoShow {
  /* width: 80%; */
}
.numberIndex {
  /* width: 80%; */
}
</style>
<script>
import sidebar from "../../../components/Super/template/sidebar";
import user from "../../../components/Super/library/userInfo/user";
import infoShow from "../../../components/Super/library/theMessageStates/infoShow";
import numberIndex from "../../../components/Super/library/enterInformation/numberIndex";
import siteUser from "../../../components/Super/template/siteUser";
import siteInfoShow from "../../../components/Super/template/siteInfoShow";

export default {
  components: {
    sidebar,
    user,
    infoShow,
    numberIndex,
    siteUser,
    siteInfoShow
  },
  data() {
    return {
      showPopup: false, // 遮罩层弹出
      templateList: [], // 存放当前页面显示的几个页面数据，012分别为三个组件
      cross: require("../../../assets/super/template/cross.png"), // 取消（叉号）

      // user:
      siteUserShow: false, // 显示userSite设置底部弹框
      isTrueUserList: [], // userSite需要显示的数组内容

      // infoShow:
      siteInfoShowShow: false, // 显示userSite设置底部弹框
      isTrueInfoShowList: [] // userSite需要显示的数组内容
    };
  },
  mounted() {
    this.start(); // 进入页面加载内容
  },
  methods: {
    // ====================底部设置弹框========================

    // ----------------user-------------------

    // 接收user子组件 底部弹框数据
    listenUser(siteuserShow, istrueUserList) {
      this.siteUserShow = siteuserShow; // 关闭底部弹框
      this.isTrueUserList = []; // 清空userSite需要显示的数组内容
      for (let index = 0; index < istrueUserList.length; index++) {
        this.isTrueUserList.push(istrueUserList[index].isTrue);
      }
    },
    // 点击user内容弹出底部弹框
    showUser() {
      this.siteUserShow = true; // 显示userSite底部弹框
    },
    // ----------------infoShow-------------------

    showInfoShow() {
      this.siteInfoShowShow = true; // 显示infoShow底部弹框
    },

    // =================页面加载和抬头按钮部分=====================

    // 初始化内容
    start() {
      this.showPopup = false; // 左滑不显示
      this.siteUserShow = false; // userSite底部弹框不显示

      this.templateList = []; // 初始化页面有谁：012:表示三个从上排列下去
      this.isTrueUserList = [true, true, true, true, true, true, true]; //初始化加载：控制userSite和user中user7个显示数据应从库里获取
    },
    // 返回按钮
    returnPage() {
      window.history.go(-1); // windos的返回上一页
      // this.$router.go(-1) // vue的返回上一页
    },

    //下一步按钮
    nextStep() {
      this.$router.push({ name: "makeForm" });
    },

    //  ==================右划添加组件部分=======================

    // 子组件sidebar返回事件，返回是哪个组件
    listenToMakeForm(newVal1) {
      this.showPopup = false;
      this.templateList.push(newVal1); // 添加一个组件
    },

    // 删除第i个组件
    spliceList(i) {
      this.templateList.splice(i, 1);
    },

    // 右划事件
    eventFun() {
      this.showPopup = true; // 侧边栏左侧显示

      // var t = document.getElementById("sidebar");
      // t.style.cssText = "display:inline";
    }
  }
};
</script>
