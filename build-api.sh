#/bin/sh

if [[ -d /tmp/deepkit-framework-docs ]]
then
  cd /tmp/deepkit-framework-docs;
  git checkout .;
  git pull origin master;
else
  git clone https://github.com/deepkit/deepkit-framework.git /tmp/deepkit-framework-docs;
  cd /tmp/deepkit-framework-docs;
fi
npm i;
npm run tsc;
NODE_OPTIONS=--max_old_space_size=8096 ./node_modules/.bin/typedoc --packages 'packages/*';
cd -;
rm -rf src/assets/api-docs;
cp -r /tmp/deepkit-framework-docs/docs src/assets/api-docs;
