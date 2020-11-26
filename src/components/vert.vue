<template>
  <div class="vert">
    <div
        class="delete-vert"
        @click="deleteVert"
        v-show="vert.id!==1">&#9746;
    </div>
    <div class="round">
      <div
          v-show="vert.left"
          class="left-branch"
          :style="{
            width: 255/(indexLVL+1)-indexLVL*15+'px',
            transform: 'rotate('+-14*(indexLVL+1)+'deg)',
            left: -250/(indexLVL+1)+indexLVL*20+'px'}"></div>
      <div
          v-show="vert.right"
          class="right-branch"
          :style="{
            width: 255/(indexLVL+1)-indexLVL*15+'px',
            transform: 'rotate('+ 14*(indexLVL+1)+'deg)',
            right: -250/(indexLVL+1)+indexLVL*20+'px'}"></div>
      <div>{{vert.name}}</div>
      <div v-show="vert.parent">{{vert.parent===1 ? 'root': 'p:' + vert.parent}}</div>
    </div>
    <div>
      <button v-show="!vert.left" @click="addLeftVert">+Л</button>
      <button v-show="!vert.right" @click="addRightVert">+П</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "vert",
  props: {
    vert: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default() {
        return 0;
      }
    },
    indexLVL: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  methods: {
    addLeftVert() {
      const vertData = {
        indexVert: this.index,
        idVert: this.vert.id
      }
      this.$store.commit('addLeftVert', vertData);
    },
    addRightVert() {
      const vertData = {
        indexVert: this.index,
        idVert: this.vert.id
      }
      this.$store.commit('addRightVert', vertData);
    },
    deleteVert() {
      const vertData = {
        indexVert: this.index,
        idVert: this.vert.id,
        idParent: this.vert.parent
      }
      this.$store.commit('deleteVert', vertData);
    }
  }
}
</script>

<style>
.vert {
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.round {
  width: 50px;
  position: relative;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 50%;
}
.delete-vert {
  position: absolute;
  opacity: 0;
}
.vert:hover .delete-vert {
  opacity: 1;
  transform: translate(30px,-30px);
  transition: 1s;
}
.left-branch {
  content: '';
  top: 60px;
  position: absolute;
  height: 1px;
  background: black;
}
.right-branch {
  content: '';
  top: 60px;
  position: absolute;
  height: 1px;
  background: black;
}
</style>