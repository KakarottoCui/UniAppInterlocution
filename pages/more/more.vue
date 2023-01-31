<template>
	<view class="Qin-question-more">
		<view class="qin_question_more" v-for="(v,i) in more_list" :key="i">
			<view class="more_title">
				{{v.title}}
			</view>
			<view class="more_tag">
				<text v-for="(t, index) in v.tag" :key="index">{{t}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Qin-question-more',
		data() {
			return {
				more_list: [{
						title: '前端开发',
						tag: ['JavaScript', 'CSS', 'HTML', 'Node.js', 'Vue.js', 'React.js', 'JQuery']
					},
					{
						title: '后端开发',
						tag: ['Java', 'PHP', 'Go', 'Spring Boot', 'Python', 'C', 'C++', 'Swoole', '爬虫']
					},
					{
						title: '移动端开发',
						tag: ['Android', 'IOS', 'React Natice', 'Flutter', '小程序']
					},
					{
						title: '云计算/大数据',
						tag: ['Docker', '大数据', 'Kubernetes', '算法', 'Hadoop', 'Spark']
					},
					{
						title: '数据库/运维',
						tag: ['DevOps', '运维', 'Linux', '数据库', 'MySQL', 'Redis', 'NoSQL', '测试']
					}
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.qin_question_more {
		background-color: #fff;
		padding: 20rpx;
		margin-bottom: 20rpx;

		.more_title {
			font-size: 30rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
		}

		.more_tag {
			font-size: 20rpx;
			word-wrap: break-word;

			&>text {
				display: inline-block;
				margin: 0rpx 20rpx 20rpx 0;
				color: #09a0f7;
				background-color: rgba(0, 150, 94, .1);
				padding: 8rpx 20rpx;
				box-sizing: border-box;
			}
		}
	}
</style>
