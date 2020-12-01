const iterations = 100;
const multiplier = 1000000000;

var worker = new Worker("js/calculate.js");

var dane_wykres = [];

/**
 * Doing the pointless computations. 
 */
var pointlessComputationsButton = document.getElementById("pointless-computations");
pointlessComputationsButton.disabled = false;
pointlessComputationsButton.addEventListener("click", doPointlessComputations, false);

function doPointlessComputations() {
  //pointlessComputationsButton.disabled = true;

  var useWorkerButton = document.getElementById("use-worker");
  var useBlockingJsButton = document.getElementById("use-blocking-js");
  var useRequestAnimationFrame = document.getElementById("use-request-animation-frame");
  var useSetInterval = document.getElementById("use-set-interval");
  var useSetTimeout = document.getElementById("use-set-timeout");

  
  if (useBlockingJsButton.checked) {
    doPointlessComputationsWithBlocking();
  }
  else if (useRequestAnimationFrame.checked) {
    doPointlessComputationsWithRequestAnimationFrame();
  }
  else if (useWorkerButton.checked) {
    doPointlessComputationsInWorker();
  }
  else if(useSetInterval.checked) {
    doPointlessComputationsWithSetInterval()
  }
  else if(useSetTimeout.checked) {
    doPointlessComputationsWithSetTimeout()
  }

}

/**
 * Start/stop animation
 */
var started = false;
var startStopButton = document.getElementById("start-stop");

startStopButton.addEventListener("click", startStop, false);

function startStop() {
  started = !started;
  if (started) {
    container.classList.add("started");
    startStopButton.value = "Stop animations";
  }
  else {
   container.classList.remove("started");
   startStopButton.value = "Start animations";
  }
}



function rysujWykres() {
    console.log(dane_wykres);
      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Rodzaj');
        data.addColumn('number', 'Czas');
        data.addRows(dane_wykres);

        // Set chart options
        var options = {'title':'Ile czasu zajely obliczenia',
                       'width':600,
                       'height':600};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }

}