
drawpie()
function drawpie() {


	d3.csv("data.csv").then(function(tempdata) {
		var ls = [{
				"name": "Europe",
				"data": []
			},
			{
				"name": "South-East Asia",
				"data": []
			},
			{
				"name": "Americas",
				"data": []
			},
			{
				"name": "Africa",
				"data": []
			}
		]
		for (var i = 0; i < tempdata.length; i++) {
			var op = {}
			if (tempdata[i]["Year"] == "2019") {
				if (tempdata[i]["Entity"] == "Africa") {
					ls[3]["data"] = Number(tempdata[i]["Age-standardized suicide rate - Sex: both sexes"])
				}
				if (tempdata[i]["Entity"] == "South-East Asia") {
					ls[1]["data"] = Number(tempdata[i]["Age-standardized suicide rate - Sex: both sexes"])
				}
				if (tempdata[i]["Entity"] == "Europe") {
					ls[0]["data"] = Number(tempdata[i]["Age-standardized suicide rate - Sex: both sexes"])
				}
				if (tempdata[i]["Entity"] == "Americas") {
					ls[2]["data"] = Number(tempdata[i]["Age-standardized suicide rate - Sex: both sexes"])
				}
			}
		}
		var data=ls;
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		var sum = 0
		for (var i = 0; i < data.length; i++) {
			sum += data[i].data
		}
		for (var i = 0; i < data.length; i++) {
			var temp = (data[i].data / sum) * 100
			temp = parseFloat(temp.toFixed(2))
			data[i].data = temp

		}

		var width = 600,
			height = 350
		var svg = d3.select("#piechart")
			.append("svg")
			.attr("width", width)
			.attr("height", height)
		svg.append("text")
		.attr("x", 150)
		.attr("y", 50)
		.text("Comparison of different Region")
		.style("font-size", "20px")



		// 创建饼状图布局
		const pie = d3.pie()
			.value(d => d.data);

		// 设置内外半径
		const innerRadius = 60;
		const outerRadius = 120;

		// 创建弧生成器
		const arc = d3.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius);


		// 设置饼状图中心位置
		const g = svg.append("g")
			.attr("transform", `translate(${width/2}, ${height/2})`);

		// 创建圆环饼状图
		const donut = g.selectAll(".arc")
			.data(pie(data))
			.enter().append("g")
			.attr("class", "arc");


const colorScale = d3.scaleOrdinal()
			.domain(["Europe", "South-East Asia", "Americas", "Africa"])
			.range(["rgb(109, 62, 145)", "rgb(44, 132, 101)", "rgb(193, 80, 101)", "rgb(190, 89, 21)"]);
		// 添加路径
		donut.append("path")
			.attr("d", arc)
			.attr("fill", d => colorScale(d.data.name));

		// 添加标签
		donut.append("text")
			.style("fill","black")//d=>colorScale(d.data.name)
			.attr("transform", d => `translate(${arc.centroid(d)[0]-30},${arc.centroid(d)[1]})`)
			.attr("dy", "0.35em")
			.text(function(d) {
				console.log(arc.centroid(d))
				return d.data.name
			});



	})


}