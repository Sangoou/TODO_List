window.onload = function(){
  function alarm(){
    //현재시간
    var curDate = new Date();
    var tmp = document.getElementById('date2');
    var index = 2;

    while(tmp != undefined){
      if(document.getElementById('isComlete'+index).textContent == "true"){
        document.getElementById('row'+index).classList.add("table-success");
        index = index + 2;
        tmp = document.getElementById('date' + index);
        continue;
      }
      if(!tmp.textContent){
        index = index + 2;
        tmp = document.getElementById('date' + index);
        continue;
      }
      var alarmTime = new Date(tmp.textContent);
      var diff = (alarmTime - curDate) / 60000;
      if(diff >= -1 && diff < 1 && document.getElementById('alarm'+index).textContent == 'false'){
        text = "알림!\n" + document.getElementById('title'+index).textContent;
        document.getElementById('alarm_list').value = index;
        document.getElementById('alarm').submit();
        alert(text);
      }
      if(diff >= 0 && diff < 5){
        document.getElementById('row'+index).classList.add("table-warning");
      }
      else if(diff < 0){
        document.getElementById('row'+index).classList.add("table-danger");
      }
      index = index + 2;
      tmp = document.getElementById('date' + index);
    }
  }
  alarm()
  setInterval(alarm, 15000);
}

function list_move(work) {
  index = 2;
  list = [];
  check = document.getElementById('check' + index);
  while (check != undefined) {
    if (check.checked) {
      list.push(index);
    }
    index = index + 2;
    check = document.getElementById('check' + index);
  }
  if (work == "up") {
    limit = 2;
    while (list.indexOf(limit) != -1) {
      list.splice(list.indexOf(limit), 1);
      limit = limit + 2;
    }
  } else if (work == "down") {
    limit = index - 2;
    while (list.indexOf(limit) != -1) {
      list.splice(list.indexOf(limit), 1);
      limit = limit - 2;
    }
  }
  document.getElementById('check_list').value = list;
  document.getElementById('button_work').value = work;
  document.getElementById('move').submit();
}

function list_modify() {
  document.getElementById('modify').setAttribute("disabled", "");
  title = document.getElementById('title').value;
  content = document.getElementById('content').value;

  if (title.length < 1) {
    alert("제목을 입력해 주세요!");
  } else if (content.length < 1) {
    alert("내용을 입력해 주세요!");
  } else {
    document.getElementById('input').submit();
  }
}

function list_add() {
  title = document.getElementById('title').value;
  content = document.getElementById('content').value;

  if (title.length < 1) {
    alert("제목을 입력해 주세요!");
  } else if (content.length < 1) {
    alert("내용을 입력해 주세요!");
  } else {
    document.getElementById('index').value = -1;
    document.getElementById('input').submit();
  }
}

function list_complete(src) {
  rowIndex = src.id.split("te")[1];
  document.getElementById('complete_row').value = rowIndex * 1;
  document.getElementById('complete').submit();
}

function show_detail(row) {
  document.getElementById('modify').removeAttribute("disabled", "")
  rowIndex = row.id.split("w")[1];
  document.getElementById('title').value = document.getElementById("title" + rowIndex).textContent;
  document.getElementById('content').value = document.getElementById("content" + rowIndex).textContent;
  document.getElementById('date').value = document.getElementById("date" + rowIndex).textContent
  document.getElementById('index').value = rowIndex * 1;
}

function check_all(box){
  index = 2;
  check = document.getElementById('check' + index);
  while (check != undefined) {
    check.checked = box.checked;
    index = index + 2;
    check = document.getElementById('check' + index);
  }
}
