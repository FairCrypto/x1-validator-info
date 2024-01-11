import { execSync } from "child_process";

// make sure the contracts are compiled before running tests
before(function () {
  if (!process.argv.join(" ").includes("hardhat")) {
    console.log("Compiling contracts...");
    try {
      execSync("npm run compile");
    } catch (error: any) {
      process.exit(error.status);
    }
  }
});
