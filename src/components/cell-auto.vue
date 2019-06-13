<template>
  <div id="cell-auto">
    <el-row :gutter="20">
      <el-col :offset="2" :span="7">
        <el-tooltip class="item" effect="dark" content="请选择细胞大小" placement="top-start">
        <el-select v-model="cellSize" 
          placeholder="请选择细胞大小" 
          @change="init"
          style="width:100px;margin: 0 20px;">
        <el-option
          v-for="item in cellSizes"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
        </el-select>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="请选择随机类型" placement="top-start">
        <el-select v-model="randVal" placeholder="请选择随机类型" style="width:120px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
        </el-select>
        </el-tooltip>
        <el-button type="primary" @click="randInit" round>
          rand Init
        </el-button>
      </el-col>
      <el-col :span="6">
        <el-badge :value="iterCount" :max="999" class="item" :hidden="!running">
        <el-button type="primary" @click="run" :loading="running" round>
          Run
        </el-button>
        </el-badge>
        <el-button type="primary" @click="stop" style="margin: 0 20px;" round>
          Stop
        </el-button>
        <el-button type="primary" @click="clear" round>
          Clear
        </el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="text">快</el-button>
        </el-col>
      <el-col :span="3">
        <el-tooltip class="item" effect="dark" content="改变进化速度" placement="top-start">
        <el-slider v-model="speed" :max="1000" :step="100" :show-tooltip="false"></el-slider>
        </el-tooltip>
      </el-col>
      <el-col :span="1">
        <el-button type="text">慢</el-button>
      </el-col>
      <el-col :span="1">
        <el-tooltip class="item" effect="dark" content="设定细胞颜色" placement="top-start">
        <el-color-picker v-model="lifeColor" show-alpha></el-color-picker>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row>
      <el-card ref="card">
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
      clientHeight: null,
      clientWidth: null,
      cvs: null,
      cxt: null,
      cells: null,
      randVal: 0.3,
      lifeColor: "red",
      emptyColor: "#CCC",
      cellSize: 16,
      iterCount: 0,
      rowCount: null,
      colCount: null,
      currCellData: null,
      nextCellData: null,
      cellRowIndex: null,
      cellColIndex: null,
      running: false,
      speed: 1000,
      alive: 1,
      dead: 0,
      options: [{
        value: 0.3,
        label: "大量随机"
      }, {
        value: 0.6,
        label: "中等随机"
      }, {
        value: 0.9,
        label: "少量随机"
      }],
      cellSizes: [{
        value: 16,
        label: '大'
      }, {
        value: 10,
        label: '中'        
      }, {
        value: 5,
        label: '小'   
      }],
      slideMarks: {
        0: '0',
        500: '0.5s',
        1000: '1s',
      }
    }
  },
  watch: {
    lifeColor: function() {this.drawGrid()}
  },
  mounted () {
    // Init canvas and grids
    this.clientHeight = `${document.documentElement.clientHeight}`;
    this.clientWidth = `${document.documentElement.clientWidth}`;
    this.$refs.card.$el.style.height = this.clientHeight - 180 + 'px';
    this.$refs.card.$el.style.width = this.clientWidth - 300 + 'px';
    this.cvs = this.$refs.cvs;
    this.cvs.height = this.clientHeight - 220;
    this.cvs.width = this.clientWidth - 340;
    this.cxt = this.cvs.getContext("2d");

    this.init();
  },
  methods: {
    init() {
      this.refreshCanvas();
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
    refreshCanvas() {
      this.cxt.clearRect(0, 0, this.cvs.width, this.cvs.height);
    },
    updateMousePos(e) {
      this.cellRowIndex = Math.floor(e.offsetY / this.cellSize);
      this.cellColIndex = Math.floor(e.offsetX / this.cellSize);
      if (e.ctrlKey) {
        this.changeCellState();
      }
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
    judgeNumOfLiveCellAround(){
      this.nextCellData = new Array();
      for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
        this.nextCellData[rowIndex] = new Array();
        for (var colIndex = 0; colIndex < this.colCount; colIndex++) {
          var numOfLiveCellAround = this.findNumOfLiveCellAround(rowIndex, colIndex);
          this.judgeCurrentCellIsAlive(numOfLiveCellAround, rowIndex, colIndex);
        }
      }
      this.currCellData = this.nextCellData;
      this.nextCellData = null;
    },
    findNumOfLiveCellAround(rowIndex, colIndex) {
      var numOfLiveCellAround = 0;
      if (rowIndex != 0 && colIndex != 0) {
        if (this.currCellData[rowIndex - 1][colIndex - 1]) {
          numOfLiveCellAround++;
        }
      }
      if (rowIndex != 0) {
        if (this.currCellData[rowIndex - 1][colIndex]) {
          numOfLiveCellAround++;
        }
      }
      if (rowIndex != 0 && colIndex != this.colCount - 1) {
        if (this.currCellData[rowIndex - 1][colIndex + 1]) {
          numOfLiveCellAround++;
        }
      }
      if (colIndex != 0) {
        if (this.currCellData[rowIndex][colIndex - 1]) {
          numOfLiveCellAround++;
        }
      }
      if (colIndex != this.colCount - 1) {
        if (this.currCellData[rowIndex][colIndex + 1]) {
          numOfLiveCellAround++;
        }
      }
      if (rowIndex != this.rowCount - 1 && colIndex != 0) {
        if (this.currCellData[rowIndex + 1][colIndex - 1]) {
          numOfLiveCellAround++;
        }
      }
      if (rowIndex != this.rowCount - 1) {
        if (this.currCellData[rowIndex + 1][colIndex]) {
          numOfLiveCellAround++;
        }
      }
      if (rowIndex != this.rowCount - 1 && colIndex != this.colCount - 1) {
        if (this.currCellData[rowIndex + 1][colIndex + 1]) {
          numOfLiveCellAround++;
        }
      }
      return numOfLiveCellAround;
    },

    judgeCurrentCellIsAlive(numOfLiveCellAround, rowIndex, colIndex) {
      if (numOfLiveCellAround === 3) {
        this.nextCellData[rowIndex][colIndex] = this.alive;
      }
      else if (numOfLiveCellAround === 2) {
        this.nextCellData[rowIndex][colIndex] =
        this.currCellData[rowIndex][colIndex];
      }
      else {
        this.nextCellData[rowIndex][colIndex] = this.dead;
      }
    },
    randInit() {
      for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
        for (var colIndex = 0; colIndex < this.colCount; colIndex++) {
          if (Math.random() > this.randVal) {
            this.currCellData[rowIndex][colIndex]  = 1;
          } else {
            this.currCellData[rowIndex][colIndex] = 0;
          }
        }
      }
      this.drawGrid();
    },
    clear() {
      for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
        for (var colIndex = 0; colIndex < this.colCount; colIndex++) {
          this.currCellData[rowIndex][colIndex] = 0;
        }
      }
      this.drawGrid();
    },
    run() {
      this.running = true;
      this.timer();
    },
    stop() {
      this.running = false;
      this.iterCount = 0;
    },
    timer() {
      if(this.running) {
        this.iterCount += 1;
        this.judgeNumOfLiveCellAround();
        this.drawGrid();
        setTimeout(this.timer, this.speed);
      }
    },
    formatTooltip(val) {
      return val / 1000;
    }
  }
}
</script>

<style scoped>
.cell-auto {
  width: 800px;
  height: 600px;
}
.el-row {
  margin-top: 10px;
}
</style>
