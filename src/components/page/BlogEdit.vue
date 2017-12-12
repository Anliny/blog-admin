<template >
    <div  class="table"  v-loading="loading">
        <!-- 面包屑 -->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/readme' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>栏目管理</el-breadcrumb-item>
                <el-breadcrumb-item>栏目编辑</el-breadcrumb-item>
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
            <el-table-column prop="courseName" label="栏目名称"></el-table-column>
            <el-table-column property="courseDescribe" label="栏目描述"></el-table-column>
            <el-table-column prop="updateTime" :formatter="dateFormat" label="创建时间"></el-table-column>
            <el-table-column    label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small" :to="{ path: '/readme'}">编辑</el-button>
                    <el-button type="text" size="small">删除</el-button>
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
        <el-dialog 
            title="详情" 
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <ul class="carList">
                <li>
                    <h3>ID</h3>
                    <P>{{onDate._id}}</P>
                </li>
                <li>
                    <h3>栏目名称</h3>
                    <P>{{onDate.courseName}}</P>
                </li>
                <li>
                    <h3>栏目描述</h3>
                    <P>{{onDate.courseDescribe}}</P>
                </li>
                <li>
                    <h3>修改时间</h3>
                    <P>{{onDate.updateTime | formatDate}}</P>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>


    </div>
      
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    import {formatDate} from '../../assets/js/data.js';

    export default {
        data: function(){
            const self = this;
            return {
                url: '/api/admin/blogs',
                tableData: [],
                loading:true,
                pagination :{} ,
                dialogVisible: false,
                onDate : {}
            }
        },
        filters:{
            formatDate(time){
                let date = new Date(time);
                return formatDate(date,'yyyy-MM-dd hh:mm:ss');
                //此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
            }
        },
        methods: {
            // 格式化时间函数
            dateFormat:function(row,column){
                var date = row[column.property];  
                if (date == undefined) {  
                    return "";  
                }  
                return moment(date).format("YYYY-MM-DD HH:mm:ss");  
            },
            //查看列表详情
            handleClick(row) {
                this.onDate = row;
                console.log(row);
                this.dialogVisible = true
            },

            //关闭模态框
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
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
            }
        },
        computed:{

        },
        created:function(){
            let self = this;
            axios.get(self.url).then((req)=>{
                if(req.data.code == 1){
                    self.tableData = req.data.message.blogs;
                    self.pagination = {
                        count:req.data.message.count,
                        limit:req.data.message.limit,
                        page:req.data.message.page,
                        pages:req.data.message.pages
                    }
                    self.loading = false;
                }
            }).catch((error)=>{
                console.log(error);
            })
        }


    }
</script>
<style scoped>
    .carList{
        margin: 10px;
        list-style: none;
    }
    .carList li{
        list-style: none;
        border-bottom: 1px darkgray dashed;
    }
    .carList h3{
        padding: 18px 20px;
        box-sizing: border-box;
    }
    .carList p{
        padding: 5px 20px;
        box-sizing: border-box;
    }
</style>
