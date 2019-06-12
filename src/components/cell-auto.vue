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
    <el-row>
      <el-button 
      type="primary" 
      @click="run"
      round>
        Run
      </el-button>
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
      cellRowIndex: null,
      cellColIndex: null,
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

    // Init cell data
    this.currCellData = new Array();
    this.nextCellData = new Array();

    for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
      this.currCellData[rowIndex] = new Array();
      for (var colIndex = 0; colIndex < this.colCount; colIndex++) {
        this.currCellData[rowIndex][colIndex] = 0;
      }
    }

    this.drawGrid();
  },
  methods: {
    drawGrid() {  
      for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
        for (var colIndex = 0; colIndex < this.colCount; colIndex++) {
          this.cxt.fillStyle = 
            this.currCellData[rowIndex][colIndex] ? this.lifeColor : this.emptyColor;
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
    updateMousePos(e) {
      this.cellRowIndex = Math.floor(e.offsetY / this.cellSize);
      this.cellColIndex = Math.floor(e.offsetX / this.cellSize);
    },
    changeCellState(e) {
      this.currCellData[this.cellRowIndex][this.cellColIndex] = 
        !this.currCellData[this.cellRowIndex][this.cellColIndex];
      this.renderSingleCell();
    },
    renderSingleCell() {
      this.cxt.fillStyle = 
        this.currCellData[this.cellRowIndex][this.cellColIndex] ? this.lifeColor : this.emptyColor;
      this.cxt.fillRect(
        this.cellColIndex * this.cellSize + 1,
        this.cellRowIndex * this.cellSize + 1,
        this.cellSize - 1,
        this.cellSize - 1
        );
    },
    judgeNum(){
        var num = 0;
        this.nextCellData = new Array();
        for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
          this.nextCellData[i] = new Array();
          for (var colIndex = 0; colIndex < this.colCount; colIndex++) {
            if (rowIndex != 0 && colIndex != 0)
              if (this.currCellData[rowIndex - 1][colIndex - 1]) num++;
            if (rowIndex != 0)
              if (this.currCellData[rowIndex - 1][colIndex]) num++;
            if (rowIndex != 0 && colIndex != this.colCount - 1)
              if (this.currCellData[rowIndex - 1][colIndex + 1]) num++;
            if (colIndex != 0)
              if (this.currCellData[rowIndex][colIndex - 1]) num++;
            if (colIndex != this.colCount - 1)
              if (this.currCellData[rowIndex][colIndex + 1]) num++;
            if (rowIndex != this.rowCount - 1 && colIndex != 0)
              if (this.currCellData[rowIndex + 1][colIndex - 1]) num++;
            if (rowIndex != this.rowCount - 1)
              if (this.currCellData[rowIndex + 1][colIndex]) num++;
            if (rowIndex != this.rowCount - 1 && colIndex != this.colCount - 1)
              if (this.currCellData[rowIndex + 1][colIndex + 1]) num++;

            if (num == 3) this.nextCellData[rowIndex][colIndex] = 1;
            if (num == 2) this.nextCellData[rowIndex][colIndex] = 
                            this.currCellData[rowIndex][colIndex];
            else this.nextCellData[rowIndex][colIndex] = 0;                            
          }
        }
        // judgeAlive();
    },
    judgeAlive() {
        if (num === 3) nextData[x][y] = 1;
        if (num === 2) nextData[x][y] = currentData[x][y];
        else nextData[x][y] = 0;
    },
  }
}
</script>

<style scoped>
.cell-auto {
  width: 800px;
  height: 600px;
}
</style>
