import {defineConfig} from "vite";
import webExtension, {readJsonFile} from "vite-plugin-web-extension";

function generateManifest() {
    const manifest = readJsonFile("src/manifest.json");
    const pkg = readJsonFile("package.json");

    return {
        version: pkg.version,
        ...manifest,
    };
}

export default defineConfig({
    plugins: [
        webExtension({
            manifest: generateManifest,
            watchFilePaths: ["package.json", "manifest.json"],
            additionalInputs: [
                "src/contentScripts/contentScript.ts",
            ]
        })
    ],
    build: {
        emptyOutDir: true,
        minify: false,
    },
});