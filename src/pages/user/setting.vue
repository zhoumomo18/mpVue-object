<template>
  <div class="container lineTop">
    <div class="w100">
      <div class="quit_login f18" @click="quitLogin">退出登录</div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { clear } from "@/utils/wechat";

export default {
  data() {
    return {};
  },
  components: {},
  computed() {},
  methods: {
    //退出
    async quitLogin() {
      this.$store.commit("SET_LOGIN_STATUS", false);
      this.$store.commit("SET_HANDLE_LOGIN_OUT", true);
      this.$store.commit("SET_USER_INFO", null);
      clear();
      setTimeout(() => {
        this.$router.push({
          path: "/pagesSub/login/loginIndex",
          query: { outLogin: true },
          reLaunch: true
        });
      }, 500);
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  mounted() {},
  onPullDownRefresh() {},
  async onShow() {}
};
</script>
<style scoped lang='scss'>
.container {
  .quit_login {
    position: fixed;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 34px;
    width: 690rpx;
    height: 94rpx;
    text-align: center;
    line-height: 94rpx;
    color: #fff;
    background: #ff455d;
    border-radius: 10rpx;
    margin: 0 auto;
    text-align: center;
    display: block !important;
  }
}
</style>
