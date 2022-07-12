<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login Pegawai</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form v-model="valid" ref="form">
                           <v-text-field
                              name="E-mail"
                              label="E-mail"
                              type="text"
                              v-model="email" 
                              :rules="emailRules"
                              required
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              name="password"
                              label="Password"
                              type="password"
                              v-model="password" 
                              :rules="passwordRules"
                              required
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="submit" :class="{'white--text' : valid,disabled: !valid}">Login</v-btn>
                         <v-btn color="second" @click="clear">Clear</v-btn>
                     </v-card-actions>
                  </v-card>
                  <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{error_message}}</v-snackbar>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
export default {
   name: 'LoginPage',
   props: {
      source: String,
   },

   data(){
      return{
         color:null,
         load: false,
         snackbar: false,
         error_message: '',
         valid:false,
         email: '',
         emailRules: [
            (v)=> !!v|| "email tidak boleh kosong"
         ],
         password: '',
         passwordRules: [
            (v)=> !!v|| "Password tidak boleh kosong"
         ]

      };
   },

   methods: {
      submit(){
         if(this.$refs.form.validate()){
            this.load = true;
            this.$http.post(this.$api +'/pegawai/login', {
               email: this.email,
               password: this.password
            }).then(response=> {
               localStorage.setItem('id',response.data.user.id);
               localStorage.setItem('custom_id',response.data.user.custom_id);
               localStorage.setItem('token',response.data.access_token);
               localStorage.setItem("user", response.data.user);
               this.error_message = response.data.message;
               this.color = "green";
               this.snackbar = true;
               this.load = false;
               this.clear();
               this.$router.push({
                  name:'Root',
               });

            }).catch(error=> {
               this.error_message = error.response.data.message;
               this.color = "red";
               this.snackbar = true;
               localStorage.removeItem('token');
               this.load = false;
            })
         }
         
      },
      clear(){
         this.$refs.form.reset()
      }
   }
};
</script>

<style></style>
