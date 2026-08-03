let file;

let compressedBlob;



const upload =
document.getElementById("upload");


const original =
document.getElementById("original");


const compressed =
document.getElementById("compressed");


const quality =
document.getElementById("quality");


const qualityText =
document.getElementById("qualityText");



upload.onchange=function(e){


file=e.target.files[0];


let reader=new FileReader();



reader.onload=function(event){


original.src=event.target.result;


document.getElementById("originalSize")
.innerHTML=
"Size : "
+
formatMB(file.size);



}



reader.readAsDataURL(file);



};




quality.oninput=function(){


qualityText.innerHTML=
quality.value;


};





document.getElementById("compress")
.onclick=function(){


if(!file){

alert("Please upload image");

return;

}



let img=new Image();


img.src=original.src;



img.onload=function(){


let canvas=document.createElement("canvas");


let ctx=canvas.getContext("2d");



canvas.width=img.width;

canvas.height=img.height;



ctx.drawImage(
img,
0,
0
);



canvas.toBlob(function(blob){



compressedBlob=blob;



compressed.src=
URL.createObjectURL(blob);



document.getElementById("compressedSize")
.innerHTML=
"Size : "
+
formatMB(blob.size);



let saved =
((file.size-blob.size)
/file.size)*100;



document.getElementById("result")
.innerHTML=
"🎉 Reduced by "
+
saved.toFixed(2)
+
"%";


},
"image/jpeg",

quality.value/100


);



};



};






document.getElementById("download")
.onclick=function(){



if(!compressedBlob){

alert("Compress image first");

return;

}



let a=document.createElement("a");


a.href=
URL.createObjectURL(compressedBlob);


a.download=
"compressed-image.jpg";


a.click();


};







function formatMB(bytes){


return(
(bytes/1024/1024)
.toFixed(2)
+
" MB"
);


}
