

<template>
   <v-app id="inspire">
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Register Customer</v-toolbar-title>
                     </v-toolbar>
                      <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Full Name*"
                  v-model="form.nama"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="No KTP*"
                  v-model="form.noktp"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="alamat*"
                  hint="example of persistent helper text"
                  persistent-hint
                  v-model="form.alamat"
                  required
                ></v-text-field>
              </v-col>
                            <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Laki-Laki', 'Perempuan']"
                  v-model="form.gender"
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
                v-model="form.tgl_lahir"
                persistent-hint
                required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  v-model="form.email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nomor Telepon*"
                  type="text"
                  v-model="form.notelp"
                  required
                ></v-text-field>
              </v-col>

              <form enctype="multipart/form-data">

              <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="KTP"
                prepend-icon="mdi-camera"
                name="ktp"
                v-model="form.ktp"  
                required         
            ></v-file-input>

</form>

<form enctype="multipart/form-data">

              <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="SIM"
                prepend-icon="mdi-camera"
                name="sim"
                v-model="form.sim"        
            ></v-file-input>

</form>

            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="save" class="white--text">Save</v-btn>
                         <v-btn color="second" @click="resetForm">Clear</v-btn>
                     </v-card-actions>
                  </v-card>
                  <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{error_message}}</v-snackbar>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
export default {
    name: "RegisCusPage",
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

            customers: new FormData,

            form: {
               nama : null,
               noktp:null,
                alamat: null,
                tgl_lahir:null,
                gender:null,
                email:null,
                notelp:null,
                ktp:null,
                sim:null,
                //password:null,
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

        save(){

            this.customers.append('nama_customer', this.form.nama);
            this.customers.append('alamat_customer', this.form.alamat);
            this.customers.append('no_ktp', this.form.noktp);
            this.customers.append('tgl_lahir_customer',this.form.tgl_lahir);
            this.customers.append('email', this.form.email);
            this.customers.append('gender_customer', this.form.gender);
            this.customers.append('no_telp_customer', this.form.notelp);
            this.customers.append('KTP', this.form.ktp);
            this.customers.append('SIM', this.form.sim);
           // this.customers.append('password', this.form.password);

            var url = this.$api +'/register/customer';
            this.load = true;
            this.$http.post(url, this.customers,{
                }).then(response=> {
                    this.error_message =  response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = true;
                    this.close();
                    this.resetForm();
                    this.$router.push({
                        name: "Welcome",
                    })

                }).catch(error =>{
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar =true;
                    this.load = false;

                });
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
                notelp:null
                //password:null,

            };
        },

        
    },


};
</script>