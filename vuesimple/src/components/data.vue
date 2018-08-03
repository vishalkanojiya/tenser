<template>
<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="width:50%; margin-left:20%; margin-top:5%">
    <FormItem prop="id">
        <Input type="hidden" v-model.trim="formValidate.id" placeholder="id"/>
    </FormItem>
    <FormItem label="Name" prop="name">
        <Input type="text" v-model.trim="formValidate.name" placeholder="Enter your name"/>
    </FormItem>
    <FormItem label="E-mail" prop="email">
        <Input type="text" v-model.trim="formValidate.email" placeholder="Enter your e-mail"/>
    </FormItem>
    <FormItem label="Mobile" prop="mobile">
        <Input type="text" v-model.trim="formValidate.mobile" placeholder="Enter your number" number/>
    </FormItem>
    <FormItem label="Address" prop="address">
        <Input type="text" v-model.trim="formValidate.address" placeholder="Enter your address"/>
    </FormItem>
    <FormItem label="Image">
        <input type="file" id="images" @change="uploadImage" accept="image/jpeg,image/png" ref="fileupload" multiple/>
    </FormItem>
    <FormItem>
        <Button type="ghost" @click="onupdate()">Update</Button>
        <Button type="primary" @click="onSubmit('formValidate')">Submit</Button>
        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        <Button type="primary" @click="onView" style="margin-left: 8px">View</Button>
    </FormItem>
    <Table :columns="columns1" :data="res"></Table>
</Form>
</template>
<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/iview/dist/iview.min.js"></script>
<script>
/* eslint-disable */
import axios from "axios";
import expandRow from './expandImages.vue'
export default {
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please fill mobile number"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please enter a numeric value"));
        } else {
          callback();
        }
      });
    };
    return {
      formValidate: {
        name: "",
        email: "",
        mobile: "",
        address: "",
        images: []
      },
      id: '',
      isShow: false,
      seen: true,
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        mobile: [
          { validator: validateMobile, required: true, trigger: "blur",max: 10 }
        ],
        address: [
          {
            required: true,
            message: "Please enter a proper address",
            trigger: "blur"
          },
          {
            type: "string",
            max: 50,
            message: "Introduce no max than 50 words",
            trigger: "blur"
          }
        ]
      },
      labelPosition: "left",
      columns1: [
        {
          title: "Id",
          key: "id"
        },
        {
          title: "User",
          key: "name"
        },
        {
          title: "Email",
          key: "email"
        },
        {
          title: "mobile",
          key: "mobile"
        },
        {
          title: "address",
          key: "address"
        },
        {
          title: "Images",
            title: "Image",
            type: 'expand',
              render: (h, params) => {
                return h(expandRow, {
                    props: {
                        row: params.row
                    }
                })
            }
        },
        {
          title: 'Action',
          key: '',
          render: (h, params) => {
            let self = this;
            // console.log(params.index, params.row)
            return h('div', [
              h('Button', {
                props: {
                  type: 'ghost'
                },
                on: {
                  click: () => {
                    // axios.delete(this.id)
                    this.remove(params.index)
                    this.res.splice(params.index,1)
                  }
                }
              } ,'Delete'),
              h('Button', {
                props: {
                  type: 'primary'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              } , 'View'),
              h('Button', {
                props: {
                  type: 'ghost'
                },
                on: {
                  click () {
                    console.log(params.row.id)
                    console.log('Edit', params.row)
                    self.isShow = true
                    // self.isID = params.row.id
                    self.formValidate.id = params.row.id
                    self.formValidate.name = params.row.name
                    self.formValidate.email = params.row.email
                    self.formValidate.mobile = params.row.mobile
                    self.formValidate.address = params.row.address
                self.formValidate.images = params.row.images
                  }
                }
              } , 'Edit')
            ])
          }
        }
      ],
      res: []
    };
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Infoormation',
        content: `id: ${this.res[index].id}<br>EMail: ${this.res[index].email}<br>Name: ${this.res[index].name}<br>Address: ${this.res[index].address}<br>Number: ${this.res[index].mobile}`
      })
    },
    uploadImage: function(e) {
      var images = [];
      for (let i = 0; i < 10; i++) {
        images = e.target.files[i];
        console.log(images);
        if (!images.type.includes("image/")) {
          alert("Please select an image file");
          return;
        }
        if (typeof FileReader === "function") {
          const reader = new FileReader();
          reader.onload = event => {
            this.formValidate.images.push(event.target.result);
            console.log(this.formValidate.images);
          };
          reader.readAsDataURL(images);
        } else {
          alert("sorry File is not supported");
        }
      }
    },
    remove (index) {
      var id = this.res[index].id
      console.log(id);
      axios.delete('http://localhost:3000/data/' + id)
    },
 onupdate(name) {
    var id = this.formValidate.id
     console.log(id);
          this.$Message.success("Update!");
          console.log("Update", this.formValidate);
          axios
          .put('http://localhost:3000/data/' + id, this.formValidate)
          .then(res => {
              console.log("Updated", res)
            })
          .catch(err => {
              console.log("Error", err);
            });
    },
  onSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
          console.log(this.formValidate);
          let url = "http://localhost:3000/data";
          axios
            .post(url, this.formValidate)
            .then(res => {
              console.log("Success", res);
              //  this.res = res.data
                this.$refs[name].resetFields();
                this.isShow = false
                this.$refs.fileupload.value = null;
                location.reload()
            })
            .catch(err => {
              console.log("Error", err);
            });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.isShow = false
      this.$refs.fileupload.value = null;
      location.reload();
    },
    onView() {
      //  var base64Img = require('base64-img');
      this.$Message.success("Success!");
       console.log(this.formValidate)
      let url = "http://localhost:3000/data";
      axios
        .get(url, this.formValidate)
        .then(res => {
          console.log("Success", res.data);
          this.res = res.data;
          console.log(this.res)
        })
        .catch(err => {
          console.log("Error", err);
        });
    }
  }
};
</script>
