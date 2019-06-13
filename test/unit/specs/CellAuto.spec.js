import Vue from 'vue'
import CellAuto from '@/components/cell-auto'

describe('cell-auto.vue', () => {
  it('value should stay unchanged', () => {
    // CellAuto.use(Element)
    const Constructor = Vue.extend(CellAuto)
    const vm = new Constructor().$mount();

    vm.currCellData[0][0] = 1
    vm.currCellData[0][1] = 1
    vm.currCellData[1][0] = 1
    vm.currCellData[1][1] = 1

    vm.run()
    vm.stop()

    expect(vm.currCellData[0][0]).toBe(1)
  })

  it('value should change', () => {
    // CellAuto.use(Element)
    const Constructor = Vue.extend(CellAuto)
    const vm = new Constructor().$mount();

    vm.currCellData[0][0] = 0
    vm.run()
    vm.stop()

    expect(vm.currCellData[0][0]).toBe(0)
  })
})



