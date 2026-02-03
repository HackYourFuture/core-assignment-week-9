#!/usr/bin/env bash

hyf_folder=$PWD
#target_folder="$PWD/../task-1"
target_folder="$PWD/../solutions/task-1"
temp_folder="$hyf_folder/temp"

mkdir "$temp_folder" 2>/dev/null

if [ ! -f "$target_folder/post.sh" ]; then
  echo "post.sh not found!"
  exit 1
fi
if [ ! -f "$target_folder/patch.sh" ]; then
  echo "patch.sh not found!"
  exit 1
fi
if [ ! -f "$target_folder/get.sh" ]; then
  echo "get.sh not found!"
  exit 1
fi
if [ ! -f "$target_folder/delete.sh" ]; then
  echo "delete.sh not found!"
  exit 1
fi

cd ..
/usr/bin/env npm install
/usr/bin/env npm start &
sleep 3

cd "$target_folder" || exit

bash post.sh >"$temp_folder/post.json" 2>/dev/null
bash patch.sh >"$temp_folder/patch.json" 2>/dev/null
bash get.sh >"$temp_folder/get.json" 2>/dev/null
bash delete.sh 2>/dev/null
bash get.sh >"$temp_folder/notfound.txt" 2>/dev/null
kill -9 $(lsof -t -i:3000)
