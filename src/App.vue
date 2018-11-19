<script>
import { getSystemInfoSync, setStorage, getStorage, get } from "@/utils/wechat";

//import '@/styles/iphoneX.scss'

const updateManager = wx.getUpdateManager();

updateManager.onCheckForUpdate(function(res) {
  // 请求完新版本信息的回调
  // console.log(res.hasUpdate)
});

updateManager.onUpdateReady(function() {
  wx.showModal({
    title: "更新提示",
    content: "新版本已经准备好，是否重启应用？",
    success: function(res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate();
      }
    }
  });
});

updateManager.onUpdateFailed(function() {
  // 新的版本下载失败
  wx.showModal({
    title: "更新提示",
    content: "新版本下载失败",
    showCancel: false
  });
});

export default {
  mpType: "app",
  async mounted() {
    const systemInfo = getSystemInfoSync();
    this.$store.commit("SET_SYSTEM_INFO", systemInfo);
    if (
      systemInfo.model == "iPhone X" ||
      systemInfo.model == "unknown<iPhone11,6>"
    ) {
      this.$store.commit("SET_IPHONE_X", true);
    }
    this.$store.commit("SET_HANDLE_LOGIN_OUT", get ('handleLoginOut'));
    this.$store.commit("SET_USER_INFO", get ('userInfo'));
    this.$store.commit("SET_LOGIN_STATUS", get ('loginStatus'));
  }
};
</script>

<style>
.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  height: 100%;
  position: relative;
}
</style>
