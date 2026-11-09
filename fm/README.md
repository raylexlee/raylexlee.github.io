## 3 Dots, Wand
```
#showtooltip
/castsequence [@target,harm,nodead] reset=target/combat Immolate, Curse of Agony, Corruption
/cast [combat] !Shoot
```
## Fear 1
```
#showtooltip Fear
/cast [mod:shift,@focus,harm,nodead] [] Fear
```
## Fear 2
```
#showtooltip Fear
/cast [@mouseover,harm,nodead] [@focus,harm,nodead] [] Fear
```
## Fear 3
```
#showtooltip Fear
/focus [@focus,noexists] [@focus,dead]
/cast [@focus,harm,nodead] [] Fear
```
