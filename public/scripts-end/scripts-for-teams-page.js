"use strict";

//console.log("hwww");
var numberOfTeams;
var teamNumber = $("h1").attr("id");

function inCells() {
  var k = 0;
  $("iframe").contents().find("table").each(function () {
    k += 1;
  });
  numberOfTeams = k - 1; //одна таблица общая

  console.log(k); //console.log(numberOfTeams);

  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= 5; j++) {
      var coordX = j;
      var coordY = i; //console.log("hw2");

      var resultsCell = $("iframe").contents().find("#" + teamNumber + " #cell" + coordY + "-" + coordX);
      var teamOutputCell = $("#output-table #cell" + coordY + "-" + coordX);
      var teamInputCell = $("#input-table #cell" + coordY + "-" + coordX);
      var resultsCellClass = resultsCell.attr("class");
      teamOutputCell.attr("class", resultsCellClass);
      teamInputCell.attr("class", resultsCellClass);

      if (resultsCellClass == "first-try") {
        teamOutputCell.text("Можно получить " + coordX * 10 + " баллов");
      }

      if (resultsCellClass == "second-try") {
        teamOutputCell.text("Можно получить " + coordX * 5 + " баллов");
      }

      if (resultsCellClass == "right-from-first-try") {
        teamOutputCell.html(resultsCell.html());
      }

      if (resultsCellClass == "right-from-second-try") {
        teamOutputCell.html(resultsCell.html());
      }

      if (resultsCellClass == "fail") {
        teamOutputCell.html(resultsCell.html());
      }
    }
  }

  for (var _i = 1; _i <= 5; _i++) {
    var _coordX = 6;
    var _coordY = _i;

    var _resultsCell = $("iframe").contents().find("#" + teamNumber + " #cell" + _coordY + "-" + _coordX);

    var _teamOutputCell = $("#output-table #cell" + _coordY + "-" + _coordX);

    var _resultsCellClass = _resultsCell.attr("class");

    _teamOutputCell.attr("class", _resultsCellClass);

    if (_resultsCellClass == "bonus-can") {
      var sum = 0;

      for (var _j = 1; _j <= 5; _j++) {
        var tempTeamOutputCell = $("#output-table #cell" + _coordY + "-" + _j);
        var tempTeamOutputCellClass = tempTeamOutputCell.attr("class");
        var symbols = tempTeamOutputCell.text();

        if (tempTeamOutputCellClass == "first-try") {
          sum += Number(symbols[15]) * 10 + Number(symbols[16]); //Можно получить 50 баллов 
        } else if (tempTeamOutputCellClass == "second-try") {
          if (symbols[16] !== " ") {
            //Можно получить 5_баллов 
            sum += Number(symbols[15]) * 10 + Number(symbols[16]);
          } else {
            sum += Number(symbols[15]); //console.log(symbols[15]);
          }
        } else {
          sum += Number(symbols); // if (symbols[1] !== undefined) { //5_ может null?
          // 	sum += Number(symbols[0])*10 + Number(symbols[1]);
          // 	console.log(Number(symbols));
          // } else {
          // 	sum += Number(symbols[0]);
          // 	//console.log(symbols[0]);
          // }
        } //console.log(symbols[0]);

      }

      var flag = 0;
      $("iframe").contents().find("#main-output-table #cell" + _coordY + "-" + _coordX).each(function () {
        //console.log(this);
        if ($(this).attr("class") == "bonus-have") {
          flag = 1;
        }
      }); //	});

      if (flag == 0) {
        _teamOutputCell.text("Можно получить бонус " + sum + " баллов");
      } else {
        _teamOutputCell.text("Можно получить бонус " + sum / 2 + " баллов");
      }
    }

    if (_resultsCellClass == "bonus-have") {
      _teamOutputCell.html(_resultsCell.html());
    }

    if (_resultsCellClass == "bonus-fail") {
      _teamOutputCell.html(_resultsCell.html());
    }
  }

  for (var _j2 = 1; _j2 <= 5; _j2++) {
    var _coordX2 = _j2;
    var _coordY2 = 6;

    var _resultsCell2 = $("iframe").contents().find("#" + teamNumber + " #cell" + _coordY2 + "-" + _coordX2);

    var _teamOutputCell2 = $("#output-table #cell" + _coordY2 + "-" + _coordX2);

    var _resultsCellClass2 = _resultsCell2.attr("class");

    _teamOutputCell2.attr("class", _resultsCellClass2);

    if (_resultsCellClass2 == "bonus-can") {
      var _sum = 0;

      for (var _i2 = 1; _i2 <= 5; _i2++) {
        var _tempTeamOutputCell = $("#output-table #cell" + _i2 + "-" + _coordX2);

        var _tempTeamOutputCellClass = _tempTeamOutputCell.attr("class");

        var _symbols = _tempTeamOutputCell.text();

        if (_tempTeamOutputCellClass == "first-try") {
          _sum += Number(_symbols[15]) * 10 + Number(_symbols[16]); //Можно получить 50 баллов 
        } else if (_tempTeamOutputCellClass == "second-try") {
          if (_symbols[16] !== " ") {
            //Можно получить 5_баллов 
            _sum += Number(_symbols[15]) * 10 + Number(_symbols[16]);
          } else {
            _sum += Number(_symbols[15]); //console.log(symbols[15]);
          }
        } else {
          _sum += Number(_symbols); // if (symbols[1] !== undefined) { //5_ может null?
          // 	sum += Number(symbols[0])*10 + Number(symbols[1]);
          // 	//console.log(symbols[1]);
          // } else {
          // 	sum += Number(symbols[0]);
          // 	//console.log(symbols[0]);
          // }
        } //console.log(symbols[16]);

      }

      var _flag = 0;
      $("iframe").contents().find("#main-output-table #cell" + _coordY2 + "-" + _coordX2).each(function () {
        //console.log(this);
        if ($(this).attr("class") == "bonus-have") {
          _flag = 1;
        }
      });

      if (_flag == 0) {
        _teamOutputCell2.text("Можно получить бонус " + _sum + " баллов");
      } else {
        _teamOutputCell2.text("Можно получить бонус " + _sum / 2 + " баллов");
      }
    }

    if (_resultsCellClass2 == "bonus-have") {
      _teamOutputCell2.html(_resultsCell2.html());
    }

    if (_resultsCellClass2 == "bonus-fail") {
      _teamOutputCell2.html(_resultsCell2.html());
    }
  }

  for (var _i3 = 1; _i3 <= 5; _i3++) {
    var _coordX3 = 0;
    var _coordY3 = _i3;

    var _resultsCell3 = $("iframe").contents().find("#team-1 #cell" + _coordY3 + "-" + _coordX3);

    var _teamOutputCell3 = $("#output-table #cell" + _coordY3 + "-" + _coordX3);

    var _teamInputCell = $("#input-table #cell" + _coordY3 + "-" + _coordX3);

    _teamOutputCell3.text(_resultsCell3.text());

    _teamInputCell.text(_resultsCell3.text());
  }

  var firstSumTeam = $(".sum span:first-child");
  var firstSumResultsTable = $("iframe").contents().find("#" + teamNumber + " .sum span:first-child");
  firstSumTeam.text(firstSumResultsTable.text());
  var secondSumTeam = $(".sum span:first-child + span");
  var secondSumResultsTable = $("iframe").contents().find("#" + teamNumber + " .sum span:first-child + span");
  secondSumTeam.text(secondSumResultsTable.text());
  var thirdSumTeam = $(".sum span:first-child + span + span");
  var thirdSumResultsTable = $("iframe").contents().find("#" + teamNumber + " .sum span:first-child + span + span");
  thirdSumTeam.text(thirdSumResultsTable.text());
  var shtrafSumTeam = $(".sum span:first-child + span + span + span");
  var shtrafSumResultsTable = $("iframe").contents().find("#" + teamNumber + " .sum span:first-child + span + span + span");
  shtrafSumTeam.text(shtrafSumResultsTable.text());
  var sumTeam = $(".sum span:first-child + span + span + span + span");
  var sumResultsTable = $("iframe").contents().find("#" + teamNumber + " .sum span:first-child + span + span + span + span");
  sumTeam.text(sumResultsTable.text());
  $("iframe").contents().find("#flag").change(function () {
    console.log("change");
  });
  $("iframe").contents().find("#flag").change(inCells);
}

iframe.onload = inCells;
$("iframe").contents().find("#flag").change(inCells); // setInterval(function() {
//     console.log("loop");
//     $("iframe").load("/results.html");
//     inCells();
// }, 2000);

$("#on-sum-1").hide();
$(".sum span:first-child").hover(function () {
  //console.log("hvr");
  var onsum = $("#on-sum-1");
  onsum.show();
  onsum.css("position", "fixed");
  var coords = this.getBoundingClientRect();
  onsum.css("left", "" + (coords.left - 25) + "px");
  onsum.css("top", "" + (coords.top - 100) + "px");
  var mystr = "";

  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= 5; j++) {
      if (j !== 1) {
        mystr += " + span";
      }

      var firstCellResultsTable = $("iframe").contents().find("#" + teamNumber + " #cell" + i + "-" + j);
      var firstCell = $("#on-sum-1 span:first-child" + mystr);
      firstCell.text(firstCellResultsTable.text());
    } //console.log(mystr);


    mystr += " + br + span";
  }
}, function () {
  $("#on-sum-1").hide();
});
$("#on-sum-2").hide();
$(".sum span:first-child + span").hover(function () {
  var onsum = $("#on-sum-2");
  onsum.show();
  onsum.css("position", "fixed");
  var coords = this.getBoundingClientRect();
  onsum.css("left", "" + (coords.left - 25) + "px");
  onsum.css("top", "" + (coords.top - 100) + "px");
  var mystr = "";

  for (var i = 1; i <= 5; i++) {
    var firstCellResultsTable = $("iframe").contents().find("#" + teamNumber + " #cell" + i + "-6");
    var firstCell = $("#on-sum-2 span:first-child" + mystr);
    firstCell.text(firstCellResultsTable.text()); //console.log(mystr);

    mystr += " + br + span";
  }
}, function () {
  $("#on-sum-2").hide();
});
$("#on-sum-3").hide();
$(".sum span:first-child + span + span").hover(function () {
  var onsum = $("#on-sum-3");
  onsum.show();
  onsum.css("position", "fixed");
  var coords = this.getBoundingClientRect();
  onsum.css("left", "" + (coords.left - 25) + "px");
  onsum.css("top", "" + (coords.top - 20) + "px");
  var mystr = "";

  for (var j = 1; j <= 5; j++) {
    var firstCellResultsTable = $("iframe").contents().find("#" + teamNumber + " #cell6-" + j);
    var firstCell = $("#on-sum-3 span:first-child" + mystr);
    firstCell.text(firstCellResultsTable.text()); //console.log(mystr);

    mystr += " + span";
  }
}, function () {
  $("#on-sum-3").hide();
});
$(".sum span:first-child + span + span + span").hover(function () {
  var onsum = $("#on-shtraf");
  onsum.show();
  onsum.css("position", "fixed");
  var coords = this.getBoundingClientRect();
  onsum.css("left", "" + (coords.left - 25) + "px");
  onsum.css("top", "" + (coords.top - 20) + "px");

  if (Number(this.innerText) === 0) {
    onsum.text("Вы пока не оштрафованны");
  } else {
    onsum.text("Вы были оштрафованны"); //причина?
  }
}, function () {
  $("#on-shtraf").hide();
});

var _loop = function _loop(i) {
  $("#output-table #cell" + i + "-6").hover(function () {
    var underCell = $("#under-cell" + i + "-6"); //console.log(underCell);
    //console.log(i);

    var coords = this.getBoundingClientRect();
    var myclass = this.getAttribute("class");
    underCell.show();
    underCell.css("position", "fixed");
    underCell.css("left", "" + (coords.left + 5) + "px");
    underCell.css("top", "" + (coords.top + 90) + "px");

    if (myclass === "bonus-fail") {
      underCell.text("Одна из задач для бонуса провалена");
    } else if (myclass === "bonus-have") {
      underCell.text("Вы заимели бонус");
    } else if (myclass === "bonus-can") {
      underCell.text("Вы ещё можете получить бонус");
      var found = false;

      for (var k = 1; k <= numberOfTeams && found === false; k++) {
        var tempResultsCell = $("iframe").contents().find("#team-" + k + " #cell" + i + "-6");
        var classTempResultsCell = tempResultsCell.attr("class");

        if (classTempResultsCell == "bonus-have") {
          underCell.html(underCell.html() + "<br/>" + "команда " + $("iframe").contents().find("#team-" + k + " .name").text() + " уже получила бонус");
          found = true;
        }
      }

      if (found === false) {
        underCell.html(underCell.html() + "<br/>" + "ближайшие к бонусу команды:" + "<br/>");
        var myobj = {};
        var classobj = {};
        var names = [];

        for (var _k = 1; _k <= numberOfTeams && found === false; _k++) {
          var _tempResultsCell = $("iframe").contents().find("#team-" + _k + " #cell" + i + "-6");

          var _classTempResultsCell = _tempResultsCell.attr("class");

          names[_k] = $("iframe").contents().find("#team-" + _k + " .name").text();
          var myarr = [];
          var myclasses = [];

          for (var _j3 = 1; _j3 <= 5; _j3++) {
            myarr[_j3] = $("iframe").contents().find("#team-" + _k + " #cell" + i + "-" + _j3).text();
            myclasses[_j3] = $("iframe").contents().find("#team-" + _k + " #cell" + i + "-" + _j3).attr("class");
          }

          myclasses[6] = _classTempResultsCell;
          myobj[_k] = myarr;
          classobj[_k] = myclasses;
        }

        var withMaxProblems = [];
        var maxProblems = 0;

        for (var _k2 = 1; _k2 <= numberOfTeams; _k2++) {
          if (classobj[_k2][6] !== "bonus-fail") {
            var howMuchProblems = 0;

            for (var _j4 = 1; _j4 <= 5; _j4++) {
              if (Number(myobj[_k2][_j4]) > 0) {
                howMuchProblems += 1;
              }
            }

            if (howMuchProblems > maxProblems) {
              maxProblems = howMuchProblems;
              withMaxProblems = [];
              withMaxProblems.push(_k2);
            } else if (howMuchProblems === maxProblems) {
              withMaxProblems.push(_k2);
            }
          }
        }

        var points = [undefined, 10, 20, 30, 40, 50];
        var minPoints = 100500; //заведомо больше всех.

        for (var m = 0; m < withMaxProblems.length; m++) {
          var teamMaxPoints = 0;

          for (var _j5 = 1; _j5 <= 5; _j5++) {
            if (Number(myobj[withMaxProblems[m]][_j5]) > 0) {
              teamMaxPoints += points[_j5];
            }
          }

          if (teamMaxPoints < minPoints) {
            minPoints = teamMaxPoints;
          }
        }

        var printingTeams = [];

        for (var _k3 = 1; _k3 <= numberOfTeams; _k3++) {
          if (classobj[_k3][6] !== "bonus-fail") {
            var _teamMaxPoints = 0;

            for (var _j6 = 1; _j6 <= 5; _j6++) {
              if (Number(myobj[_k3][_j6]) > 0) {
                _teamMaxPoints += points[_j6];
              }
            }

            if (_teamMaxPoints >= minPoints) {
              printingTeams.push(_k3);
            }
          }
        }

        for (var m2 = 0; m2 < printingTeams.length; m2++) {
          underCell.html(underCell.html() + names[printingTeams[m2]]);
          underCell.html(underCell.html() + "<br/>" + myobj[printingTeams[m2]].join("+") + "<br/>");
        }
      }
    }
  }, function () {
    $("#under-cell" + i + "-6").hide();
  });
};

for (var i = 1; i <= 5; i++) {
  _loop(i);
}

var _loop2 = function _loop2(j) {
  $("#output-table #cell6-" + j).hover(function () {
    var underCell = $("#under-cell6-" + j); //console.log(underCell);
    //console.log(j);

    var coords = this.getBoundingClientRect();
    var myclass = this.getAttribute("class");
    underCell.show();
    underCell.css("position", "fixed");
    underCell.css("left", "" + (coords.left + 5) + "px");
    underCell.css("top", "" + (coords.top + 90) + "px");

    if (myclass === "bonus-fail") {
      underCell.text("Одна из задач для бонуса провалена");
    } else if (myclass === "bonus-have") {
      underCell.text("Вы заимели бонус");
    } else if (myclass === "bonus-can") {
      underCell.text("Вы ещё можете получить бонус");
      var found = false;

      for (var k = 1; k <= numberOfTeams && found === false; k++) {
        var tempResultsCell = iframe.contentDocument.querySelector("#team-" + k + " #cell6-" + j);
        var classTempResultsCell = tempResultsCell.getAttribute("class");

        if (classTempResultsCell == "bonus-have") {
          underCell.html(underCell.html() + "<br/>" + "команда " + $("iframe").contents().find("#team-" + k + " .name").text() + " уже получила бонус");
          found = true;
        }
      }

      if (found === false) {
        underCell.html(underCell.html() + "<br/>" + "ближайшие к бонусу команды:" + "<br/>");
        var myobj = {};
        var classobj = {};
        var names = [];

        for (var _k4 = 1; _k4 <= numberOfTeams && found === false; _k4++) {
          var _tempResultsCell2 = $("iframe").contents().find("#team-" + _k4 + " #cell6-" + j);

          var _classTempResultsCell2 = _tempResultsCell2.attr("class");

          names[_k4] = $("iframe").contents().find("#team-" + _k4 + " .name").text();
          var myarr = [];
          var myclasses = [];

          for (var _i6 = 1; _i6 <= 5; _i6++) {
            myarr[_i6] = $("iframe").contents().find("#team-" + _k4 + " #cell" + _i6 + "-" + j).text();
            myclasses[_i6] = $("iframe").contents().find("#team-" + _k4 + " #cell" + _i6 + "-" + j).attr("class");
          }

          myclasses[6] = _classTempResultsCell2;
          myobj[_k4] = myarr;
          classobj[_k4] = myclasses;
        }

        var withMaxProblems = [];
        var maxProblems = 0;

        for (var _k5 = 1; _k5 <= numberOfTeams; _k5++) {
          if (classobj[_k5][6] !== "bonus-fail") {
            var howMuchProblems = 0;

            for (var _i7 = 1; _i7 <= 5; _i7++) {
              if (Number(myobj[_k5][_i7]) > 0) {
                howMuchProblems += 1;
              }
            }

            if (howMuchProblems > maxProblems) {
              maxProblems = howMuchProblems;
              withMaxProblems = [];
              withMaxProblems.push(_k5);
            } else if (howMuchProblems === maxProblems) {
              withMaxProblems.push(_k5);
            }
          }
        }

        for (var m = 0; m < withMaxProblems.length; m++) {
          underCell.html(underCell.html() + names[withMaxProblems[m]] + "<br/>" + myobj[withMaxProblems[m]].join("+") + "<br/>");
        }
      }
    }
  }, function () {
    $("#under-cell6-" + j).hide();
  });
};

for (var j = 1; j <= 5; j++) {
  _loop2(j);
}

var _loop3 = function _loop3(_i4) {
  var _loop5 = function _loop5(_j7) {
    //const coordX = j;
    //const coordY = i;
    $("#output-table #cell" + _i4 + "-" + _j7).hover(function () {
      var underCell = $("#under-cell" + _i4 + "-" + _j7); //console.log(underCell);

      var coords = this.getBoundingClientRect();
      underCell.show();
      underCell.css("position", "fixed");
      underCell.css("left", "" + (coords.left + 5) + "px");
      underCell.css("top", "" + (coords.top + 90) + "px");
      var reshili = [];
      var tryed = [];
      var nottryed = [];
      var failed = [];

      for (var k = 1; k <= numberOfTeams; k++) {
        var tempResultsCell = $("iframe").contents().find("#team-" + k + " #cell" + _i4 + "-" + _j7);
        var classTempResultsCell = tempResultsCell.attr("class");

        if (classTempResultsCell == "fail") {
          failed.push($("iframe").contents().find("#team-" + k + " .name").text());
        } else if (classTempResultsCell == "first-try") {
          nottryed.push($("iframe").contents().find("#team-" + k + " .name").text());
        } else if (classTempResultsCell == "second-try") {
          tryed.push($("iframe").contents().find("#team-" + k + " .name").text());
        } else {
          reshili.push($("iframe").contents().find("#team-" + k + " .name").text());
        }
      }

      underCell.text("решившие команды:");
      underCell.html(underCell.html() + "<br/>");
      reshili.forEach(function (elem) {
        underCell.html(underCell.html() + elem + "<br/>");
      });
      underCell.html(underCell.html() + "пытавшиеся сдать:" + "<br/>");
      tryed.forEach(function (elem) {
        underCell.html(underCell.html() + elem + "<br/>");
      });
      underCell.html(underCell.html() + "не решившие:" + "<br/>");
      nottryed.forEach(function (elem) {
        underCell.html(underCell.html() + elem + "<br/>");
      });
      underCell.html(underCell.html() + "провалившие эту задачу:" + "<br/>");
      failed.forEach(function (elem) {
        underCell.html(underCell.html() + elem + "<br/>");
      });
    }, function () {
      $("#under-cell" + _i4 + "-" + _j7).hide();
    });
  };

  for (var _j7 = 1; _j7 <= 5; _j7++) {
    _loop5(_j7);
  }
};

for (var _i4 = 1; _i4 <= 5; _i4++) {
  _loop3(_i4);
} // $("#input-table #cell4-1").click(function() {
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


var selectedCell = {};

function clearingSelectedCell() {
  var oldStyle = {
    "border-style": "dotted",
    "border-bottom-color": selectedCell.borderBottomColor,
    "border-left-color": selectedCell.borderLeftColor,
    "border-top-color": selectedCell.borderTopColor,
    "border-right-color": selectedCell.borderRightColor
  };
  $("#output-table #cell" + selectedCell.coordY + "-" + selectedCell.coordX).css(oldStyle);
}

var _loop4 = function _loop4(_i5) {
  var _loop6 = function _loop6(_j8) {
    var coordX = _j8;
    var coordY = _i5;
    $(document).on("click", "#output-table #cell" + _i5 + "-" + _j8, function () {
      console.log("click");

      if (selectedCell != {}) {
        clearingSelectedCell();
      }

      selectedCell.coordX = _j8;
      selectedCell.coordY = _i5;
      selectedCell.borderBottomColor = $("#output-table #cell" + _i5 + "-" + _j8).css("border-bottom-color");
      selectedCell.borderLeftColor = $("#output-table #cell" + _i5 + "-" + _j8).css("border-left-color");
      selectedCell.borderTopColor = $("#output-table #cell" + _i5 + "-" + _j8).css("border-top-color");
      selectedCell.borderRightColor = $("#output-table #cell" + _i5 + "-" + _j8).css("border-right-color");
      var newStyle = {
        "border-style": "double",
        //"border-width": "5px",
        "border-color": "black"
      };
      $("#output-table #cell" + _i5 + "-" + _j8).css(newStyle);
      var cellsClass = $("#output-table #cell" + _i5 + "-" + _j8).attr("class");
      var rightCol = $("#right-column");

      if (cellsClass == "first-try" || cellsClass == "second-try") {
        rightCol.html("\n                <div>\n\t\t\u0412\u044B\u0431\u0440\u0430\u043D\u0430 \u0437\u0430\u0434\u0430\u0447\u0430 \u2116" + $("#output-table #cell" + 0 + "-" + coordX).text() + " \u043F\u043E \u0442\u0435\u043C\u0435 " + $("#output-table #cell" + coordY + "-" + 0).text() + "<br/><br/>" + (cellsClass == "first-try" ? "Первая" : "Вторая") + "\n    \t\t<br>\n\t\t\u043F\u043E\u043F\u044B\u0442\u043A\u0430\n\t\t<br>\n\t\t<input type=\"text\" name=\"lengthNum\" size=\"10\">\n\t\t<br>\n\t\t<button type=\"submit\">\n\t\t  \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C\n\t\t</button>\n                </div>\n\t      ");
        rightCol.find("button").on("click", function () {
          console.log("ans");
          $.post("/answer/" + coordY + "/" + coordX, {
            data: rightCol.find("input").val(),
            coordX: coordX,
            coordY: coordY,
            teamsNumber: teamNumber
          }, function () {
            //teamInputCell.find("input").val("");
            //alert("Принято!");
            location = location;
            return false;
          });
          rightCol.find("input").val("");
          console.log("ans2");
        }); //} else {
        //	const rightCol = $("#right-column");
        //	rightCol.html("");
      } else if (cellsClass == "right-from-first-try") {
        rightCol.html("<div>\u0412\u044B\u0431\u0440\u0430\u043D\u0430 \u0437\u0430\u0434\u0430\u0447\u0430 \u2116" + $("#output-table #cell" + 0 + "-" + coordX).text() + " \u043F\u043E \u0442\u0435\u043C\u0435 " + $("#output-table #cell" + coordY + "-" + 0).text() + "<br/><br/>\u0417\u0430\u0434\u0430\u0447\u0430 <br>\u0440\u0435\u0448\u0435\u043D\u0430 <br>\u0441 \u043F\u0435\u0440\u0432\u043E\u0439 <br>\u043F\u043E\u043F\u044B\u0442\u043A\u0438!</div>");
      } else if (cellsClass == "right-from-second-try") {
        rightCol.html("<div>\u0412\u044B\u0431\u0440\u0430\u043D\u0430 \u0437\u0430\u0434\u0430\u0447\u0430 \u2116" + $("#output-table #cell" + 0 + "-" + coordX).text() + " \u043F\u043E \u0442\u0435\u043C\u0435 " + $("#output-table #cell" + coordY + "-" + 0).text() + "<br/><br/>\u0417\u0430\u0434\u0430\u0447\u0430 <br>\u0440\u0435\u0448\u0435\u043D\u0430 <br>\u0441\u043E \u0432\u0442\u043E\u0440\u043E\u0439 <br>\u043F\u043E\u043F\u044B\u0442\u043A\u0438!</div>");
      } else if (cellsClass == "fail") {
        rightCol.html("<div>\u0412\u044B\u0431\u0440\u0430\u043D\u0430 \u0437\u0430\u0434\u0430\u0447\u0430 \u2116" + $("#output-table #cell" + 0 + "-" + coordX).text() + " \u043F\u043E \u0442\u0435\u043C\u0435 " + $("#output-table #cell" + coordY + "-" + 0).text() + "<br/><br/>\u041F\u043E\u043F\u044B\u0442\u043E\u043A <br>\u043D\u0435\u0442, <br>\u0437\u0430\u0434\u0430\u0447\u0430 <br>\u043D\u0435 \u0440\u0435\u0448\u0435\u043D\u0430</div>");
      }
    });
  };

  for (var _j8 = 1; _j8 <= 5; _j8++) {
    _loop6(_j8);
  }
};

for (var _i5 = 1; _i5 <= 5; _i5++) {
  _loop4(_i5);
}