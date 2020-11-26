import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tree: {
            name: 'root',
            id: 1,
            lvl: 0,
            parent: null,
            left: null,
            right: null
        },
        treeArray: [
            [
                {
                    name: 'root',
                    id: 1,
                    lvl: 0,
                    parent: null,
                    left: null,
                    right: null
                }
            ]
        ],
        lvlTree: 0,
        lastId: 2
    },
    mutations: {
        addLeftVert(state, vertData) {
            let id=vertData.idVert;
            function findVert(id,currentVert) {
                if(!currentVert)return ;
                if(id===currentVert.id) return currentVert;
                return findVert(id,currentVert.left)||findVert(id,currentVert.right);
            }
            const a=findVert(id, state.tree);
            if(!a)return;
            a.left = {
                name: state.lastId,
                id: state.lastId,
                parent: a.id,
                lvl: a.lvl+1,
                left: null,
                right: null
            }
            if(a.lvl+1>state.lvlTree)
                state.lvlTree++;
            state.lastId++;
            if(state.treeArray.length-1<state.lvlTree) {
                state.treeArray.push([]);
                for(let i=0;i<Math.pow(2,state.lvlTree);i++) {
                    state.treeArray[state.treeArray.length-1].push({});
                }
            }
            state.treeArray[a.lvl][vertData.indexVert].left=a.left;
            state.treeArray[a.left.lvl][vertData.indexVert*2]=a.left;
            // state.treeArray[a.left.lvl].splice(vertData.indexVert*2,1,a.left);
            let tmp=JSON.stringify(state.treeArray);
            state.treeArray=JSON.parse(tmp);
            console.log(state.treeArray)
        },
        addRightVert(state,vertData) {
            let id=vertData.idVert;
            function findVert(id,currentVert) {
                if(!currentVert)return ;
                if(id===currentVert.id) return currentVert;
                return findVert(id,currentVert.left)||findVert(id,currentVert.right);
            }
            const a=findVert(id, state.tree);
            if(!a)return;
            a.right = {
                name: state.lastId,
                id: state.lastId,
                parent: a.id,
                lvl: a.lvl+1,
                left: null,
                right: null
            }
            if(a.lvl+1>state.lvlTree)
                state.lvlTree++;
            state.lastId++;
            if(state.treeArray.length-1<state.lvlTree) {
                state.treeArray.push([]);
                for(let i=0;i<Math.pow(2,state.lvlTree);i++) {
                    state.treeArray[state.treeArray.length-1].push({});
                }
            }
            state.treeArray[a.lvl][vertData.indexVert].right=a.right;
            state.treeArray[a.right.lvl][vertData.indexVert*2+1]=a.right;
            let tmp=JSON.stringify(state.treeArray);
            state.treeArray=JSON.parse(tmp);
            // state.treeArray[a.left.lvl].splice(vertData.indexVert*2+1,1,a.left);
        },
        deleteVert(state, vertData) {
            let id=vertData.idParent;
            function findVert(id,currentVert) {
                if(!currentVert)return ;
                if(id===currentVert.id) return currentVert;
                return findVert(id,currentVert.left)||findVert(id,currentVert.right);
            }
            const a=findVert(id, state.tree);
            if(a.left&&a.left.id===vertData.idVert) {
                state.treeArray[a.lvl][vertData.indexVert/2].left=null;
                state.treeArray[a.left.lvl][vertData.indexVert]={};
                for(let i=a.left.lvl+1,k=1;i<state.lvlTree+1;i++,k++) {
                    for(let j=vertData.indexVert*Math.pow(2, k);j<vertData.indexVert*Math.pow(2, k)+Math.pow(2,k);j++) {
                        state.treeArray[i][j]={};
                    }
                }
                let tmp=JSON.stringify(state.treeArray);
                state.treeArray=JSON.parse(tmp);
                a.left=null;
            }
            else {
                state.treeArray[a.lvl][Math.trunc(vertData.indexVert/2)].right=null;
                state.treeArray[a.right.lvl][vertData.indexVert]={};
                for(let i=a.right.lvl+1,k=1;i<state.lvlTree+1;i++,k++) {
                    for(let j=vertData.indexVert*Math.pow(2, k);j<vertData.indexVert*Math.pow(2, k)+Math.pow(2,k);j++) {
                        state.treeArray[i][j]={};
                    }
                }
                let tmp=JSON.stringify(state.treeArray);
                state.treeArray=JSON.parse(tmp);
                a.right=null;
            }
        }
    },
    getters: {
        GET_TREE(state) {
            return state.treeArray;
        },
        GET_LVL_TREE(state) {
            let array=[];
            for(let i=0;i<state.lvlTree+1;i++) {
                array.push(0);
            }
          return array;
        }
    }
});