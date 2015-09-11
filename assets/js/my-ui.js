
$(function() {
  $( "#datepicker" ).datepicker({
    dateFormat: "yy-mm-dd",
    dayNames: [ "日", "一", "二", "三", "四", "五", "六" ]
  });

  $('.timepicker').timepicker({
    'scrollDefault': 'now',
    'timeFormat': 'H:i'
  })

  $("#add-wschedule").click(function () {
    var time = $("#wtime").val().replace(":","");
    var action = $("#waction").val();
    var str = "#" + time + action;
    var text = $("#wtime").val() + " " + $("#waction option:selected").text()
    $("#wpreview").append($('<li>',{str: str, text: text}))
  })

  $("#woutput").click(function () {
    var list = $("#wpreview li");
    var str = "";
    list.each(function (index) {
      str += $(this).attr("str");
    });
    $("#water-mode").val(str);
    get_schedule();
  })

  $("#wclear").click(function () {
    $("#wpreview li").remove();
    $("#water-mode").val("");
    get_schedule();
  })

  $("#add-lschedule").click(function () {
    var time = $("#ltime").val().replace(":","");
    var action = $("#laction").val();
    var str = "#" + time + action;
    var text = $("#ltime").val() + " " + $("#laction option:selected").text()
    $("#lpreview").append($('<li>',{str: str, text: text}))
  })

  $("#loutput").click(function () {
    var list = $("#lpreview li");
    var str = "";
    list.each(function (index) {
      str += $(this).attr("str");
    });
    $("#light-mode").val(str);
    get_schedule();
  })

  $("#lclear").click(function () {
    $("#lpreview li").remove();
    $("#light-mode").val("");
    get_schedule();
  })

  $("#soak").change(get_schedule);
  $("#chwater").change(get_schedule);
  $("#water-during").change(get_schedule);
  $("#water-mode").change(get_schedule);
  $("#light-during").change(get_schedule);
  $("#light-mode").change(get_schedule);
});

function get_schedule() {
  var soak = $("#soak").val();
  var chwater = $("#chwater").val();
  var wd = $("#water-during").val();
  var wm = $("#water-mode").val();
  var ld = $("#light-during").val();
  var lm = $("#light-mode").val();
  var str = soak + "," + chwater + "," + wd + "," + wm + "," + ld + "," + lm;
  console.log(str);
  $("#result").val(str);
}
