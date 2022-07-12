<template>
<v-main class="profilecustomer">
  <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Profile Customer</v-toolbar-title>
                     </v-toolbar>
                      <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Full Name*"
                  v-model="customer.nama_customer"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="No KTP*"
                  v-model="customer.no_ktp"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="alamat*"
                  persistent-hint
                  v-model="customer.alamat_customer"
                  required
                ></v-text-field>
              </v-col>
                            <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Gender"
                  persistent-hint
                  v-model="customer.gender_customer"
                  required
                ></v-text-field>
              </v-col>
                <v-col 
                cols="12"
                sm="6"
                label="Tanggal Lahir">
                <v-text-field
                type="Date"
                hint="Tanggal Lahir"
                v-model="customer.tgl_lahir_customer"
                persistent-hint
                required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  v-model="customer.email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nomor Telepon*"
                  type="text"
                  v-model="customer.no_telp_customer"
                  required
                ></v-text-field>
              </v-col>

            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="dialog=true" class="white--text">Update</v-btn>
                         <v-btn color="second" @click="dialogConfirm = true">Delete</v-btn>
                     </v-card-actions>
                  </v-card>
                  <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{error_message}}</v-snackbar>
               </v-flex>
            </v-layout>
         </v-container>

          <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5" >User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Full Name*"
                  v-model="customer.nama_customer"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="No KTP*"
                  v-model="customer.no_ktp"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Alamat"
                  v-model="customer.alamat_customer"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
                            <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Laki-Laki', 'Perempuan']"
                  v-model="customer.gender_customer"
                  label="Gender"
                ></v-autocomplete>
              </v-col>
                <v-col 
                cols="12"
                sm="6"
                label="Tanggal Lahir">
                <v-text-field
                type="Date"
                hint="Tanggal Lahir"
                v-model="customer.tgl_lahir_customer"
                persistent-hint
                required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  v-model="customer.email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  v-model="form.password"
                  type="password"
                  required
                ></v-text-field>
              </v-col>

            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="close"
          >
            Close
          </v-btn>
          <v-btn
          color="primary"
            @click="update"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

     <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">WARNING!!!</span>
        </v-card-title>
        <v-card-text>Anda Yakin Ingin Menghapus Data ??</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

     <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{error_message}}</v-snackbar>
   
  </v-row>
   
</v-main>
  
</template>

<script>
export default {
    name: "ProfileCustomerPage",
   data(){
        return{
        dialogUpdate: false,
        search: null,
        inputType: 'Tambah',
        load: false,
        dialog:null,
        dialogConfirm:false,
        select: null,
            snackbar:false,
            color:'',
            error_message: '',

            rules: [
                value => !value || value.size < 20000000 || 'Avatar size should be less than 2 MB!',
            ],
            items: [
                 {value: "Indonesia", text:  'Indonesia'},
                 {value: "Indonesia & Inggris", text:  'Indonesia & Inggris'},
             ],
             
            headers:[
                {text: "ID Driver", align: "start", sortable:true,value:"custom_id"},
                {text: "Nama", value: "nama"},
                {text: "Alamat", value: "alamat"},
                {text: "Tanggal Lahir", value : "tgl_lahir"},
                {text: "Gender", value: "gender"},
                {text: "Phone", value: "no_telp_customer"},
                {text: "email", value: "email"},
                {text: "Status", value: "status"},
                {text: "Actions", value: 'actions'},

            ],
            customer: [],
            nama:null,
            noktp:null,
            alamat:null,
            tgl_lahir:null,
            email:null,
            notelp:null,

            customers: new FormData,

            form: {
              nama : null,
              noktp:null,
              alamat: null,
              tgl_lahir:null,
              gender:null,
              email:null,
              notelp:null,
              password:null,
            },
            deleteId: '',
            editId: '',

        };
    },

    methods: {
          setForm(){
          if(this.inputType !=='Tambah'){
            this.update();
          }else{
            this.save();
          }
        },

           readData(){
            var url = this.$api +'/customer/'+ localStorage.getItem('custom_id');
            this.$http.get(url,{
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response=>{
                this.customer = response.data.data;
                this.nama = response.data.data.nama_customer;
            })
        },
    


      close(){
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.dialogUpdate = false;

        },

        cancel(){
            this.dialog = false;
            this.dialogConfirm= false;
            this.dialogUpdate= false;
             this.inputType = 'Tambah';

        },
        resetForm(){
          this.form= {
                nama : null,
               noktp:null,
                alamat: null,
                tgl_lahir:null,
                gender:null,
                email:null,
                notelp:null,
                password:null,

            };
        },
        editHandler(item){
        this.inputType = 'Ubah';
        this.dialog = true;
        this.form.nama = item.nama_customer;
        },


        
        update(){
         let newData = {
           nama_customer : this.customer.nama_customer,
           no_ktp : this.customer.no_ktp,
           alamat_customer : this.customer.alamat_customer,
           tgl_lahir_customer : this.customer.tgl_lahir_customer,
           gender_customer : this.customer.gender_customer,
           no_telp_customer : this.customer.no_telp_customer,
           email : this.customer.email,
           password: this.form.password,
           verifikasi_data : false,
         };

          var url = this.$api + '/customer/' + localStorage.getItem('custom_id');
          this.load = true;
          this.$http.put(url, newData, {
            headers: {
              'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
          }).then(response=>{
            this.error_message =  response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = true;
            this.close();
            this.readData();
            this.resetForm();
            this.inputType = 'Tambah';
            
          }).catch(error =>{
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar =true;
            this.load = false;

          });
        },

        deleteData(){
          var url = this.$api + '/customer/'+ localStorage.getItem('custom_id');
          this.load = true;
          this.$http.delete(url, {
             headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
          }).then(response=> {
                    this.error_message =  response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = true;
                    this.close();
                    this.readData();
                    this.resetForm();
                    this.$router.push({
                      name:"Welcome",
                    })

                }).catch(error =>{
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar =true;
                    this.load = false;
                });
        },

        deleteHandler(custom_id){
          this.deleteId = custom_id;
          this.dialogConfirm = true;
        },


        
    },
        mounted(){
        this.readData();
    }
}
</script>