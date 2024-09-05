import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import type { UserConfig as VitestUserConfigInterface } from "vitest/config";

const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    restoreMocks: true,
  },
};

export default defineConfig({
  plugins: [checker({ typescript: true })],
  test: vitestConfig.test,
  //me
  root: './src', //root is gonna be below the src (and not outside like it was)
});
