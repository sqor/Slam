# Get the directory for this build
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# Cd into that dir
cd $DIR
./runLinter.sh
./onlyBuild.sh
