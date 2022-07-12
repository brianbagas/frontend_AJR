<template>
    <v-main class="pegawaiPage">
        <h3 class="text h-3" font-weight-medium mb-5>Pegawai</h3>
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
            <v-btn color="success" dark @click="dialog = true"> Create </v-btn>

        </v-card-title>
 <v-data-table
      :headers="headers"
      :items="pegawai2"
      :search="search"
    >
        <template v-slot:[`item.id_role`]="{ item }" >
             <span v-if="item.id_role ==1 ">Customer Service</span>
             <span v-if="item.id_role ==2 ">Admin</span>
             <span v-if="item.id_role ==3 ">Manager</span>
        </template>
         <template v-slot:[`item.actions`]="{item}">
        <v-btn small color="primary" class="mr-2" @click="editHandler(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn color="red accent-4" small  @click="deleteHandler(item.custom_id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>

        <template #[`item.foto`]="{item}">
            <img :src="item.foto" height="30px">
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
          <span class="text-h5" >Form Pegawai</span>
        </v-card-title>
        <v-card-text >

          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Nama Lengkap*"
                  v-model="form.nama"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Alamat*"
                  v-model="form.alamat"
                  required
                ></v-text-field>
              </v-col>
              <!-- <v-col
                cols="12"
              >
                <v-text-field
                                    v-model="form.gender"
                  label="Gender"
                  hint="example of persistent helper text"
                  persistent-hint
                  
                  required
                ></v-text-field>
              </v-col> -->
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
                  label="Nomor Telepon*"
                  v-model="form.notelp"
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
                <v-select
                :items="items"
                :rules="[v => !!v || 'Item is required']"
                label="Role"
                v-model="form.role"
                required
                ></v-select>
              </v-col>
<!-- 
              <v-col cols="12">
                <v-text-field
                  label="Foto*"
                  type="foto"
                  v-model="form.foto"
                  required
                ></v-text-field>
              </v-col> -->

              <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                v-model="form.foto"
                label="Image"              
            ></v-file-input>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="close()"
          >
            Close
          </v-btn>
          <v-btn
          color="primary"
            @click="setForm"
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

 
  </v-row>
  <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{error_message}}</v-snackbar>
       <v-dialog
      v-model="dialogUpdate"
      persistent
      max-width="600px"
    >
   <v-card>
        <v-card-title>
          <span class="text-h5" >Form Update Pegawai</span>
        </v-card-title>
        <v-card-text >

          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Nama Lengkap*"
                  v-model="form.namaU"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Alamat*"
                  v-model="form.alamatU"
                  required
                ></v-text-field>
              </v-col>
              <!-- <v-col
                cols="12"
              >
                <v-text-field
                                    v-model="form.gender"
                  label="Gender"
                  hint="example of persistent helper text"
                  persistent-hint
                  
                  required
                ></v-text-field>
              </v-col> -->
             <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Laki-Laki', 'Perempuan']"
                  v-model="form.genderU"
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
                v-model="form.tgl_lahirU"
                persistent-hint
                required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nomor Telepon*"
                  v-model="form.notelpU"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  v-model="form.emailU"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  v-model="form.passwordU"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                :items="items"
                :rules="[v => !!v || 'Item is required']"
                label="Item"
                v-model="form.roleU"
                required
                ></v-select>
              </v-col>
<!-- 
              <v-col cols="12">
                <v-text-field
                  label="Foto*"
                  type="foto"
                  v-model="form.foto"
                  required
                ></v-text-field>
              </v-col> -->
<form enctype="multipart/form-data">

              <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an Image"
                prepend-icon="mdi-camera"
                name="fotoU"
                v-model="form.fotoU"
                label="Image"              
            ></v-file-input>

</form>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="close()"
          >
            Close
          </v-btn>
          <v-btn
          color="primary"
            @click="setForm"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>

      
    </v-dialog>
    </v-main>

    
</template>

<script>
export default {
    name: "pegawaiPage",
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
             items: [
                 {value: 1, text:  'Customer Service'},
                 {value: 2, text:  'Administrasi'},
                 {value: 3, text:  'Manager'},
             ],

            headers:[
                {text: "ID Pegawai", align: "start", sortable:true,value:"custom_id"},
                {text: "Foto", value: "foto"},
                {text: "Nama", value: "nama"},
                {text: "Alamat", value: "alamat"},
                {text: "Tanggal Lahir", value : "tgl_lahir"},
                {text: "Gender", value: "gender"},
                {text: "Phone", value: "no_telp"},
                {text: "email", value: "email"},
                {text: "Role", value: 'id_role'},
                {text: "Actions", value: 'actions'},
                
            
            ],


            rules: [
                value => !value || value.size < 20000000 || 'Avatar size should be less than 2 MB!',
            ],
            pegawai2: [],
            pegawai: new FormData,

            form: {
                nama :null,
                alamat: null,
                tgl_lahir:null,
                gender:null,
                notelp:null,
                email:null,
                password:null,
                role:null,
                foto:null,
                namaU :null,
                alamatU: null,
                tgl_lahirU:null,
                genderU:null,
                notelpU:null,
                emailU:null,
                passwordU:null,
                roleU:null,
                fotoU: null,
                
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
            var url = this.$api +'/pegawai';
            this.$http.get(url,{
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response=>{
                this.pegawai2 = response.data.data;
            })
        },

        save(){
            this.pegawai.append('nama', this.form.nama);
            this.pegawai.append('alamat', this.form.alamat);
            this.pegawai.append('tgl_lahir',this.form.tgl_lahir);
            this.pegawai.append('no_telp',this.form.notelp);
            this.pegawai.append('email', this.form.email);
            this.pegawai.append('gender', this.form.gender);
            this.pegawai.append('password', this.form.password);
            this.pegawai.append('id_role', this.form.role);
            this.pegawai.append('foto', this.form.foto);

            var url = this.$api +'/pegawai';
            this.load = true;
            this.$http.post(url, this.pegawai,{
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
            this.readData();

        },

        cancel(){
            this.readData();
            this.dialog = false;
            this.dialogConfirm= false;
            this.dialogUpdate= false;
             this.inputType = 'Tambah';

        },
        resetForm(){
          this.form= {
                nama : null,
                alamat: null,
                tgl_lahir:null,
                gender:null,
                email:null,
                //password:null,
                role:null,
                foto:null,
                namaU :null,
                alamatU: null,
                tgl_lahirU:null,
                genderU:null,
                emailU:null,
                passwordU:null,
                roleU:null,
                fotoU:null,
            };
        },

        update(){
            this.pegawai.append('nama', this.form.namaU);
            this.pegawai.append('alamat', this.form.alamatU);
            this.pegawai.append('tgl_lahir',this.form.tgl_lahirU);
            this.pegawai.append('no_telp',this.form.notelpU);
            this.pegawai.append('email', this.form.emailU);
            this.pegawai.append('gender', this.form.genderU);
            this.pegawai.append('password', this.form.passwordU);
            this.pegawai.append('id_role', this.form.roleU);
            this.pegawai.append('foto', this.form.fotoU);

          var url = this.$api + '/pegawai/' + this.editId;
          this.load = true;
          this.$http.post(url, this.pegawai, {
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
          var url = this.$api + '/pegawai/'+ this.deleteId;
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

                }).catch(error =>{
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar =true;
                    this.load = false;
                });
        },

        editHandler(item){
          this.inputType = 'Ubah';
          this.editId = item.custom_id;

           this.form.namaU = item.nama ;
           this.form.alamatU = item.alamat ;
           this.form.tgl_lahirU= item.tgl_lahir;
          this.form.genderU=item.gender ;
          this.form.notelpU=item.no_telp ;
          this.form.emailU= item.email ;
          this.form.roleU=item.id_role ;
          this.form.fotoU = item.foto,
          this.dialogUpdate = true;
        },

        deleteHandler(custom_id){
          this.deleteId = custom_id;
          this.dialogConfirm = true;
        },

    },

    mounted(){
        this.readData();
    },

};
</script>