<template>
    <v-main class="driverPage">
        <h3 class="text h-3" font-weight-medium mb-5>Driver</h3>
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
      :items="driver"
      :search="search"
    >
        <template #[`item.foto`]="{item}">
            <img :src="item.foto" height="30px">
        </template>
        
                <template #[`item.sim`]="{item}">
            <img :src="item.sim" height="30px">
        </template>
                <template #[`item.napza`]="{item}">
            <img :src="item.napza" height="30px">
        </template>
                <template #[`item.jiwa`]="{item}">
            <img :src="item.jiwa" height="30px">
        </template>
                <template #[`item.jasmani`]="{item}">
            <img :src="item.jasmani" height="30px">
        </template>
                <template #[`item.skck`]="{item}">
            <img :src="item.skck" height="30px">
        </template>
     <template v-slot:[`item.actions`]="{item}">
        <v-btn small color="primary" class="mr-2" @click="editHandler(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn color="red accent-4" small  @click="deleteHandler(item.custom_id)">
          <v-icon>mdi-delete</v-icon>
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

        <form  enctype="multipart/form-data">
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
                <v-text-field
                  label="Password*"
                  type="password"
                  v-model="form.password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                :items="items"
                :rules="[v => !!v || 'Item is required']"
                label="Item"
                v-model="form.bahasa"
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
                                   <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                v-model="form.sim"
                label="Image"              
            ></v-file-input>
                          <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                v-model="form.napza"
                label="Image"              
            ></v-file-input>
                          <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                v-model="form.jiwa"
                label="Image"              
            ></v-file-input>
                          <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                v-model="form.jasmani"
                label="Image"              
            ></v-file-input>
                <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                v-model="form.skck"
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
            @click="close"
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
            
        </form>

      
    </v-dialog>
  </v-row>
  <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{error_message}}</v-snackbar>
   
 <v-dialog
      v-model="dialogUpdate"
      persistent
      max-width="600px"
    >

        <form  enctype="multipart/form-data">
        <v-card>
        <v-card-title>
          <span class="text-h5" >Form Driver</span>
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
                v-model="form.bahasaU"
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
                v-model="form.fotoU"
                label="Foto"              
            ></v-file-input>
                          <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                v-model="form.simU"
                label="SIM"              
            ></v-file-input>
                          <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                v-model="form.napzaU"
                label="NAPZA"              
            ></v-file-input>
                          <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                v-model="form.jiwaU"
                label="JIWA"              
            ></v-file-input>
                          <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                v-model="form.jasmaniU"
                label="JASMANI"              
            ></v-file-input>
                          <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                v-model="form.skckU"
                label="SKCK"              
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
            @click="close"
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
            
        </form>

      
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
    </v-main>
</template>

<script>
export default {
    name: "driverPage",
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
                {text: "Phone", value: "no_telp"},
                {text: "email", value: "email"},
                {text: "foto", value: "foto"},
                {text: "SIM", value: "sim"},
                {text: "Napza", value: "napza"},
                {text: "Jiwa", value: "jiwa"},
                {text: "jasmani", value: "jasmani"},
                {text: "SKCK", value: "skck"},
                {text: "Actions", value: 'actions'},

            ],
            driver: [],

            drivers: new FormData,

            form: {
               nama : null,
                alamat: null,
                tgl_lahir:null,
                gender:null,
                notelp:null,
                email:null,
                //password:null,
                foto:null,
                sim:null,
                napza:null,
                jiwa:null,
                jasmani:null,
                skck:null,
                bahasa:null,
                namaU :null,
                alamatU: null,
                tgl_lahirU:null,
                genderU:null,
                notelpU:null,
                emailU:null,
                passwordU:null,
                fotoU:null,
                bahasaU:null,
                simU:null,
                napzaU:null,
                jiwaU:null,
                jasmaniU:null,
                skckU:null,
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
            var url = this.$api +'/driver';
            this.$http.get(url,{
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response=>{
                this.driver = response.data.data;
            })
        },

        save(){

            this.drivers.append('nama', this.form.nama);
            this.drivers.append('alamat', this.form.alamat);
            this.drivers.append('tgl_lahir',this.form.tgl_lahir);
            this.drivers.append('no_telp',this.form.notelp);
            this.drivers.append('email', this.form.email);
            this.drivers.append('gender', this.form.gender);
            this.drivers.append('password', this.form.password);
            this.drivers.append('id_role', this.form.role);
            this.drivers.append('foto', this.form.foto);
            this.drivers.append('sim', this.form.sim);
            this.drivers.append('napza', this.form.napza);
            this.drivers.append('jiwa', this.form.jiwa);
            this.drivers.append('jasmani', this.form.jasmani);
            this.drivers.append('skck', this.form.skck);
            this.drivers.append('bahasa', this.form.bahasa);

            var url = this.$api +'/driver';
            this.load = true;
            this.$http.post(url, this.drivers,{
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
                foto:null,
                sim:null,
                napza:null,
                jiwa:null,
                jasmani:null,
                bahasa:null,
                namaU :null,
                alamatU: null,
                tgl_lahirU:null,
                genderU:null,
                emailU:null,
                passwordU:null,
                fotoU:null,
                bahasaU:null,
                simU:null,
                napzaU:null,
                jiwaU:null,
                jasmaniU:null,

            };
        },

        update(){

            this.drivers.append('nama', this.form.namaU);
            this.drivers.append('alamat', this.form.alamatU);
            this.drivers.append('tgl_lahir',this.form.tgl_lahirU);
            this.drivers.append('no_telp',this.form.no_telpU);
            this.drivers.append('email', this.form.emailU);
            this.drivers.append('gender', this.form.genderU);
            this.drivers.append('password', this.form.passwordU);
            this.drivers.append('foto', this.form.fotoU);
            this.drivers.append('sim', this.form.simU);
            this.drivers.append('napza', this.form.napzaU);
            this.drivers.append('jiwa', this.form.jiwaU);
            this.drivers.append('jasmani', this.form.jasmaniU);
            this.drivers.append('skck', this.form.skckU);
            this.drivers.append('bahasa', this.form.bahasaU);


          var url = this.$api + '/driver/' + this.editId;
          this.load = true;
          this.$http.post(url, this.drivers, {
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
          var url = this.$api + '/driver/'+ this.deleteId;
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
            this.form.namaU =item.nama;
                this.form.alamatU=item.alamat;
                this.form.tgl_lahirU=item.tgl_lahir;
               this.form.genderU=item.gender;
               this.form.notelpU=item.no_telp;
                this.form.emailU=item.email;
                //this.form.passwordU=item.password;
                this.form.bahasaU =  item.Bahasa;
                //this.form.fotoU=item.foto;
          this.dialogUpdate=true;

        },

        deleteHandler(custom_id){
          this.deleteId = custom_id;
          this.dialogConfirm = true;
        },
        
    },


    mounted(){
        this.readData();
    }
};
</script>