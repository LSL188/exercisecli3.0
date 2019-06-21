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
          <el-button type="primary" size="middle" @click="addCategories">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="categorieslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="分类名称" prop="cat_name" width="500"></el-table-column>
        <el-table-column label="是否有效" prop="goods_price"></el-table-column>
        <el-table-column label="排序" prop="goods_weight"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit"></el-button>
            <el-button type="danger" size="small" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    </div>
</template>

<script>
import mix from './GoodsCategories-mixins.js'
export default {
    mixins: [mix]
}
</script>

<style lang="less" scoped>
.goodscategories-container {
    
}
</style>
