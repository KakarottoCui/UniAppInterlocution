<template>
	<view class="qin-questions-ranking">
		<view class="ranking-header">
			<text>最新</text>
			<text>周榜</text>
			<text>月榜</text>
			<text>待回答</text>
		</view>
		<view class="qin_content_list">
			<block v-for="(item, index) in dataList" :key="index">
				<qin-content :item="item" :index="index"></qin-content>
			</block>
		</view>
	</view>
</template>

<script>
	import qinContent from '@/components/qin_content/qin_content.vue'
	export default {
		name:'qin-questions-ranking',
		data() {
			return {
				dataList: [{
						id: 1,
						q_title: 'python3 字典合并问题?',
						q_count: 2,
						q_view: 898,
						q_tag: ['python'],
						is_solve: 1
					},
					{
						id: 2,
						q_title: '@FeignClient这个注解里面的name，全局都没有搜到，定义它有啥用，这个url有啥用啊？',
						q_count: 4,
						q_view: 1898,
						q_tag: ['springboot', 'java'],
						is_solve: 0
					},
					{
						id: 3,
						q_title: 'yarn install 一直处在Building fresh packages……waiting……？',
						q_count: 2,
						q_view: 2398,
						q_tag: ['yarm', '前端', 'javascript', 'node.js'],
						is_solve: 1
					},
					{
						id: 4,
						q_title: 'python3 字典合并问题?',
						q_count: 2,
						q_view: 898,
						q_tag: ['python'],
						is_solve: 0
					},
					{
						id: 5,
						q_title: '@FeignClient这个注解里面的name，全局都没有搜到，定义它有啥用，这个url有啥用啊？',
						q_count: 4,
						q_view: 1898,
						q_tag: ['springboot', 'java'],
						is_solve: 1
					},
					{
						id: 6,
						q_title: 'yarn install 一直处在Building fresh packages……waiting……？',
						q_count: 2,
						q_view: 2398,
						q_tag: ['yarm', '前端', 'javascript', 'node.js'],
						is_solve: 0
					},
					{
						id: 7,
						q_title: 'python3 字典合并问题?',
						q_count: 2,
						q_view: 898,
						q_tag: ['python'],
						is_solve: 0
					},
					{
						id: 8,
						q_title: '@FeignClient这个注解里面的name，全局都没有搜到，定义它有啥用，这个url有啥用啊？',
						q_count: 4,
						q_view: 1898,
						q_tag: ['springboot', 'java'],
						is_solve: 0
					},
					{
						id: 9,
						q_title: 'yarn install 一直处在Building fresh packages……waiting……？',
						q_count: 2,
						q_view: 2398,
						q_tag: ['yarm', '前端', 'javascript', 'node.js'],
						is_solve: 1
					}
				]
			}
		},
		components:{
			qinContent
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
.qin-questions-ranking{
	.ranking-header{
		display: flex;
		background-color: #fff;
		padding: 40rpx;
		justify-content: space-between;
		align-items: center;
		font-size: 40rpx;
		& > text {
			padding-bottom: 10rpx;
		}
		& text:first-of-type{
			border-bottom: 8rpx solid #09a0f7;
			font-weight: bold;
		}
	}
}
</style>
