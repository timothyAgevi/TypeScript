currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };

//// [/lib/lib.esnext.full.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };

//// [/src/project/ky.d.ts]
type KyInstance = {
    extend(options: Record<string,unknown>): KyInstance;
}
declare const ky: KyInstance;
export default ky;


//// [/src/project/src/index.ts]
import ky from 'ky';
export const api = ky.extend({});


//// [/src/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "amd",
    "declaration": true,
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,
    "outFile": "./outFile.js"
  },
  "include": [
    "src"
  ]
}



Output::
/lib/tsc -p /src/project --explainFiles --listEmittedFiles
[96msrc/project/src/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/src/project/ky" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

TSFILE: /src/project/outFile.js
lib/lib.d.ts
  Default library for target 'es5'
src/project/ky.d.ts
  Imported via 'ky' from file 'src/project/src/index.ts'
src/project/src/index.ts
  Matched by include pattern 'src' in 'src/project/tsconfig.json'

Found 1 error in src/project/src/index.ts[90m:2[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/project/outFile.js]
define("index", ["require", "exports", "ky"], function (require, exports, ky_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.api = void 0;
    exports.api = ky_1.default.extend({});
});




Change:: no-change-run
Input::


Output::
/lib/tsc -p /src/project --explainFiles --listEmittedFiles
[96msrc/project/src/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/src/project/ky" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

TSFILE: /src/project/outFile.js
lib/lib.d.ts
  Default library for target 'es5'
src/project/ky.d.ts
  Imported via 'ky' from file 'src/project/src/index.ts'
src/project/src/index.ts
  Matched by include pattern 'src' in 'src/project/tsconfig.json'

Found 1 error in src/project/src/index.ts[90m:2[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/project/outFile.js] file written with same contents


Change:: no-change-run
Input::


Output::
/lib/tsc -b /src/project --explainFiles --listEmittedFiles -v
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because output file 'src/project/outFile.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

[96msrc/project/src/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/src/project/ky" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

TSFILE: /src/project/outFile.tsbuildinfo
lib/lib.d.ts
  Default library for target 'es5'
src/project/ky.d.ts
  Imported via 'ky' from file 'src/project/src/index.ts'
src/project/src/index.ts
  Matched by include pattern 'src' in 'src/project/tsconfig.json'

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/project/outFile.tsbuildinfo]
{"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "version": "FakeTSVersion",
  "size": 27
}

