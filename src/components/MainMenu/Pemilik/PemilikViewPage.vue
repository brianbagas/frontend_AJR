<template>
    <v-main class="mitraPage">
        <h3 class="text h-3" font-weight-medium mb-5>Mitra</h3>
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
      :items="pemilik"
      :search="search"
    >
        
         <template v-slot:[`item.actions`]="{item}">
        <v-btn small color="primary" class="mr-2" @click="editHandler(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn color="red accent-4" small  @click="deleteHandler(item.id)">
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

        <v-card>
        <v-card-title>
          <span class="text-h5" >Form Pemilik/Mitra</span>
        </v-card-title>
        <v-card-text >

          <v-container>
            <v-row>
               <v-col
                cols="12"
              >
                <v-text-field
                  label="Nama*"
                  v-model="form.nama"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Nomor KTP*"
                  v-model="form.ktp"
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
               <v-col cols="12">
                <v-text-field
                  label="Nomor Telepon*"
                  v-model="form.notelp"
                  required
                ></v-text-field>
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
          <span class="text-h5" >Form Update Pemilik/Mitra</span>
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
               <v-col cols="12">
                <v-text-field
                  label="Nomor KTP*"
                  v-model="form.ktpU"
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
        
              <v-col cols="12">
                <v-text-field
                  label="Nomor Telepon*"
                  v-model="form.notelpU"
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
    name: "mitraPage",
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

            headers:[
                {text: "ID Pemilik", align: "start", sortable:true,value:"id"},
                {text: "Nama", value: "nama"},
                {text: "Nomor KTP", value: "no_ktp"},
                {text: "Alamat", value: "alamat"},
                {text: "Phone", value: "no_telp"},
                {text: "Actions", value: 'actions'},
                
            
            ],


            pegawai2: [],
            pegawai: new FormData,
            pemilik:[],
            pemiliks:new FormData,
            form: {
                nama :null,
                alamat: null,
                notelp:null,
                ktp:null,
                namaU :null,
                alamatU: null,
                ktpU:null,
                notelpU:null,
                
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
            var url = this.$api +'/pemilik/index';
            this.$http.get(url,{
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response=>{
                this.pemilik = response.data.data;
            })
        },

        save(){
            this.pemiliks.append('nama', this.form.nama);
            this.pemiliks.append('alamat', this.form.alamat);
            this.pemiliks.append('no_telp',this.form.notelp);
            this.pemiliks.append('no_ktp',this.form.ktp);


            var url = this.$api +'/pemilik/store';
            this.load = true;
            this.$http.post(url, this.pemiliks,{
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

            let newData ={
              nama : this.form.namaU,
              no_ktp : this.form.ktpU,
              no_telp : this.form.notelpU,
              alamat : this.form.alamatU,
            };

          var url = this.$api + '/pemilik/update/' + this.editId;
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
          var url = this.$api + '/pemilik/delete/'+ this.deleteId;
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
          this.editId = item.id;

           this.form.namaU = item.nama ;
           this.form.alamatU = item.alamat ;
           this.form.ktpU = item.no_ktp;
           this.form.notelpU= item.no_telp;
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