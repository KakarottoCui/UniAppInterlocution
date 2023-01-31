<template>
	<view class="Qin-question-login">
		<view class="login_title">
			用户登录
		</view>
		<input type="text" placeholder="请输入手机号码">	
		<view class="login_phone_code">
			<input type="password" placeholder="请输入密码">	
			<view class="login_code">
				获取验证码
			</view>
		</view>
		<view class="login_btn">
			登录账户
		</view>
	</view>
</template>

<script>
	export default {
		name:'Qin-question-login',
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.Qin-question-login{
		background-color: #fff;
		padding: 60rpx;
		
		.login_title{
			font-size: 40rpx;
			text-align: center;
		}
		& > input {
			height: 80rpx;
			background-color: #f9f9f9;
			margin: 40rpx 0;
			padding-left: 20rpx;
			
		}
		.login_btn{
			margin: 50rpx 0;
			background-color: #09a0f7;
			height: 80rpx;
			text-align: center;
			color: #fff;
			font-size: 35rpx;
			line-height: 80rpx;
		}
		.login_phone_code{
			display: flex;
			align-items: center;
			&>input {
				flex: 1;
				height: 80rpx;
				background-color: #f9f9f9;
				padding-left: 20rpx;
			}
			.login_code{
				width: 200rpx;
				background-color: rgba(9, 160, 247, 0.1);;
				text-align: center;
				color: #09a0f7;
				line-height: 80rpx;
				height: 80rpx;
			}
			
		}
		
	}

</style>
