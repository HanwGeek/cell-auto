import Vue from 'vue'
import CellAuto from '@/components/CellAuto'

describe('CellAuto.vue', () => {
  it('should return correct value', () => {
    const Constructor = Vue.extend(CellAuto);
    const vm = new Constructor().$mount();
    console.log(vm.data);
  })
})