export default {
    data() {
        return {
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 10
            },
            goodslist: [],
            total: 0
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        async getGoodsList() {
            const {data: res} = await this.$http.get(`goods`, {params: this.queryInfo})
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error('获取商品列表失败！')
            this.goodslist = res.data.goods
            this.total = res.data.total
        },
        handleSizeChange(size) {
            this.queryInfo.pagesize = size
            this.getGoodsList()
        },
        handleCurrentChange(num) {
            this.queryInfo.pagenum = num
            this.getGoodsList()
        },
        addGoods() {
            this.$router.push('/goods/add')
        }
    },
    // 私有过滤器
    // filters: {
    //     dateFormat: function(originVal) {
    //         const dt = new Date(originVal)
    //         const y = dt.getFullYear()
    //         const m = (dt.getMonth() + 1 +'').padStart(2, '0')
    //         const d = (dt.getDate() + '').padStart(2, '0')

    //         const hh = (dt.getHours() + '').padStart(2, '0')
    //         const mm = (dt.getMinutes() + '').padStart(2, '0')
    //         const ss = (dt.getSeconds() + '').padStart(2, '0')

    //         return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    //     }
    // }
}
