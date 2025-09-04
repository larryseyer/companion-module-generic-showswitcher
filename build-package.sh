#!/bin/bash
cd "/Users/larryseyer/companion DEVELOP/companion-module-generic-showswitcher"

# Remove old package
rm -f generic-showswitcher-2.0.5.tgz

# Create package structure  
cd pkg
tar czf ../generic-showswitcher-2.0.5.tgz \
  package.json \
  main.js \
  yarn.lock \
  companion/manifest.json \
  companion/HELP.md

cd ..
echo "Package created: generic-showswitcher-2.0.5.tgz"
ls -lh generic-showswitcher-2.0.5.tgz