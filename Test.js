var app = angular.module('scoreboard', []);
app.controller('regiCtrl', function ($scope) {
    $scope.team_a = '';     //stores name of Team a
    $scope.team_b = '';     //stores name of Team b
    $scope.numPlayers;      //stores no of maximum players 
    $scope.Toss = false;
    $scope.Isvisible = false;
    $scope.lineups = false;
    $scope.ta_players = [];     //stores the list of players name of team a 
    $scope.tb_players = [];     //stores the list of players name of team b
    $scope.max_days = 3;
    $scope.overs_per_day = 15;         //stores no of max overs
    var pid = 1;
    $scope.Toss_Won;            //Holds value of who won the toss
    $scope.Elc_To = '';
    $scope.addLineups = function () {
        if ($scope.registration.$valid) {
            localStorage.setItem("team_a_name", $scope.team_a);
            localStorage.setItem("team_b_name", $scope.team_b);
            localStorage.setItem("numplayers", parseInt($scope.numPlayers));
            localStorage.setItem("MaxDays", parseInt($scope.max_days));
            localStorage.setItem("maxovers", parseInt($scope.overs_per_day));
            $scope.lineups = true;  // Make the score display visible
        } else {
            $scope.lineups = false;  // Don't display if form is invalid
        }
    }
    if ($scope.numPlayers == null) {
        $scope.numPlayers = 11;
    }
    $scope.saveTa = function () {
        if ($scope.ta_players.length >= $scope.numPlayers) {
            alert(`${$scope.team_a} is full`);
            return;
        }
        if ($scope.ta_newPlayer.id == null) {
            $scope.ta_newPlayer.id = pid++;
            $scope.ta_players.push($scope.ta_newPlayer);
        }
        else {
            for (i in $scope.ta_players) {
                if ($scope.ta_players[i].id == $scope.ta_newPlayer.id) {
                    $scope.ta_players[i] = $scope.ta_newPlayer;
                }
            }
        }
        $scope.ta_newPlayer = {};
    }
    $scope.saveTb = function () {
        if ($scope.tb_players.length >= $scope.numPlayers) {
            alert(`${$scope.team_b} is full`);
            return;
        }
        if ($scope.tb_newPlayer.id == null) {
            $scope.tb_newPlayer.id = pid++;
            $scope.tb_players.push($scope.tb_newPlayer);
        }
        else {
            for (i in $scope.tb_players) {
                if ($scope.tb_players[i].id == $scope.tb_newPlayer.id) {
                    $scope.tb_players[i] = $scope.tb_newPlayer;
                }
            }
        }
        $scope.tb_newPlayer = {};
    }
    $scope.toss = function () {
        if ($scope.registration.$valid) {
            localStorage.setItem("Team_A", JSON.stringify($scope.ta_players));
            localStorage.setItem("Team_B", JSON.stringify($scope.tb_players));
            $scope.Toss = true;  // Make the score display visible
        } else {
            $scope.Toss = false;  // Don't display if form is invalid
        }
    };
    $scope.tossA = function () {
        $scope.Toss_Won = $scope.team_a;
    }
    $scope.tossB = function () {
        $scope.Toss_Won = $scope.team_b;
    }
    $scope.display = function () {
        if ($scope.registration.$valid) {
            localStorage.setItem("TOSS", $scope.Toss_Won);
            localStorage.setItem("Elected", $scope.Elc_To);
            $scope.Isvisible = true;  // Make the score display visible
        } else {
            $scope.Isvisible = false;  // Don't display if form is invalid
        }
    };
});

app.controller('sysCtrl', function ($scope) {
    $scope.Team_a = localStorage.getItem("team_a_name");
    $scope.Team_b = localStorage.getItem("team_b_name");
    $scope.Toss = localStorage.getItem("TOSS");
    $scope.elc = localStorage.getItem("Elected");
    $scope.Team_a_lineups = JSON.parse(localStorage.getItem("Team_A")) || [];
    $scope.Team_b_lineups = JSON.parse(localStorage.getItem("Team_B")) || [];
    $scope.Innings;
    $scope.Ist_inn;
    $scope.IInd_inn;
    $scope.IIIrd_inn;
    $scope.IVth_inn;
    $scope.runs = parseInt(localStorage.getItem("Runs")) || 0;
    $scope.wkt = parseInt(localStorage.getItem("Wickets")) || 0;
    $scope.balls = parseInt(localStorage.getItem("Balls")) || 0;
    $scope.whole_overs = parseInt(localStorage.getItem("Whole_Overs")) || 0;
    $scope.Fours = parseInt(localStorage.getItem("FOURS")) || 0;
    $scope.Six = parseInt(localStorage.getItem("SIX")) || 0;
    $scope.EXTRAS = parseInt(localStorage.getItem("Extras")) || 0;
    $scope.crr = localStorage.getItem("CRR") || "--";
    $scope.Overs = `${$scope.whole_overs}.${$scope.balls}`;
    $scope.Ist_inn_score = JSON.parse(localStorage.getItem("Ist_inning_score")) || {
        Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
        num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
    };
    $scope.IInd_inn_score = JSON.parse(localStorage.getItem("IInd_inning_score")) || {
        Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
        num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
    };
    $scope.IIIrd_inn_score = JSON.parse(localStorage.getItem("IIIrd_inning_score")) || {
        Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
        num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
    };
    $scope.IVth_inn_score = JSON.parse(localStorage.getItem("IVth_inning_score")) || {
        Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
        num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
    };
    $scope.Ist_inn_score_diff = parseInt(localStorage.getItem("Ist_Inn_Score_Diff"));
    $scope.IInd_inn_score_diff = parseInt(localStorage.getItem("IInd_Inn_Score_Diff"));
    $scope.current_inn = JSON.parse(localStorage.getItem("Current_inn_setup")) || ["1st", "2nd", "3rd", "4th"];
    $scope.max_days = parseInt(localStorage.getItem("MaxDays"));
    $scope.Crr_Day = parseInt(localStorage.getItem("Current_day")) || 1;
    $scope.max_overs = parseInt(localStorage.getItem("maxovers"));
    $scope.max_wkt = parseInt(localStorage.getItem("numplayers")) - 1;
    $scope.declared = false;
    $scope.extra = 0;
    $scope.i = parseInt(localStorage.getItem("Curr_inn_index")) || 0;
    $scope.Day_stumps = parseInt(localStorage.getItem("Day_Stumped")) || 0;
    $scope.FollowOn = parseInt(localStorage.getItem("is_followed_on")) || 0;
    $scope.Target = parseInt(localStorage.getItem("target")) || 0;
    $scope.result = localStorage.getItem("final_result");
    function syncToLocalStorage() {
        localStorage.setItem("Runs", $scope.runs);
        localStorage.setItem("Wickets", $scope.wkt);
        localStorage.setItem("Balls", $scope.balls);
        localStorage.setItem("Whole_Overs", $scope.whole_overs);
        localStorage.setItem("FOURS", $scope.Fours);
        localStorage.setItem("SIX", $scope.Six);
        localStorage.setItem("Extras", $scope.EXTRAS);
        localStorage.setItem("CRR", $scope.crr);
        localStorage.setItem("OVERS", `${$scope.whole_overs}.${$scope.balls}`);
        localStorage.setItem("Curr_inn_index", $scope.i);
        localStorage.setItem("Current_day", $scope.Crr_Day);
        localStorage.setItem("Day_Stumped", $scope.Day_stumps);
        localStorage.setItem("Ist_Inn_Score_Diff", $scope.Ist_inn_score_diff);
        localStorage.setItem("IInd_Inn_Score_Diff", $scope.IInd_inn_score_diff);
        localStorage.setItem("is_followed-on", $scope.FollowOn);
        localStorage.setItem("Current_inn_setup", JSON.stringify($scope.current_inn));
        localStorage.setItem("target", $scope.Target);
        localStorage.setItem("final_result", $scope.result);
        switch ($scope.current_inn[$scope.i]) {
            case "1st":
                $scope.Ist_inn_score = {
                    Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
                    num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
                };
                localStorage.setItem("Ist_inning_score", JSON.stringify($scope.Ist_inn_score));
                break;
            case "2nd":
                $scope.IInd_inn_score = {
                    Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
                    num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
                };
                localStorage.setItem("IInd_inning_score", JSON.stringify($scope.IInd_inn_score));
                break;
            case "3rd":
                $scope.IIIrd_inn_score = {
                    Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
                    num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
                };
                localStorage.setItem("IIIrd_inning_score", JSON.stringify($scope.IIIrd_inn_score));
                break
            case "4th":
                $scope.IVth_inn_score = {
                    Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
                    num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
                };
                localStorage.setItem("IVth_inning_score", JSON.stringify($scope.IVth_inn_score));
                break;
        }
    }

    function setupInningsOrder() {
        if ($scope.Toss == $scope.Team_a) {
            if ($scope.elc == "Bat") {
                $scope.Ist_inn = $scope.Team_a;
                $scope.IInd_inn = $scope.Team_b;
            }
            else {
                $scope.Ist_inn = $scope.Team_b;
                $scope.IInd_inn = $scope.Team_a;
            }
        }
        else if ($scope.Toss == $scope.Team_b) {
            if ($scope.elc == "Bat") {
                $scope.Ist_inn = $scope.Team_b;
                $scope.IInd_inn = $scope.Team_a;
            }
            else {
                $scope.Ist_inn = $scope.Team_a;
                $scope.IInd_inn = $scope.Team_b;
            }
        }
        $scope.IIIrd_inn = $scope.Ist_inn;
        $scope.IVth_inn = $scope.IInd_inn;
    }
    setupInningsOrder();
    function updateCurrinn() {
        switch ($scope.current_inn[$scope.i]) {
            case "1st":
                $scope.Innings = $scope.Ist_inn;
                break;
            case "2nd":
                $scope.Innings = $scope.IInd_inn;
                break;
            case "3rd":
                $scope.Innings = $scope.IIIrd_inn;
                break;
            case "4th":
                $scope.Innings = $scope.IVth_inn;
                break;
            default:
                alert("End of game!!!");
        }
    }
    updateCurrinn();
    $scope.next_innings = function () {
        $scope.runs = 0;
        $scope.wkt = 0;
        $scope.whole_overs = 0;
        $scope.balls = 0;
        $scope.Overs = "0.0"
        $scope.declared = false;
        $scope.Fours = 0;
        $scope.Six = 0;
        $scope.EXTRAS = 0;
        $scope.i++;
        $scope.crr = "--";
        $scope.Day_stumps = 0;
        updateCurrinn();
        calScoreDiff();
        syncToLocalStorage();
    }
    $scope.declaration = function () {
        $scope.declared = true;
    }
    $scope.stumps = function () {
        $scope.Day_stumps = 1;
        makeResult();
        syncToLocalStorage();
    }
    $scope.startNewDay = function () {
        if ($scope.Crr_Day < $scope.max_days) {
            $scope.Day_stumps = 0;
            $scope.Crr_Day++;
            makeResult();
            syncToLocalStorage();
        }
        else {
            alert("Game Over!!!");
        }
    }
    function CalTarget() {
        if ($scope.i == 3 && $scope.IInd_inn_score_diff > 0) {
            $scope.Target = $scope.IInd_inn_score_diff + 1;
            syncToLocalStorage();
        }
    }
    $scope.buttonLabel1st = function () {
        let lable = $scope.Ist_inn + ' 1st Innings - ' + $scope.Ist_inn_score.Runs;
        if (parseInt($scope.Ist_inn_score.WKT) != $scope.max_wkt) {
            lable += '/' + $scope.Ist_inn_score.WKT;
        }
        return lable;
    }
    $scope.buttonLabel2nd = function () {
        let lable = $scope.IInd_inn + ' 1st Innings - ' + $scope.IInd_inn_score.Runs;
        if (parseInt($scope.IInd_inn_score.WKT) != $scope.max_wkt) {
            lable += '/' + $scope.IInd_inn_score.WKT;
        }
        return lable;
    }
    $scope.buttonLabel3rd = function () {
        if ($scope.FollowOn == 0) {
            let lable = $scope.IIIrd_inn + ' 2nd Innings - ' + $scope.IIIrd_inn_score.Runs;
            if (parseInt($scope.IIIrd_inn_score.WKT) != $scope.max_wkt) {
                lable += '/' + $scope.IIIrd_inn_score.WKT;
            }
            return lable;
        }
        else if ($scope.FollowOn == 1) {
            let lable = $scope.IVth_inn + ' 2nd Innings - ' + $scope.IVth_inn_score.Runs;
            if (parseInt($scope.IVth_inn_score.WKT) != $scope.max_wkt) {
                lable += '/' + $scope.IVth_inn_score.WKT;
            }
            return lable;
        }
    }
    $scope.buttonLabel4th = function () {
        if ($scope.FollowOn == 0) {
            let lable = $scope.IVth_inn + ' 2nd Innings - ' + $scope.IVth_inn_score.Runs;
            if (parseInt($scope.IVth_inn_score.WKT) != $scope.max_wkt) {
                lable += '/' + $scope.IVth_inn_score.WKT;
            }
            return lable;
        }
        else if ($scope.FollowOn == 1) {
            let lable = $scope.IIIrd_inn + ' 2nd Innings - ' + $scope.IIIrd_inn_score.Runs;
            if (parseInt($scope.IIIrd_inn_score.WKT) != $scope.max_wkt) {
                lable += '/' + $scope.IIIrd_inn_score.WKT;
            }
            return lable;
        }
    }
    function makeResult() {
        //for game ending in 3rd innings(follow on condition)
        if ($scope.FollowOn == 1 && $scope.i == 2) {
            if ($scope.wkt == $scope.max_wkt && $scope.IInd_inn_score_diff < 0) {
                $scope.result = `${$scope.Ist_inn} won by an innings and ${$scope.IInd_inn_score_diff-1} runs`;
            } else if (($scope.Crr_Day == $scope.max_days && $scope.Day_stumps == 1)) {
                $scope.result = "Match Draw";
            }
            else if($scope.i==3){
                if ($scope.IIIrd_inn_score.Runs >= $scope.Target) {
                const wkt_remaining = $scope.max_wkt - $scope.IIIrd_inn_score.WKT;
                $scope.result = `${$scope.IIIrd_inn} won by ${wkt_remaining} wickets`;
            }
            else if ($scope.IIIrd_inn_score.Runs == $scope.Target - 1 && $scope.IIIrd_inn_score.WKT == $scope.max_wkt) {
                $scope.result = "Match Tied"
            }
            else if ($scope.IIIrd_inn_score.Runs < $scope.Target && $scope.IIIrd_inn_score.WKT == $scope.max_wkt) {
                const margin = ($scope.Target - 1) - $scope.IIIrd_inn_score.Runs
                $scope.result = `${$scope.Ist_inn} won by ${margin} runs`;
            }
            }
        }

        //for normal outright win
        if ($scope.i == 3) {
            if ($scope.IVth_inn_score.Runs >= $scope.Target) {
                const wkt_remaining = $scope.max_wkt - $scope.IVth_inn_score.WKT;
                $scope.result = `${$scope.IVth_inn} won by ${wkt_remaining} wickets`;
            }
            else if ($scope.IVth_inn_score.Runs == $scope.Target - 1 && $scope.IVth_inn_score.WKT == $scope.max_wkt) {
                $scope.result = "Match Tied"
            }
            else if ($scope.IVth_inn_score.Runs < $scope.Target && $scope.IVth_inn_score.WKT == $scope.max_wkt) {
                const margin = ($scope.Target - 1) - $scope.IVth_inn_score.Runs
                $scope.result = `${$scope.Ist_inn} won by ${margin} runs`;
            }
            
        }

        if($scope.Crr_Day == $scope.max_days && $scope.Day_stumps == 1){
            $scope.result="Match Draw";
            
        }
        syncToLocalStorage();
    }
    $scope.over_ball_sim = function () {
        if ($scope.balls < 5) {
            $scope.balls++;
        }
        else {
            $scope.balls = 0;
            $scope.whole_overs++;
        }
        $scope.Overs = `${$scope.whole_overs}.${$scope.balls}`;
        syncToLocalStorage();
    }
    $scope.cal_crr = function () {
        $scope.rr = $scope.runs / ($scope.whole_overs + ($scope.balls / 6));
        $scope.crr = $scope.rr.toFixed(2);
        syncToLocalStorage();
        calScoreDiff();
        makeResult();
        syncToLocalStorage();
    }
    function calScoreDiff() {
        if ($scope.i == 1) {
            $scope.Ist_inn_score_diff = ($scope.IInd_inn_score.Runs - $scope.Ist_inn_score.Runs);
        }
        else if ($scope.i == 2 && $scope.FollowOn == 0) {
            $scope.IInd_inn_score_diff = ($scope.IIIrd_inn_score.Runs - $scope.Ist_inn_score_diff);
        }
        else if ($scope.i == 2 && $scope.FollowOn == 1) {
            $scope.IInd_inn_score_diff = ($scope.IVth_inn_score.Runs - (0 - $scope.Ist_inn_score_diff));

        }
        CalTarget();
    }
    $scope.follow_on = function () {
        $scope.current_inn = ["1st", "2nd", "4th", "3rd"];
        $scope.FollowOn = 1;
        syncToLocalStorage();
    }
    $scope.wicket = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt) {
            $scope.wkt = $scope.wkt + 1;
            $scope.over_ball_sim();
            $scope.cal_crr();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.dot = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt) {
            $scope.runs = $scope.runs + 0;
            $scope.over_ball_sim();
            $scope.cal_crr();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.single = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt) {
            $scope.runs = $scope.runs + 1;
            $scope.over_ball_sim();
            $scope.cal_crr();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.double = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt) {
            $scope.runs = $scope.runs + 2;
            $scope.over_ball_sim();
            $scope.cal_crr();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.triple = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt) {
            $scope.runs = $scope.runs + 3;
            $scope.over_ball_sim();
            $scope.cal_crr();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.four = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt) {
            $scope.runs = $scope.runs + 4;
            $scope.over_ball_sim();
            $scope.cal_crr();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.five = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt) {
            $scope.runs = $scope.runs + 5;
            $scope.over_ball_sim();
            $scope.cal_crr();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.six = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt) {
            $scope.runs = $scope.runs + 6;
            $scope.over_ball_sim();
            $scope.cal_crr();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.B_four = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt) {
            $scope.Fours = $scope.Fours + 1;
            $scope.four();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.B_six = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt) {
            $scope.Six = $scope.Six + 1;
            $scope.six();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.wide = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt) {
            $scope.runs = $scope.runs + $scope.extra + 1;
            $scope.EXTRAS = $scope.EXTRAS + $scope.extra + 1;
            $scope.cal_crr();
            $scope.extra = 0;
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.no_ball = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt) {
            $scope.runs = $scope.runs + $scope.extra + 1;
            $scope.EXTRAS = $scope.EXTRAS + 1;
            $scope.cal_crr();
            $scope.extra = 0;
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.Nb4plus = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt) {
            $scope.runs = $scope.runs + 4 + 1;
            $scope.Fours = $scope.Fours + 1;
            $scope.EXTRAS = $scope.EXTRAS + 1;
            $scope.cal_crr();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.Nb6plus = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt) {
            $scope.runs = $scope.runs + 6 + 1;
            $scope.Six = $scope.Six + 1;
            $scope.EXTRAS = $scope.EXTRAS + 1;
            $scope.cal_crr();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.penalty = function () {
        $scope.runs = $scope.runs + 5;
        $scope.cal_crr();
    }
});