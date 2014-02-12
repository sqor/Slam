#!/bin/sh
inotifywait -m -r --format '%f' -e modify -e move -e create -e delete src   | while read LINE;
do
    EXT=${file##*.}
    if [ $EXT = "js" ]
    then
        ./build.sh
        ./runLinter.sh
    fi
    echo "Testing.."
done
