<template>
	<div class="el-container">
		<div class="el-aside">
			<el-aside width="200">
				<el-menu
					text-color="#fff"
					active-text-color="dodgerblue"
					default-active="2"
					class="el-menu" router>
					<el-menu-item index="/Shop" class="el-menu-item">
						<i class="el-icon-tickets el-icon"></i>
						<span slot="title">商品頁</span>
					</el-menu-item>
					<el-menu-item index="/Commodity" class="el-menu-item">
						<i class="el-icon-shopping-bag-2 el-icon"></i>
						<span slot="title">購物車</span>
					</el-menu-item>
					<el-menu-item index="/Orders" class="el-menu-item">
						<i class="el-icon-shopping-bag-2 el-icon"></i>
						<span slot="title">訂單管理</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
		</div>
		<el-container>
			<el-header class="header">
				<el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
					<el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
						<router-link :to="item.path" v-if="item.meta.title">{{ item.meta.title }}</router-link>
					</el-breadcrumb-item>
				</el-breadcrumb>
			</el-header>
			<el-main class="el-main">
				<router-view></router-view>
			</el-main>
		</el-container>
	</div>

</template>
<script>
export default {
	data () {
		return {
			levelList: []
		}
	},
	created () {
		this.getBreadcrumb()
	},
	methods: {
		handleOpen (key, keyPath) {
			console.log(key, keyPath)
		},
		handleClose (key, keyPath) {
			console.log(key, keyPath)
		},
		getBreadcrumb () {
			let matched = this.$route.matched.filter(item => item.name)
			this.levelList = matched
		}
	},
	watch: {
		$route () {
			this.getBreadcrumb()
		}
	}
}
</script>
<style>
html, body {
	height: 100%;
	padding: 0;
	margin: 0;
}

.el-container {
	height: 100%;
}

.el-aside {
	background-color: #304156;
	width: 200px;
	height: 100vh;
}

.el-menu {
	background-color: #304156;
	min-height: 100%;
	padding: 0;
}

.el-menu-item:hover {
	background-color: #2c3e50;
}

.header {
	background-color: #EFF2F7;
	margin: 0px 0px 20px 0px;
}

.el-breadcrumb {
	position: absolute;
	top: 20px;
}

.el-main {
	padding: 0px 20px;
}
</style>
