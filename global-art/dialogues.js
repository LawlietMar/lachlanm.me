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
    "clickDoor15" : [[". . ."], []],
    "locked" : [["The door is locked."],[]]
}

var entryDia = {
    "barred" : [["The door is barred."], []],
    "locked" : [["The door seems locked from the other side..."], []]
}

var shopDia = {
    //Upon entry
    "enter": [["Welcome back."], ["What is this place?", "Who are you?", "Leave"]],
    "entero": [["Welcome back."], ["What is this place?", "Who are you?", "What's this orb?", "Leave"]],
    "enterl": [["Welcome back."], ["What is this place?", "Who are you?", "The alley guy told me to talk to you about it.", "Leave"]],
    "entero": [["Welcome back."], ["What is this place?", "Who are you?", "What's this orb?", "The alley guy told me to talk to you about it."]],

    "What is this place?": [["That's quite a vague question, young man. What exactly do you mean? The underground? This place as a whole?"], ["The underground.", "The whole place.", "Back ", "Leave"]],
    "Back " : [[], ["What is this place?", "Who are you?", "Leave"]],
    //What is underground
    "The underground." : [["Why, this is a little village we dwarves live in. We like the underground, and nobody bothers us here.", "It's a quiet life, but a peaceful one."], ["Are there others?", "How did you end up down here?", "Back"]],
    "Are there others?" : [["Oh, many. But only two others you should meet. Sadly, the town's been getting quieter and quieter over the last two years."], ["Are there others?", "How did you end up down here?", "Back"]],
    "How did you end up down here?" : [["Hmm...", "I've been here as long as I can remember. Never left. Never wanted to."], ["Are there others?", "How did you end up down here?", "Back"]],
    "Back" : [[], ["The underground.", "The whole place.", "Back ", "Leave"]],

    //What is game
    "The whole place." : [["It's just the world, isn't it? I'm down here, you're adventuring in temples and forests.", "Seems like a good life. You should live it, rather than thinking about it too much. Advice from an old man."], ["How did I end up here?", "Back ", "Leave"]],
    "How did I end up here?" : [["Well, I suppose you woke up."], ["I woke up...?"]],
    "I woke up...?" : [["You woke up."], ["What is this place?", "Who are you?", "Leave"]],

    //Who are you
    "Who are you?" : [["Me? Just an old gem selling dwarf, running my little shop in a cave."], ["Gem selling? I can't imagine you get much business down here...", "Back ", "Leave"]],
    "Gem selling? I can't imagine you get much business down here..." : [["Well yes, I'd say about one customer a day?", "heehee...", "But yes. More like gem buying, I suppose. Bring me a gem and I'll give you some coin."], ["Where can I find a gem?", "Why would I want coin?", "Back ", "Leave"]],
    "Where can I find a gem?" : [["In the mountains. You just mine them out with a pickaxe."], ["Where can I find a gem?", "Why would I want coin?", "Back ", "Leave"]],
    "Why would I want coin?" : [["Oh, you do. It'll come in handy eventually. If you really want to know, you can talk to the king."], ["Where can I find a gem?", "The king?", "Back ", "Leave"]],
    "Why would I want coin?1" : [["Oh, you do. It'll come in handy eventually. If you really want to know, you can talk to the king.", "Besides, it seems like you already do...", "You picked up the coin purse."], ["Where can I find a gem?", "The king?", "If coin is so great, why didn't you pick up the purse?", "Back "]],
    "If coin is so great, why didn't you pick up the purse?" : [["I suppose I didn't see it."], ["Oh, ok.", "It's been sitting right in front of you all day??", "Leave"]],
    "It's been sitting right in front of you all day??" : [["I didn't see it."], ["Where can I find a gem?", "The king?", "Back ", "Leave"]],
    "Oh, ok." : [[], ["Where can I find a gem?", "The king?", "Back ", "Leave"]],
    "The king?" : [["Yes, king Fenstec Elder. You can find him in his castle."], ["Where can I find a gem?", "The king?", "Back ", "Leave"]],

    //What is orb
    "What's this orb?": [["Oh my, you found one.", "They oppose the flowers. They're embodiments of monotony."], ["And what are the flowers?", "Back ", "Leave"]],
    "And what are the flowers?" : [["Well, they're flowers. I'm not sure what you mean."], ["What is this place?", "Who are you?", "Leave"]],

    //Axe
    "axe" : [["That's a nice axe you have there. I have a couple back here too. Let's not use them, ehh?"], ["You're quite the fearless old man.", "I didn't mean it as a threat...", "Leave"]],
    "You're quite the fearless old man." : [["Ehehehehehee...", "...", "If that was all it took to kill me, things would be a lot simpler..."], ["What is this place?", "Who are you?", "Leave"]],
    "I didn't mean it as a threat..." : [["Some don't, most do. Can't hurt to be careful."], ["What is this place?", "Who are you?", "Leave"]],

    //Lore
    "The alley guy told me to talk to you about it." : [["God damn it. Today is one of those days, I guess.", "I'll kill that bum someday...", "Anyway, I suppose I should tell you a bit of truth now and send you on your merry way.", `First of all, it's "It," not it. It is a creature. It has no name.`, "Second, It put us here, under the watch of our king. Doomed to forever sell to one customer a day.", "You'll have to deal with it soon too, but it likes you. Must be nice.", "Don't even bother asking questions, that's all I'll say. It should be enough for you anyway."], ["Back "]],
}

var alleyDia = {
    //Bum things
    "yap0" : [["rvteis hisdoectaebrvu... meauro i nt,eddii ao dimpisid cds sdrbll a noec ltapug.dl u nmeo eoicqcvd umpo osot estacimeitt.qem ua oon i seadatidiiieqen sleolstmdbuttuinroualat maaecqsoaosiiniauttmr cornpxxionemer,i milum ear ime nucrotnluu r ,glsineto"], []],
    "yap1" : [["uh dssighttolauic... e,uldoooui i a nttnuts.txerdatiaol e umln cemc tnrdednsuoemscditop bqeeaa isigutmlc,ulomnrtamlsoulu oue mo nmni aris rcdlad miou via xtonoiseirrreopttgodi mm ppiasici tdtsmbleeiaconc.qd i, ei ulouaom iareaenqedn iqs siaeit"], []],
    "yap2" : [["fhsmla er... iri ltemeseot c uddsumdealns., laiuuletiviqaug tm isbdnci oidmmtia euoiiim olecco be esnsueeacoooanu ceo ur sstii,qrpdqapdere i ininl teurtl to.e amapstaiome giprolom oom dr luoi adisu iamstnco xmnnc trt,tdxm oeaniln nratduaq"], []],
    "angy" : [[". . ."], []],

    //Money Dialogue
    "touchy" : [["Hey, hands off. It's not much, but those are my savings."], ["Ok, sorry."]],
    "touchySane" : [["Hey, hands off. It's not much, but those are my savings."], ["Ok, sorry.", "You can talk?"]],
    "touchy1" : [["Hey, stop. I told you those are mine."], ["Ok, sorry again..."]],
    "Ok, sorry." : [[], []],
    "You can talk?" : [["Well yes, I've always been able to. I just don't enjoy it much. My lucidity comes and goes, admittedly.", "Now get your hands off my money."], ["Ok, sorry."]],
    "rob" : [["Well, I hope you need it more than I do."], []],
    "axe" : [["Hey man there's no need to do this...", "You can take the money if you really need it but don't hurt me.", "Please?"], []],

    //Fed dialogue
    "fedSane" : [["nibble", "crunch", "SMACK", "chomp", "scrlmph", ". . .", "sluuuuurp", ". . .", "Chomp.", "Mmm, that hit the spot. Thanks, kid."], ["You talk?", "Leave"]],
    "fed" : [["*nibble*", "*crunch*", ". . .**SMACK**", "*chomp*", "*scrlmph*", ". . .", ". . .*sluuuuurp*", ". . .", "*Chomp*.", "Mmm, that hit the spot. Thanks, kid."], ["You done?", "Leave"]],
    "You talk?" : [["Rude kid.", "Yes, I talk. My lucidity comes and goes, but food usually does the trick.", "Anyway, I enjoyed the grub, I'll do you a favor. Anything but coin, I'm a bit sparse on that myself.", ". . .", ". . .", "I guess you probably don't know what you need, huh?"], ["No, not really...", "Actually, I'm pretty on track."]],
    "You done?" : [["Rude kid.", "Yes, I'm done. You gave it to me, not sure what you expected.", "Anyway, I enjoyed the grub, I'll do you a favor. Anything but coin, I'm a bit sparse on that myself.", ". . .", ". . .", "I guess you probably don't know what you need, huh?"], ["No, not really...", "Actually, I'm pretty on track."]],
    "No, not really..." : [["I'll tell you a bit. I can't say much - none of us can.", "It won't end well for us.", "But I'll say a bit, the old man will say a bit, and Clasio will say a bit.", "I'll just tell you one piece for now. Do you want to know about me, you, or the world?"], ["Me.", "You.", "The world.", "Leave"]],
    "Actually, I'm pretty on track." : [["No, you aren't. It's good that you think you do though."], ["Well in that case...?"]],
    "Well in that case...?" : [["Well I'll tell you a little. I can't say much - none of us can.", "But I'll say a bit, the old man will say a bit, and Clasio will say a bit.", "I'll just tell you one piece for now. Do you want to know about me, you, or the world?"], ["Me.", "You.", "The world.", "Leave"]],

    //Lore
    "Me." : [["The king will like you.", "Like the flowers, the orbs, me, many things in this world really, you are a manifestation.", "In this case, a manifestation of choice and power.", "Nietzsche's power."], ["The flowers?", "The orbs?", "You?", "Choice and power?"]],
    "The flowers?" : [["Yes, the flowers. The old man will explain."], []],
    "The orbs?" : [["Yes, the orbs. The old man will explain."], []],
    "You?" : [["Yes, me. I've said what I can for the day, but ask me next time."], []],
    "Choice and power?" : [["You heard me.", "That's all I can say, but you'll figure the rest out."], []],

    "You." : [["My my, I feel so special.", "I'm a manifestation. Of what, I can't say directly.", "I'm a lot weaker than I used to be. I fell out of favor with the king and with Him over the last year, so I've just been gathering coin in an attempt to exist."], []],

    "The world." : [["Then it seems you understand the world already. You might not know it though.", "The world is a day. Simple as that. What you do in it is up to you."], ["A day...?"]],
    "A day...?" : [["Yes, a day. I'm sorry I can't tell you more.", "Ask the old man about <i>It</i>. Tell him I sent you. He'll explain."], []]
}

export function getElevatorDia(inText){
    return elevatorDia[inText];
}

export function getEntryDia(inText){
    return entryDia[inText];
}

export function getShopDia(inText){
    return shopDia[inText];
}

export function getAlleyDia(inText){
    return alleyDia[inText];
}