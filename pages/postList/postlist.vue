<template>
  
  <div class="table standard"
       v-bind:class="{ 'dark-mode': darkModeOn }"
       :style="{ height: tableHeight + 'px' }">
    <div class="header">
      
      <div class="header-contents">
        <div class="dropdown">
          <button class="dropbtn">Level &#9660;</button>
          <div class="dropdown-content">
            <a href="#">Ph.D.</a>
            <a href="#">Master</a>
            <a href="#">Bachelor</a>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">Country/Region &#9660;</button>
          <div class="dropdown-content">
            <a href="#">United States</a>
            <a href="#">Singapore</a>
            <a href="#">Germany</a>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">Start Term &#9660;</button>
          <div class="dropdown-content">
            <a href="#">Spring</a>
            <a href="#">Summer</a>
            <a href="#">Fall</a>
            <a href="#">Winter</a>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">University &#9660;</button>
          <div class="dropdown-content">
            <a href="#">XXX</a>
          </div>
        </div>
        <div class="dropdown">
          <button class="button-reset">Reset</button>
        </div>
      </div>

    </div>

    <div class="list">

      
      

      <div class="t-body">
        <div v-for="(array, index) in receiveContentList"
             v-bind:key="index"
             class="items">
          <p :style="{ width: columnsWidth + 'px' }"
             v-for="(item, index) in array"
             v-bind:key="index">
            {{ item }}
          </p>
        </div>
      </div>
    </div>

    <div class="filter">
      <div class="wrapper-search">
        <input v-model="searchText"
               type="text"
               class="search"
               :placeholder="inputPlaceholder"
               v-on:keyup.enter="searchFunc" />
        <button @click="searchFunc" class="button-search">
          <svg class="icon-search"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
               heigth="19"
               width="19">
            <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>

      <div class="filter-field">
        <table>
          <tr>
            <td><button class="button-field">空间分析</button></td>
            <td><button class="button-field">遥感</button></td>
            <td><button class="button-field">地质</button></td>
          </tr>
          <tr>
            <td><button class="button-field">智慧城市</button></td>
            <td><button class="button-field">城市规划</button></td>
            <td><button class="button-field">制图</button></td>
          </tr>
          <tr>
            <td><button class="button-field">倾斜3D</button></td>
            <td><button class="button-field">云GIS</button></td>
            <td><button class="button-field">可视化</button></td>
          </tr>
        </table>
      </div>

    </div>

  </div>

</template>

<script>

export default {
  name: "post",
  data() {
    return {
      searchText: "",
      receiveContentList: this.content,
    };
  },
  methods: {
    searchFunc: function () {
      let filtredArray = [];
      if (this.isEmptyOrSpaces(this.searchText))
        return (this.receiveContentList = this.content);
      this.content.map((row) => {
        row.map((item) => {
          let itemLowCase = item.toLowerCase();
          let searchLowCase = this.searchText.toLowerCase();
          if (itemLowCase.includes(searchLowCase)) {
            let itemNotExist = filtredArray.indexOf(row) === -1;
            itemNotExist ? filtredArray.push(row) : null;
          }
        });
      });

      this.receiveContentList = filtredArray;
    },
    isEmptyOrSpaces: function (str) {
      return str === null || str.match(/^ *$/) !== null;
    },
    initialState:function(){
      return {
        modalBodyDisplay: 'getUserInput',
        submitButtonText: 'Lookup',
        addressToConfirm: null,
        bestViewedByTheseBounds: null,
        location: {
          name: null,
          address: null,
          position: null
         }
       }
     }

  },
  props: {
    content: {
      type: Array,
      default: () => {
        return [
          ["Position Name 1", "Univ1", "Loc1"],
          ["Position Name 2", "Univ2", "Loc2"],
          ["Position Name 3", "Univ3", "Loc3"],
          ["Position Name 4", "Univ4", "Loc4"],
          ["Position Name 5", "Univ5", "Loc5"],
        ];
      },
    },
    titles: {
      type: Array,
      default: () => {
        return ["Position Name"];
      },
    },
    tableHeight: { type: [String, Number] },
    inputPlaceholder: { type: String, default: "Search..." },
    columnsWidth: { type: [String, Number], default: 200 },
    darkModeOn: { type: Boolean, default: false },
    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");
  # table standard {
    font-family: 'Inter', sans-serif;
  }
  .standard {
    --background: #fff;
    --color-1: #f0f0f7;
    --color-2: #b1b3c4;
    --color-3: #f5f5f7;
    --color-4: #e4e5f1;
    --color-5: #4b4a54;
  }

.dark-mode {
  --background: #151618;
  --color-1: #222426;
  --color-2: #bfc0c1;
  --color-3: #191a1c;
  --color-4: #27282c;
  --color-5: #b9b9ba;
}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--color-4);
  border-radius: 5px;
}

p {
  margin: 0;
  padding: 0;
}

  .header {
    background-color: var(--color-4);
    padding: 10px
  }
  .header-contents {
    margin-left:-30%;
  }
  .dropbtn {
    background-color: #7CE3B3;
    color: var(--color-5);
    padding: 8px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    border-radius: 20px;
    height: 30px;
    margin-right: 30px;
    position: relative;
    
  }

  .dropdown {
    position: relative;
    display: inline-block;
    
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: var(--color-3);
    min-width: 16px;
    /*box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);*/
    z-index: 1;
  }

  .dropdown-content a {
      color: var(--color-5);
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      font-size: 10px;
    }

  .dropdown-content a:hover {
        background-color: #7CE3B3
      }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown:hover .dropbtn {
    background-color: #42d791;
  }

  .button-reset {
    background-color: #E6A23C;
    color: var(--color-5);
    padding: 8px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    border-radius: 20px;
    height: 30px;
    
    margin-left: 6px;
    
    

  }

  .table {
    background: var(--background);
    border-radius: 0px;
    padding: 0px;
    width: 100%;
    margin-left: 0%;
    height: fit-content;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    position: relative;
    overflow-y: auto;
  }

  .list {
    width: 60%;
    margin-left: 5%;
  }

  .filter {
    width:45%;
    margin-left:70%
  }


  .search {
    height: 35px;
    width: 50%;
    max-width: 500px;
    border-radius: 20px;
    outline: none;
    border: 3px solid var(--color-1);
    padding: 0 20px;
    color: var(--color-5);
    background: var(--background);
  }

  .wrapper-search {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }

  .icon-search {
    fill: var(--color-2);
  }

  .search::placeholder {
    color: var(--color-4);
    font-weight: bold;
    font-size: 15px;
  }

  .button-search {
    margin-left: -45px;
    border-radius: 20px;
    height: 30px;
    width: 40px;
    border: 0;
    outline: none;
    cursor: pointer;
    background-color: var(--color-1);
    transition: all 0.3s ease 0s;
  }

    .button-search:hover {
      background-color: var(--color-4);
    }


  .button-field {
    margin: 0px;
    border-radius: 20px;
    padding: 5px;
    height: 25px;
    width: 100px;
    border: 0;
    outline: none;
    cursor: pointer;
    background-color: var(--color-3);
    transition: all 0.3s ease 0s;
  }

    .button-field:hover {
      background-color: #7CE3B3;
    }



  .titles {
    display: flex;
    flex-direction: row;
    background: var(--color-1);
    padding: 15px 0;
    border-radius: 5px;
  }
.titles p {
  padding: 0 10px;
  color: var(--color-2);
}

.items {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  padding: 10px 0;
  color: var(--color-5);
  transition: all 0.3s ease 0s;
}

.items:nth-child(odd) {
  background-color: var(--color-3);
  border-radius: 5px;
}

.items:hover {
  background: #7CE3B3;
  border-radius: 5px;
}

.items p {
  padding: 0 10px;
}

.t-body {
  margin-top: 20px;
}



</style>
