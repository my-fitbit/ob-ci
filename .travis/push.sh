#!/bin/sh

setup_git() {

echo "Setting Tarvis User"
echo
    git config --global user.email "travis@travis-ci.org"
    git config --global user.name "Travis CI"
}

commit_response_files() {  

echo "TRAVIS_BUILD_NUMBER : $TRAVIS_BUILD_NUMBER"
echo

  git checkout -b main
  git add .
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {

echo "now uloading files"
echo
  git remote add origin https://${GH_TOKEN}@github.com/my-fitbit/openbankingAus.git > /dev/null 2>&1
  git push --quiet --set-upstream origin main 
}

setup_git
commit_response_files
upload_files