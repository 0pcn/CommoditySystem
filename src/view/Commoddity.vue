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
			<h4 v-if="list.length!==0">購物車商品清單</h4>
			<el-table :data=" list " style="width: 100%;" v-show="list.length">
				<el-table-column label="复选框" width="100">
					<template slot-scope="scope">
						<el-checkbox v-model="scope.row.checked"></el-checkbox>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="商品名稱" width="180">
				</el-table-column>
				<el-table-column prop="price" label="單價" width="180">
					<template slot-scope="scope">
						<div>$ {{scope.row.price}}</div>
					</template>
				</el-table-column>
				<el-table-column label="數量" width="380">
					<template slot-scope="scope">
						<el-input-number v-model="scope.row.num" :min="1" :max="scope.row.number"></el-input-number>
					</template>
				</el-table-column>
				<el-table-column label="總計">
					<template slot-scope="scope">
						<div>$ {{scope.row.price*scope.row.num}}</div>
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
            <el-button @click="centerDialogVisible = false" :check="istrue">取 消</el-button>
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
				<div>總金額 :<span> NT$ {{countList}}</span></div>
				<div class="settleBtn" @click="payList">結帳</div>
				<el-dialog title="訂單結帳" :visible.sync="dialogTableVisible" :before-close="handleClose">
					<el-table :data="cart">
						<el-table-column property="name" label="商品名稱" width="200"></el-table-column>
						<el-table-column property="price" label="價錢" width="150"></el-table-column>
						<el-table-column property="num" label="數量"></el-table-column>
					</el-table>
					<div>總金額 :<span> NT$ {{countList}}</span></div>
					<div slot="footer" class="dialog-footer">
						<el-button @click="handleCancel">取 消</el-button>
						<el-button type="primary" @click="handleConfirm">確 定</el-button>
					</div>
				</el-dialog>
			</div>
		</el-card>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
	data () {
		return {
			cart: [],
			count: 0,
			checked: false,
			centerDialogVisible: false,
			dialogTableVisible: false,
		}
	},
	computed: {
		countList: function () {
			var totalMoney = 0
			for (let i = 0; i < this.list.length; i++) {
				if (this.list[i].checked === true) {
					totalMoney += this.list[i].price * this.list[i].num
				}
			}
			this.count = totalMoney
			return this.count
		},
		...mapGetters({
			list: 'basket'
		})
	},
	methods: {
		removeId (index) {
			this.list.splice(index, 1)
			this.centerDialogVisible = false
		},
		payList () {
			for (let i = 0; i < this.list.length; i++) {
				if (this.list[i].checked === true) {
					this.dialogTableVisible = true
					this.item = {name: this.list[i].name, num: this.list[i].num, price: this.list[i].price}
					this.cart.push(this.item)
				}
			}
			if (this.cart.length === 0) {
				this.$alert('您的沒有選擇任何商品結帳', {
					confirmButtonText: '確定'
				})
				this.dialogTableVisible = false
			}
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
		handleConfirm () {
			this.$message({
				type: 'success',
				message: `結帳成功,訂單已成立`
			})
			this.dialogTableVisible = false
			this.cart = []
			for (let k = 0; k < this.list.length; k++) {
				this.list[k].checked = false
			}
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
