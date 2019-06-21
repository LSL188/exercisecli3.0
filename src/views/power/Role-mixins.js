export default {
  data() {
    // const checkRoleName = (rule, value, callback) => {
    //   if (value !== this.rolelist.roleName) {
    //       console.log(111)
    //     callback(new Error('角色名称已存在，请重新输出入'))
    //     // this.roleForm.roleName = ''
    //   } else {
    //     callback()
    //   }
    // }

    return {
      rolelist: [],
      addRoleDialogVisible: false,
      roleForm: {
        roleName: '',
        roleDesc: ''
      },
      roleFormRules: {
        roleName: [{
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }
          // { validator: checkRoleName, trigger: 'blur' }
        ],
        roleDesc: [{
          required: true,
          message: '请输入角色描述',
          trigger: 'blur'
        }]
      },
      editRoleDialogVisible: false,
      editRoleForm: {},
      editRoleFormRules: {},
      //   editRoleFormList: []
      setPowerDialogVisible: false,
      powerlist: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      defaultCheckKey: [],
      selectedRoleId: null
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const {
        data: res
      } = await this.$http.get('/roles')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取角色列表失败！')
      this.rolelist = res.data
      console.log(this.rolelist)
    },
    resetRole() {
      this.$refs.roleFormRef.resetFields()
      this.addRoleDialogVisible = false
    },
    saveRole() {
      this.$refs.roleFormRef.validate(async valid => {
        if (!valid) return
        // if (this.roleForm.roleName === this.rolelist.roleName) return this.$message.error('角色名已存在，请重新输入')
        const {
          data: res
        } = await this.$http.post('roles', this.roleForm)
        console.log(res)
        if (res.meta.status !== 201) return this.$message.error('添加角色失败！')
        this.$message.success('添加角色成功！')
        this.addRoleDialogVisible = false
        this.getRoleList()
      })
    },
    async editRole(id) {
      console.log(id)
      const { data: res } = await this.$http.get(`roles/${id}`)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取编辑角色信息失败！')
      this.editRoleForm = res.data
      console.log(this.editRoleForm)
      // 对象转数组
      //   this.getRoleList()
      // for (let i in this.editRoleForm) {
      //     this.editRoleFormList.push(this.editRoleForm[i])
      // }
      // console.log(this.editRoleFormList)
      this.editRoleDialogVisible = true
    },
    resetEditRole() {
      this.editRoleForm = {}
      // this.$refs.editRoleFormRef.resetFields()
      this.editRoleDialogVisible = false
    },
    saveEditRole() {
      this.$refs.editRoleFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put(`/roles/${this.editRoleForm.roleId}`, this.editRoleForm)
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error('编辑角色信息失败！')
        this.$message.success('编辑角色信息成功！')
        this.editRoleDialogVisible = false
        this.getRoleList()
      })
    },
    async removeRole(id) {
      console.log(id)
      const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        });
      }

      const { data: res } = await this.$http.delete(`roles/${id}`)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('删除角色失败！')
      this.$message.success('删除角色成功！')
      this.getRoleList()
    },
    async setPower(role) {
      this.selectedRoleId = role.id
      const {
        data: res
      } = await this.$http.get('rights/tree')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取权限列表失败！')
      this.powerlist = res.data
      const keys = []
      this.getLeafId(role, keys)
      this.defaultCheckKey = keys
      this.setPowerDialogVisible = true
    },
    getLeafId(node, keys) {
      if(!node.children) {
        keys.push(node.id)
      } else {
        node.children.forEach(item => this.getLeafId(item, keys))
      }
    },
    resetSetPower() {
      this.powerlist = []
      this.defaultCheckKey = []
      this.selectedRoleId = null
    },
    async saveSetPower() {
      const arr1 = this.$refs.treeRef.getCheckedKeys()
      const arr2 = this.$refs.treeRef.getHalfCheckedKeys()
      const rids = [...arr1, ...arr2].join(',')
      console.log(arr1)
      console.log(arr2)
      console.log(rids)

      const {data: res} = await this.$http.post(`roles/${this.selectedRoleId}/rights`, {rids})
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('保存分配权限失败！')
      this.$message.success('保存分配权限成功！')
      this.setPowerDialogVisible = false
      this.getRoleList()
    },
    async removePowerTag(role, powerId) {
      console.log(role)
      console.log(powerId)
      const confirmResult = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        }); 
      }

      const {data: res} = await this.$http.delete( `roles/${role.id}/rights/${powerId}`)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('删除制定的权限失败！')
      this.$message.success('删除指定的权限成功！')
      role.children = res.data
    }
  }
}
