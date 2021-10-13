var output = document.getElementById("output");
var input = document.getElementById("input");
var dataA = [],
  dataB = []; //输入数据
var angleDataA = [],
  angleDataB = []; //角度数据
var modeOption = { number: "number", angle: "angle" }; //模式选项
var mode = "number"; //模式
var digit = 0; //位数
var symbol = {
  interval: "/",
  group: "),",
  jiaodu: ".",
  jiaofen: ".",
  jiaomiao: ".",
}; //间隔和分割符号和角度分割符
var optionZCF = document.getElementById("option-the-method-of-successional-difference");
var optionZXXJ = document.getElementById("option-item-by-item-sub");
var optionALBQDD = document.getElementById("option-a-class-uncertainty");
var optionSub = document.getElementById("option-sub");
var optionAdd = document.getElementById("option-add");
var optionPF = document.getElementById("option-square");
var optionAVG = document.getElementById("avg");
var optionSin = document.getElementById("sin");
var optionCos = document.getElementById("cos");
//添加监听
output.addEventListener("click", function () {
  this.setSelectionRange(0, this.value.length); //点击全选
});
optionZCF.addEventListener("click", zcf);
optionZXXJ.addEventListener("click", zxxj);
optionALBQDD.addEventListener("click", albqdd);
optionSub.addEventListener("click", sub);
optionAdd.addEventListener("click", adds);
optionPF.addEventListener("click", square);
optionAVG.addEventListener("click", avgs);
optionSin.addEventListener("click", sinAngle);
optionCos.addEventListener("click", cosAngle);
//输入
function inputData() {
  digit = 0; //重置小数位数
  var input = document.getElementById("input");
  var strInput = input.value.replace(/\（/g, "(").replace(/\）/g, ")").replace(/，/g, ","); //替换为英文括号，逗号
  strInput = strInput.replace(/ /g, "").replace(/\n/g, ""); //删除空格和换行符
  var strData1, strData2;
  angleDataA = [];
  angleDataB = [];
  /*判断数据是否符合格式*/
  if (strInput == "") {
    alert("请输入数据后重试。");
    return false;
  }
  //数字模式
  if (strInput[0] === "(" && strInput[strInput.length - 1] === ")") {
    mode = modeOption.number;
    if (strInput.match(/\//g) == null) {
      alert("数据格式有误。请检查数据格式后再试。");
      return false;
    }
    if (
      /*如果输入的是两组数据，则分开两组数据*/
      strInput.match(/\),/) != null
    ) {
      if (strInput.match(/\),/g).length > 1) {
        alert("您输入的数据大于2组，请检查数据后重试");
        return false;
      }
      strData1 = strInput.substring(1, strInput.indexOf(symbol.group));
      strData2 = strInput.substring(strInput.indexOf(symbol.group) + 3, strInput.length - 1);
      if (strData1.match(/\//g) == null || strData2.match(/\//g) == null) {
        alert("数据格式有误。请检查数据格式后再试。");
        return false;
      }
      if (strData1.match(/\//g).length != strData2.match(/\//g).length) {
        alert("两组数据长度不相等，请检查数据后再试");
        return false;
      }
      dataA = strData1.split(symbol.interval);
      dataB = strData2.split(symbol.interval);
      for (let i = 0; i < dataA.length; i++) {
        if (isNumber(dataA[i]) === false || isNumber(dataB[i]) === false) {
          alert("数据不能为非数字，请检查数据后再试");
          return false;
        } else {
          //找到最大小数位数
          if (dataA[i].indexOf(".") != -1 || dataB[i].indexOf(".") != -1) {
            digit = digit > dataA[i].length - 1 - dataA[i].indexOf(".") ? digit : dataA[i].length - 1 - dataA[i].indexOf(".");
            digit = digit > dataB[i].length - 1 - dataB[i].indexOf(".") ? digit : dataB[i].length - 1 - dataB[i].indexOf(".");
          }
          //转换成数字
          dataA[i] = parseFloat(dataA[i]);
          dataB[i] = parseFloat(dataB[i]);
        }
      }
    } else {
      /*一组数据直接处理*/
      strData1 = strInput.substring(1, strInput.length - 1);
      //判断数据是否含有字母
      //分立开数据，并转换为数字
      dataA = strData1.split(symbol.interval);
      for (let i = 0; i < dataA.length; i++) {
        if (isNumber(dataA[i]) === false) {
          alert("数据不能为非数字，请检查数据后再试");
          return false;
        } else {
          //找到最大小数位数
          if (dataA[i].indexOf(".") != -1) {
            digit = digit > dataA[i].length - 1 - dataA[i].indexOf(".") ? digit : dataA[i].length - 1 - dataA[i].indexOf(".");
          }
          //转换成数字
          dataA[i] = parseFloat(dataA[i]);
        }
      }
      strData2 = null;
      dataB = null;
    }
    return true;
  } else if (strInput[strInput.length - 1] === "。") {
    //角度输入模式
    mode = modeOption.angle;
    if (strInput.match(/\//g) == null) {
      alert("数据格式有误。请检查数据格式后再试。");
      return false;
    }
    /*如果输入的是两组数据，则分开两组数据*/
    if (strInput.match(/\),/) != null) {
      if (strInput.match(/\),/g).length > 1) {
        alert("您输入的数据大于2组，请检查数据后重试");
        return false;
      }
      strData1 = strInput.substring(1, strInput.indexOf(symbol.group));
      strData2 = strInput.substring(strInput.indexOf(symbol.group) + 3, strInput.length - 2); //-2把句号消去
      if (strData1.match(/\//g) == null || strData2.match(/\//g) == null) {
        alert("数据格式有误。请检查数据格式后再试。");
        return false;
      }
      if (strData1.match(/\//g).length != strData2.match(/\//g).length) {
        alert("两组数据长度不相等，请检查数据后再试");
        return false;
      }
      dataA = strData1.split(symbol.interval);
      dataB = strData2.split(symbol.interval);
      for (let i = 0; i < dataA.length; i++) {
        angleDataA[i] = dataA[i].split(symbol.jiaodu);
        angleDataB[i] = dataB[i].split(symbol.jiaodu);

        //当角度输入格式正确后以后会用
        /*
            angleDataA[i][0] = dataA[i].substring(0, dataA[i].indexOf(symbol.jiaodu));
            angleDataA[i][1] = dataA[i].substring(dataA[i].indexOf(symbol.jiaodu), dataA[i].indexOf(symbol.jiaofen));
            angleDataA[i][2] = dataA[i].substring(dataA[i].indexOf(symbol.jiaofen), dataA[i].indexOf(symbol.jiaomiao));
            angleDataB[i][0] = dataB[i].substring(0, dataB[i].indexOf(symbol.jiaodu));
            angleDataB[i][1] = dataB[i].substring(dataB[i].indexOf(symbol.jiaodu), dataB[i].indexOf(symbol.jiaofen));
            angleDataB[i][2] = dataB[i].substring(dataB[i].indexOf(symbol.jiaofen), dataB[i].indexOf(symbol.jiaomiao));
            */
        for (let j = 0; j < 3; j++) {
          angleDataA[i][j] = angleDataA[i][j];
          angleDataB[i][j] = angleDataB[i][j];
          //如果不存在，则赋值为0
          if (angleDataA[i][j] == null) {
            angleDataA[i][j] = 0;
          }
          if (angleDataB[i][j] == null) {
            angleDataB[i][j] = 0;
          }
          //原本想把上面两个if换成冒号表达式，但发现有问题，无奈，只能写上面的两个if
          //angleDataA[i][j] = angleDataA == null ? 0 : angleDataA[i][j];
          //angleDataB[i][j] = angleDataB == null ? 0 : angleDataB[i][j];
          if (isNumber(angleDataA[i][j]) === false || isNumber(angleDataB[i][j]) === false) {
            alert("数据不能为非数字，请检查数据后再试");
            return false;
          } else {
            angleDataA[i][j] = parseInt(angleDataA[i][j]);
            angleDataB[i][j] = parseInt(angleDataB[i][j]);
          }
        }
      }
    } else {
      //单组数据
      strData1 = strInput.substring(1, strInput.length - 2);
      dataA = strData1.split(symbol.interval);
      for (let i = 0; i < dataA.length; i++) {
        angleDataA[i] = dataA[i].split(symbol.jiaodu);
        //当角度输入格式正确后以后会用
        /*
            angleDataA[i][0] = dataA[i].substring(0, dataA[i].indexOf(symbol.jiaodu));
            angleDataA[i][1] = dataA[i].substring(dataA[i].indexOf(symbol.jiaodu), dataA[i].indexOf(symbol.jiaofen));
            angleDataA[i][2] = dataA[i].substring(dataA[i].indexOf(symbol.jiaofen), dataA[i].indexOf(symbol.jiaomiao));
            */
        for (let j = 0; j < 3; j++) {
          angleDataA[i][j] = angleDataA[i][j];
          //如果不存在，则赋值为0
          if (angleDataA[i][j] == null) {
            angleDataA[i][j] = 0;
          }
          if (isNumber(angleDataA[i][j]) === false) {
            alert("数据不能为非数字，请检查数据后再试");
            return false;
          } else {
            angleDataA[i][j] = parseInt(angleDataA[i][j]);
          }
        }
      }
      for (let i = 0; i < angleDataA.length; i++) {}
      strData2 = null;
      angleDataB = null;
    }
    return true;
  } else {
    alert("数据格式有误。请检查数据格式后再试。");
    return false;
  }
}
//功能函数
//逐差法处理
function zcf() {
  var result1 = [],
    result2 = [];
  if (inputData()) {
    if (mode == modeOption.number) {
      if (dataA.length % 2 != 0) {
        alert("数据长度不为偶数，无法用逐差法处理，请检查数据后重试。");
      } else if (dataB != null) {
        //逐差法处理
        for (let i = 0; i < dataA.length / 2; i++) {
          result1[i] = ((dataA[i + dataA.length / 2] - dataA[i]) / (dataA.length / 2)).toFixed(digit);
          result2[i] = ((dataB[i + dataB.length / 2] - dataB[i]) / (dataB.length / 2)).toFixed(digit);
        }
        output.value = numArr2str(result1).concat(",  ", numArr2str(result2));
      } else {
        //逐差法处理
        for (let i = 0; i < dataA.length / 2; i++) {
          result1[i] = ((dataA[i + dataA.length / 2] - dataA[i]) / (dataA.length / 2)).toFixed(digit);
        }
        output.value = numArr2str(result1);
      }
    }
    if (mode == modeOption.angle) {
      if (angleDataA.length % 2 != 0) {
        alert("数据长度不为偶数，无法用逐差法处理，请检查数据后重试。");
      } else if (angleDataB != null) {
        for (let i = 0; i < angleDataA.length / 2; i++) {
          result1[i] = angleDivideNum(angleSub(angleDataA[i + angleDataA.length / 2], angleDataA[i]), angleDataA.length / 2);
          result2[i] = angleDivideNum(angleSub(angleDataB[i + angleDataB.length / 2], angleDataB[i]), angleDataB.length / 2);
        }
        output.value = angles2str(result1).concat(",", angles2str(result2), "。");
      } else {
        for (let i = 0; i < angleDataA.length / 2; i++) {
          result1[i] = angleDivideNum(angleSub(angleDataA[i + angleDataA.length / 2], angleDataA[i]), angleDataA.length / 2);
        }
        output.value = angles2str(result1).concat("。");
      }
    }
  }
}
//逐项相减
function zxxj() {
  var result1 = [],
    result2 = [];
  if (inputData()) {
    if (mode == modeOption.number) {
      if (dataB != null) {
        for (let i = 0; i < dataA.length - 1; i++) {
          result1[i] = (dataA[i + 1] - dataA[i]).toFixed(digit);
          result2[i] = (dataB[i + 1] - dataB[i]).toFixed(digit);
        }
        output.value = numArr2str(result1).concat(",", numArr2str(result2));
      } else {
        for (let i = 0; i < dataA.length - 1; i++) {
          result1[i] = (dataA[i + 1] - dataA[i]).toFixed(digit);
        }
        output.value = numArr2str(result1);
      }
    }
    if (mode == modeOption.angle) {
      if (angleDataB != null) {
        for (let i = 0; i < angleDataA.length - 1; i++) {
          result1[i] = angleSub(angleDataA[i + 1], angleDataA[i]);
          result2[i] = angleSub(angleDataB[i + 1], angleDataB[i]);
        }
        output.value = angles2str(result1).concat(",", angles2str(result2), "。");
      } else {
        for (let i = 0; i < angleDataA.length - 1; i++) {
          result1[i] = angleSub(angleDataA[i + 1], angleDataA[i]);
        }
        output.value = angles2str(result1).concat("。");
      }
    }
  }
}
//A类不确定度
function albqdd() {
  //分子和分母
  var molecule1 = 0,
    molecule2 = 0,
    denominator1 = 0,
    denominator2 = 0;
  if (inputData()) {
    var avg1 = avg(dataA);
    if (mode == modeOption.number) {
      if (dataB != null) {
        var avg2 = avg(dataB);
        denominator1 = (dataA.length - 1) * dataA.length;
        denominator2 = (dataA.length - 1) * dataA.length;
        for (let i = 0; i < dataA.length; i++) {
          molecule1 += Math.pow(dataA[i] - avg1, 2);
          molecule2 += Math.pow(dataB[i] - avg2, 2);
        }
        output.value =
          "(" +
          Math.sqrt(molecule1 / denominator1).toFixed(digit) +
          "),(" +
          Math.sqrt(molecule2 / denominator2).toFixed(digit) +
          ")";
      } else {
        denominator1 = (dataA.length - 1) * dataA.length;
        for (let i = 0; i < dataA.length; i++) {
          molecule1 += Math.pow(dataA[i] - avg1, 2);
        }
        output.value = "(" + Math.sqrt(molecule1 / denominator1).toFixed(digit) + ")";
      }
    }
    if (mode == modeOption.angle) {
      output.value = "A类不确定度不支持角度运算。";
    }
  }
}
//相减
function sub() {
  if (inputData()) {
    if (mode == modeOption.number) {
      if (dataB != null) {
        let result = [];
        for (let i = 0; i < dataA.length; i++) {
          result[i] = (dataA[i] - dataB[i]).toFixed(digit);
        }
        output.value = numArr2str(result);
      } else {
        alert("只有一组数据无法进行相减，请检查数据后重试。");
      }
    }

    if (mode == modeOption.angle) {
      if (angleDataB != null) {
        let result = [];
        for (let i = 0; i < angleDataA.length; i++) {
          result[i] = angleSub(angleDataA[i], angleDataB[i]);
        }
        output.value = angles2str(result).concat("。");
      } else {
        alert("只有一组数据无法进行相减，请检查数据后重试。");
      }
    }
  }
}
//相加
function adds() {
  if (inputData()) {
    if (mode == modeOption.number) {
      if (dataB != null) {
        let result = [];
        for (let i = 0; i < dataA.length; i++) {
          result[i] = (dataA[i] + dataB[i]).toFixed(digit);
        }
        output.value = numArr2str(result);
      } else {
        alert("只有一组数据无法进行相减，请检查数据后重试。");
      }
    }

    if (mode == modeOption.angle) {
      if (angleDataB != null) {
        let result = [];
        for (let i = 0; i < angleDataA.length; i++) {
          result[i] = angleAdd(angleDataA[i], angleDataB[i]);
        }
        output.value = angles2str(result).concat("。");
      } else {
        alert("只有一组数据无法进行相减，请检查数据后重试。");
      }
    }
  }
}
//平方
function square() {
  if (inputData()) {
    if (mode == modeOption.number) {
      if (dataB != null) {
        for (let i = 0; i < dataA.length; i++) {
          dataA[i] = (dataA[i] ** 2).toFixed(digit * 2);
          dataB[i] = (dataB[i] ** 2).toFixed(digit * 2);
        }
        output.value = numArr2str(dataA) + "," + numArr2str(dataB);
      } else {
        for (let i = 0; i < dataA.length; i++) {
          dataA[i] = (dataA[i] ** 2).toFixed(digit);
        }
        output.value = numArr2str(dataA);
      }
    }
    if (mode == modeOption.angle) {
      output.value = "暂不支持角度的平方运算。";
    }
  }
}
//求平均值
function avgs() {
  if (inputData()) {
    if (mode == modeOption.number) {
      if (dataB != null) {
        output.value = "(" + avg(dataA).toString().concat("),(", avg(dataB)) + ")";
      } else {
        output.value = "(" + avg(dataA).toString() + ")";
      }
    }
    if (mode == modeOption.angle) {
      if (angleDataB != null) {
        output.value = "(" + angle2str(angleAvg(angleDataA)).concat("),(", angle2str(angleAvg(angleDataB)), ")", "。");
      } else {
        output.value = "(" + angle2str(angleAvg(angleDataA)) + ")" + "。";
      }
    }
  }
}
//sin（角度）
function sinAngle() {
  let result1 = [],
    result2 = [];
  if (inputData()) {
    var angleDegree1 = [],
      angleDegree2 = [];
    if (mode == modeOption.angle) {
      if (angleDataB != null) {
        for (let i = 0; i < angleDataA.length; i++) {
          result1[i] = Math.sin(angle2degree(angleDataA[i]) * (Math.PI / 180)).toFixed(5);
          result2[i] = Math.sin(angle2degree(angleDataB[i]) * (Math.PI / 180)).toFixed(5);
        }
        output.value = numArr2str(result1).concat(",", numArr2str(result2));
      } else {
        for (let i = 0; i < angleDataA.length; i++) {
          result1[i] = Math.sin(angle2degree(angleDataA[i]) * (Math.PI / 180)).toFixed(5);
        }
        output.value = numArr2str(result1);
      }
    }
    if (mode == modeOption.number) {
      output.value = "您的数据不是角度格式，不支持正弦运算，请检查数据后重试。";
    }
  }
}
//cos（角度）
function cosAngle() {
  let result1 = [],
    result2 = [];
  if (inputData()) {
    var angleDegree1 = [],
      angleDegree2 = [];
    if (mode == modeOption.angle) {
      if (angleDataB != null) {
        for (let i = 0; i < angleDataA.length; i++) {
          result1[i] = Math.cos(angle2degree(angleDataA[i]) * (Math.PI / 180)).toFixed(5);
          result2[i] = Math.cos(angle2degree(angleDataB[i]) * (Math.PI / 180)).toFixed(5);
        }
        output.value = numArr2str(result1).concat(",", numArr2str(result2));
      } else {
        for (let i = 0; i < angleDataA.length; i++) {
          result1[i] = Math.cos(angle2degree(angleDataA[i]) * (Math.PI / 180)).toFixed(5);
        }
        output.value = numArr2str(result1);
      }
    }
    if (mode == modeOption.number) {
      output.value = "您的数据不是角度格式，不支持余弦运算，请检查数据后重试。";
    }
  }
}
//角度转成度格式
function angle2degree(angle) {
  let degree = 0;
  for (let j = 0; j < angle.length; j++) {
    if (j == 0) {
      degree = angle[j];
    }
    if (j == 1) {
      degree += angle[j] / 60;
    }
    if (j == 2) {
      degree += angle[j] / 3600;
    }
  }
  return degree;
}
//度转换成角度格式
function degree2angle(degree) {
  let angle = [0, 0, 0];
  let intNum = [],
    decimal = [];
  let degreeStr = degree.toString();
  //提取整数和小数
  for (let i = 0, j = 0, mode = "int"; i < degreeStr.length; i++) {
    if (degreeStr[i] != "." && mode == "int") {
      intNum[i] = Number(degreeStr[i]);
    }
    if (degreeStr[i] == ".") {
      mode = "decimal";
      j = 0;
    }
    if (degreeStr[i] != "." && mode == "decimal") {
      decimal[j] = Number(degreeStr[i]);
      j++;
    }
  }
  //整数部分
  for (let i = 0; i < intNum.length; i++) {
    angle[0] += intNum[i] * Math.pow(10, intNum.length - 1 - i);
  }
  //小数部分
  angle[1] += decimal[0] * 6;
  for (let i = 1; i < decimal.length; i++) {
    angle[2] += (decimal[i] * 36) / Math.pow(10, i - 1);
  }
  //进位
  for (let i = angle.length - 1; i > 0; i--) {
    angle[i - 1] += (angle[i] / 60) | 0;
    angle[i] = Number((angle[i] % 60).toFixed(10));
  }
  return angle;
}
//平均值
function avg(arrA) {
  let sum = 0;
  for (let i = 0; i < arrA.length; i++) {
    sum += arrA[i];
  }
  return sum / arrA.length;
}
//角度平均值
function angleAvg(angle) {
  let sum = [0, 0, 0];
  for (let i = 0; i < angle.length; i++) {
    sum = angleAdd(sum, angle[i]);
  }
  return angleDivideNum(sum, angle.length);
}
//将结果数组转换成固定格式
function numArr2str(numArr) {
  var str = "(";
  for (let i = 0; i < numArr.length; i++) {
    str = str.concat(numArr[i].toString());
    if (i != numArr.length - 1) {
      str = str.concat(symbol.interval, "  ");
    }
  }
  str = str.concat(")");
  return str;
}
//判断是否为数字
function isNumber(val) {
  if (parseFloat(val).toString() == "NaN") {
    return false;
  } else {
    return true;
  }
}
//角度相加
function angleAdd(angle1, angle2) {
  let result = [];
  for (let j = 0; j < angle1.length; j++) {
    result[j] = angle1[j] + angle2[j];
  }
  //进位
  for (let j = 0; j < angle1.length - 1; j++) {
    result[j] = result[j] + Math.trunc(result[j + 1] / 60);
    result[j + 1] = result[j + 1] % 60;
  }
  return result;
}
//角度相减
function angleSub(angle1, angle2) {
  let result = [];
  for (let j = 0; j < angle1.length; j++) {
    if (angle1[j + 1] - angle2[j + 1] < 0) {
      angle1[j]--;
      angle1[j + 1] += 60;
    }
    result[j] = angle1[j] - angle2[j];
  }
  //进位
  for (let j = 0; j < angle1.length - 1; j++) {
    result[j] = result[j] + Math.trunc(result[j + 1] / 60);
    result[j + 1] = result[j + 1] % 60;
  }
  return result;
}
//角度除以数字
function angleDivideNum(angle, num) {
  for (let j = 0; j < angle.length - 1; j++) {
    angle[j + 1] += (angle[j] % num) * 60; //先退位
    angle[j] = Math.trunc(angle[j] / num); //然后计算
  }
  angle[angle.length - 1] = Number((angle[angle.length - 1] / num).toFixed(2));
  return angle;
}
//多个角度结果转换成字符串
function angles2str(angles) {
  let resultStr = "(";
  for (let i = 0; i < angles.length; i++) {
    for (let j = 0; j < angles[i].length; j++) {
      resultStr = resultStr.concat(angles[i][j]);
      if (j != angles[i].length) {
        switch (j) {
          case 0: {
            resultStr = resultStr.concat(symbol.jiaodu);
            break;
          }
          case 1: {
            resultStr = resultStr.concat(symbol.jiaofen);
            break;
          }
          case 2: {
            resultStr = resultStr.concat(symbol.jiaomiao);
            break;
          }
        }
      }
    }
    if (i != angles.length - 1) {
      resultStr = resultStr.concat("/  ");
    }
  }
  resultStr = resultStr.concat(")");
  return resultStr;
}
//单个角度结果转换成字符串
function angle2str(angle) {
  let resultStr = "";
  for (let j = 0; j < angle.length; j++) {
    switch (j) {
      case 0: {
        resultStr = resultStr.concat(angle[j], symbol.jiaodu);
        break;
      }
      case 1: {
        resultStr = resultStr.concat(angle[j], symbol.jiaofen);
        break;
      }
      case 2: {
        resultStr = resultStr.concat(angle[j], symbol.jiaomiao);
        break;
      }
    }
  }
  return resultStr;
}
