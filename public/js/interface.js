    //facebook init
    window.fbAsyncInit = function() {
        FB.init({
          appId      : '165874483497773',
          xfbml      : true,
          version    : 'v2.1'
        });              
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
                Interface.userID = uid;
                Interface.accessToken = accessToken;
                Interface.init();
            } else if (response.status === 'not_authorized') {
                window.location.href = 'index.php';
            } else {
                Interface.login();
            }
        });
      };
    (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) return;
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/es_LA/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

var Interface =
{
    excerciseNumber:0,
    excercises:null,
    userID: null,
    accessToken: null,
    userName: null,
    exercise_id:null,
    exercise_progress:0,
    api_url:'/laravelile/public/api/',
    init: function(){
        this.events();
        this.setCarouselHeight('#carousel-lesson');
        this.loadExcercise();
        Interface.get("picture");
        Interface.get("email",function(){Interface.save("login")});

    },
    events:function()
    {
        $(".close").click(function(){
            $(".alert").removeClass("in");
        });
        $("#btnExplicacion").click(function(){
            $("#explicacionModal").modal("toggle");
        });
        $(".opcion").click(function(){              
            $(".alert").contents().filter(function(){ return this.nodeType != 1; }).remove();
            $.get( "http://localhost:8080/tutor/query",  { "input": $(this).text() },function( data ) {
                $(".alert").append(data.mensaje).addClass("in").alert();
            });
        });
        $("#btnEnviar").click(function(){             
            $(".alert").contents().filter(function(){ return this.nodeType != 1; }).remove();
             $.get( "http://localhost:8080/tutor/query",  { "input": $("#txtEntrada").val() },function( data ) {
                $(".alert").append(data.mensaje).addClass("in").alert();
                if( data.mensaje === "Parse Success") {
                    Interface.exercise_progress = Interface.exercise_progress == 66 ? 100 : Interface.exercise_progress+33;
                    if( Interface.exercise_progress <= 100) {
                        Interface.increaseProgress(Interface.exercise_progress);                        
                    }
                }
             });
        });
/*
        // Get context with jQuery - using jQuery's .get() method.
        var ctx = $("#myChart").get(0).getContext("2d");
        // This will get the first returned node in the jQuery collection.
        var myNewChart = new Chart(ctx);
        var options =  {
             multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
        }
        var data = {
            labels: ["paso 1", "paso 2", "paso 3", "paso 4", "paso 5", "paso 6", "paso 7"],
            datasets: [
                {
                    label: "Interfaz de Constantes",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: "Parser",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
        var myLineChart = new Chart(ctx).Line(data, options);
        legend(document.getElementById('myLegend'), data);*/

        $("#btnEnviarPost").click(function(){
            Interface.postSubjectToSocialNetwork($("#txtTemaRedSocial").val(),$("#txtMensajeRedSocial").val());
        });

        $("#btnSiguiente").click(function(){
            Interface.nextExercise();
        });

        $("#btnFacebook").click(function(){     
             Interface.login();
        });
        //cuando llegue al final del scroll continuar al menu principal en la introducciòn
        if( window.location.pathname.indexOf("introduccion")  > -1 )
        {
            $(window).scroll(function() {
                if($(window).scrollTop() + $(window).height() == $(document).height()) {
                    window.location.href = 'menu-principal';
                }
            });            
        }
        Interface.loadEmotionDetection();


    },get: function(id,callback) {
        switch(id) {
            case 'picture':
                    FB.api(
                        "/me/picture",
                        {
                            "redirect": false,
                            "height": "100",
                            "type": "normal",
                            "width": "100"
                        },
                        function (response) {
                          if (response && !response.error) {
                            $(".circle-image").css("background-image","url("+response.data.url+")");
                          }                          
                        }
                    );
                break;
            case 'email':
                if( !Interface.userEmail) 
                {
                    FB.api(
                        "/me",
                        function (response) {
                          if (response && !response.error) {
                            Interface.userName = response.name;
                            $("#txtNombre").html(response.name);
                            Interface.userEmail = response.email;
                            callback(response.email);                            
                          }                          
                        }
                    );
                } else {
                    callback(Interface.userEmail);
                }
                break;
        }
    },login: function(){
        if(Interface.userID) {
            window.location.href = 'introduccion';
        }        
        FB.login(function(response) {
            if (response.authResponse) {               
                Interface.init();
               // window.location.href = 'introduccion.php';
            } else {
                window.location.href = '/';
            }
         },{scope: 'email'}); 
    },
    takepicture :function (argument) {
      canvas.width = 500;
      canvas.height = 500;
      canvas.getContext('2d').drawImage(document.querySelector('#video'), 0, 0, 500, 500);
      var data = canvas.toDataURL('image/png');
      $.post( Interface.api_url + "emotion",  {image:data},function(data){
        console.log(data);
      });
      console.log(data);
    },
    loadEmotionDetection: function(){
        navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
        navigator.getMedia(
        // constraints
        {video:true, audio:false},
        // success callback
        function (mediaStream) {
            var video = document.getElementsByTagName('video')[0];
            video.src = window.URL.createObjectURL(mediaStream);
            video.play();
        },   
        //handle error
        function (error) {
            console.log(error);
        });  
    },
    loadExcercise: function() {
        var ejercicio = Interface.getUrlParameter("ejercicio");
        Interface.exercise_id = ejercicio;
        if( ejercicio) {
            $.getJSON( "js/ejercicio"+ejercicio+".json", function( data, textStatus, jqxhr ) {
                Interface.excercises = data.excercises;
                console.log(data);
                $.post( Interface.api_url + "last_exercise",  {user_id:Interface.userID ,exercise_id:Interface.exercise_id},function(data) {
                    Interface.excerciseNumber = data.step_number;
                    if(Interface.excerciseNumber == 0 ) {
                        Interface.getNextAnswers();
                    } else {
                        Interface.nextExercise();
                    }
                });
            });            
        }
    },
    postSubjectToSocialNetwork: function(subject,description){
        Interface.get("email",function(email){
            var datos = {"email":email,"tema":subject,"descripcion":description};
            $.getJSON("http://192.168.1.88:8080/pruebas/RedSocial/public_html/webserviceforo.php?callback=?",datos,function(data){
                $('#exampleModal').modal('toggle');
            });            
        });
    },
    loadToolTips:function(){ 
        $.getJSON("http://192.168.1.88:8080/pruebas/RedSocial/public_html/webservice.php?callback=?","opcion=wile",function(data){
            $.each(data.words,function(k,v){
                $('div.popover-content').html($('div.popover-content').html().replace(new RegExp(eval('/'+v.word+'/g')), '<a href="#" data-toggle="tooltip" title="'+v.descripcion+'">'+v.word+'</a>'));  
                $('[data-toggle="tooltip"]').tooltip({
                    'placement': 'top'
                });   
            });
        });
    },
    clearError:function() {
        $(".alert").contents().filter(function(){ return this.nodeType != 1; }).remove();
        $(".alert").removeClass("in");
    },
    getError:function(error) {
        this.clearError();
        $(".alert").append(error).addClass("in").alert();
    },
    getNextAnswers: function() {  
        //regresando en caso de ser el ultimo
        if( this.excerciseNumber > Interface.excercises.length -1)  {
            return;            
        }
        //en caso de haber ejercicio dificil, ponerlo, esto es temporal!
        /*if( Interface.excercises[this.excerciseNumber].answer_hard) {
            var answer = Interface.excercises[this.excerciseNumber].answer_hard;
           $("#answers").append( '<a  class="list-group-item">' +answer.text.join("\n") +'</a>');
           $("#answers").append('<input type="text" id="txtAnswer" class="col-md-8" style="margin-right: 15px;"></button>');
           $("#answers").append('<button class="btn btn-primary">Enviar</button>');
           return;
        }*/

        //limpiando
        $("#answers").html("");
        this.clearError();    
        $.each(Interface.excercises[this.excerciseNumber].answers,function(k,v) {
            if( v.rightAnswer) {
               $("#answers").append( '<a href="#" onClick="Interface.nextExercise()" class="list-group-item">' +v.text.join("\n") +'</a>');
            } else {
                $("#answers").append( '<a href="#" onClick="Interface.getError(\''+ (v.error || "Respuesta Incorrecta")+'\')" class="list-group-item">' +v.text.join("\n") +'</a>');
            }
        });        
    },
    increaseProgress:function(progress) {
        $(".progress-bar").attr("aria-valuenow",progress).text(progress + "%").css("width",progress + "%");    
    },
    nextExercise: function()
    {
        var txt="",progress="0",explanation="";
        progress = this.excercises[this.excerciseNumber].progress 
        explanation = this.excercises[this.excerciseNumber].explanation;
        Interface.save("excercise");
        txt = Interface.excercises[this.excerciseNumber].incrementalText.join("\n");
        $("#txtLecciones").text(txt).attr("data-content",explanation).popover({container: 'body'}).popover('show');
        this.increaseProgress(progress);
        this.excerciseNumber++;
        this.getNextAnswers();
        this.loadToolTips();
    },
    setCarouselHeight : function(id)
    {
        var slideHeight = [];
        $(id+' .item').each(function()
        {
            // add all slide heights to an array
            slideHeight.push($(this).height());
        });

        // find the tallest item
        max = Math.max.apply(null, slideHeight);
        // set the slide's height
        $(id+' .carousel-content').each(function()
        {
            $(this).css('height',max+'px');
        });
    },save:function(id,data){
        switch(id) {
            case 'login': 
                $.post( Interface.api_url + "login",  { "id": Interface.userID,"email": Interface.userEmail });
                break;
            case 'excercise':
                $.post( Interface.api_url + "save_exercise",  {user_id:Interface.userID ,exercise_id:Interface.exercise_id,correct:true,step_number:Interface.excerciseNumber});
                break;
            break;
        }
    },
    getUrlParameter: function (sParam)
    {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) 
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) 
            {
                return sParameterName[1];
            }
        }
        return false;
    }  
}
