var timeString = [],
    temperatureString = [],
    humidityString = [];
var time = timeString,
    temperature = temperatureString.map(Number),
    humidity = humidityString.map(Number);
var dataset;
var totalPoints = 25;
var updateInterval = 60000*60;
var now = new Date().getTime();

var options = {
  series: {
    lines: {
      show: true,
      lineWidth: 1.2
    },
    points: {
      radius: 3,
      show: true
    }
  },

  xaxis: {
    mode: "time",
    tickSize: [1, "hour"],
    tickFormatter: function (v, axis) { //help
      var date = new Date(v);

      if (date.getHours() % 3 == 0) {
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

        return hours + ":" + minutes + ":" + seconds;
      } else {
        return "";
      }
    },
    axisLabel: "時間",
    axisLabelUseCanvas: true,
    axisLabelFontSizePixels: 12,
    axisLabelColour: '#777',
    axisLabelPadding: 10,
    font: {
      size: 16,
      color: "white"
    }
  },

  yaxes: [
    {
      min: 0,
      max: 50,
      tickSize: 5,
      tickFormatter: function (v, axis) {
        if (v % 5 == 0) {
          return v + " °C";
        } else {
          return "";
        }
      },
      axisLabel: "溫度",
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelColour: '#777',
      axisLabelPadding: 6,
      font: {
        size: 16,
        color: "white"
      }
    },
    {
      min: 0,
      max: 100,
      tickSize: 5,
      tickFormatter: function (v, axis) {
        if (v % 5 == 0) {
          return v + " %";
        } else {
          return "";
        }
      },
      position: "right",
      axisLabel: "濕度",
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelColour: '#777',
      axisLabelPadding: 6,
      font: {
        size: 16,
        color: "white"
      }
    }
  ],

  grid: {
    backgroundColor: {
      colors: ["#ffffff", "#EDF5FF"]
    }
  }
};

function initialData() {
  for (var i = 0; i < totalPoints; i++) {
    var temp = [now += updateInterval, 0]; //help

    //time.push(temp);
    temperature.push(temp);
    humidity.push(temp);
  }
}

function GetData(startTime,endTime) {
  url = "php/get_single_data.php?mode=sensors&start="+startTime+"&end="+endTime;
  console.log(url);
  $.ajaxSetup({
    cache: false
  });
  $.ajax({
    url: url,
    type: "get",
    dataType: 'json',
    success: update,
    error: function (xhr, ajaxOptions, thrownError) {
      alert(thrownError);
    }
  });
}

var temp;

function update(_data) {
  //					time.shift();
  // temperature.shift();
  // humidity.shift();

  // now += updateInterval
  //
  // temp = [now, _data.temperature];
  // temperature.push(temp);
  // temp = [now, _data.humid];
  // humidity.push(temp);
  console.log(_data);
  for (var i = 0; i < totalPoints; i++) {
    temperature.shift();
    humidity.shift();
    if(typeof _data[i*60] == "undefined"){
      temp = [temperature[22][0]+(60*60*1000), 0];
      temperature.push(temp);
      temp = [humidity[22][0]+(60*60*1000), 0];
      humidity.push(temp);
      continue;
    }

    temp = [_data[i*60].time*1000, _data[i*60].temperature];
    temperature.push(temp);
    temp = [_data[i*60].time*1000, _data[i*60].humid];
    humidity.push(temp);
  }

  dataset = [
    {
      label: "溫度°C",
      data: temperature,
      lines: {
        fill: true,
        linewidth: 1.2
      },
      color: "#FF9933",
      yaxis: 1
    },
    {
      label: "濕度%",
      data: humidity,
      lines: {
        fill: true,
        linewidth: 1.2
      },
      color: "#00CCFF",
      yaxis: 2
    }
  ];


  $.plot($("#tempAndHumiPlot"), dataset, options);
  //setTimeout(GetData, updateInterval);
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

$(document).ready(function () {
  initialData();
  dataset = [
    {
      label: "溫度",
      data: temperature,
      lines: {
        fill: true,
        linewidth: 1.2
      },
      color: "#FF9933",
      yaxis: 1
    },
    {
      label: "濕度",
      data: humidity,
      lines: {
        fill: true,
        linewidth: 1.2
      },
      color: "#00CCFF",
      yaxis: 2
    }
  ];
  $.plot($("#tempAndHumiPlot"), dataset, options);

  date = getUrlParameter('date');
  startTime = (date === "" || typeof date === "undefined") ? "2015-08-19" : date;
  $("#datepicker").val(startTime);
  console.log(startTime);
  startTime = Date.parse(startTime)/1000;
  endTime = startTime + (25*60*60);
  GetData(startTime, endTime);
});
