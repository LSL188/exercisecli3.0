<template>
  <div class="role-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-button type="primary" size="middle" @click="addRoleDialogVisible = true">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="rolelist" stripe border>
        <el-table-column type="expand">
          <template slot-scope="scope">
              <!-- {{scope.row}} -->
              <!-- {{scope.row.children}} -->
            <el-row v-for="(item1, i1) in scope.row.children" :key="item1.id" :style="{'border-bottom':'1px solid #eee','border-top':i1===0? '1px solid #eee':''}"  class="marignCenter">
              <el-col :span="5">
                <el-tag type="primary" size="small" closable @close="removePowerTag(scope.row, item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row v-for="(item2, i2) in item1.children" :key="item2.id" :style="{'border-top':i2===0? '':'1px solid #eee'}"  class="marignCenter">
                  <el-col :span="6">
                    <el-tag type="success" size="small" closable @close="removePowerTag(scope.row, item2.id)">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag type="warning" size="small" v-for="item3 in item2.children" :key="item3.id" closable @close="removePowerTag(scope.row, item3.id)">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="400">
          <template slot-scope="scope">
            <div>
              <!-- {{scope.row}} -->
              <el-button
                type="primary"
                size="small"
                icon="el-icon-edit"
                @click="editRole(scope.row.id)"
              >编辑</el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="removeRole(scope.row.id)"
              >删除</el-button>
              <el-button
                type="warning"
                size="small"
                icon="el-icon-setting"
                @click="setPower(scope.row)"
              >分配权限</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="添加角色" :visible.sync="addRoleDialogVisible" width="50%" @close="resetRole">
      <el-form :model="roleForm" :rules="roleFormRules" ref="roleFormRef" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="roleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRole">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑角色"
      :visible.sync="editRoleDialogVisible"
      width="50%"
      @close="resetEditRole"
    >
      <el-form
        :model="editRoleForm"
        :rules="editRoleFormRules"
        ref="editRoleFormRef"
        label-width="100px"
      >
        <el-form-item label="角色名称">
          <el-input v-model="editRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEditRole">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="分配权限"
      :visible.sync="setPowerDialogVisible"
      width="50%"
      @close="resetSetPower"
    >
      <el-tree
        ref="treeRef"
        :data="powerlist"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defaultCheckKey"
        :props="defaultProps"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setPowerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSetPower">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mix from "./Role-mixins.js";
export default {
  mixins: [mix]
};
</script>

<style lang="less" scoped>
.role-container {
  .el-tag {
    margin: 10px 5px;
  }

  .marignCenter {
    display: flex;
    align-items: center;
  }
}
</style>

