<template>
  <el-container class="home-container">
    <el-header>
      <div class="left">
        <img src="../../assets/logo.png" alt>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" size="small" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="collapse? '65px':'200px'">
        <div class="toggleBar" @click="collapse=!collapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff" unique-opened :collapse="collapse" :collapse-transition="false" router :default-active="activePath1"
        >
          <el-submenu :index="item.id+ ''" v-for="(item, i) in menus" :key="item.id" :style="collapse? 'width:65px':'width:200px'">
            <template slot="title">
              <i :class="['iconfont', iconlist[i]]"></i>
              <span>{{item.authName}}</span>
            </template>
              <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveActivePath('/'+subItem.path)">
                <i class="el-icon-menu"></i>
                <span slot="title">{{subItem.authName}}</span>
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menus: [],
      iconlist: ['icon-users', 'icon-shangpin', 'icon-tijikongjian', 'icon-danju', 'icon-baobiao'],
      collapse: false,
      activePath1: ''
    };
  },
  created() {
    this.getMenu()
    const ap = window.sessionStorage.getItem('acPath')
    this.activePath1 = ap
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenu() {
      const {data: res} = await this.$http.get('/menus')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取左侧菜单列表失败！')
      this.menus = res.data
    },
    saveActivePath(activePath) {
      console.log(activePath)
      this.activePath1 = activePath
      window.sessionStorage.setItem('acPath', activePath)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  .el-header {
    user-select: none;
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 10%;
        height: 10%;
        margin-right: 10px;
      }
      span {
        color: #fff;
      }
    }
  }
  .el-aside {
    user-select: none;
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
.iconfont {
  margin-right: 10px;
}
.toggleBar {
  text-align: center;
  font-size: 12px;
  line-height: 25px;
  color: #fff;
  background-color: #4a5064;
  letter-spacing: 0.1em;
  cursor: pointer;
}
</style>
