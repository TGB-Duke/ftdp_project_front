<!--
*@描述:模板设置
*@版本:V1.0
*@作者:白爱民
*@Date:2019年12月11日20:16:26
*@最后修改人:herry
*@LastEditTime:2019年12月11日20:16:31
*@说明：-->
<template>
  <div>
    <div class="title commonColor">
      <div class="button" @click="intoModel()">模板管理</div>
      <div class="titleName">模板设置</div>
    </div>

    <div class="body">
      <div class="nameTitle">分组设置</div>

      <div class="nameNum">
        <vuedraggable v-model="projectName" :options="options">
          <div class="project" v-for="(item,index) in projectName">
            <div @click="popupInput(index)" class="projectName">{{projectName[index]}}</div>
            <!-- <div class="projectBut"> -->
            <img @click="lessNum(index)" class="projectBut" :src="less" alt />
            <!-- </div> -->
          </div>
        </vuedraggable>
      </div>

      <div>
        <img @click="plusNum()" class="addBut" :src="plus" alt />
      </div>
    </div>
    <popup
      :boolean="boolean"
      :projectInfo="projectInfo"
      :projectIndex="projectIndex"
      @listenToChildSetting="receivePopup"
      @listenToSettingInfo="receivePopupInfo"
    ></popup>
  </div>
</template>
<style scoped>
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
.button {
  float: left;
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

.body {
  margin: 20px auto 20px;
  width: 335px;
  height: 500px;
  border: 1px solid #e0e9ea;
}

.nameTitle {
  border: 1px solid #e0e9ea;
  float: left;
  margin: 10px;
}

.nameNum {
  border: 1px solid #e0e9ea;
  width: 300px;
  /* height: 300px; */
  margin: 50px auto 20px;
}

.project {
  width: 300px;
  height: 40px;
  border: 1px solid #fecd2a;
  background-color: #fecd2a;
  margin-top: 20px;
}

.projectName {
  float: left;
  /* text-align: center; */
  margin: 3%;
}

.projectBut {
  width: 40px;
  height: 40px;
  float: right;
}

.addBut {
  height: 40px;
  width: 40px;
  margin: 10px auto;
}
</style>
<script>
import popup from "../../../components/Super/popup";
import vuedraggable from "vuedraggable";

export default {
  components: {
    popup,
    vuedraggable
  },
  data() {
    return {
      //   show: false,
      //   value: ""

      less: require("../../../assets/super/Less.png"),
      plus: require("../../../assets/super/plus.png"),
      projectName: ["公共项目", "男生项目", "女生项目"],

      boolean: "", // 弹出框输入是否可见
      projectInfo: "", // 传递给弹出框名字信息
      projectIndex: "", // 传递给弹出框的名字在projectName中位置

      options: {
        delayOnTouchOnly: true, //开启触摸延时
        direction: "vertical", //拖动方向
        delay: 500, //延时时长
        touchStartThreshold: 3, //防止某些手机过于敏感(3~5 效果最好)
        chosenClass: "chosen" //选中之后拖拽项添加的class名(用于选中时候添加样式)
      }
    };
  },

  watch: {},

  updated() {},
  mounted() {},
  methods: {
    // 点击抬头左侧按钮
    intoModel() {
      this.$router.push({ name: "management" });
    },

    // 删除内容
    lessNum(i) {
      this.projectName.splice(i, 1);
    },

    // 增加内容
    plusNum() {
      this.projectName.push("请输入信息");
    },

    // 点击每个名字进弹框修改
    popupInput(i) {
      // alert("我是白爱民"+i)
      this.boolean = true;
      this.projectInfo = this.projectName[i];
      this.projectIndex = i;
    },

    //接收弹出框页面是否可见的boolean值
    receivePopup(newVal) {
      this.boolean = newVal;
    },

    // 接收输入弹框中修改的内容
    receivePopupInfo(newInfo, newI) {
      this.projectName[newI] = newInfo;
    }
  }
};
</script>
