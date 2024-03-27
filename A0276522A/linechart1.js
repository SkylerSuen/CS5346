// 	.axis path,
// 	.axis line {
// 		stroke: #ccc;
// 		fill: none;
// 	}
// </style>
// <script>
drawline1()

function drawline1() {

	d3.csv("data.csv").then(function(tempdata) {
		var ls = []
		for (var i = 2000; i <= 2019; i++) {
			var lk = {}
			lk["year"] = String(i)
			lk["value"] = Number(0);
			ls.push(lk)
		}
		// console.log(ls)
		for (var i = 0; i < tempdata.length; i++) {
			if (tempdata[i]["Code"]==null){
				continue;
			}
			for (var j = 0; j < 20; j++) {
				if (tempdata[i]["Year"] == ls[j]["year"]) {
					ls[j]["value"] += Number(tempdata[i]["Age-standardized suicide rate - Sex: both sexes"])
				}
			}
		}
		let num = 3.14159;
		let roundedNum = num.toFixed(1); // roundedNum的值为"3.1"
		for (var i = 0; i < 20; i++) {
			ls[i]["value"] /= 194;
			ls[i]["value"] = Number(ls[i]["value"].toFixed(1))
		}
		console.log(ls)
		var data=ls;







		var svg = d3.select("#linechart1")
			.append("svg")
			.attr("width", 600)
			.attr("height", 350)

		svg.append("text")
			.attr("x", 100)
			.attr("y", 20)
			.text("Change in average suicide rate")
			.style("font-size", "20px")

		const xScale = d3.scaleLinear()
			.domain([1999, 2020])
			.range([50, 570]);

		const yScale = d3.scaleLinear()
			.domain([0,20])
			.range([330, 50]);

		const xAxis = d3.axisBottom(xScale);
		const yAxis = d3.axisLeft(yScale);

		const line = d3.line()
			.x(d => xScale(Number(d.year)))
			.y(d => yScale(d.value));

		const path = svg.append('path')
			.datum(data)
			.attr('class', 'line')
			.attr('d', line)
			.style("fill", "none")
			.style("stroke", "steelblue")
			.style("stroke-width", "2px")

		const circles = svg.selectAll('.circle')
			.data(data)
			.join('circle')
			.attr('class', 'circle')
			.attr('cx', d => xScale(Number(d.year)))
			.attr('cy', d => yScale(d.value))
			.attr('r', 0)
			.style('opacity', 0)
			.style("fill", "steelblue")
			.style("stroke", "white")
			.style("stroke-width", "2px");





		svg.append('g')
			.attr('transform', 'translate(0, 330)')
			.call(xAxis);

		svg.append('g')
			.attr('transform', 'translate(50, 0)')
			.call(yAxis);

		path.transition()
			.duration(1000)
			.attrTween('stroke-dasharray', function() {
				const length = this.getTotalLength();
				return d3.interpolate(`0,${length}`, `${length},${length}`);
			});

		circles.transition()
			.delay(1000)
			.duration(500)
			.attr('r', 5)
			.style('opacity', 1);





		svg.append("g")
			.attr("id", "axisname")
			.append("text")
			.attr("x", 600 - 20) // 将轴名放在y轴上侧
			.attr("y", 325) // 将轴名放在y轴中央
			.style("text-anchor", "middle") // 居中对齐
			.text("Year") // 设置轴名
			.style("font-size", "13px") // 设置字体大小
			.style("fill", "black")

		svg.append("g")
			.attr("id", "axisname")
			.append("text")
			.attr("x", 60) // 将轴名放在y轴上侧
			.attr("y", 30) // 将轴名放在y轴中央
			.style("text-anchor", "middle") // 居中对齐
			.text("Suicide Rate") // 设置轴名
			.style("font-size", "13px") // 设置字体大小
			.style("fill", "#black")



		// 提示框
		var tooldiv = d3.select("body")
			.append("div")
			.attr("id", "tooltip1")


		var tipsvg = d3.select("#tooltip1")
			.append("svg")
			.attr("width", 120)
			.attr("height", 80)
			.style("background-color", "white")


		tipsvg.append("rect")
			.attr("x", 20)
			.attr("y", 60)
			.attr("width", 15)
			.attr("height", 15)
			.style("fill", "rgb(44, 132, 101)")
		tooldiv.style("display", "none")

		circles.on('mousemove', function(event, d) {
				d3.select(this).attr('r', 8)
				tooldiv.style("display", "block")
				tooldiv.select("svg")
					.attr("transform",
						`translate(${event.pageX-150},${event.pageY-700})`)

				/*每次更新前要删除已有的文字*/
				tooldiv.select("svg")
					.selectAll("text")
					.remove()
				/*删除后重新添加文字*/
				tooldiv.select("svg")
					.append("text")
					.text(d.value)
					.attr("x", 45)
					.attr("y", 73)
					.style("font-size", 15)
					.style("fill", "black")
				tooldiv.select("svg")
					.append("text")
					.text(d.year)
					.attr("x", 10)
					.attr("y", 30)
					.style("font-size", 24)
					.style("font-weight", "bold")


			})
			.on('mouseleave', function() {
				d3.select(this).attr('r', 5)
				tooldiv.style("display", "none")
				// d3.select("#linechart").selectAll("path").style('opacity', 1);
				// d3.select("#linechart").selectAll("circle").style('opacity', 1);
			});

	})
}