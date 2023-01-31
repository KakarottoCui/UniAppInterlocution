<template>
	<view class="Qin-question-my">
		<view class="qin_header">
			<img :src="user.pic" alt=""></img>
			<text>{{user.nickName}}</text>
		</view>
		<view class="qin_content">
			<view @click="toItem(0)">
				<text class="count_num">{{commentNum}}</text>
				<text>回答</text>
			</view>
			<view @click="toItem(1)">
				<text class="count_num">{{questionNum}}</text>
				<text>提问</text>
			</view>
			<view @click="toItem(2)">
				<text class="count_num">{{collectNum}}</text>
				<text>收藏</text>
			</view>
		</view>
		<view @click="removeToken()" class="qin_logout">
			清除授权
		</view>
	</view>
</template>

<script>
	import appRequest from "@/common/appRequestUrl.js";
	export default {
		name: 'Qin-question-my',
		data() {
			return {
				user: {},
				commentNum: 0,
				questionNum: 0,
				collectNum: 0
			}
		},
		onShow() {
			this.user = appRequest.getUserInfo();
			if (!this.user) {
				uni.navigateTo({
					url: "/pages/index/index"
				});
			}
			this.getInfo();
		},
		methods: {
			toItem(index){
				uni.navigateTo({
					url:"/pages/collectItem/collectItem?index="+index
				})
			},
			removeToken(){
				uni.clearStorage()
				uni.navigateTo({
					url:"/pages/index/index"
				})
			},
			getInfo() {
				var _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.findQuCommentList,
					data: {
						creater: _this.user.uid,
						validFlag: 1
					},
					success: function(res) {
						_this.commentNum = res.data.data.length;
					},
					fail: function(res) {

					}
				});

				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.findQuCollectList,
					data: {
						creater: _this.user.uid,
						validFlag: 1,
						type: 1
					},
					success: function(res) {
						_this.collectNum = res.data.data.length;
					},
					fail: function(res) {

					}
				});

				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.findQuQuestionList,
					data: {
						uid: _this.user.uid,
						validFlag: 1
					},
					success: function(res) {
						_this.questionNum = res.data.data.length;
					},
					fail: function(res) {

					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.Qin-question-my {
		background-color: #fff;
		padding: 60rpx;

		.qin_header {
			display: flex;
			align-items: center;
			padding-bottom: 30rpx;
			border-bottom: 1rpx solid #f0f0f0;

			&>img {
				width: 100rpx;
				height: 100rpx;
			}

			&>text {
				font-size: 30rpx;
				margin-left: 30rpx;
			}
		}

		.qin_content {
			margin-top: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			&>view {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.count_num {
					font-weight: bold;
					font-size: 35rpx;
					color: #09a0f7;
				}
			}
		}

		.qin_logout {
			margin-top: 120rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			font-weight: bold;
			color: #fff;
			background-color: #09a0f7;
		}
	}
</style>
