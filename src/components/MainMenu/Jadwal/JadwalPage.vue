<template>
 <v-main class="jadwalPage">
        <h3 class="text h-3" font-weight-medium mb-5>Jadwal Pegawai</h3>
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
      :items="detailjadwal"
      :search="search"
    >
     <template v-slot:[`item.actions`]="{item}">
        <v-btn small color="primary" class="mr-2" @click="editHandler(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn color="red accent-4" small  @click="deleteHandler(item.id_jadwal,item.id_pegawai)">
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
          <span class="text-h5" >Form Jadwal</span>
        </v-card-title>
        <v-card-text >

          <v-container>
            <v-row>
           
      
              <v-col cols="12">
                <v-select
                :items="pegawai"
                item-value="id_pegawai"
                item-text="nama"
                :rules="[v => !!v || 'Item is required']"
                label="Item"
                v-model="form.pegawai"
                required
                ></v-select>
              </v-col>
                <v-col cols="12">
                <v-select
                :items="items"
                :rules="[v => !!v || 'Jadwal is required']"
                label="Item"
                v-model="form.jadwal"
                required
                ></v-select>
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
            @click="setForm"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
            

      
    </v-dialog>

     <v-dialog
      v-model="dialogUpdate"
      persistent
      max-width="600px"
    >

        <v-card>
        <v-card-title>
          <span class="text-h5" >Form Update Jadwal</span>
        </v-card-title>
        <v-card-text >

          <v-container>
            <v-row>
           
      
              <v-col cols="12">
                <v-autocomplete
                :items="detailjadwal"
                item-value="id_pegawai"
                item-text="nama"
                label="Pegawai"
                v-model="form.pegawaiU"

                ></v-autocomplete>
              </v-col>
                <v-col cols="12">
                <v-select
                :items="items"
                :rules="[v => !!v || 'Jadwal is required']"
                label="Jadwal"
                v-model="form.jadwalU"
                required
                ></v-select>
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
        <v-card-action>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
        </v-card-action>
      </v-card>
    </v-dialog>
  </v-row>
 </v-main>
    
</template>

<script>
export default {
    name: "JadwalPage",
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
            {value: 3, text:  'Selasa - Shift-1'},
            {value: 4, text:  'Selasa - Shift-2'},
            {value: 5, text:  'Rabu - Shift-1'},
            {value: 6, text:  'Rabu - Shift-2'},
            {value: 7, text:  'Kamis - Shift-1'},
            {value: 8, text:  'Kamis - Shift-2'},
            {value: 9, text:  'Jumat - Shift-1'},
            {value: 10, text:  'Jumat - Shift-2'},
            {value: 11, text:  'Sabtu - Shift-1'},
            {value: 12, text:  'Sabtu - Shift-2'},
            {value: 13, text:  'Minggu - Shift-1'},
            {value: 14, text:  'Minggu - Shift-2'},
             ],

             editId_jadwal: '',
             editId_pegawai: '',
             deleteId_jadwal: '',
             deleteId_pegawai: '',

             headers:[
                 {text: "ID PEGAWAI", align:"start", sortable:true, value: "id_pegawai"},
                 {text: "Nama Pegawai", value: "nama"},
                 {text: "Jadwal", value: "id"},
                {text: "Actions", value:"actions"},

             ],
             form: {
                 pegawai:null,
                 jadwal:null,
                 pegawaiU:null,
                 jadwalU:null,
             },

             detailjadwal: [],
             pegawai: [],
            pegawais: [],
             detailjadwal2: new FormData,
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
            var url = this.$api +'/detailjadwal';
            var urlPeg = this.$api+'/jadwal/pegawai';
            this.$http.get(url,{
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response=>{
                this.detailjadwal = response.data.data;
                return this.$http.get(urlPeg,{
                    headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
                });
            }).then(response=> {
                    this.pegawai = response.data.data;
                })
        },

         save(){
             this.detailjadwal2.append('id_jadwal',this.form.jadwal);
             this.detailjadwal2.append('id_pegawai', this.form.pegawai);
           

            var url = this.$api +'/detailjadwal';
            this.load = true;
            this.$http.post(url, this.detailjadwal2,{
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
            this.dialogUpdate = false;

        },
        resetForm(){
          this.form= {
            pegawai:null,
            jadwal:null,               
            };
        },

        update(){
          let newData = {
            id_pegawai : this.form.pegawaiU,
            id_jadwal : this.form.jadwalU,

          };

          var url = this.$api + '/detailjadwal/' + this.editId_jadwal+'/'+ this.editId_pegawai;
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
          var url = this.$api + '/detailjadwal/'+ this.deleteId_jadwal+'/'+ this.deleteId_pegawai
          this.load = true;
          this.$http.delete(url, {
             headers: {
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
          this.editId_jadwal = item.id_jadwal;
          this.editId_pegawai = item.id_pegawai;
          this.form.jadwalU = item.id_jadwal;
          this.form.pegawaiU = item.id_pegawai;
          this.dialogUpdate =true;
        },
        deleteHandler(id_jadwal, id_pegawai){
          this.deleteId_jadwal = id_jadwal;
          this.deleteId_pegawai = id_pegawai;
          this.dialogConfirm = true;
        }
    },
     mounted(){
        this.readData();
    }
};
</script>