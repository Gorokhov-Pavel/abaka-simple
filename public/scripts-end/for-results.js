"use strict";

function sumAndTop() {
  var k = 1; // team-1

  var resultsTable = $("#team-" + k); //console.log(resultsTable);

  while (resultsTable.html() !== undefined) {
    //undefined?
    var sum1 = 0;

    for (var i = 1; i <= 5; i++) {
      for (var j = 1; j <= 5; j++) {
        var coordX = j;
        var coordY = i;
        var resultsCell = $("#team-" + k + " #cell" + coordY + "-" + coordX);
        sum1 += Number(resultsCell.text());
      }
    }

    var firstSumResultsTable = $("#team-" + k + " .sum span:first-child");
    firstSumResultsTable.text(sum1);
    var sum2 = 0;

    for (var _i = 1; _i <= 5; _i++) {
      var _coordX = 6;
      var _coordY = _i;

      var _resultsCell = $("#team-" + k + " #cell" + _coordY + "-" + _coordX);

      sum2 += Number(_resultsCell.text());
    }

    var secondSumResultsTable = $("#team-" + k + " .sum span:first-child + span");
    secondSumResultsTable.text(sum2);
    var sum3 = 0;

    for (var _j = 1; _j <= 5; _j++) {
      var _coordX2 = _j;
      var _coordY2 = 6;

      var _resultsCell2 = $("#team-" + k + " #cell" + _coordY2 + "-" + _coordX2);

      sum3 += Number(_resultsCell2.text());
    }

    var thirdSumResultsTable = $("#team-" + k + " .sum span:first-child + span + span");
    thirdSumResultsTable.text(sum3);
    var sum = Number(firstSumResultsTable.text()) + Number(secondSumResultsTable.text()) + Number(thirdSumResultsTable.text());
    var shtraf = $("#team-" + k + " .sum span:first-child + span + span + span");
    var sumResultsTable = $("#team-" + k + " .sum span:first-child + span + span + span + span");
    sum -= Number(shtraf.text());
    sumResultsTable.text(sum);
    k += 1;
    resultsTable = $("#team-" + k); //console.log(resultsTable.html())
  }

  var teamsres = [];

  for (var p = 1; p < k; p++) {
    teamsres[p] = $("#team-" + p + " .sum span:first-child + span + span + span + span").text();
  }

  var n = k;
  var arr = [];

  for (var _p = 1; _p < k; _p++) {
    for (var r = 1; r < k; r++) {
      if (Number(teamsres[_p]) >= Number(teamsres[r])) {
        n -= 1;
      }
    }

    while (arr[n] !== undefined) {
      n += 1;
    }

    arr[n] = _p;
    n = k;
  } //if($("#all-results table tr:first-child + tr").html() !== undefined){


  for (var _p2 = 1; _p2 < k; _p2++) {
    $("#all-results table tbody tr:last-child").remove();
  }

  var tr = [];

  for (var _p3 = 1; _p3 < k; _p3++) {
    tr[_p3] = document.createElement("tr");

    tr[_p3].setAttribute("id", "team-" + arr[_p3] + "-tr");

    var td1 = document.createElement("td");
    td1.innerText = _p3;
    var td2 = document.createElement("td");
    var mya = document.createElement("a"); //console.log(arr[p]);

    mya.setAttribute("href", "#team-" + arr[_p3]); //mya.innerText = $("#team-" + arr[p] + " .name").text();

    mya.innerHTML = $("#team-" + arr[_p3] + " .name").html();
    td2.appendChild(mya);
    var td3 = document.createElement("td"); //td3.innerText = $("#team-" + arr[p] + " .school").text();

    td3.innerHTML = $("#team-" + arr[_p3] + " .school").html();
    var td4 = document.createElement("td");
    td4.innerText = teamsres[arr[_p3]];

    tr[_p3].appendChild(td1);

    tr[_p3].appendChild(td2);

    tr[_p3].appendChild(td3);

    tr[_p3].appendChild(td4);

    $("#all-results table").append(tr[_p3]);
  }
}

var numberOfTeams = 0;
$(document).ready(function () {
  $("table").each(function () {
    numberOfTeams += 1;
  });
  sumAndTop();
  numberOfTeams -= 1;
});
var oldVeiwedDiv = 0;
$(window).scroll(function () {
  console.log($(window).scrollTop());
  console.log($(document).height() - $(window).height());
  console.log(Math.round($(window).scrollTop() / ($(document).height() - $(window).height()) * numberOfTeams + 0.49));
  var newVeiwedDiv = Math.round($(window).scrollTop() / ($(document).height() - $(window).height()) * numberOfTeams + 0.49);
  newVeiwedDiv = newVeiwedDiv === 0 ? 1 : newVeiwedDiv;

  if (oldVeiwedDiv !== newVeiwedDiv) {
    if (oldVeiwedDiv !== 0) {
      $("#team-" + oldVeiwedDiv).css("background-color", "white");
      $("#team-" + oldVeiwedDiv + "-tr").find("td").css("background-color", "white");
    }

    oldVeiwedDiv = newVeiwedDiv;
    $("#team-" + newVeiwedDiv).css("background-color", "aquamarine");
    $("#team-" + newVeiwedDiv + "-tr").find("td").css("background-color", "aquamarine");
  }
}); //$(document).ready(sumAndTop);
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