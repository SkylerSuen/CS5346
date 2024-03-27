drawline1()

function drawline1() {

	d3.csv("data.csv").then(function(tempdata) {


		var ls = [{
				"name": "South Africa",
				"data": []
			},
			{
				"name": "United States",
				"data": []
			},
			{
				"name": "Japan",
				"data": []
			},
			{
				"name": "France",
				"data": []
			}
		]
		for (var i = 0; i < tempdata.length; i++) {
			var op = {}
			if (tempdata[i]["Entity"] == "France") {

				op["year"] = tempdata[i]["Year"]
				op["value"] = Number(tempdata[i]["Age-standardized suicide rate - Sex: both sexes"])
				ls[3]["data"].push(op)
			}
			if (tempdata[i]["Entity"] == "United States") {
				op["year"] = tempdata[i]["Year"]
				op["value"] = Number(tempdata[i]["Age-standardized suicide rate - Sex: both sexes"])
				ls[1]["data"].push(op)
			}
			if (tempdata[i]["Entity"] == "South Africa") {
				op["year"] = tempdata[i]["Year"]
				op["value"] = Number(tempdata[i]["Age-standardized suicide rate - Sex: both sexes"])
				ls[0]["data"].push(op)
			}
			if (tempdata[i]["Entity"] == "Japan") {
				op["year"] = tempdata[i]["Year"]
				op["value"] = Number(tempdata[i]["Age-standardized suicide rate - Sex: both sexes"])
				ls[2]["data"].push(op)
			}
		}
		var data = ls;



		var svg = d3.select("#linechart")
			.append("svg")
			.attr("id", "linesvg")
			.attr("width", 900)
			.attr("height", 700)
		svg.append("text")
			.attr("x", 50)
			.attr("y", 50)
			.text("Change in Suicide rate")
			.style("font-size", "30px")


		const width = 800
		const height = 600



		var g = svg.append("g")
			.attr("class", "LineChart")
			.attr("transform", `translate(${50},${50})`)



		var g_first = g.append("g")
			.attr("class", "DualAxisView")

		const colorScale = d3.scaleOrdinal()
			.domain(["South Africa", "United States", "Japan", "France"])
			.range(["rgb(109, 62, 145)", "rgb(44, 132, 101)", "rgb(193, 80, 101)", "rgb(190, 89, 21)"]);


		const year = ["2000", "2001", "2002", "2003", "2004",
			"2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012",
			"2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"
		]

		const xScale = d3.scaleLinear()
			.domain([2000, 2021])
			.range([0, width - 100]);

		const yScale = d3.scaleLinear()
			.domain([0, d3.max(data, (d) => d3.max(d.data, (v) => v.value))])
			.nice()
			.range([height, 50]);


		const xAxis = d3.axisBottom(xScale);
		const yAxis = d3.axisLeft(yScale);

		var gX = g_first.append("g")
			.attr("class", "HorizontalAxis")
			.attr("transform", `translate(0,${height})`)
			.call(xAxis);

		gX.selectAll(".tick text")
			.style("font-size", "15px")


		g_first.append("g")
			.attr("id", "axisname")
			.append("text")
			.attr("x", width - 80) // 将轴名放在y轴上侧
			.attr("y", height + 20) // 将轴名放在y轴中央
			.style("text-anchor", "middle") // 居中对齐
			.text("Year") // 设置轴名
			.style("font-size", "20px") // 设置字体大小
			.style("fill", "black")


		var gY = g_first.append("g")
			.attr("class", "VerticalAxis")
			.attr("transform", `translate(0,${0})`)
			.call(yAxis);

		g_first.append("g")
			.attr("id", "axisname")
			.append("text")
			.attr("x", 10) // 将轴名放在y轴上侧
			.attr("y", 40) // 将轴名放在y轴中央
			.style("text-anchor", "middle") // 居中对齐
			.text("suicide rate") // 设置轴名
			.style("font-size", "20px") // 设置字体大小
			.style("fill", "#black")



		gY.selectAll(".tick text")
			.style("font-size", "15px")
			.style("fill", "#333")
		// y轴虚线
		d3.selectAll('.VerticalAxis .tick line')
			.attr('class', 'grid-line')
			// .attr('x1', )
			.attr('x2', width)
			.style("stroke", function(d) {
				if (d != 0)
					return "#ccc"
				else
					return "black"
			})
			.style("stroke-dasharray", "5,5")



		var g_second = g.append("g")
		// .attr("clip-path","url(#boundsClip-1)")


		const line = d3.line()
			.curve(d3.curveCatmullRom)
			.x((d) => {
				return xScale(Number(d.year))
			})
			.y(function(d) {
				return yScale(d.value)
			});

		var lingg = g_second.append("g")
			.attr("class", "Lines")
		const paths = lingg.selectAll("path")
			.data(data)
			.enter()
			.append("path")
			.attr("class", d => d.name.replace(/\s+/g, '')) //每一条直线以国家命名
			.attr("d", d => line(d.data))
			.attr('stroke', d => colorScale(d.name))
			.attr('stroke-width', 3)
			.attr('fill', 'none');

		paths.transition()
			.duration(2000)
			.attrTween('stroke-dasharray', function() {
				const length = this.getTotalLength();
				return d3.interpolate(`0,${length}`, `${length},${length}`);
			});

		const dots = g_second.append("g")
			.attr("class", "circle")
			.selectAll("g")
			.data(data)
			.enter()
			.append("g")
			.attr("class", d => d.name.replace(/\s+/g, ''))
			.style("fill", d => colorScale(d.name))
			.attr("stroke", (d) => {
				return "black"
			})
		// .style("opacity",1)

		var circles = dots.selectAll(".dot")
			.data((d) => d.data)
			.enter()
			.append("circle")
			.attr("class", "dot")
			.attr("r", 4)
			.attr("cx", (d, i) => {
				// console.log(d)
				return xScale(Number(d.year))
			})
			.attr("cy", function(d) {
				return yScale(d.value)
			})
			.style('opacity', 0)
		circles.transition()
			.delay(1000)
			.duration(500)
			.attr('r', 5)
			.style('opacity', 1);




		var cityname = ["South Africa", "United States", "Japan", "France"]

		g_second.append("g")
			.attr("class", "circletext")
			.selectAll("g")
			.data(cityname)
			.enter()
			.append("g")
			.attr("class", d => d.replace(/\s+/g, ''))
			.attr("transform", function(d) {
				var temp = "g." + String(d).replace(/\s+/g, '') + " circle:last-child"
				// console.log(temp)
				return `translate(${Number(d3.select(temp).attr("cx"))+7},
	${Number(d3.select(temp).attr("cy"))+5})`
			})
			.append("text")
			.text(d => d)
			.style("fill", d => colorScale(d))
			.style("font-size", 20)
			.on('mousemove', function(event) {
				d3.select("#linechart").selectAll("path").style('opacity', 0.2);
				d3.select("#linechart").selectAll("circle").style('opacity', 0.2);
				var name = "." + d3.select(this).text().replace(/\s+/g, '')
				d3.selectAll(name).style('opacity', 1)
				d3.selectAll(name + " circle").style('opacity', 1)
			})
			.on('mouseleave', function() {
				d3.select("#linechart").selectAll("path").style('opacity', 1);
				d3.select("#linechart").selectAll("circle").style('opacity', 1);
			});



		// 提示框
		var tooldiv = d3.select("body")
			.append("div")
			.attr("id", "tooltip")


		var tipsvg = d3.select("#tooltip")
			.append("svg")
			.attr("width", 300)
			.attr("height", 200)
			.style("background-color", "white")


		tipsvg.selectAll("rect")
			.data(cityname)
			.enter()
			.append("rect")
			.attr("x", 20)
			.attr("y", (d, i) => i * 30 + 60)
			.attr("width", 15)
			.attr("height", 15)
			.style("fill", d => colorScale(d))


		tooldiv.style("display", "none")

		const mouseline = d3.select('svg')
			.append('line')
			.attr('class', 'mouse-line')
			.attr('x1', -10)
			.attr('x2', -10)
			.attr('y1', 50)
			.attr('y2', 800)
			.style("stroke", "black")
			.style("stroke-dasharray", "5,5")

		d3.select('#linesvg')
			.on('mousemove', function(event) {
				const [x, y] = d3.pointer(event);
				if (50 <= x && x <= 720) {
					var kk = []
					var year
					mouseline.attr('x1', x).attr('x2', x);
					var xx = x - 50
					circles.attr('r', d => {

						const distance = Math.abs((xScale(Number(d.year))) - x + 50);
						if (distance < 20) {
							kk.push(d)
							mouseline.attr('x1', xScale(Number(d.year) + 1) + 15)
								.attr('x2', xScale(Number(d.year) + 1) + 15);

							tooldiv.style("display", "block")

							tooldiv.select("svg")
								.attr("transform",
									`translate(${xScale(Number(d.year)+1)+2.5},${-700})`)
							year = Number(d.year)

							return 6;
						} else {
							return 4;
						}
					});
					if (kk.length != 0) {
						tooldiv.select("svg").selectAll("text").remove()
						tooldiv.select("svg")
							.selectAll("text")
							.data(kk)
							.enter()
							.append("text")
							.text(function(d, i) {
								return cityname[i] + "  " + d.value
							})
							.attr("x", 50)
							.attr("y", (d, i) => i * 30 + 75)
							.style("font-size", 20)
							.style("fill", (d, i) => colorScale(cityname[i]))

						tooldiv.select("svg")
							.append("text")
							.text(year)
							.attr("x", 10)
							.attr("y", 20)
							.style("font-size", 24)
							.style("font-weight", "bold")
					}
				} else {
					mouseline.attr('x1', -10).attr('x2', -10);
					tooldiv.style("display", "none")
				}
			})
			.on('mouseleave', function() {
				mouseline.attr('x1', -10).attr('x2', -10);
				circles.attr('r', 4);
				tooldiv.style("display", "none")
			});


	})
}