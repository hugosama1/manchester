<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>DATA</title>
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="css/bootstrap-social.css">
<link rel="stylesheet" type="text/css" href="css/font-awesome.css">
<link rel="stylesheet" type="text/css" href="css/data.css">
<script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.4.custom.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/chart.js"></script>

</head>
<body>
    <nav id="myNavbar" class="navbar navbar-default  navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbarCollapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/data/public">DATA</a><span class="navbar-brand"><font size="2">Daily Toilet Analysis</font></span>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="nav navbar-nav">
                    <li><a href="my-health" >My Health</a></li>
                    <li><a href="doctor-info" id="btnPostRedSocial" >Doctor Info</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="jumbotron">
        <div class="container">
            <h2 id="txtNombre">Mr. Leonardo Da Vinci</h2>
            <p>Retired 69-year-old man with a 5-year history of type 2 diabetes. Although he was diagnosed in 1997, he had symptoms indicating hyperglycemia for 2 years before diagnosis. He had fasting blood glucose records indicating values of 118–127 mg/dl, which were described to him as indicative of “borderline diabetes.” He also remembered past episodes of nocturia associated with large pasta meals and Italian pastries. At the time of initial diagnosis, he was advised to lose weight (“at least 10 lb.”), but no further action was taken.</p>       
        </div>   
    </div> 

<div id="accordion" class="panel-group">
    <div class="panel panel-danger">
        <div class="panel-heading ">
            <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Glucose Readings</a>
            </h4>
        </div>
        <div id="collapseOne" class="panel-collapse collapse in">
            <div class="panel-body">
                    <canvas id="canvas1" class="canvas" height =""></canvas>
            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">Uric Acid Readings</a>
            </h4>
        </div>
        <div id="collapseTwo" class="panel-collapse collapse in">
            <div class="panel-body">
            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading panel-success">
            <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">Creatin Readings</a>
            </h4>
        </div>
        <div id="collapseThree" class="panel-collapse collapse in">
            <div class="panel-body">
            </div>
        </div>
    </div>
</div>

    <script>
    var randomScalingFactor = function(){ return Math.round(Math.random()*15)};

    var barChartData = {
        labels : ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        datasets : [
                {
                    label: "12-6 am",
                    fillColor : "rgba(220,220,220,0.2)",
                    strokeColor : "#EDED0C",
                    pointColor : "#EDED0C",
                    pointStrokeColor : "#fff",
                    pointHighlightFill : "#fff",
                    pointHighlightStroke : "rgba(220,220,220,1)",
                    tooltipFillColor: "#EDED0C", 
                    data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                },
                {
                    label: "6-12 pm",
                    fillColor : "rgba(93,237,237,0.2)",
                    strokeColor : "#06BA06",
                    pointColor : "#06BA06",
                    pointStrokeColor : "#fff",
                    pointHighlightFill : "#fff",
                    pointHighlightStroke : "rgba(151,187,205,1)",
                    data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                },
                {
                    label: "12-6 pm",
                    fillColor : "rgba(151,187,205,0.2)",
                    strokeColor : "#06388A",
                    pointColor : "#06388A",
                    pointStrokeColor : "#fff",
                    pointHighlightFill : "#fff",
                    pointHighlightStroke : "rgba(151,187,205,1)",
                    data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                },
                {
                    label: "6-12 am",
                    fillColor : "rgba(151,187,205,0.2)",
                    strokeColor : "#FF0000",
                    pointColor : "#FF0000",
                    pointStrokeColor : "#fff",
                    pointHighlightFill : "#fff",
                    pointHighlightStroke : "rgba(151,187,205,1)",
                    data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),20,randomScalingFactor(),25]
                }
        ]
    }
    window.onload = function(){
        var ctx1 = $("#canvas1").get(0).getContext("2d");
        window.myBar = new Chart(ctx1).Line(barChartData, {
            responsive : true,
            multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
        });
        $("#legendDiv").append(window.myBar.generateLegend());
    }
    </script>
</body>
</html>