function sumAndTop() {
    let k = 1; // team-1
    let resultsTable = $("#team-" + k);
    //console.log(resultsTable);
    while (resultsTable.html() !== undefined) { //undefined?
	let sum1 = 0;
	for (let i = 1; i <= 5; i++) {
	    for (let j = 1; j <= 5; j++) {
		const coordX = j;
		const coordY = i;
		const resultsCell = $("#team-"+k + " #cell"+coordY+"-"+coordX);
		sum1 += Number(resultsCell.text());
	    }
	}
	const firstSumResultsTable = $("#team-" + k + " .sum span:first-child");
	firstSumResultsTable.text(sum1);

	let sum2 = 0;
	for (let i = 1; i <= 5; i++) {
	    const coordX = 6;
	    const coordY = i;
	    const resultsCell = $("#team-"+k + " #cell"+coordY+"-"+coordX);
	    sum2 += Number(resultsCell.text());
	}
	const secondSumResultsTable = $("#team-" + k + " .sum span:first-child + span");
	secondSumResultsTable.text(sum2);

	let sum3 = 0;
	for (let j = 1; j <= 5; j++) {
	    const coordX = j;
	    const coordY = 6;
	    const resultsCell = $("#team-"+k + " #cell"+coordY+"-"+coordX);
	    sum3 += Number(resultsCell.text());
	}
	const thirdSumResultsTable = $("#team-" + k + " .sum span:first-child + span + span");
	thirdSumResultsTable.text(sum3);

	let sum = Number(firstSumResultsTable.text()) + Number(secondSumResultsTable.text()) + Number(thirdSumResultsTable.text());
	const shtraf = $("#team-" + k + " .sum span:first-child + span + span + span");
	const sumResultsTable = $("#team-" + k + " .sum span:first-child + span + span + span + span");
	sum -= Number(shtraf.text());
	sumResultsTable.text(sum); 
	
	k += 1;
	resultsTable = $("#team-" + k);
	//console.log(resultsTable.html())
    }

    let teamsres = [];
    for (let p = 1; p < k; p++) {
	teamsres[p] = $("#team-" + p + " .sum span:first-child + span + span + span + span").text();
    }
    let n = k;
    let arr = [];
    for (let p = 1; p < k; p++) {
	for (let r = 1; r < k; r++) {
	    if (Number(teamsres[p]) >= Number(teamsres[r])) {
		n -= 1;
	    }
	}
	while (arr[n] !== undefined) {
	    n += 1;
	}
	arr[n] = p;
	n = k;
    }
    //if($("#all-results table tr:first-child + tr").html() !== undefined){
    for (let p = 1; p < k; p++) {
	$("#all-results table tbody tr:last-child").remove();
    }
    let tr = [];
    for (let p = 1; p < k; p++) {
	tr[p] = document.createElement("tr");
	tr[p].setAttribute("id", "team-" + arr[p] + "-tr");
	const td1 = document.createElement("td");
	td1.innerText = p;
	const td2 = document.createElement("td");
	const mya = document.createElement("a");
	//console.log(arr[p]);
	mya.setAttribute("href", "#team-" + arr[p]);
	//mya.innerText = $("#team-" + arr[p] + " .name").text();
	mya.innerHTML = $("#team-" + arr[p] + " .name").html();
	td2.appendChild(mya);
	const td3 = document.createElement("td");
	//td3.innerText = $("#team-" + arr[p] + " .school").text();
	td3.innerHTML = $("#team-" + arr[p] + " .school").html();
	const td4 = document.createElement("td");
	td4.innerText = teamsres[arr[p]];
	tr[p].appendChild(td1);
	tr[p].appendChild(td2);
	tr[p].appendChild(td3);
	tr[p].appendChild(td4);
	$("#all-results table").append(tr[p]);
    }
}

let numberOfTeams = 0;
$(document).ready(function() {
    $("table").each(function() { numberOfTeams += 1 })
    sumAndTop();
    numberOfTeams -= 1;
});

let oldVeiwedDiv = 0;
$(window).scroll(function() {
    console.log($(window).scrollTop());
    console.log($(document).height() - $(window).height());
    console.log(Math.round($(window).scrollTop()/($(document).height() - $(window).height())*numberOfTeams+0.49));
    let newVeiwedDiv = Math.round($(window).scrollTop()/($(document).height() - $(window).height())*numberOfTeams+0.49);
    newVeiwedDiv = (newVeiwedDiv === 0) ? 1 : newVeiwedDiv;
    if (oldVeiwedDiv !== newVeiwedDiv) {
	if (oldVeiwedDiv !== 0) {
	    $("#team-" + oldVeiwedDiv).css("background-color", "white");
	    $("#team-" + oldVeiwedDiv + "-tr").find("td").css("background-color", "white");
	}
	oldVeiwedDiv = newVeiwedDiv;
	$("#team-" + newVeiwedDiv).css("background-color", "aquamarine");
	$("#team-" + newVeiwedDiv + "-tr").find("td").css("background-color", "aquamarine");
    }
});

//$(document).ready(sumAndTop);
// let oldDoc;
// let newDoc;
// setInterval(function() {
//     console.log("loop");
//     oldDoc = newDoc;
//     //$("body").load("/results.html");
//     newDoc = $("body").html();
//     console.log(newDoc === oldDoc);
//     if (newDoc !== oldDoc) {
// 	$("#flag option").removeAttr("selected");
//     }
//     sumAndTop();
// }, 225000);

// var poll = function () {
//     $.ajax({
// 	url: "/poll",
// 	success: function(data){
//             console.log(data); // { text: "Some data" } -> will be printed in your browser console every 5 seconds
//             poll();
// 	},
// 	error: function() {
//             poll();
// 	},
// 	timeout: 30000 // 30 seconds
//     });
// };

// poll();


// function cblp(data) {
//     for (let r = 0; r < data.numberOfNewCells; r++) {
// 	const newCell = $("#team-" + data.cell[r].teamNumber + " #main-output-table #cell" + data.cell[r].coordY + "-" + data.cell[r].coordX);
// 	newCell.attr("class", data.cell[r].className);
// 	newCell.find("span").text(data.cell[r].points);
//     }
//     console.log("Data:", data);
//     for (let t = 0; t < data.numberOfNewLogs; t++) {
// 	const newLog = data.newLog[t];
// 	const elNewLog = document.createElement("p");
// 	elNewLog.innerText = newLog;
// 	$("#log").append(elNewLog);
//     }
//     for (let p = 0; p < data.numberOfNewPenalties; p++) {
// 	$("#team-" + data.penalty[p].teamNumber + " .sum span:first-child + span + span + span").text(data.penalty[p].shtrafSum);
//     }
//     //$("#flag option:last-child").attr("selected", true);
//     //$("#flag option:first-child").removeAttr("selected");
//     //document.getElementById("flag-false").setAttribute("selected", "selected");
//     sumAndTop();
//     let event = new Event("change");
//     document.getElementById("flag").dispatchEvent(event);
// }

// let timesOfError = 0;
// var subscribe = function(url, cb) {
//     $.ajax({
//         method: 'GET',
//         url: url,
//         success: function(data) {
// 	    timesOfError = 0;
//             cb(data);
//         },
//         complete: function() {
// 	    timesOfError = 0;
//             setTimeout(function() {
//                 subscribe(url, cb);
//             }, 1000);
//         },
// 	// error: function() {
// 	//     timesOfError += 1;
// 	//     if (timesOfError < 5) {
// 	// 	setTimeout(function() {
//         //             subscribe(url, cb);
// 	// 	}, 1000);
// 	//     }
//         // },
//         timeout: 30000
//     });
// };
    
// subscribe("/poll", cblp);
