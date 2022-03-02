//console.log("hwww");
let numberOfTeams;
const teamNumber = $("h1").attr("id");

function inCells() {
    let k = 0;
    $("iframe").contents().find("table").each(function() {
	k += 1;
    });
    numberOfTeams = k - 1; //одна таблица общая
    console.log(k);
    //console.log(numberOfTeams);
    
    for (let i = 1; i <= 5; i++) {
	for (let j = 1; j <= 5; j++) {
	    const coordX = j;
	    const coordY = i;
	    //console.log("hw2");
	    const resultsCell = $("iframe").contents().find("#"+teamNumber+" #cell"+coordY+"-"+coordX);
	    
	    const teamOutputCell = $("#output-table #cell"+coordY+"-"+coordX);
	    const teamInputCell = $("#input-table #cell"+coordY+"-"+coordX);
	    
	    const resultsCellClass = resultsCell.attr("class");
	    teamOutputCell.attr("class", resultsCellClass);
	    teamInputCell.attr("class", resultsCellClass);
	    
	    if (resultsCellClass == "first-try") {
		teamOutputCell.text("Можно получить " + (coordX*10) + " баллов");
		//console.log(teamInputCell.innerHTML);
		teamInputCell.html(`
		Первая 
    		<br>
		попытка
		<br>
		<input type="text" name="lengthNum" size="3">
		<br>
		<button type="submit">
		  Отправить
		</button>
	      `);
		teamInputCell.find("button").on("click", function() {
		    console.log("ans");
		    $.post("/answer/"+coordY+"/"+coordX, {data: teamInputCell.find("input").val(), coordX: coordX, coordY: coordY, teamsNumber: teamNumber},function(){
			//teamInputCell.find("input").val("");
			//alert("Принято!");
			location=location;
			return false;});
		    teamInputCell.find("input").val("");
		    console.log("ans2");
		});
	    }
	    if (resultsCellClass == "second-try") {
		teamOutputCell.text("Можно получить " + (coordX*5) + " баллов");
		teamInputCell.html(`
		Вторая 
    		<br>
		попытка
		<br>
		<input type="text" name="lengthNum" size="3">
		<br>
		<button type="submit">
		  Отправить
		</button>
	      `);
		teamInputCell.find("button").on("click", function() {
		    console.log("ans");
		    $.post("/answer/"+coordY+"/"+coordX, {data: teamInputCell.find("input").val(), coordX: coordX, coordY: coordY, teamsNumber: teamNumber },function(){
			//teamInputCell.find("input").val("");
			//alert("Принято!");
			location=location;
			return false;});
		    teamInputCell.find("input").val("");
		    console.log("ans2");
		});
	    }
	    if (resultsCellClass == "right-from-first-try") {
		teamOutputCell.html(resultsCell.html());
		teamInputCell.html("Задача <br>решена <br>с первой <br>попытки!");
	    }
	    if (resultsCellClass == "right-from-second-try") {
		teamOutputCell.html(resultsCell.html());
		teamInputCell.html("Задача <br>решена <br>со второй <br>попытки!");
	    }
	    if (resultsCellClass == "fail") {
		teamOutputCell.html(resultsCell.html());
		teamInputCell.html("Попыток <br>нет, <br>задача <br>не решена");
	    }
	}
    }
    for (let i = 1; i <= 5; i++) {
	const coordX = 6;
	const coordY = i;

	const resultsCell = $("iframe").contents().find("#"+teamNumber+" #cell"+coordY+"-"+coordX);
	const teamOutputCell = $("#output-table #cell"+coordY+"-"+coordX);

	const resultsCellClass = resultsCell.attr("class");
	teamOutputCell.attr("class", resultsCellClass);

	if (resultsCellClass == "bonus-can") {
	    let sum = 0;
	    for (let j = 1; j <= 5; j++) {
		const tempTeamOutputCell = $("#output-table #cell"+coordY+"-"+j);
		const tempTeamOutputCellClass = tempTeamOutputCell.attr("class");
		const symbols = tempTeamOutputCell.text();
		if (tempTeamOutputCellClass == "first-try") {
		    sum += Number(symbols[15])*10 + Number(symbols[16]); //Можно получить 50 баллов 
		} else if (tempTeamOutputCellClass == "second-try") {
		    if (symbols[16] !== " ") { //Можно получить 5_баллов 
			sum += Number(symbols[15])*10 + Number(symbols[16]);
		    } else {
			sum += Number(symbols[15]);
			//console.log(symbols[15]);
		    }
		} else {
		    sum += Number(symbols);
		    // if (symbols[1] !== undefined) { //5_ может null?
		    // 	sum += Number(symbols[0])*10 + Number(symbols[1]);
		    // 	console.log(Number(symbols));
		    // } else {
		    // 	sum += Number(symbols[0]);
		    // 	//console.log(symbols[0]);
		    // }
		}
		//console.log(symbols[0]);
	    }
	    let flag = 0;
	    
	    $("iframe").contents().find("#main-output-table #cell"+coordY+"-"+coordX).each(function() {
		//console.log(this);
		if ($(this).attr("class") == "bonus-have") {
		    flag = 1;
		}
	    });
	    //	});
	    
	    if (flag == 0) {
		teamOutputCell.text("Можно получить бонус " + sum + " баллов");
	    } else {
		teamOutputCell.text("Можно получить бонус " + (sum/2) + " баллов");
	    }
	}
	if (resultsCellClass == "bonus-have") {
	    teamOutputCell.html(resultsCell.html());
	}
	if (resultsCellClass == "bonus-fail") {
	    teamOutputCell.html(resultsCell.html());
	}
    }
    for (let j = 1; j <= 5; j++) {
	const coordX = j;
	const coordY = 6;

	const resultsCell = $("iframe").contents().find("#"+teamNumber+" #cell"+coordY+"-"+coordX);
	const teamOutputCell = $("#output-table #cell"+coordY+"-"+coordX);

	const resultsCellClass = resultsCell.attr("class");
	teamOutputCell.attr("class", resultsCellClass);

	if (resultsCellClass == "bonus-can") {
	    let sum = 0;
	    for (let i = 1; i <= 5; i++) {
		const tempTeamOutputCell = $("#output-table #cell"+i+"-"+coordX);
		const tempTeamOutputCellClass = tempTeamOutputCell.attr("class");
		const symbols = tempTeamOutputCell.text();
		if (tempTeamOutputCellClass == "first-try") {
		    sum += Number(symbols[15])*10 + Number(symbols[16]); //Можно получить 50 баллов 
		} else if (tempTeamOutputCellClass == "second-try") {
		    if (symbols[16] !== " ") { //Можно получить 5_баллов 
			sum += Number(symbols[15])*10 + Number(symbols[16]);
		    } else {
			sum += Number(symbols[15]);
			//console.log(symbols[15]);
		    }
		} else {
		    sum += Number(symbols);
		    // if (symbols[1] !== undefined) { //5_ может null?
		    // 	sum += Number(symbols[0])*10 + Number(symbols[1]);
		    // 	//console.log(symbols[1]);
		    // } else {
		    // 	sum += Number(symbols[0]);
		    // 	//console.log(symbols[0]);
		    // }
		}
		//console.log(symbols[16]);
	    }
	    let flag = 0;
	    $("iframe").contents().find("#main-output-table #cell"+coordY+"-"+coordX).each(function() {
		//console.log(this);
		if ($(this).attr("class") == "bonus-have") {
		    flag = 1;
		}
	    });
	    if (flag == 0) {
		teamOutputCell.text("Можно получить бонус " + sum + " баллов");
	    } else {
		teamOutputCell.text("Можно получить бонус " + (sum/2) + " баллов");
	    }
	}
	if (resultsCellClass == "bonus-have") {
	    teamOutputCell.html(resultsCell.html());
	}
	if (resultsCellClass == "bonus-fail") {
	    teamOutputCell.html(resultsCell.html());
	}
    }

    for (let i = 1; i <= 5; i++) {
	const coordX = 0;
	const coordY = i;
	
	const resultsCell = $("iframe").contents().find("#team-1 #cell"+coordY+"-"+coordX);
	const teamOutputCell = $("#output-table #cell"+coordY+"-"+coordX);
	const teamInputCell = $("#input-table #cell"+coordY+"-"+coordX);

	teamOutputCell.text(resultsCell.text());
	teamInputCell.text(resultsCell.text());
    }

    const firstSumTeam = $(".sum span:first-child");
    const firstSumResultsTable = $("iframe").contents().find("#" + teamNumber + " .sum span:first-child");
    firstSumTeam.text(firstSumResultsTable.text());

    const secondSumTeam = $(".sum span:first-child + span");
    const secondSumResultsTable = $("iframe").contents().find("#" + teamNumber + " .sum span:first-child + span");
    secondSumTeam.text(secondSumResultsTable.text());

    const thirdSumTeam = $(".sum span:first-child + span + span");
    const thirdSumResultsTable = $("iframe").contents().find("#" + teamNumber + " .sum span:first-child + span + span");
    thirdSumTeam.text(thirdSumResultsTable.text());

    const shtrafSumTeam = $(".sum span:first-child + span + span + span");
    const shtrafSumResultsTable = $("iframe").contents().find("#" + teamNumber + " .sum span:first-child + span + span + span");
    shtrafSumTeam.text(shtrafSumResultsTable.text());

    const sumTeam = $(".sum span:first-child + span + span + span + span");
    const sumResultsTable = $("iframe").contents().find("#" + teamNumber + " .sum span:first-child + span + span + span + span");
    sumTeam.text(sumResultsTable.text());
    $("iframe").contents().find("#flag").change(function() {
	console.log("change");
    });
    $("iframe").contents().find("#flag").change(inCells);
}

iframe.onload = inCells;
$("iframe").contents().find("#flag").change(inCells);


// setInterval(function() {
//     console.log("loop");
//     $("iframe").load("/results.html");
//     inCells();
// }, 2000);

	    

$("#on-sum-1").hide();
$(".sum span:first-child").hover(function() {
    //console.log("hvr");
    const onsum = $("#on-sum-1");
    onsum.show();
    onsum.css("position", "fixed");
    const coords = this.getBoundingClientRect();
    onsum.css("left", "" + (coords.left - 25) + "px");
    onsum.css("top", "" + (coords.top - 100)+ "px");

    let mystr = "";
    for (let i = 1; i <= 5; i++) {
	for (let j = 1; j <= 5; j++) {
	    if (j !== 1) {
		mystr += " + span";
	    }
	    const firstCellResultsTable = $("iframe").contents().find("#" + teamNumber + " #cell" + i + "-" + j);
	    const firstCell = $("#on-sum-1 span:first-child" + mystr);
	    firstCell.text(firstCellResultsTable.text());
	}
	//console.log(mystr);
	mystr += " + br + span";
    }
},
function() {
    $("#on-sum-1").hide();
});

$("#on-sum-2").hide();
$(".sum span:first-child + span").hover(function() {
    const onsum = $("#on-sum-2");
    onsum.show();
    onsum.css("position", "fixed");
    const coords = this.getBoundingClientRect();
    onsum.css("left", "" + (coords.left - 25) + "px");
    onsum.css("top", "" + (coords.top - 100)+ "px");

    let mystr = "";
    for (let i = 1; i <= 5; i++) {
	const firstCellResultsTable = $("iframe").contents().find("#" + teamNumber + " #cell" + i + "-6");
	const firstCell = $("#on-sum-2 span:first-child" + mystr);
	firstCell.text(firstCellResultsTable.text());
	//console.log(mystr);
	mystr += " + br + span";
    }
},
function() {
    $("#on-sum-2").hide();
});

$("#on-sum-3").hide();
$(".sum span:first-child + span + span").hover(
    function() {
	const onsum = $("#on-sum-3");
	onsum.show();
	onsum.css("position", "fixed");
	const coords = this.getBoundingClientRect();
	onsum.css("left", "" + (coords.left - 25) + "px");
	onsum.css("top", "" + (coords.top - 20)+ "px");

	let mystr = "";
	for (let j = 1; j <= 5; j++) {
	    const firstCellResultsTable = $("iframe").contents().find("#" + teamNumber + " #cell6-" + j);
	    const firstCell = $("#on-sum-3 span:first-child" + mystr);
	    firstCell.text(firstCellResultsTable.text());
	    //console.log(mystr);
	    mystr += " + span";
	}
    },
    function() {
	$("#on-sum-3").hide();
    });

$(".sum span:first-child + span + span + span").hover(
    function() {
	const onsum = $("#on-shtraf");
	onsum.show();
	onsum.css("position", "fixed");
	const coords = this.getBoundingClientRect();
	onsum.css("left", "" + (coords.left - 25) + "px");
	onsum.css("top", "" + (coords.top - 20)+ "px");
	if (Number(this.innerText) === 0) {
	    onsum.text("Вы пока не оштрафованны");
	} else {
	    onsum.text("Вы были оштрафованны"); //причина?
	}
    },
    function() {
	$("#on-shtraf").hide();
    }
);

for (let i = 1; i <= 5; i++) {
    $("#output-table #cell" + i + "-6").hover(
	function() {
	    const underCell = $("#under-cell" + i + "-6");
	    //console.log(underCell);
	    //console.log(i);
	    const coords = this.getBoundingClientRect();
	    const myclass = this.getAttribute("class");

	    underCell.show();
	    underCell.css("position", "fixed");
	    
	    underCell.css("left", "" + (coords.left + 5) + "px");
	    underCell.css("top", "" + (coords.top + 90)+ "px");

	    if (myclass === "bonus-fail") {
		underCell.text("Одна из задач для бонуса провалена");
	    } else if (myclass === "bonus-have") {
		underCell.text("Вы заимели бонус");
	    } else if (myclass === "bonus-can") {
		underCell.text("Вы ещё можете получить бонус");
		let found = false;
		for (let k = 1; k <= numberOfTeams && found === false; k++) {
		    const tempResultsCell = $("iframe").contents().find("#team-"+k + " #cell"+i+"-6");
		    const classTempResultsCell = tempResultsCell.attr("class");
		    if (classTempResultsCell == "bonus-have") {
			underCell.html(underCell.html() + "<br/>" + "команда " + $("iframe").contents().find("#team-"+k+" .name").text() + " уже получила бонус");
			found = true;
		    }
		}
		if (found === false) {
		    underCell.html(underCell.html() + "<br/>" + "ближайшие к бонусу команды:" + "<br/>");
		    let myobj = {};
		    let classobj = {};
		    let names = [];
		    for (let k = 1; k <= numberOfTeams && found === false; k++) {
			const tempResultsCell = $("iframe").contents().find("#team-"+k + " #cell"+i+"-6");
			const classTempResultsCell = tempResultsCell.attr("class");
			names[k] = $("iframe").contents().find("#team-"+k+" .name").text();
			let myarr = [];
			let myclasses = [];
			for (let j = 1; j <= 5; j++) {
			    myarr[j] = $("iframe").contents().find("#team-"+k + " #cell"+i+"-"+j).text();
			    myclasses[j] = $("iframe").contents().find("#team-"+k + " #cell"+i+"-"+j).attr("class");
			}
			myclasses[6] = classTempResultsCell;
			myobj[k] = myarr;
			classobj[k] = myclasses;
		    }
		    let withMaxProblems = [];
		    let maxProblems = 0;
		    for (let k = 1; k <= numberOfTeams; k++) {
			if (classobj[k][6] !== "bonus-fail") {
			    let howMuchProblems = 0;
			    for (let j = 1; j <= 5; j++) {
				if (Number(myobj[k][j]) > 0) {
				    howMuchProblems += 1;
				}
			    }
			    if (howMuchProblems > maxProblems) {
				maxProblems = howMuchProblems;
				withMaxProblems = [];
				withMaxProblems.push(k);
			    } else if (howMuchProblems === maxProblems) {
				withMaxProblems.push(k);
			    }
			}
		    }
		    const points = [undefined, 10, 20, 30, 40, 50];
		    let minPoints = 100500; //заведомо больше всех.
		    for (let m = 0; m < withMaxProblems.length; m++) {
			let teamMaxPoints = 0;
			for (let j = 1; j <= 5; j++) {
			    if (Number(myobj[withMaxProblems[m]][j]) > 0) {
				teamMaxPoints += points[j];
			    }
			}
			if (teamMaxPoints < minPoints) {
			    minPoints = teamMaxPoints;
			}
		    }
		    let printingTeams = [];
		    for (let k = 1; k <= numberOfTeams; k++) {
			if (classobj[k][6] !== "bonus-fail") {
			    let teamMaxPoints = 0;
			    for (let j = 1; j <= 5; j++) {
				if (Number(myobj[k][j]) > 0) {
				    teamMaxPoints += points[j];
				}
			    }
			    if (teamMaxPoints >= minPoints) {
				printingTeams.push(k)
			    }
			}
		    }
		    for (let m2 = 0; m2 < printingTeams.length; m2++) {
			underCell.html(underCell.html() + names[printingTeams[m2]]);
			underCell.html(underCell.html() + "<br/>" + myobj[printingTeams[m2]].join("+") + "<br/>");
		    }
		}
	    }
	},
	function() {
	    $("#under-cell"+i+"-6").hide();
	}
    );
}
for (let j = 1; j <= 5; j++) {
    $("#output-table #cell6-" + j).hover(
	function() {
	    const underCell = $("#under-cell6-" + j);
	    //console.log(underCell);
	    //console.log(j);
	    const coords = this.getBoundingClientRect();
	    const myclass = this.getAttribute("class");

	    underCell.show();
	    underCell.css("position", "fixed");
	    
	    underCell.css("left", "" + (coords.left + 5) + "px");
	    underCell.css("top", "" + (coords.top + 90)+ "px");

	    if (myclass === "bonus-fail") {
		underCell.text("Одна из задач для бонуса провалена");
	    } else if (myclass === "bonus-have") {
		underCell.text("Вы заимели бонус");
	    } else if (myclass === "bonus-can") {
		underCell.text("Вы ещё можете получить бонус");
		let found = false;
		for (let k = 1; k <= numberOfTeams && found === false; k++) {
		    const tempResultsCell = iframe.contentDocument.querySelector("#team-"+k + " #cell6-"+j);
		    const classTempResultsCell = tempResultsCell.getAttribute("class");
		    if (classTempResultsCell == "bonus-have") {
			underCell.html(underCell.html() + "<br/>" + "команда " + $("iframe").contents().find("#team-"+k+" .name").text() + " уже получила бонус");
			found = true;
		    }
		}
		if (found === false) {
		    underCell.html(underCell.html() + "<br/>" + "ближайшие к бонусу команды:" + "<br/>");
		    let myobj = {};
		    let classobj = {};
		    let names = [];
		    for (let k = 1; k <= numberOfTeams && found === false; k++) {
			const tempResultsCell = $("iframe").contents().find("#team-"+k + " #cell6-"+j);
			const classTempResultsCell = tempResultsCell.attr("class");
			names[k] = $("iframe").contents().find("#team-"+k+" .name").text();
			let myarr = [];
			let myclasses = [];
			for (let i = 1; i <= 5; i++) {
			    myarr[i] = $("iframe").contents().find("#team-"+k + " #cell"+i+"-"+j).text();
			    myclasses[i] = $("iframe").contents().find("#team-"+k + " #cell"+i+"-"+j).attr("class");
			}
			myclasses[6] = classTempResultsCell;
			myobj[k] = myarr;
			classobj[k] = myclasses;
		    }
		    let withMaxProblems = [];
		    let maxProblems = 0;
		    for (let k = 1; k <= numberOfTeams; k++) {
			if (classobj[k][6] !== "bonus-fail") {
			    let howMuchProblems = 0;
			    for (let i = 1; i <= 5; i++) {
				if (Number(myobj[k][i]) > 0) {
				    howMuchProblems += 1;
				}
			    }
			    if (howMuchProblems > maxProblems) {
				maxProblems = howMuchProblems;
				withMaxProblems = [];
				withMaxProblems.push(k);
			    } else if (howMuchProblems === maxProblems) {
				withMaxProblems.push(k);
			    }
			}
		    }
		    for (let m = 0; m < withMaxProblems.length; m++) {
			underCell.html(underCell.html() + names[withMaxProblems[m]] + "<br/>" + myobj[withMaxProblems[m]].join("+") + "<br/>");
		    }
		}
	    }
	},
	function() {
	    $("#under-cell6-"+j).hide();
	}
    );
}
for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 5; j++) {
	//const coordX = j;
	//const coordY = i;
	$("#output-table #cell" + i + "-" + j).hover(
	    function() {
		const underCell = $("#under-cell"+i+"-" + j);
		//console.log(underCell);
		const coords = this.getBoundingClientRect();

		underCell.show();
		underCell.css("position", "fixed");
	    
		underCell.css("left", "" + (coords.left + 5) + "px");
		underCell.css("top", "" + (coords.top + 90)+ "px");

		let reshili = [];
		let tryed = [];
		let nottryed = [];
		let failed = [];
		for (let k = 1; k <= numberOfTeams; k++) {
		    const tempResultsCell = $("iframe").contents().find("#team-"+k + " #cell"+i+"-"+j);
		    const classTempResultsCell = tempResultsCell.attr("class");
		    if (classTempResultsCell == "fail") {
			failed.push($("iframe").contents().find("#team-"+k+" .name").text());
		    } else if (classTempResultsCell == "first-try") {
			nottryed.push($("iframe").contents().find("#team-"+k+" .name").text());
		    } else if (classTempResultsCell == "second-try") {
			tryed.push($("iframe").contents().find("#team-"+k+" .name").text());
		    } else {
			reshili.push($("iframe").contents().find("#team-"+k+" .name").text());
		    }
		}
		underCell.text("решившие команды:");
		underCell.html(underCell.html() + "<br/>");
		reshili.forEach((elem) => {
		    underCell.html(underCell.html() + elem + "<br/>");
		})
		underCell.html(underCell.html() + "пытавшиеся сдать:" + "<br/>");
		tryed.forEach((elem) => {
		    underCell.html(underCell.html() + elem + "<br/>");
		})
		underCell.html(underCell.html() + "не решившие:" + "<br/>");
		nottryed.forEach((elem) => {
		    underCell.html(underCell.html() + elem + "<br/>");
		})
		underCell.html(underCell.html() + "провалившие эту задачу:" + "<br/>");
		failed.forEach((elem) => {
		    underCell.html(underCell.html() + elem + "<br/>");
		})
	    },
	    function() {
		$("#under-cell"+i+"-"+j).hide();
	    }
	);
    }
}

// $("#input-table #cell4-1").click(function() {
//     console.log("ans");
//     $.post("/answer/4-1", {data: $("#input-table #cell4-1 input").val() });
//     console.log("ans2");
//     console.log($("#input-table #cell4-1 input").val());
// });
// $("#input-table #cell5-1").click(function() {
//     console.log("ans");
//     $.post("/answer", null,function(){return false;});
//     console.log("ans");
// });
// $("#input-table #cell5-3 button").each(function(){console.log("btn");});
// $(document).on("click", "#input-table #cell5-3 button", function() {
//     console.log("ans");
//     $.post("/answer/5-3", null,function(){return false;});
//     console.log("ans2");
// });



