<template>
  <el-row>
    <div class="proCard">
      <el-card :body-style="{ padding: '0px' }" class="el-card"
               v-for="(product,index) in productList" :key="index">
        <div class="pro" >
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div class="proInfo">
            <div class="proName">{{product.name}}</div>
            <div class="proPrice">NT$ {{product.price}}</div>
          </div>
          <div class="addcart" >
            <button class="addcartBtn" @click="addToCar(product)">加入購物車</button>
          </div>
        </div>
      </el-card>
    </div>

  </el-row>

</template>

<script>
export default {
  data () {
    return {
      // 商品列表
      productList: [
        {
          id: 1,
          name: '皮夾',
          price: 400,
          defaultNums: 1,
          addNums: 0
        },
        {
          id: 2,
          name: '手環',
          price: 200,
          defaultNums: 1,
          addNums: 0
        },
        {
          id: 3,
          name: '戒指',
          price: 800,
          defaultNums: 1,
          addNums: 0
        },
        {
          id: 4,
          name: '鞋子',
          price: 100,
          defaultNums: 1,
          addNums: 0
        }
      ],
      // 用於保存每件商品的對象
      goodItem: {},
      // 用於保存用户添加到購物車的商品數组
      buyLists: []
    }
  },
  methods: {
    addToCar (product) {
      if (product.addNums === product.defaultNums) return
      product.addNums = product.defaultNums
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
.proName {

  width: 130px;
  height: 50px;
}
.proPrice {
  border-left: solid 1px #C8DCDE;
  width: 100px;
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
