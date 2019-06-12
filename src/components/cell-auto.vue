<template>
  <div id="cell-auto">
    <el-row>
       <el-card style="width: 1000px;height: 600px">
      <canvas 
      id="cvs"
      ref="cvs">
      </canvas>
       </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CellAuto",
  data () {
    return {
      cvs: null
    }
  },
  mounted () {
    this.cvs = this.$refs.cvs;
    this.cxt = this.cvs.getContext("2d");
  },
  methods: {

  }
}
</script>
