$(()=>{
console.log("document is ready");

$("button").html("<i>Hola</i>");
$("button").on("click", function(){
    console.log($("#name").val("irene"));
})
}
)