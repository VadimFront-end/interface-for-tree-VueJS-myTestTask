<template>
  <div style="width: 1200px;margin: auto">
    <div
        class="tree"
        v-for="(lvl, index1) in GET_LVL_TREE"
        style="display: flex"
        :key="index1">
      <div
          v-for="(vert, index) in GET_TREE[index1]"
          :key="index"
          style="height: 70px"
          :style="{width: 1200/Math.pow(2,index1)+'px'}"
          >
        <vert
            :index="index"
            :indexLVL="index1"
            :vert="vert"
            v-show="Object.keys(vert).length"/>
      </div>
    </div>
  </div>
</template>

<script>
import vert from '../components/vert'
import {mapGetters} from 'vuex'
export default {
  name: "tree",
  components: {
    vert
  },
  computed: {
    ...mapGetters([
        'GET_TREE',
        'GET_LVL_TREE'
    ])
  }
}
</script>