<template>
  <el-row>
    <div class="proCard">
      <el-card :body-style="{ padding: '0px' }" class="el-card" v-for="product in productList" :key="product">
        <div class="pro" >
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div class="proInfo">
            <div class="proName">{{product.name}}</div>
            <div class="proPrice">NT$ {{product.price}}</div>
          </div>
          <div class="addcart" >
            <button class="addcartBtn">加入購物車</button>
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
      productList: [
        {
          id: 1,
          name: '皮夾',
          price: 4000,
          checked: false,
          num: 1,
          remove: false
        },
        {
          id: 2,
          name: '手環',
          price: 2000,
          checked: false,
          num: 1,
          remove: false
        },
        {
          id: 3,
          name: '戒指',
          price: 8000,
          checked: false,
          num: 1,
          remove: false
        },
        {
          id: 4,
          name: '鞋子',
          price: 1000,
          checked: false,
          num: 1,
          remove: false
        }

      ]
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
