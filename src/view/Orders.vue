<template>
	<div class="dormitory">
		<div class="searchWord">
			<div style="display: inline-block"> 搜索：</div>
			<el-input v-model="search"
			          placeholder="請輸入搜索内容">
			</el-input>
		</div>
		<div class="dormitoryData">
			<el-table
				ref="dormitoryTable"
				:data="productList"
				tooltip-effect="dark"
				stripe
				style="width: 100%">
				<el-table-column type="selection" width="45"></el-table-column>
				<el-table-column label="序号" type="index" width="65"></el-table-column>
				<el-table-column label="訂單ID" prop="id"></el-table-column>
				<el-table-column label="使用者" prop="user_id">
				</el-table-column>
				<el-table-column label="狀態" prop="status">
				</el-table-column>
				<el-table-column label="金額" prop="total_amount">
				</el-table-column>
				<el-table-column
					label="操作">
					<template slot-scope="scope">
						<el-button
							size="mini"
							@click="getDetail(scope.row)">Detail
						</el-button>
						<el-dialog title="訂單明細" :visible.sync="dialogTableVisible">
							<el-table :data="detailData">
								<el-table-column property="product_name" label="商品名稱"></el-table-column>
								<el-table-column property="price" label="價錢" width="150"></el-table-column>
								<el-table-column property="quantity" label="數量"></el-table-column>
								<el-table-column property="total_amount" label="總金額"></el-table-column>
							</el-table>
						</el-dialog>
						<el-button
							size="mini"
							@click="centerDialogVisible = true">取消訂單
						</el-button>
						<el-dialog
							title="提示"
							:visible.sync="centerDialogVisible"
							width="30%"
							center>
							<span>確定要取消這個訂單嗎？</span>
							<span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="cancle(scope.row)">確 定</el-button>
          </span>
						</el-dialog>
					</template>
				</el-table-column>
				<!--</el-table-column>
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
				</el-table-column>-->
			</el-table>
		</div>
	</div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { orders, order_detail, cancle_order } from '../api/api'

export default {
	inject: ['reload'],
	data () {
		return {
			search: '',
			productList: [],
			detailData: [],
			dialogTableVisible: false,
			centerDialogVisible: false
		}
	},
	created () {
		this.getList()
	},
	computed: {
		/*...mapState([ 'buyList']),
		...mapGetters(['buyList']),*/
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
	},
	methods: {
		getList () {
			orders({}).then(res => {
				this.productList = res.data.data
				console.log(res.data)
			})
		},
		getDetail (row) {
			this.dialogTableVisible = true
			let id = {order_id: row.id}
			order_detail(id).then(res => {
				this.detailData = res.data.data
				console.log(res.data)
			})
		},
		cancle (row) {
			let id = {order_id: row.id}
			cancle_order(id).then(res => {
				console.log(res.data.data)
				this.reload()
			})
		}
	}
}
</script>
<style>

</style>
