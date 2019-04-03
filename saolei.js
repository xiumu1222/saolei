//初始化扫雷地图
var objArr = [];
let nnnnn = 0;
function init() {
  var ranArr = [];
  for (var i = 1; ranArr.length < 100; i++) {
    let num = getRam(900);
    if (ranArr.indexOf(num) < 0) {
      ranArr.push(num);
    }
  }
  for (var i = 1; i < 900 + 1; i++) {
    var areaArr = areaArrHandle(i);
    var resNum = 0;
    for (var j = 0; j < areaArr.length; j++) {
      ranArr.indexOf(areaArr[j]) > -1 && resNum++;
    }
    var obj = {
      id: i,
      lei: ranArr.indexOf(i) > -1,
      none: resNum == 0,
      styleNone: true,
      resNum: resNum,
      isClick: false
    };
    objArr.push(obj);
  }
  xuanran();
}
//渲染
function xuanran() {
  var htmlStr = '';
  for (var i = 0; i < objArr.length; i++) {
    htmlStr += `<div id="${objArr[i].id}" class="none-item ${
      objArr[i].lei ? 'lei' : ''
    } ${objArr[i].none ? 'none' : ''} ${
      objArr[i].styleNone ? 'style-none' : ''
    }" onclick=itemClickHandle(${objArr[i].id}) oncontextmenu=fff(event,this)>${
      objArr[i].isClick && objArr[i].resNum > 0 ? objArr[i].resNum : ''
    }</div>`;
  }
  var box = document.getElementById('saolei_box');
  box.innerHTML = htmlStr;
}
//获取随机数
function getRam(x) {
  var r = Math.random();
  return Math.ceil(r * x);
}
//点击事件
function itemClickHandle(id) {
  itemClickFor(id);
  xuanran();
}

//鼠标右键点击事件
function fff(e,t){
  e.preventDefault()
  objArr[t.getAttribute('id')-1].signLei = true
}

function areaArrHandle(i) {
  var lt = i - 31,
    t = i - 30,
    rt = i - 29,
    l = i - 1,
    r = i + 1,
    lb = i + 29,
    b = i + 30,
    rb = i + 31,
    areaArr = [lt, t, rt, l, r, lb, b, rb];
  if (i % 30 == 1) {
    areaArr = [t, b, rt, r, rb];
  }
  if (i % 30 == 0) {
    areaArr = [t, b, lt, l, lb];
  }
  if (i <= 30) {
    areaArr = [l, r, lb, b, rb];
  }
  if (i >= 871) {
    areaArr = [l, r, lt, t, rt];
  }
  if (i == 1) {
    areaArr = [b, rb, r];
  }
  if (i == 30) {
    areaArr = [l, lb, b];
  }
  if (i == 871) {
    areaArr = [t, rt, r];
  }
  if (i == 900) {
    areaArr = [l, lt, t];
  }
  return areaArr;
}
function itemClickFor(id) {
  var item = objArr[id - 1];
  if (item.isClick) {
    return;
  }
  item.styleNone = false;
  item.isClick = true;
  if (item.resNum == 0) {
    var arr = [];
    arr = areaArrHandle(item.id)
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > 0 && arr[i] <= 900) {
        itemClickFor(arr[i]);
      }
    }
  }
}

init();
