export default {
    data() {
        return {
            queryInfo: {
                type: '',
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
              ]
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
        addCategories() {

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
