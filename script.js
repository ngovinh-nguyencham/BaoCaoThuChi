const url = "https://script.google.com/macros/s/AKfycbyQdDWRX5nAaDxJUfSSjb3uLujlHyE0EHA135BMnmDo23DIlDl8l43RKUIFLIeB9gKWXQ/exec";

fetch(url)
.then(response => response.json())
.then(data => {

    let html = "";

    // Tiêu đề bảng
    html += "<tr>";
    Object.keys(data[0]).forEach(col => {
        html += `<th>${col}</th>`;
    });
    html += "</tr>";

    let thu = 0;
    let chi = 0;

    // Nội dung bảng
    data.forEach(row => {

        html += "<tr>";

        Object.values(row).forEach(value => {
            html += `<td>${value}</td>`;
        });

        html += "</tr>";

        if (row.Loai === "Thu")
            thu += Number(row.SoTien);

        if (row.Loai === "Chi")
            chi += Number(row.SoTien);

    });

    document.getElementById("tbl").innerHTML = html;

    document.getElementById("thu").innerHTML =
        thu.toLocaleString("vi-VN");

    document.getElementById("chi").innerHTML =
        chi.toLocaleString("vi-VN");

    document.getElementById("sodu").innerHTML =
        (thu - chi).toLocaleString("vi-VN");

});
