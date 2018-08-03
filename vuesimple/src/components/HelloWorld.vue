<template>
    <Form ref='formInline' :model='formInline' :rules='ruleInline' inline>
        <FormItem prop='user'>
            <Input type='text' v-model='formInline.user' placeholder='Username' />
                <Icon type='ios-person-outline' slot='prepend'></Icon>
        </FormItem>
        <FormItem prop='password'>
            <Input type='password' v-model='formInline.password' placeholder='Password' />
                <Icon type='ios-locked-outline' slot='prepend'></Icon>
        </FormItem>
        <br>
        <FormItem>
            <Button type='info' @click="handleSubmit('formInline')">Signin</Button>
             <Button type='info' @click="btnview('formInline')">View</Button>
        </FormItem>
           <Table :columns='columns1' :data='data1'></Table>
    </Form>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: 'Please fill in the user name',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please fill in the password.',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: 'The password length cannot be less than 6 bits',
            trigger: 'blur'
          }
        ]
      },
      columns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ]
    }
  },

  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('Success!')
          console.log(this.formInline)
          let url = 'http://localhost:3000/HelloWorld'
          axios
            .post(url, this.formInline)
            .then(res => {
              console.log('sucess', res)
            })
            .catch(err => {
              console.log('error', err)
            })
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  },
  btnview (data) {
    console.log('ok its working')
  }
}
</script>
