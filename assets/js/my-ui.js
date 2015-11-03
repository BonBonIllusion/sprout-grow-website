$(function() {

  /*$("#dialog").dialog({buttons: {
        Next: function() {
            x++; // Increment counter
            $(this).text(x); // Build dialog based on new value
        }
      }
    });*/

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


  $("#update").click(updateSchedule);

  $.ajax({
    url: "php/get_schedules.php",
    type: "get",
    dataType: 'json',
    success: updateHistory,
    error: function(xhr, ajaxOptions, thrownError) {
      alert(thrownError);
    }
  });

});//document ready

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

function updateSchedule() {
  var str = $("#result").val();
  var descript = $("#descript").val();
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
      schedule: str,
      description: descript
    },
    dataType: 'json',
    success: updateHistory,
    error: function(xhr, ajaxOptions, thrownError) {
      alert(thrownError);
      alert(this.data);
    }
  });

}

function updateHistory(data) {
  $("#history-table").empty();
  data.forEach(function (d) {
    var descript = d.description === null ? "無描述" : d.description;
    var schedule = d.value;
    var tr = "<tr><td>" + descript + "</td><td>" + schedule + "</td><td><button class='modify'>讀取</button></td><tr>";
    $("#history-table").append(tr);
    $(".modify").click(function () {
      var str = $(this).parent().parent().children().get(1).innerHTML;

      var arr = str.split(",");
      var soak = arr[0];
      var chwater = arr[1];
      var wd = arr[2];
      var wm = arr[3];
      var ld = arr[4];
      var lm = arr[5];

      $("#soak").val(soak);
      $("#chwater").val(chwater);
      $("#water-during").val(wd);
      $("#water-mode").val(wm);
      $("#light-during").val(ld);
      $("#light-mode").val(lm);
      $("#result").val(str);
    });
  })
}
