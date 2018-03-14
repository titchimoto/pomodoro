var sound = new buzz.sound("./ding", {
    formats: [ "ogg", "mp3", "aac" ]
});

sound.play()
     .fadeIn()
     .bind("timeupdate", function() {
        var timer = buzz.toTimer(this.getTime());
        document.getElementById("timer").innerHTML = timer;
     });

     console.log("Script loaded")
