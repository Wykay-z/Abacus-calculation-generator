
var kouNumEl = $("#kouNum");
var jiajianEl = $("#jiajian");
var btn = $("#btn");
var numStage = $("#num-stage");
var result = $("#result");

var selectOptions = $(".select-option");
function Selection(el) {
    var _this = this;
    this.input = el.find(".select");
    this.option = el.find(".select-option");
    this.input.click(function(e) {
        e.stopPropagation();
        selectOptions.hide();
        console.log(this);
        _this.option.show();
    })
    this.option.click(function(e) {
        e.stopPropagation();
        var liEl = $(e.target);
        _this.input.html(liEl.html());
        _this.input.data('value', liEl.data('value'));
        _this.option.hide();
    })
}
Selection.prototype.getData = function() {
    return this.input.data('value');
}

$(document).click(function(){
    selectOptions.hide();
})

var speedSelect = new Selection($("#speed"));
var levelSelect = new Selection($("#level"));
var modeSelect = new Selection($("#mode"));


var interval;
btn.click(function() {
    clearInterval(interval);
	result.html("");
    numStage.html("");
	var speed = speedSelect.getData();
	var level = levelSelect.getData();
	var kouNum = parseInt(kouNumEl.val()) || 10;
	var hasMinus = jiajianEl.is(":checked");
	// console.log(speed, level, kouNum, jiajian);
	// showNums(speed, level, kouNum, hasMinus);
	generateNums(speed, level, kouNum, hasMinus);
})

function generateNums(speed, level, kouNum, hasMinus) {
    var arr = [];
    var sum = 0;
    var count = kouNum;
    var maxNum;
    if(level == 1){
        maxNum = 9;
    } else if (level == 2) {
        maxNum = 90;
    } else if (level == 3){
        maxNum = 900;
    } else {
        maxNum = 900;
    }
    for (var i = 0; i < count * 2 - 1; i++) {
        if (i % 2 == 0) {
            //生成数字
            var num;
            if (arr.length >= 1 && arr[arr.length - 1] == "-") {
                num = Math.ceil(Math.random() * (sum - 1));
                if(sum>=maxNum){
                    num = Math.ceil(Math.random() * maxNum);
                }
                if(num==0){
                    arr[arr.length-1] = "+";
                    num = 5;
                }
            } else {
                num = Math.ceil(Math.random() * maxNum);
            }
//            console.log(num);
            arr.push(num);
            // 运算当前结果
            if (i == 0) {
                sum += num;
            } else {
                sum += Number(arr[arr.length - 2] + arr[arr.length - 1]);
            }
        } else {
            //生成运算符
            if (hasMinus) {
                var operator = Math.floor(Math.random() * 2.5) == 0 ? "-" : "+";
            } else {
                var operator = "+";
            }
//            console.log(operator);
            arr.push(operator);
        }
    }

    // console.log(sum);
    // console.log(arr);
    var result = arr.join(" ");
    var result2 = result + " = " + sum;
    // console.log(result);
    console.log(result2);

    showNums(speed, kouNum, arr, sum, result2);
}

function showNums(speed, kouNum, arr, sum, result2) {
    var newArr = [];
    for( var j = 0; j < kouNum; j++) {
        if (j === 0) {
            newArr.push(arr[0]);
        } else {
            newArr.push((arr[j*2-1] === "+") ? arr[j*2] : "-" + arr[j*2]);
        }
    }
    var i = 0;
    interval = setInterval(function(){
        if (i < kouNum) {
            numStage.html(newArr[i]);
            i++;
        } else {
            finish(speed, sum, result2, kouNum);
            clearInterval(interval);
        }
    }, speed*1000)
}

function finish(speed, sum, result2, kouNum) {
	setTimeout(function(){
		numStage.html("<span style='color:black'>" + sum + "</span>");
		result.html(result2);
	}, speed*2000);
}
