<template>
  <div id="app">
    <h4>商品列表</h4>
    <el-table :data="productList"
              style="width: 100%"
              v-show="productList.length"
              show-summary="true">
      <el-table-column
        type="selection"
        width="55"><!--  v-model="scope.row.checked"-->
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名稱"
        width="200">
      </el-table-column>
      <el-table-column
        label="數量"
        width="250">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.num"
            :min="1" :max="scope.row.number"
            label="數量"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="價錢">
      </el-table-column>
      <el-table-column label="商品總價">
        <template slot-scope="scope">
          <div>{{scope.row.price*scope.row.num}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" v-model="scope.row.remove">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <div v-show="list.length===0" style="font-size:20px;color:red;display:none">商品全部為空</div>
    </div>
  </div>
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
      ],
      count: 0,
      istrue: false,
      ruleForm2: {
        name: '',
        price: '',
        age: ''
      },
      list: []
    }
  },
  computed: {
    countList: function () {
      var a = 0
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].checked === true) {
          a += this.list[i].price * this.list[i].num
        }
      }
      this.count = a
      return this.count
    }
  },
  watch: {
    istrue: function () {
      if (this.istrue === true) {
        for (let k = 0; k < this.list.length; k++) {
          this.list[k].checked = true
        }
      } else {
        for (let k = 0; k < this.list.length; k++) {
          this.list[k].checked = false
        }
      }
    }
  },
  methods: {
    removeId (value) {
      var ids = value.id
      for (var i = 0; i < this.list.length; i++) {
        if (ids === this.list[i].id) {
          this.list.splice(i, 1)
        }
      }
    },
    renderHeader: function (h, params) { // 实现table表头添加
      var self = this
      return h('div', [
        h('el-checkbox', {
          on: {
            change: (i) => {
              self.istrue = i
            }
          }
        }, '全选')
      ])
    },
    submitForm (formName) { // 实现点击添加
      let self = this
      let counts = 40
      counts++
      this.$refs[formName].validate((valid) => {
        if (valid) {
          self.list.push({
            id: counts,
            name: self.ruleForm2.name,
            price: self.ruleForm2.price,
            number: self.ruleForm2.age,
            checked: false,
            num: 1,
            remove: false
          })
          self.$refs[formName].resetFields()// 数据清空方法
          self.$message({
            message: '恭喜你，商品已经成功添加',
            type: 'success'
          })
        } else {
          alert('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()// 数据清空方法
    }
  }
}
</script>
