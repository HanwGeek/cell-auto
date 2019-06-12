<template>
  <div id="cell-auto">
    <!-- <el-row> -->
      <!-- <el-card style="width: 800px;height: 500px"> -->
        <canvas id="cvs" ref="cvs">
        </canvas>
      <!-- </el-card> -->
    <!-- </el-row> -->
  </div>
</template>

<script>
export default {
  name: 'CellAuto',
  data () {
    return {
      cvs: null,
      cxt: null,
      cells: null,
      lifeColor: null,
      emptyColor: "#CCC",
      cellSize: 16,
      rowCount: null,
      colCount: null,
    }
  },
  mounted () {
    // Init canvas and grids
    this.cvs = this.$refs.cvs;
    this.cvs.width = 700;
    this.cvs.height = 400;
    this.cxt = this.cvs.getContext("2d");

    // Calc grid number
    this.rowCount = Math.floor(this.cvs.height / this.cellSize);
    this.colCount = Math.floor(this.cvs.width / this.cellSize);
    this.drawGrid();
  },
  methods: {
    drawGrid() {
      this.cxt.fillStyle = "red";
      for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
        for (var colIndex = 0; colIndex < this.colCount; colIndex++) {
          this.cxt.fillRect(
            colIndex * this.cellSize + 1, 
            rowIndex * this.cellSize + 1, 
            this.cellSize - 1, 
            this.cellSize - 1
            );
        }
      }
      this.cxt.stroke();
    }
  }
}
</script>

<style scoped>
.cell-auto {
  width: 800px;
  height: 600px;
}
</style>
