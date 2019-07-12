<template>
	<div class="dormitory">
		<div class="searchWord">
			<div style="display: inline-block"> 搜索：</div>
			<el-input v-model="search"
			          placeholder="请输入搜索内容">
			</el-input>
		</div>
		<div class="dormitoryData">
			<el-table
				ref="dormitoryTable"
				:data="tables"
				tooltip-effect="dark"
				stripe
				style="width: 100%">
				<el-table-column type="selection" width="45"></el-table-column>
				<el-table-column label="序号" type="index" width="65"></el-table-column>
				<el-table-column label="商品名稱" prop="name">
				</el-table-column>
				<el-table-column label="單價">
					<template slot-scope="scope">
						<div>$ {{scope.row.price}}</div>
					</template>
				</el-table-column>
				<el-table-column label="數量" prop="num">
				</el-table-column>
				<el-table-column label="總價">
					<template slot-scope="scope">
						<div>$ {{scope.row.price*scope.row.num}}</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
export default {
	data () {
		return {
			/*dormitory: [{
				people: '雷森',
				relationship: '大学室友',
				meet: '2010-09-02',
				place: '图书馆',
				execg: '胖子',
				year: '8年',
				works: '海阔天空'
			}, {
				people: '刘利伟',
				relationship: '大学室友',
				meet: '2010-09-02',
				place: '5#633',
				execg: '老大',
				year: '8年',
				works: '勇气'
			}, {
				people: '李金龙',
				relationship: '大学室友',
				meet: '2010-09-02',
				place: '5#633',
				execg: '二哥',
				year: '8年',
				works: '遇见'
			}, {
				people: '马康',
				relationship: '大学室友',
				meet: '2010-09-02',
				place: '餐饮大厦',
				execg: '康哥',
				year: '8年',
				works: '不再联系'
			}, {
				people: '牛光卫',
				relationship: '大学室友',
				meet: '2010-09-02',
				place: '图书馆',
				execg: '牛牛娃',
				year: '8年',
				works: '断点'
			}, {
				people: '陆兆攀',
				relationship: '大学室友',
				meet: '1991-07-27',
				place: '百浪',
				execg: '帅哥',
				year: '27年',
				works: '不再犹豫'
			}, {
				people: '小甜',
				relationship: '亲密的人',
				meet: '2016-10-05',
				place: '小寨',
				execg: '甜甜圈',
				year: '2年',
				works: 'Forever Love'
			}],*/
			productList: [
				{
					id: 1,
					name: '皮夾',
					price: 400,
					num: 1,
					addNums: 0
				},
				{
					id: 2,
					name: '手環',
					price: 200,
					num: 1,
					addNums: 0
				},
				{
					id: 3,
					name: '戒指',
					price: 800,
					num: 1,
					addNums: 0
				},
				{
					id: 4,
					name: '鞋子',
					price: 100,
					num: 1,
					addNums: 0
				}
			],
			search: ''
		}
	},
	computed: {
		// 模糊搜索
		tables () {
			const search = this.search
			if (search) {
				// filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
				// 注意： filter() 不会对空数组进行检测。
				// 注意： filter() 不会改变原始数组。
				return this.productList.filter(data => {
					// some() 方法用于检测数组中的元素是否满足指定条件;
					// some() 方法会依次执行数组的每个元素：
					// 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
					// 如果没有满足条件的元素，则返回false。
					// 注意： some() 不会对空数组进行检测。
					// 注意： some() 不会改变原始数组。
					return Object.keys(data).some(key => {
						// indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
						// 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
						return String(data[key]).toLowerCase().indexOf(search) > -1
					})
				})
			}
			console.log(this.productList)
			return this.productList
		}
	}
}
</script>
<style>

</style>
