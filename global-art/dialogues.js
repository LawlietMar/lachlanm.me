var elevatorDia = {
    "clickDoor1" : [["The door seems to be barred from the other side..."], []],
    "clickDoor2" : [["The door seems to be barred from the other side..."], []],
    "clickDoor3" : [["The door is still barred from the other side."], []],
    "clickDoor4" : [["The door continues to be barred from the other side."], []],
    "clickDoor5" : [["Shockingly, the door has not unbarred itself."], []],
    "clickDoor6" : [["."], []],
    "clickDoor7" : [[".."], []],
    "clickDoor8" : [["..."], []],
    "clickDoor9" : [["Yeah, still barred."], []],
    "clickDoor10" : [["..."], []],
    "clickDoor11" : [["..."], []],
    "clickDoor12" : [["..."], []],
    "clickDoor13" : [["..."], []],
    "clickDoor14" : [["Surely you could have opened it by now."], []],
    "clickDoor15" : [[". . ."], []]
}

export function getElevatorDia(inText){
    return elevatorDia[inText];
}