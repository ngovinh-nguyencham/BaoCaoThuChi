const url="https://script.google.com/macros/s/AKfycbyQdDWRX5nAaDxJUfSSjb3uLujlHyE0EHA135BMnmDo23DIlDl8l43RKUIFLIeB9gKWXQ/exec";
fetch(url)
.then(r=>r.json())
.then(data=>{

console.log(data);

let table="<tr>";

Object.keys(data[0]).forEach(col=>{

table+="<th>"+col+"</th>";

});

table+="</tr>";

let thu=0;
let chi=0;

data.forEach(row=>{

table+="<tr>";

Object.values(row).forEach(value=>{

table+="<td>"+value+"</td>";

});

table+="</tr>";

if(row.Loai=="Thu")
    thu+=Number(row.SoTien);

if(row.Loai=="Chi")
    chi+=Number(row.SoTien);

});

document.getElementById("tbl").innerHTML=table;

document.getElementById("thu").innerHTML=
thu.toLocaleString();

document.getElementById("chi").innerHTML=
chi.toLocaleString();

document.getElementById("sodu").innerHTML=
(thu-chi).toLocaleString();

});
