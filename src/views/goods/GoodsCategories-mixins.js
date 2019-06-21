export default {
    data() {
        return {
            queryInfo: {
                type: 3,
                pagenum: 1,
                pagesize: 5
            },
            categorieslist: [],
            total: 0,
            columns: [
                {
                  label: '分类名称',
                  prop: 'cat_name'
                },
                {
                  label: '是否有效"',
                  prop: 'cat_deleted',
                  type: 'template',
                  template: 'isno',
                },
                {
                  label: '排序',
                  prop: 'cat_level',
                  type: 'template',
                  template: 'paixu',
                },
                {
                  label: '操作',
                  prop: 'likes',
                  type: 'template',
                  template: 'opt',
                },
              ],
              addCategoriesDialogVisible: false,
              addCategoriesForm: {
                cat_name: '',
                cat_pid: 0,
                cat_level: 0
              },
              addCategoriesFormRules: {
                cat_name: [{required: true, message:'请输入分类名称', trigger: 'blur'}]
              },
              addCateList: [],
              selectedAddCateList: [],
              cascaderConfig: {
                expandTrigger: 'hover',
                label: 'cat_name',
                value: 'cat_id',
                children: 'children',
                checkStrictly: true
              }
        }
    },
    created() {
        this.getCategoriesList()
    },
    methods:{
        async getCategoriesList() {
            const {data: res} = await this.$http.get(`categories`, {params: this.queryInfo})
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error('获取分类列表失败！')
            this.categorieslist = res.data.result
            this.total = res.data.total
        },
        async addCategories() {
            const {data:res} = await this.$http.get(`categories`, {params: {type:2}})
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error('获取添加分类列表失败！')
            this.addCateList = res.data
            this.addCategoriesDialogVisible = true
        },
        async handleChange() {
            console.log(this.selectedAddCateList)
            if (this.selectedAddCateList.length === 0) {
                this.addCategoriesForm. cat_pid = 0
                this.addCategoriesForm. cat_level = 0
            } else {
                this.addCategoriesForm. cat_pid = this.selectedAddCateList[this.selectedAddCateList.length-1]
                this.addCategoriesForm. cat_level = this.selectedAddCateList.length
            }
            console.log(this.addCategoriesForm)
            
        },
        resetAddCate() {
            this.$refs.addCategoriesFormRef.resetFields()
            this.selectedAddCateList = []
            console.log(this.addCategoriesForm)
            this.addCategoriesForm. cat_pid = 0
            this.addCategoriesForm. cat_level = 0
        },
        saveAddCate() {
            this.$refs.addCategoriesFormRef.validate(async valid=> {
                if (!valid) return
                const {data: res} = await this.$http.post(`categories`, this.addCategoriesForm)
                console.log(res)
                if (res.meta.status !== 201) return this.$message.error('保存添加分类失败！')
                this.$message.success('保存添加分类成功！')
                this.addCategoriesDialogVisible = false
                this.getCategoriesList()
            })
        },
        // handleSizeChange(size) {
        //     console.log(size)
        //     this.queryInfo.pagesize = size
        //     this.getCategoriesList()
        // },
        handleCurrentChange(num) {
            this.queryInfo.pagenum = num
            this.getCategoriesList()
        }
    }
}
