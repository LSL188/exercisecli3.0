export default {
    data() {
        return {
            categorieslist: []
        }
    },
    created() {
        this.getCategoriesList()
    },
    methods:{
        async getCategoriesList() {
            const {data: res} = await this.$http.get(`categories`)
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error('获取分类列表失败！')
            this.categorieslist = res.data
        },
        addCategories() {

        }
    }
}
