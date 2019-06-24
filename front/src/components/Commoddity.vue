<template>
  <div id="app">
    <el-card>
      <h4>商品清單</h4>
      <el-table :data="list" style="width: 100%;" v-show="list.length">
        <el-table-column label="复选框" width="100">
          <template scope="scope">
            <el-checkbox v-model="scope.row.checked" ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名稱" width="180">
        </el-table-column>
        <el-table-column prop="price" label="單價" width="180">
        </el-table-column>
        <el-table-column label="數量" width="380">
          <template scope="scope">
            <el-input-number v-model="scope.row.num" :min="1" :max="scope.row.number"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="總計">
          <template scope="scope">
            <div>{{scope.row.price*scope.row.num}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
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
    <el-card>
      <div class="carFooter">
        <div v-show="list.length===0" style="font-size:20px;color:red;display:none">購物車是空的</div>
        <div>總金額 :<span> NT$ {{countList}}</span></div>
        <div class="settleBtn">結帳</div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {
          id: 1,
          name: '皮夾',
          price: 400,
          checked: false,
          num: 1,
          remove: false
        },
        {
          id: 2,
          name: '手環',
          price: 200,
          checked: false,
          num: 1,
          remove: false
        },
        {
          id: 3,
          name: '戒指',
          price: 800,
          checked: false,
          num: 1,
          remove: false
        },
        {
          id: 4,
          name: '鞋子',
          price: 100,
          checked: false,
          num: 1,
          remove: false
        }
      ],
      count: 0,
      istrue: false,
      centerDialogVisible: false

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
      this.centerDialogVisible = false
    }

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
