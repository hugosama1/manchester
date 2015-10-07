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
                    <li><a href="doctor-info" id="btnPostRedSocial"  >Doctor Info</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="jumbotron">
        <div class="container">
            <h2 id="txtNombre">Your Health Information</h2>
            <p>Glucose : 25 mg/dL <span class="glyphicon glyphicon-remove"></span></p>     
            <p>Uric Acid: --- <span class="glyphicon glyphicon-star"></p>   
            <p>Creatin : --- <span class="glyphicon glyphicon-star"></p>    
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
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,0.8)",
                highlightFill : "rgba(151,187,205,0.75)",
                highlightStroke : "rgba(151,187,205,1)",
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),25]
            }
        ]
    }
    window.onload = function(){
        var ctx1 = $("#canvas1").get(0).getContext("2d");
        window.myBar = new Chart(ctx1).Bar(barChartData, {
            responsive : true
        });
    }
    </script>
</body>
</html>