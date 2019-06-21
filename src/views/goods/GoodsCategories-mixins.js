export default {
    data() {
        return {
            queryInfo: {
                pagenum: 1,
                pagesize: 8
            },
            categorieslist: [],
            total: 0
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
        handleSizeChange(size) {
            console.log(size)
            this.queryInfo.pagesize = size
            this.getCategoriesList()
        },
        handleCurrentChange(num) {
            this.queryInfo.pagenum = num
            this.getCategoriesList()
        }
    }
}
