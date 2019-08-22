<template>
	<el-row>
		<div class="proCard">
			<el-card :body-style="{ padding: '0px' }" class="el-card"
			         v-for="(product,index) in productList" :key="index">
				<div class="pro">
					<img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
					     class="image">
					<div class="proInfo">
						<div class="proName">{{product.name}}</div>
						<div class="proPrice">NT$ {{product.price * product.quantity}}</div>
					</div>
					<div>
						<el-input-number v-model="product.quantity" :min="1" class="countnum"></el-input-number>
					</div>
					<div class="addcart">
						<button class="addcartBtn" @click="addToCar(product)">加入購物車</button>
					</div>
				</div>
			</el-card>
		</div>
	</el-row>

</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { product_list, add_to_cart, cart_list } from '../api/api'

export default {
	inject: ['reload'],
	data () {
		return {
			// 商品列表
			productList: [],
			// 用於保存每件商品的對象
			goodItem: {},
			// 用於保存用户添加到購物車的商品數组
			// buyLists: []
		}
	},
	created () {
		this.getProductList()
		this.getCartList()
	},
	methods: {
		...mapActions(['addProductToBasket']),
		...mapMutations(['ADD_PRODUCT_TO_BASKET']),
		/* addToCar (product) {
			/!* if (product.addNums === product.num) return
			product.addNums = product.num
			this.goodItem = {id: product.id, nums: product.addNums}
			// 1、用戶未添加過該商品，則直接向數组中push
			// 2、用於已经添加了該商品、並且未做購買數量修改，則不向數组中添加
			// 3、用於已经添加了該商品、但是修改了購買數量，直接替换數组中的該商品對象
			const index = this.buyLists.findIndex((value, index, arr) => {
				return value.id === this.goodItem.id
			})
			index === -1 ? this.buyLists.push(this.goodItem) : Object.assign(this.buyLists[index], this.goodItem)
			console.log(this.buyLists)
			this.$message({
				message: '商品已成功加入購物車',
				type: 'success'
			}) *!/
			//this.goodItem = {id: product.id, nums: product.addNums, checked: false}
			this.addProductToBasket(product)
		}, */
		getProductList () {
			const a = {user_uuid: sessionStorage.getItem('key')}
			product_list(a).then(res => {
				this.productList = res.data.data
				for (let i = 0; i < this.productList.length; i++) {
					this.$set(this.productList[i], 'quantity', 1)
				}
				console.log(res.data)
			})
		},
		addToCar (product) {
			let i = {product_id: product.id, quantity: product.quantity}
			add_to_cart(i).then(res => {
				this.item = res.data.message
				console.log(res.data)
				if (this.item === 'product is already in shoppingCart') {
					this.$message.warning('商品已存在！')
				} else {
					this.$message.success('商品已加入購物車！')
				}
				this.reload()
			})
		},
		getCartList () {
			cart_list({}).then(res => {
				Object.keys(sessionStorage)
				this.list = res.data.data
				console.log(res.data)
			})
		}
	}
}
</script>

<style>
.proCard {
	display: inline-flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-content: flex-start;
}

.image {
	width: 100%;
	display: block;
}

.el-card {
	margin: 10px 10px 10px 20px;
}

.proInfo {
	display: inline-flex;
	width: 250px;
	height: 50px;
	font-size: 16px;
	font-weight: bold;
	letter-spacing: 2px;
	text-align: center;
	line-height: 50px;
	color: #304156;
}

.countnum {
	width: 250px;
}

.proName {

	width: 110px;
	height: 50px;
}

.proPrice {
	border-left: solid 1px #C8DCDE;
	width: 130px;
	padding-left: 10px;
}

.addcart {
	height: 60px;
}

.addcartBtn {
	padding: 0px;
	width: 100%;
	height: 100%;
	cursor: pointer;
	font-size: 18px;
	font-weight: bolder;
	background-color: #DEF5F7;
	color: #2c3e50;
	border-style: none;
	letter-spacing: 3px;
}

.addcartBtn:hover {
	background-color: #C8DCDE;
}

</style>
