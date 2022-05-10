#!/bin/bash
SERVIDOR=root@172.21.38.19
OFF=/opt/infoprint/ippd/bin/stopaiw -u aiw1
ON=/opt/infoprint/ippd/bin/startaiw -u aiw1
PASS=tigre123

ssh $SERVIDOR
$PASS
$OFF
$ON