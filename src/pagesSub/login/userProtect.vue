<template>
	<div class="container lineTop" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
		<isLoading :isLoading='isLoading'></isLoading>
		<div class="w100">
			<div>
				<wxParse :content="content" @preview="preview" @navigate="navigate" />
			</div>
		</div>
	</div>
</template>
<script>
import wxParse from "mpvue-wxparse";
import isLoading from "@/components/isLoading";
export default {
  data() {
    return {
      content: "",
      iPhoneshow: false,
      iphoneheight: ""
    };
  },
  components: {
    isLoading,
    wxParse
  },
  computed: {
    isLoading() {
      return this.$store.state.user.isLoading;
    }
  },
  methods: {
    iphone_xsp() {
      if (
        this.$store.state.user.systemInfo &&
        this.$store.state.user.systemInfo.model == "iPhone X"
      ) {
        this.iPhoneshow = true;
        this.iphoneheight =
          this.$store.state.user.systemInfo.windowHeight + 50 + "px";
      }
    }
  },
  async mounted() {
    this.iphone_xsp();
  },
  onPullDownRefresh() {},
  async onShow() {
    this.content = "";
    this.$store.commit("SET_IS_LOADING", false);
    this.$store.commit("SET_IS_LOADING", true);
    console.log(this.$store.state.user.isLoading, 88);

    let [err, protect] = await this._to(this.$http.getProtect());

    this.content = (protect.content?protect.content.value:'');
    this.$store.commit("SET_IS_LOADING", false);
  }
};
</script>
<style scoped lang='scss'>
@import url("~mpvue-wxparse/src/wxParse.css");
.container {
  padding: 0 15px;
}
</style>