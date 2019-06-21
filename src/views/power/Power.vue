<template>
  <div class="power-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-table :data="powerlist" border height="450">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="权限名字" prop="authName"></el-table-column>
            <el-table-column label="路径" prop="path"></el-table-column>
            <el-table-column label="权限等级">
                <template slot-scope="scope">
                    <div>
                        <el-tag type="primary" size="small" v-if="scope.row.level == 0">一级</el-tag>
                        <el-tag type="success" size="small" v-else-if="scope.row.level == 1">二级</el-tag>
                        <el-tag type="warning" size="small" v-else>三级</el-tag>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
import mix from "./Power-mixins.js";
export default {
  mixins: [mix]
};
</script>

<style lang="less" scoped>
.power-container {
}
</style>

