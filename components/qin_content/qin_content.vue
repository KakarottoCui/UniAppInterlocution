<template>
	
	<view class="qin_content">
		<view v-if="item.is_solve" class="qin_tag">
			解决
		</view>
		
		<view class="qin_left">
			<view class="qin_left_answer">
				<text>{{item.q_count}}</text>
				<text>回答</text>
			</view> 
			<view class="qin_left_view">
				<text>{{item.q_view}}</text>
				<text class="qin_like">♥</text>
			</view>
		</view>
		<view class="qin_right">
			<view class="qin_right_title">
				{{item.q_title}}
			</view>
			<view class="qin_right_tag">
				<text v-for="(v, i) in item.q_tag" :key="i" >{{v}}</text>
			</view>
			<view class="qin_right_tag">
				<view>{{ item.address+ (item.dis > -1 ? "("+item.dis+"公里)" : "")   }}</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "qin_content",
		props:['item', 'index'],
		data() {
			return {

			};
		}
	}
</script>

<style lang="less" scoped>
	.qin_content {
		position: relative;
		padding: 20rpx 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		height: 170rpx;
		border-bottom: 1rpx solid #e9ecef;
		overflow: hidden;
		.qin_tag{
			position: absolute;
			transform: rotate(45deg);
			right: -50rpx;
			top: 15rpx;
			width: 150rpx;
			text-align: center;
			font-size: 20rpx;
			font-weight: bold;
			color: #fff;
			background-color: #09a0f7;
		}

		.qin_right {
			margin-left: 10rpx;
			flex: 1;

			.qin_right_title {
				max-width: 500rpx;
				font-size: 35rpx;
				margin-bottom: 10rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.qin_right_tag>text {
				background-color: rgba(0, 150, 94, .1);
				margin-right: 10rpx;
				color: #09a0f7;
				font-size: 20rpx;
				padding: 8rpx 20rpx;
			}
			.qin_right_tag>view {
				margin-right: 10rpx;
				color: #09a0f7;
				font-size: 20rpx;
				padding: 8rpx 20rpx;
			}
		}

		.qin_left {
			display: flex;
			justify-content: space-between;
			align-items: center;

			& view {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin: 0 10rpx;

				&:first-child,
				&:last-child {
					text-align: center;
					font-size: 25rpx;
					width: 60rpx;
					height: 80rpx;
				}

				&:first-child {
					border: 1rpx solid #09a0f7;
					color: #09a0f7;
				}
			}
			.qin_left_view{
				.qin_like{
					color: #ee3e21;
				}
			}
			
		}
	}
</style>
