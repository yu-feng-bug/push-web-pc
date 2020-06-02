<template>
  <el-table :data="tableData" border style="width: 95%;margin-left: 40px;">
    <el-table-column v-for="(item,index) in labelList" fixed :prop="item.date" :label="item.label" :width="item.width" :key="index"></el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small"
          >查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
 name:'tableList',
 props:{
   labelList:{
     type:Array,
   },
   tableData:{
     type:Array,
   }

 },

  data() {
    return {
    };
  },
  created(){},
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },
};
</script>
