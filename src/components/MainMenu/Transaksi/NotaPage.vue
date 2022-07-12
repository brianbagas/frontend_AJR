<template>
    <v-main>

<button @click="getPdf">download</button>
    </v-main>
</template>

<script>
import jsPDF from 'jspdf'
export default {
    data(){
        return{

        }
    },

    methods:{
        getPdf(){
            var doc = new jsPDF();
            doc.text("HELLO WORLD");
            doc.save();
        }

    },

    
    mounted(){
        this.readData();
    },

}
</script>