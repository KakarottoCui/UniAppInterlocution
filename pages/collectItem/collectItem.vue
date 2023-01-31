<template>
	<view>
		<u-cell-group :title="title[index]">
				<u-cell-item @click="jump(item.qid)" v-if="index==0" v-for="(item,index2) in infoList" :key="index2" icon="integral-fill" :title="item.content" ></u-cell-item>
				<u-cell-item @click="jump(item.qid)" v-if="index==1" v-for="(item,index2) in infoList" :key="index2" icon="integral-fill" :title="item.title" ></u-cell-item>
				<u-cell-item @click="jump(item.quQuestion.qid)"v-if="index==2" v-for="(item,index2) in infoList" :key="index2" icon="integral-fill" :title="item.quQuestion.title" ></u-cell-item>
				
		</u-cell-group>
	</view>
</template>

<script>
	
	import appRequest from "@/common/appRequestUrl.js";
	export default {
		data() {
			return {
				index:0,
				title:["我的回答","我的问题","我的收藏"],
				infoList:[],
				user:{}
			};
		},onShow() {
			this.user = appRequest.getUserInfo();
			if (!this.user) {
				uni.navigateTo({
					url: "/pages/index/index"
				});
			}
		},onLoad(options) {
			this.index = options.index;
			this.getInfo();
		},methods:{
			jump(id){
				uni.navigateTo({
					url:"/pages/detail/detail?qid="+id
				})
			},
			getInfo(){
				var _this = this;
				if(this.index == 0){
					
					appRequest.request({
						method: "POST",
						url: appRequest.urlMap.findQuCommentList,
						data: {
							creater: _this.user.uid,
							validFlag: 1
						},
						success: function(res) {
							_this.infoList = res.data.data;
						},
						fail: function(res) {
					
						}
					});
				}else if(this.index == 1){
					appRequest.request({
						method: "POST",
						url: appRequest.urlMap.findQuQuestionList,
						data: {
							creater: _this.user.uid,
							validFlag: 1
						},
						success: function(res) {
							_this.infoList = res.data.data;
						},
						fail: function(res) {
					
						}
					});
				}else{
					appRequest.request({
						method: "POST",
						url: appRequest.urlMap.findQuCollectList,
						data: {
							creater: _this.user.uid,
							validFlag: 1,
							type:1
						},
						success: function(res) {
							_this.infoList = res.data.data;
						},
						fail: function(res) {
					
						}
					});
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
