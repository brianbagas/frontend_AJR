<template>
    <v-main class="customerPage">
        <h3 class="text h-3" font-weight-medium mb-5>Customer</h3>
    <v-card>
        <v-card-title>
            <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="search"
            single-line
            hide-details
            >
            </v-text-field>

            <v-spacer></v-spacer>
           <!-- <v-btn color="success" dark @click="dialog = true"> Create </v-btn> -->

        </v-card-title>
 <v-data-table
      :headers="headers"
      :items="customer"
      :search="search"

    >
    <template v-slot:[`item.verifikasi_data`]="{item}">
      <v-icon v-if="item.verifikasi_data == 1">mdi-check-decagram</v-icon>
      <v-icon v-else>mdi-close</v-icon>
    </template>
    <template v-slot:[`item.actions`]="{item}">
<v-btn small color="primary" class="mr-2" @click="editHandler(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
    </template>


    </v-data-table>
    </v-card>

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
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="No KTP*"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
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
                persistent-hint
                required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
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
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
          color="primary"
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  <v-dialog v-model="dialogVerif" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Verifikasi Data Customer</span>
        </v-card-title>
        <v-card-text>Apakah Yakin ingin melakukan verifikasi data ? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="update">VERIF</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-main>

    
</template>

<script>
export default {
    name: "customerPage",
    data(){
        return{
            dialog:null,
            search: null,
            dialogVerif:null,
            load: false,
            headers:[
                {text: "ID CUSTOMER", align: "start", sortable:true,value:"custom_id"},
                {text: "Nama", value: "nama_customer"},
                {text: "No KTP", value: "no_ktp"},
                {text: "Alamat", value: "alamat_customer"},
                {text: "Tanggal Lahir", value : "tgl_lahir_customer"},
                {text: "Gender", value: "gender_customer"},
                {text: "Phone", value: "no_telp_customer"},
                {text: "email", value: "email"},
                {text: "Verifikasi", value: "verifikasi_data"},
                {text: "actions",value:"actions"},

            ],
            customer: [],
            form: {
              nama:null,
              ktp:null,
              alamat:null,
              tgl_lahir:null,
              gender:null,
              no_hp:null,
              email:null,
              password:null,
              verifikasi_data:null,

            },
            editId: '',

        };
    },

    methods: {
        readData(){
            var url = this.$api +'/customer';
            this.$http.get(url,{
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response=>{
                this.customer = response.data.data;
            })
        },
        update(){
         let newData = {
           nama_customer : this.form.nama,
           no_ktp : this.form.ktp,
           alamat_customer : this.form.alamat,
           tgl_lahir_customer : this.form.tgl_lahir,
           gender_customer : this.form.gender,
           no_telp_customer : this.form.no_hp,
           email : this.form.email,
           password : this.form.password,
           verifikasi_data : true,
         };

          var url = this.$api + '/verifikasi/customer/' + this.editId;
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

        editHandler(item){
        this.editId = item.custom_id;
        this.form.nama = item.nama_customer;
        this.form.ktp = item.no_ktp;
        this.form.alamat = item.alamat_customer;
        this.form.tgl_lahir = item.tgl_lahir_customer;
        this.form.gender = item.gender_customer;
        this.form.email = item.email;
        this.form.no_hp = item.no_telp_customer;
        this.form.password = item.password;
        this.form.verifikasi_data = true;
        this.dialogVerif=true;
        },
         close(){
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogVerif = false;
            this.dialogUpdate = false;
            this.readData();

        },
    },
    mounted(){
        this.readData();
    }
};
</script>