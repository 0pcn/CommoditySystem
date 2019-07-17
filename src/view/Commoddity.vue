<template>
	<div id="app">
		<el-card>
			<el-alert
				v-show="list.length===0"
				:closable="false"
				title="您的購物車是空的!!"
				type="warning"
				show-icon>
			</el-alert>
			<h4 v-show="list.length">購物車商品清單</h4>
			<el-table :data=" list " style="width: 100%;" v-show="list.length">
				<!--<el-table-column label="選擇" width="100">
					<template slot-scope="scope">
						<el-checkbox v-model="scope.row.checked"></el-checkbox>
					</template>
				</el-table-column>-->
				<el-table-column prop="product_name" label="商品名稱" width="180">
				</el-table-column>
				<el-table-column prop="price" label="單價" width="180">
					<template slot-scope="scope">
						<div>$ {{scope.row.product_price}}</div>
					</template>
				</el-table-column>
				<el-table-column label="數量" width="380">
					<template slot-scope="scope">
						<div>{{scope.row.quantity}}</div>
					</template>
				</el-table-column>
				<el-table-column label="總計">
					<template slot-scope="scope">
						<div>$ {{scope.row.product_price * scope.row.quantity}}</div>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="danger" @click="centerDialogVisible = true">删除</el-button>
						<el-dialog
							title="提示"
							:visible.sync="centerDialogVisible"
							width="30%"
							center>
							<span>確定要移除這個商品嗎？</span>
							<span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="removeId(scope.row)">確 定</el-button>
          </span>
						</el-dialog>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-divider></el-divider>
		<el-card v-if="list.length!==0">
			<div class="carFooter">
				<div>總金額 :<span> NT$ {{total}}</span></div>
				<div class="settleBtn" @click="payList()">結帳</div>
				<el-dialog title="訂單結帳" :visible.sync="dialogTableVisible" :before-close="handleClose">
					<el-table :data="list">
						<el-table-column prop="product_name" label="商品名稱" width="200"></el-table-column>
						<el-table-column prop="product_price" label="價錢" width="150"></el-table-column>
						<el-table-column prop="quantity" label="數量"></el-table-column>
					</el-table>
					<div>總金額 :<span> NT$ {{total}}</span></div>
					<div slot="footer" class="dialog-footer">
						<el-button @click="handleCancel">取 消</el-button>
						<el-button type="primary" @click="payDialog(list)">確 定</el-button>
					</div>
				</el-dialog>
			</div>
		</el-card>
	</div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { cart_list, cart_total, cart_delete, cart_buy } from '../api/api'

export default {
	inject: ['reload'],
	data () {
		return {
			cart: [],
			list: [],
			count: 0,
			total: 0,
			checked: false,
			centerDialogVisible: false,
			dialogTableVisible: false
		}
	},
	mounted () {
		this.getCartList()
		this.getCartTotal()
	},
	computed: {
		countList: function () {
			var totalMoney = 0
			for (let i = 0; i < this.list.length; i++) {
				if (this.list[i].checked === true) {
					totalMoney += this.list[i].price * this.list[i].quantity
				}
			}
			this.count = totalMoney
			return this.count
		},
		...mapState(['basket']),
		...mapGetters(['basket'])
	},
	methods: {
		...mapActions(['addItemToOrder']),
		...mapMutations(['ADD_ITEM_TO_ORDER']),
		removeId (row) {
			let id = {id: row.id}
			cart_delete(id).then(res => {
				this.centerDialogVisible = false
				console.log(res.data)
				this.reload()
			})
			// this.list.splice(index, 1)
		},
		payList () {
			/* for (let i = 0; i < this.list.length; i++) {
				if (this.list[i].checked === true) {
					this.dialogTableVisible = true
					this.item = {name: this.list[i].name, quantity: this.list[i].quantity, price: this.list[i].price}
					this.cart.push(this.item)
				}
			}
			if (this.cart.length === 0) {
				this.$alert('您沒有選擇任何商品結帳', {
					confirmButtonText: '確定'
				})
				this.dialogTableVisible = false
			} */
			this.dialogTableVisible = true
		},
		handleCancel () {
			this.dialogTableVisible = false
			this.cart = []
			for (let k = 0; k < this.list.length; k++) {
				this.list[k].checked = false
			}
		},
		handleClose (done) {
			this.$confirm('確認關閉？')
				.then(_ => {
					done()
				})
				.catch(_ => {
				})
		},
		payDialog () { // (vuex)指定開啟、關閉的dialog
			cart_buy({}).then(res => {
				console.log(res.data)
				this.reload()
			})
			this.dialogTableVisible = false
		},
		/* handleConfirm () {
			this.$message({
				type: 'success',
				message: `結帳成功,訂單已成立`
			})
			this.dialogTableVisible = false
			this.cart = []
			for (let k = 0; k < this.list.length; k++) {
				this.list[k].checked = false
			}
			console.log(this.cart)
		} */
		getCartList () {
			cart_list({}).then(res => {
				Object.keys(sessionStorage)
				this.list = res.data.data
				console.log(res.data)
			})
		},
		getCartTotal () {
			let total = {Total_Amount: this.total}
			cart_total(total).then(res => {
				this.total = res.data.Total_Amount
				console.log(res.data)
			})
		}
	}
}

</script>
<style>
.carFooter {
	display: inline-flex;
	position: relative;
	width: 100%;
	font-size: 26px;
	font-weight: bold;
	letter-spacing: 1px;
}

.settleBtn {
	position: absolute;
	right: 0px;
	font-weight: normal;
	font-size: 20px;
	width: 200px;
	text-align: center;
	letter-spacing: 5px;
	line-height: 40px;
	background-color: #304156;
	color: #fff;
	cursor: pointer;
}

.settleBtn:hover {
	background-color: steelblue;
}
</style>
