#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It moves the /app, /components, /hooks, /scripts, and /constants directories to /app-example and creates a new /app directory with an index.tsx and _layout.tsx file.
 * You can remove the `reset-project` script from package.json and safely delete this file after running it.
 */

import { promises, existsSync } from "fs";
import { join } from "path";

const newAppDir = "app";
const root = process.cwd();
const newDir = "app-example";
const newDirPath = join(root, newDir);
const oldDirs = ["app", "components", "hooks", "constants", "scripts"];

const indexContent = `
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

const layoutContent = `
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

const moveDirectories = async () => {
  try {
    // Create the app-example directory
    await promises.mkdir(newDirPath, { recursive: true });
    console.log(`📁 /${newDir} directory created.`);

    // Move old directories to new app-example directory
    for (const dir of oldDirs) {
      const oldDirPath = join(root, dir);
      const newDirPath = join(root, newDir, dir);
      if (existsSync(oldDirPath)) {
        await promises.rename(oldDirPath, newDirPath);
        console.log(`➡️ /${dir} moved to /${newDir}/${dir}.`);
      } else {
        console.log(`➡️ /${dir} does not exist, skipping.`);
      }
    }

    // Create new /app directory
    const newAppDirPath = join(root, newAppDir);
    await promises.mkdir(newAppDirPath, { recursive: true });
    console.log("\n📁 New /app directory created.");

    // Create index.tsx
    const indexPath = join(newAppDirPath, "index.tsx");
    await promises.writeFile(indexPath, indexContent);
    console.log("📄 app/index.tsx created.");

    // Create _layout.tsx
    const layoutPath = join(newAppDirPath, "_layout.tsx");
    await promises.writeFile(layoutPath, layoutContent);
    console.log("📄 app/_layout.tsx created.");

    console.log("\n✅ Project reset complete. Next steps:");
    console.log(
      "1. Run `npx expo start` to start a development server.\n2. Edit app/index.tsx to edit the main screen.\n3. Delete the /app-example directory when you're done referencing it."
    );
  } catch (error) {
    console.error(`Error during script execution: ${error}`);
  }
};

moveDirectories();
