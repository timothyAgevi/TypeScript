import { CompilerOptions } from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { libContent } from "./contents.js";
import { loadProjectFromFiles } from "./vfs.js";

export function getFsForDeclarationEmitWithErrors(options: CompilerOptions) {
    return loadProjectFromFiles({
        "/src/project/tsconfig.json": jsonToReadableText({
            compilerOptions: {
                module: "NodeNext",
                moduleResolution: "NodeNext",
                ...options,
                skipLibCheck: true,
                skipDefaultLibCheck: true,
            },
        }),
        "/src/project/index.ts": dedent`
            import ky from 'ky';
            export const api = ky.extend({});
        `,
        "/src/project/package.json": jsonToReadableText({
            type: "module",
        }),
        "/src/project/node_modules/ky/distribution/index.d.ts": dedent`
            type KyInstance = {
                extend(options: Record<string,unknown>): KyInstance;
            }
            declare const ky: KyInstance;
            export default ky;
        `,
        "/src/project/node_modules/ky/package.json": jsonToReadableText({
            name: "ky",
            type: "module",
            main: "./distribution/index.js",
        }),
        "/lib/lib.esnext.full.d.ts": libContent,
    });
}

export function getFsForDeclarationEmitWithErrorsWithOutFile(options: CompilerOptions) {
    return loadProjectFromFiles({
        "/src/project/tsconfig.json": jsonToReadableText({
            compilerOptions: {
                module: "amd",
                ...options,
                skipLibCheck: true,
                skipDefaultLibCheck: true,
                outFile: "./outFile.js",
            },
            include: ["src"],
        }),
        "/src/project/src/index.ts": dedent`
            import ky from 'ky';
            export const api = ky.extend({});
        `,
        "/src/project/ky.d.ts": dedent`
            type KyInstance = {
                extend(options: Record<string,unknown>): KyInstance;
            }
            declare const ky: KyInstance;
            export default ky;
        `,
        "/lib/lib.esnext.full.d.ts": libContent,
    });
}
