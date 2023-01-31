<template>
	<view class="Qin-question-detail">
		<view class="detail_content">
			<view class="detail_title">
				{{question.title}}
				<view class="detail_info" style="text-align: right;">
					<text @click="setCollect(question.qid,0)" class="info"><text :class="like !='' ? 'like' :'none'">♥</text>({{question.likeNum || 0}})</text>
					<text @click="setCollect(question.qid,1)" class="info"><text :class="collect !='' ? 'collect' :'none' ">★</text>({{question.commentNum || 0}})</text>
				</view>
			</view>
			<view class="detail_user_info">
				<img :src="question.quUser.pic" alt="" srcset="">
				<view class="user_info">
					<text class="user_name">{{question.quUser.nickName}}</text>
					<text>发布时间：{{question.createTime}}</text>
				</view>
			</view>
			<view>
				{{question.content}}
			</view>
		</view>
		
		<view v-if="showAns" style="background-color: white;margin-top: 30rpx;padding:20rpx;">
			
			<u-input height=200 placeholder="请填写回答" type="textarea" v-model="ansText"/>
			<u-button @click="submit" type="primary" style="margin-top: 100rpx;">提交回答</u-button>
			
		</view>
		
		<view class="detail_question">
			<view class="user_question_header">
				<view class="count_question">
					{{ans.length}}回答
				</view>
				<view class="send_question" @click="showAns=!showAns">
					{{showAns?'关闭回答框':'撰写回答'}}
				</view>
			</view>
			<view v-for="(item,index) in ans" :key="index" class="ans_b">
				
				<view class="question_user_info">
					<img :src="item.quUser.pic" alt="" srcset="">
					<view class="user_info">
						<text class="user_name">{{item.quUser.nickName}}</text>
						<text>发布时间：{{item.createTime}}</text>
					</view>
					
					<view @click="addAns(item)" v-if="item.selAns || question.uid == user.uid" :class="item.selAns==1?'getans':'getans2'" >{{ question.uid == user.uid ? (item.selAns == 1 ? '已采纳':'采纳')  :'已采纳'}}</view>
				</view>
				<view>
					{{item.content}}
				</view>
				
			</view>
			<view v-if="ans.length == 0">
				<view style="padding: 20rpx;text-align: center;">
					暂时无人回答
				</view>
			</view>
			
		</view> 
	</view>
</template>

<script>
	import appRequest from "@/common/appRequestUrl.js";
	export default {
		name: 'Qin-question-detail',
		data() {
			return {
				user:{},
				qid:0,
				question:{},
				ans:[],
				like:"",
				collect:"",
				ansText:"",
				showAns:false,
				ansFlag:false
			}
		},
		onLoad(options) {
			this.qid = options.qid;
		},onShow() {
			this.user = appRequest.getUserInfo();
			if (!this.user) {
				uni.navigateBack();
			}
			this.getQuestion();
		},
		methods: {
			checkAnsShow(item){
				return false;
			},
			checkAns(){
				for(var i =0;i<this.ans;i++){
					if(this.ans[i].selAns==1){
						this.ansFlag = true;
					}
				}
			},
			addAns(item){
				if(this.question.uid!=this.user.uid){
					return;
				}
				if(this.ansFlag){
					uni.showToast({
						icon:"none",
						title:"已有正确答案"
					})
					return;
				}
				var _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.editQuComment,
					data:{
						parentFk:_this.qid,
						selAns:1,
						cid:item.cid
					},
					success: function(res) {
						_this.checkAns();
					},
					fail: function(res) {
						
					} });
			},
			submit(){
				this.ansText = this.ansText.trim();
				if(this.ansText.length<2){
					uni.showToast({
						icon:"none",
						title:"至少填写2个字"
					})
				}else{
					var _this = this;
					appRequest.request({
						method: "POST",
						url: appRequest.urlMap.addQuComment,
						data:{
							parentFk:_this.qid,
							type:1,
							validFlag:1,
							creater:_this.user.uid,
							content:_this.ansText
						},
						success: function(res) {
							uni.showToast({
								icon:"none",
								title:"提交成功"
								
							})
							_this.showAns = false;
							_this.getQuestion();
						},
						fail: function(res) {
							
						} });
				}
			},
			getCollect(){
				var _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.findQuCollect,
					data:{
						qid:_this.qid,
						type:1,
						validFlag:1,
						creater:_this.user.uid
					},
					success: function(res) {
						_this.collect ="";
						if(res.data.data.qid == _this.qid){
							_this.collect = res.data.data.collectId
						}
					},
					fail: function(res) {
						
					} });
				
			},
			getLike(){
				var _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.findQuCollect,
					data:{
						qid:_this.qid,
						type:0,
						validFlag:1,
						creater:_this.user.uid
					},
					success: function(res) {
						_this.like =""
						if(res.data.data.qid == _this.qid){
							_this.like = res.data.data.collectId
						}
					},
					fail: function(res) {
						
					} });
				
			},
			
			setCollect(qid,type){
				var _this = this;
				if((type == 0 && !this.like) || (type == 1 && !this.collect)){
					appRequest.request({
						method: "POST",
						url: appRequest.urlMap.addQuCollect,
						data:{
							qid:qid,
							type:type,
							creater:_this.user.uid
						},
						success: function(res) {
							_this.getQuestion();
						},
						fail: function(res) {
							
						} });
				}else{
					appRequest.request({
						method: "POST",
						url: appRequest.urlMap.editQuCollect,
						data:{
							collectId:type==0?_this.like:_this.collect,
							validFlag:0
						},
						success: function(res) {
							_this.getQuestion();
						},
						fail: function(res) {
							
						} });
				}
				
			},
			getComment(){
				var _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.findQuCommentList,
					data:{
						parentFk:_this.qid,
						type:1,
						validFlag:1
					},
					success: function(res) {
						_this.ans = res.data.data;
						_this.checkAns();
					},
					fail: function(res) {
						
					} });
			},
			getQuestion(){
				var _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.findQuQuestion,
					data:{
						qid:_this.qid
					},
					success: function(res) {
						_this.question = res.data.data;
						_this.getLike();
						_this.getCollect();
						_this.getComment();
					},
					fail: function(res) {
						
					} });
				
			},getComment2(){
				
			},
		}
	}
</script>

<style lang="less" scoped>
	.Qin-question-detail {
		.detail_content {
			padding: 20rpx;
			background-color: #fff;

			.detail_title {
				font-weight: bold;
				font-size: 40rpx;
				padding-bottom: 30rpx;
				border-bottom: 1rpx solid #f0f0f0;
				.detail_info{
					font-size: 15px;
					color: lightgray;
					.info{
						margin-left: 30rpx;
						.like{
							font-size: 20px;
							color: orangered;
						}
						.collect{
							font-size: 20px;
							color: #f2c454;
						}
						.none{
							font-size: 20px;
							color: lightgray;
						}
					}
				}
			}

			.detail_user_info {
				padding: 30rpx 0;
				display: flex;
				align-items: center;

				&>img {
					width: 60rpx;
					height: 60rpx;
				}

				.user_info {
					display: flex;
					flex-direction: column;
					font-size: 20rpx;
					margin-left: 25rpx;
					color: #c1c1c1;

					.user_name {
						font-weight: bold;
						font-size: 25rpx;
						color: #000;
					}
				}
			}
		}

		.detail_question {
			margin-top: 50rpx;
			padding: 20rpx;
			background-color: #fff;

			.user_question_header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 30rpx;
				border-bottom: 1rpx solid #f0f0f0;

				.send_question {
					background-color: #09a0f7;
					color: #fff;
					font-size: 20rpx;
					width: 120rpx;
					height: 50rpx;
					text-align: center;
					line-height: 50rpx;
				}
			}

			.question_user_info {
				padding: 30rpx 0;
				display: flex;
				align-items: center;

				&>img {
					width: 60rpx;
					height: 60rpx;
				}

				.user_info {
					display: flex;
					flex-direction: column;
					font-size: 20rpx;
					margin-left: 25rpx;
					color: #c1c1c1;

					.user_name {
						font-weight: bold;
						font-size: 25rpx;
						color: #000;
					}
				}
				.getans{
					margin-left: 100rpx;
					background-color: #09a0f7;
					border-radius: 5px;
					color: white;
					padding: 5px;
				}
				.getans2{
					margin-left: 100rpx;
					background-color: seagreen;
					border-radius: 5px;
					color: white;
					padding: 5px;
				}
			}
			.ans_b{
				padding-bottom:30rpx; 
				border-bottom:1px solid #f0f0f0;
			}
		}
	}
</style>
