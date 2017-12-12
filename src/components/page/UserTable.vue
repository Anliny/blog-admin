<template >
    <div  class="table"  v-loading="loading">
        <!-- 面包屑 -->
        <div class="crumbs">
            <el-breadcrumb separator="/readme">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--  -->
        <div class="plugins-tips">
            vue-datasource：一个用于动态创建表格的vue.js服务端组件。
            访问地址：<a href="https://github.com/coderdiaz/vue-datasource" target="_blank">vue-datasource</a>
        </div>


        <el-table :data="tableData"  :row-class-name="tableRowClassName">
            <el-table-column type='index' label="编号"></el-table-column>
            <el-table-column prop="_id" label="ID"></el-table-column>
            <el-table-column prop="username" label="姓名"></el-table-column>
            <el-table-column property="password" label="密码"></el-table-column>
            <el-table-column :prop="isAdmin?'是':'否'" label="是否是管理员"></el-table-column>
            <el-table-column
                label="操作"
                width="120">
                <template slot-scope="scope">
                    <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">移除</el-button>
                </template>
            </el-table-column>
        </el-table>
      
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagination.page"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.count">
            </el-pagination>
        </div>
    </div>
      
</template>

<script>
    import axios from 'axios';

    export default {
        data: function(){
            const self = this;
            return {
                url: '/api/admin/users',
                tableData: [],
                loading:true,
                pagination :{} ,
            }
        },
       
        methods: {
            isAdmin(){
                console.log(123);
                return "aaa";
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                var self = this;
                 self.loading = true;
                console.log(`当前页: ${val}`);
                
                axios.get(self.url+`?page=${val}`).then((data)=>{
                    console.log(data);
                    self.tableData = data.data.message.users;
                    self.pagination = {
                        count:data.data.message.count,
                        limit:data.data.message.limit,
                        page:data.data.message.page,
                        pages:data.data.message.pages
                    } 
                    console.log(self.page);

                    self.loading = false;
                }).catch((error)=>{
                    console.log(error);
                })
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            }
        },
        computed:{

        },
        created:function(){
            let self = this;
            axios.get(self.url).then((data)=>{
                self.tableData = data.data.message.users;
                self.pagination = {
                    count:data.data.message.count,
                    limit:data.data.message.limit,
                    page:data.data.message.page,
                    pages:data.data.message.pages
                } 
                self.loading = false;
            }).catch((error)=>{
                console.log(error);
            })
        }


    }
</script>