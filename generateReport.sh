if [ $# -eq 0 ]
then
	echo 'Please provide a name of report: '
	echo './script nameOfReport'
	exit
fi


plato -l jshintrc.js -r -d reports/$* -t "DarkSide" -x src/thirdparty src   
