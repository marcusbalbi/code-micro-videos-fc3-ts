#!/bin/sh

npm run cti create './src/shared/application' -- -i '*spec.ts' -b &&
npm run cti create './src/shared/domain' '*spec.ts' -b &&
npm run cti create './src/shared/infra' '*spec.ts' -b &&

npm run cti create './src/category/application' '*spec.ts' -b &&
npm run cti create './src/category/domain' '*spec.ts' -b &&
npm run cti create './src/category/infra' '*spec.ts' -b