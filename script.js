const API =
"https://script.google.com/macros/s/AKfycbyQdDWRX5nAaDxJUfSSjb3uLujlHyE0EHA135BMnmDo23DIlDl8l43RKUIFLIeB9gKWXQ/exec";

let chart = null;

load();

async function load(year = "") {

    let url = API;

    if (year != "")
        url += "?year=" + year;

    const res = await fetch(url);
    const data = await res.json();

    fillYear(data.years, data.year);

    document.getElementById("thu").innerHTML =
        money(data.summary.thu);

    document.getElementById("chi").innerHTML =
        money(data.summary.chi);

    document.getElementById("conlai").innerHTML =
        money(data.summary.conlai);

    buildTable(data.months);

    drawChart(data.months);

}

function fillYear(years, current) {

    const cbo = document.getElementById("yearSelect");

    if (cbo.options.length > 0)
        return;

    years.forEach(y => {

        const op = document.createElement("option");

        op.value = y;
        op.text = y;

        if (y == current)
            op.selected = true;

        cbo.appendChild(op);

    });

}

document
.getElementById("yearSelect")
.addEventListener("change", function () {

    load(this.value);

});

function buildTable(months) {

    let html = "";

    months.forEach(m => {

        html += `
<tr>

<td>T${m.month}</td>

<td class="text-end text-success">
${money(m.thu)}
</td>

<td class="text-end text-danger">
${money(m.chi)}
</td>

<td class="text-end fw-bold">
${money(m.thu-m.chi)}
</td>

</tr>
`;

    });

    document.getElementById("tableBody").innerHTML = html;

}

function drawChart(months) {

    const ctx =
        document.getElementById("chart");

    if (chart)
        chart.destroy();

    chart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: months.map(x => "T" + x.month),

            datasets: [

                {

                    label: "Thu",

                    data: months.map(x => x.thu),

                    backgroundColor: "#198754"

                },

                {

                    label: "Chi",

                    data: months.map(x => x.chi),

                    backgroundColor: "#dc3545"

                }

            ]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "top"

                }

            },

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}

function money(v) {

    return Number(v).toLocaleString(
        "vi-VN"
    ) + " đ";

}
