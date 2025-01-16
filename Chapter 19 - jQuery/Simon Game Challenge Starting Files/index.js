var level = 1, cnt = 0;
var arr = [];

init();

function startGame(){
    $(document).on("click", function(event){
        var value;
        var isBtn = 1;
        switch (event.target.id) {
            case "green":
                value = 1;
                break;
            case "red":
                value = 2;
                break;
            case "yellow":
                value = 3;
                break;
            case "blue":
                value = 4;
                break;
            default:
                isBtn = 0;
                break;
        }
    
        if(isBtn){
            if(value == arr[cnt]){
                animation(value);
                cnt++;
                if(cnt == arr.length){
                    cnt = 0;
                    level++;
                    setTimeout(function () {
                        $("h1").text("Level " + level);
                        rand();
                    }, 1000);
                }
            }
            else{
                level = 1;
                cnt = 0;
                arr = [];
                $("h1").text("Game Over, Press Any Key to Restart");
                animationLose();

                $(document).off("click");
                init();
            }
        }
    });
}

function init(){
    $(document).off("click");
    $(document).on("keypress", function(event){
        setTimeout(function () {
            $("h1").text("Level " + level);
            rand();
        }, 300);
        $(document).off("keypress"); 
        startGame();
    });    
}

function rand(){
    var num = Math.floor(Math.random()*3) + 1;
    arr.push(num);
    animation(num);
}

function animation(value){
    var colorBtn;

    switch(value) {
        case 1:
            colorBtn = "green";
            break;
        case 2:
            colorBtn = "red";
            break;
        case 3:
            colorBtn = "yellow";
            break;
        case 4:
            colorBtn = "blue";
            break;
        default:
            break;
    }

    console.log("./sounds/" + colorBtn + ".mp3");

    var audio = new Audio("./sounds/" + colorBtn + ".mp3");
    audio.play();

    $("#" + colorBtn).css("opacity", 0.5);
    setTimeout(function () {
        $("#" + colorBtn).css("opacity", 1);
    }, 100);
}

function animationLose(){
    $("body").css("background-color", "red");
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    setTimeout(function () {
        $("body").css("background-color", "#011F3F");
    }, 100);
}