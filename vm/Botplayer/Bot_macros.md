## GoHome
Use hearthstone for all party members including player.
```
/p u Hearthstone
/run for b=0,4 do for s=1,GetContainerNumSlots(b,s)do local n=GetContainerItemLink(b,s)if n and (strfind(n,"Hearthstone"))then UseContainerItem(b,s)end end end
```


## Summon
Summon party members to the meeting stone where requires the presence of the player.
```
/p summon
```


## SetHome
Set home fo all party members to the nearby innkeeper.
```
/p home
```


## Talk
- Talk to the quest giver.
- Get the flight point from the nearby fligh master.
```
/p talk
```


## Check
Check all the items in the inventory of party members
```
/p c
```


## Check item
Check the specific item of the party members. It's handy for checking quest items of shared quest.
```
/p c [item]
```


Macros in Vanilla 1.12 client of cmango-class+aiplayerbot server.
