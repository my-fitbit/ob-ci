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

  git checkout travis-ci
  git add .
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
echo
echo "Set remote with token"

  git remote add origin https://${GH_TOKEN}@github.com/my-fitbit/ob-ci.git > /dev/null 2>&1

echo
echo "git show-ref"
	git show-ref

echo
echo "now Pushing changes to another branch"


  git push -f --quiet --set-upstream origin travis-ci 
}

# setup_git
commit_response_files
upload_files
