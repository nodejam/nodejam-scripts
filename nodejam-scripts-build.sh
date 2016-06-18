curdir=`pwd`
cd "$(dirname "$0")"
rm -rf dist
babel src/ -d dist/
chmod +x dist/*.js
cd $curdir
