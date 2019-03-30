function Input() {
    self = this;

    self.isLeftPressed = false;
    self.isRightPressed = false;

    function handleKeyEvent(event, isKeyDown) {
        if(event.keyCode == 65){
            self.isLeftPressed = isKeyDown;
        }
        if(event.keyCode == 68){
            self.isRightPressed = isKeyDown;
        }
        if(event.keyCode == 87){
            self.isUpPressed = isKeyDown;
        }
        if(event.keyCode == 83){
            self.isDownPressed = isKeyDown;
        }
        
    }

    document.addEventListener("keydown", function(event){handleKeyEvent(event, true)});
    document.addEventListener("keyup", function(event){handleKeyEvent(event, false)});
}
