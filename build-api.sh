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
npm run bootstrap -- --scope @deepkit/core --scope @deepkit/core-rxjs --scope @deepkit/app --scope @deepkit/broker \
  --scope @deepkit/bson --scope @deepkit/crypto --scope @deepkit/desktop-ui --scope @deepkit/event \
  --scope @deepkit/framework --scope @deepkit/http --scope @deepkit/injector --scope @deepkit/logger \
  --scope @deepkit/mongo --scope @deepkit/mysql --scope @deepkit/orm --scope @deepkit/orm-integration --scope @deepkit/postgres \
  --scope @deepkit/rpc --scope @deepkit/rpc-tcp --scope @deepkit/sql --scope @deepkit/sqlite \
  --scope @deepkit/stopwatch --scope @deepkit/template --scope @deepkit/topsort --scope @deepkit/type \
  --scope @deepkit/type-angular --scope @deepkit/workflow --scope @deepkit/packages/angular-universal
npm run link;
npm run tsc;
NODE_OPTIONS=--max_old_space_size=8096 ./node_modules/.bin/typedoc --packages 'packages/*';
cd -;
