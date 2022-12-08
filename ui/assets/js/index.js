function Visualization() {

    d3.selectAll("svg").remove();
    console.log("Visualization")

    var url = 'http://localhost:9000/person/details';
    const name = document.getElementById('myName').value;

    if (!name) {
        alert("Name cannot be empty");
        return;
    }
    url = url + '?name=' + name;

    console.log("calling : " + url);

    d3.json(url).then(function (result) {

        console.log("Plot Visualization")

        let a = groupBy(result.friends, "year");
        const data = [];
        for (var key in a) {
            var obj = {};
            obj.year = parseInt(key);
            obj.count = a[key].length;
            data.push(obj);
        }
        console.log("Plotting...")
        console.log(data);

        const width = 900;
        const height = 350;
        const margin = { top: 50, bottom: 100, left: 50, right: 50 };

        const svg = d3.select('#d3-container')
            .append('svg')
            .attr('width', width - margin.left - margin.right)
            .attr('height', height - margin.top - margin.bottom)
            .attr("viewBox", [0, 0, width, height]);

        const x = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, 20])
            .range([height - margin.bottom, margin.top]);

        svg
            .append("g")
            .attr("fill", 'royalblue')
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", (d, i) => x(i))
            .attr("y", d => y(d.count))
            .attr('title', (d) => d.count)
            .attr("class", "rect")
            .attr("height", d => y(0) - y(d.count))
            .attr("width", x.bandwidth());

        function yAxis(g) {
            g.attr("transform", `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y).ticks(null, data.format))
                .attr("font-size", '20px')
        }

        function xAxis(g) {
            g.attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x).tickFormat(i => data[i].year))
                .attr("font-size", '20px')
        }

        svg.append("g").call(xAxis);
        svg.append("g").call(yAxis);
        svg.node();
    })
}

function home() {
    location.href = "dashboard.html";
}

function register() {
    location.href = "register.html";
}

function createRelationship() {
    location.href = "createRelationship.html";
}

function showRelationship() {
    location.href = "showRelationship.html";
}

let groupBy = (array, key) => {
    return array.reduce((result, obj) => {
        (result[obj[key]] = result[obj[key]] || []).push(obj);
        return result;
    }, {});
};