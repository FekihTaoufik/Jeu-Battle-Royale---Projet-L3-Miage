<template>
<div class="scoreTable">
    <div>Table des scores</div>
    <table>
        <thead>
            <tr>
                <td>Pseudo</td>
                <td style="text-align:right;">Score</td>
            </tr>
        </thead>
        <tbody>
        <tr v-for="(p,index) in table" :key="index">
            <td>{{p.pseudo}}</td>
            <td style="text-align:right;">{{p.score}}</td>
        </tr>
        </tbody>
    </table>
</div>
</template>

<script>
export default {
    name:'scoreTable',
    props:['table'],
    data(){
        return {
        }
    },
    methods:{
    },
    created(){  
    }
}
</script>
<style>
.scoreTable > div{
        font-weight: 900;
    text-transform: uppercase;
    font-size: 25px;
}
.scoreTable table thead{
    text-transform: uppercase;
        font-weight: 700;

}

.scoreTable table{
    width:100%;
}
.scoreTable{
        background-color: rgba(0,0,0,.5);
    z-index: 11;
    padding: 10px;
    color: white;
    border-radius: 10px;
    font-family:'Open sans',sans-serif;
    z-index:11;
    position: absolute;
    right:15px;
    top:15px;
}

</style>
