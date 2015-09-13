$(function() {
  $("#datepicker").datepicker({
    dateFormat: "yy-mm-dd",
    dayNames: ["日", "一", "二", "三", "四", "五", "六"]
  });

  $('.timepicker').timepicker({
    'scrollDefault': 'now',
    'timeFormat': 'H:i'
  })

  $("#add-wschedule").click(function() {
    var time = $("#wtime").val().replace(":", "");
    var action = $("#waction").val();
    var str = "#" + time + action;
    var text = $("#wtime").val() + " " + $("#waction option:selected").text()
    $("#wpreview").append($('<li>', {
      str: str,
      text: text
    }))
  })

  $("#woutput").click(function() {
    var list = $("#wpreview li");
    var str = "";
    list.each(function(index) {
      str += $(this).attr("str");
    });
    $("#water-mode").val(str);
    outputSchedule();
  })

  $("#wclear").click(function() {
    $("#wpreview li").remove();
    $("#water-mode").val("");
    outputSchedule();
  })

  $("#add-lschedule").click(function() {
    var time = $("#ltime").val().replace(":", "");
    var action = $("#laction").val();
    var str = "#" + time + action;
    var text = $("#ltime").val() + " " + $("#laction option:selected").text()
    $("#lpreview").append($('<li>', {
      str: str,
      text: text
    }))
  })

  $("#loutput").click(function() {
    var list = $("#lpreview li");
    var str = "";
    list.each(function(index) {
      str += $(this).attr("str");
    });
    $("#light-mode").val(str);
    outputSchedule();
  })

  $("#lclear").click(function() {
    $("#lpreview li").remove();
    $("#light-mode").val("");
    outputSchedule();
  })

  $("#soak").change(outputSchedule);
  $("#chwater").change(outputSchedule);
  $("#water-during").change(outputSchedule);
  $("#water-mode").change(outputSchedule);
  $("#light-during").change(outputSchedule);
  $("#light-mode").change(outputSchedule);


  $.ajax({
    url: "php/get_schedules.php",
    type: "get",
    dataType: 'json',
    success: function(data) {
      data.forEach(function (d) {
        var descript = d.description === null ? "無描述" : d.description;
        var schedule = d.value;
        var tr = "<tr><td>" + descript + "</td><td>" + schedule + "</td><tr>";
        $("#history-table").append(tr);
      })
    },
    error: function(xhr, ajaxOptions, thrownError) {
      alert(thrownError);
    }
  });
});

function outputSchedule() {
  var soak = $("#soak").val();
  var chwater = $("#chwater").val();
  var wd = $("#water-during").val();
  var wm = $("#water-mode").val();
  var ld = $("#light-during").val();
  var lm = $("#light-mode").val();
  var str = soak + "," + chwater + "," + wd + "," + wm + "," + ld + "," + lm;
  $("#result").val(str);
}

function updateSchedule(startTime, endTime) {
  var str = $("#result").val();
  url = "php/update_schedule.php";
  //console.log(url);
  //console.log(str);
  $.ajaxSetup({
    cache: false
  });
  $.ajax({
    url: url,
    type: "post",
    data: {
      schedule: str
    },
    dataType: 'json',
    success: function() {

    },
    error: function(xhr, ajaxOptions, thrownError) {
      alert(thrownError);
      alert(this.data);
    }
  });
}
