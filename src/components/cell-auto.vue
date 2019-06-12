<template>
  <div id="cell-auto">
    <el-row>
      <el-card style="width: 800px;height: 500px">
        <canvas 
          id="cvs" 
          ref="cvs"
          @mousemove="updateMousePos"
          @mousedown="changeCellState">
        </canvas>
      </el-card>
    </el-row>
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
      lifeColor: "red",
      emptyColor: "#CCC",
      cellSize: 16,
      rowCount: null,
      colCount: null,
      currCellData: null,
      nextCellData: null,
      curX: null,
      curY: null,
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
      this.cxt.fillStyle = this.emptyColor;
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
    },
<<<<<<< HEAD
    updateMousePos(e) {
      this.curX = e.offsetX;
      this.curY = e.offsetY;
    },
    changeCellState(e) {
      var cellColIndex = Math.floor(this.curX / this.cellSize);
      var cellRowIndex = Math.floor(this.curY / this.cellSize);
    },
=======
    judgeNum(){
        var num = 0;
        for (var x = 0; x < this.row; x++) {
            for (var y = 0; y < this.col; y++) {
                if (x != 0 && y != 0)
                    if (currentData[x-1][y-1] === 1) num++;
                if (x != 0)
                    if (currentData[x-1][y] === 1) num++;
                if (x != 0 && y != clo-1)
                    if (currentData[x-1][y+1] === 1) num++;
                if (y != 0)
                    if (currentData[x][y-1] === 1) num++;
                if (y != clo-1)
                    if (currentData[x][y+1] === 1) num++;
                if (x != row-1 && y != 0)
                    if (currentData[x+1][y-1] === 1) num++;
                if (x != row-1)
                    if (currentData[x+1][y] === 1) num++;
                if (x != row-1 && y != col-1)
                    if (currentData[x+1][y+1] === 1) num++;
            }
        }
        judgeAlive();
    },
    judgeAlive() {
        if (num === 3) nextData[x][y] = 1;
        if (num === 2) nextData[x][y] = currentData[x][y];
        else nextData[x][y] = 0;
    },

>>>>>>> 63cf13f6e58d51df1e92cc1ad547f7a44e35687e
  }
}
</script>

<style scoped>
.cell-auto {
  width: 800px;
  height: 600px;
}
</style>
