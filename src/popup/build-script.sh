#!/bin/bash

mv ./build/index.html ../extension/popup.html
mv ./build/asset-manifest.json ../extension/asset-manifest.json
rm -rf ../extension/static/
mv ./build/static/ ../extension/