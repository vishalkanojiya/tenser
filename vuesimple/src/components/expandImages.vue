<template>
    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <div class="hovereffect" v-for="(item, inx) in row.images" :key="inx">
        <img class="img-responsive" :src="item" width="150" height="150"/>
        <div class="overlay">
           <br><br><br><br><br><br><br>
           <Button type="ghost" @click="ondelete(inx)">Delete</Button>
        </div>
    </div>
</div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import _ from "lodash";
export default {
  props: {
    row: Object
  },
  mounted() {
    console.log("this.row", this.row.images);
  },
  methods: {
    ondelete(index) {
        console.log('row.images', this.row.images[index])
        let imgs = _.cloneDeep(this.row.images)
        console.log("http://localhost:3000/data/" + this.row.id)
        imgs.splice(index, 1)
        let data =  {images: imgs}
        axios.patch("http://localhost:3000/data/" + this.row.id, data).then(res => {
            console.log('success', res)
            this.row.images.splice(index, 1)
        }).catch(err => {
            console.log('error', err)
        })
    //   var id = this.res[index].id;
    //   console.log(id);
    //   axios.delete("http://localhost:3000/data/" + id);
    }
  }
};
</script>
<style>
.hovereffect {
  width: 100;
  height: 100;
  float: left;
  overflow: hidden;
  position: relative;
  text-align: center;
  cursor: default;
}

.hovereffect .overlay {
  width: 100%;
  height: 100;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.hovereffect img {
  display: block;
  position: relative;
  -webkit-transition: all 0.4s linear;
  transition: all 0.4s linear;
}

.hovereffect h2 {
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  position: relative;
  font-size: 17px;
  background: rgba(0, 0, 0, 0.6);
  -webkit-transform: translatey(-100px);
  -ms-transform: translatey(-100px);
  transform: translatey(-100px);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  padding: 10px;
}

.hovereffect a.info {
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  color: #fff;
  border: 1px solid #fff;
  background-color: transparent;
  opacity: 0;
  filter: alpha(opacity=0);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  margin: 50px 0 0;
  padding: 7px 14px;
}

.hovereffect a.info:hover {
  box-shadow: 0 0 5px #fff;
}

.hovereffect:hover img {
  -ms-transform: scale(1.2);
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
}

.hovereffect:hover .overlay {
  opacity: 1;
  filter: alpha(opacity=100);
}

.hovereffect:hover h2,
.hovereffect:hover a.info {
  opacity: 1;
  filter: alpha(opacity=100);
  -ms-transform: translatey(0);
  -webkit-transform: translatey(0);
  transform: translatey(0);
}

.hovereffect:hover a.info {
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
}
</style>


