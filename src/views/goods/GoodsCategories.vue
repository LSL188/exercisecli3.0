<template>
  <div class="goodscategories-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-button type="primary" size="middle" @click="addCategories">添加分类</el-button>
        </el-col>
      </el-row>
      <tree-table class="tree-table" :data="categorieslist" :columns="columns" border :selection-type="false" :expand-type="false" show-index index-text="#">
        <template slot="isno" slot-scope="scope">
          <!-- {{scope.row}} -->
          <i class="el-icon-success" style="color:skyblue" v-if="scope.row.cat_deleted == false"></i>
          <i class="el-icon-error" style="color:pink" v-else></i>
        </template>
        <template slot="paixu" slot-scope="scope">
          <!-- {{scope.row}} -->
          <el-tag type="primary" v-if="scope.row.cat_level == 0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level == 1">二级</el-tag>
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
        <template slot="opt" slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit"></el-button>
          <el-button type="danger" size="small" icon="el-icon-delete"></el-button>
        </template>
      </tree-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import mix from "./GoodsCategories-mixins.js";
export default {
  mixins: [mix]
};
</script>

<style lang="less" scoped>
.goodscategories-container {
  .tree-table {
    margin-top: 15px;
  }
}
</style>
