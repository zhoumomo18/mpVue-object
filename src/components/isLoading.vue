<template>
    <div >
              <div class="Toast" v-if="isLoading">     
                       
                        <div class='loading_icon'></div>   
             </div>
    </div>
</template>

<script>
export default {
     props: ['isLoading','loadingMsg'],
     watch:{
         isLoading:{
             handler(ne, old){
                 if(ne){
                 setTimeout(()=>{
                     this.isLoading=false
                     return 
                 },5000)
                }
             },
             immediate:false
             
         }
     }
};
</script>

<style scoped lang='scss'>
    .Toast {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
     background: rgba(0,0,0,0.5); 
    z-index: 1005;
}
 
.loading_icon{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url(../../static/images/isLoading.gif) no-repeat;
    background-size: 100%;
    width: 80px;
    height: 80px;
    border-radius: 5px;
}


</style>