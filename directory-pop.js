// Reverses what directory-out did, namely syncing the
// named directory from the destination directory back
// to the cache directory, and optionally deleting it
// from the destination directory.
const core = require('@actions/core');
const execSync = require('child_process').execSync;
const fs = require('fs');

function isDirSync(aPath) {
    const result = fs.statSync(aPath).isDirectory();
    // No error if something exists with the name so
    // throw an error if not a directory.
    if (!result) {
        throw `${aPath} is not a directory`
    }
}

function dirExists(aPath) {
    try {
        const result = fs.statSync(aPath).isDirectory();
        if (result) {
            return true;
        }
    } catch (e) {
        return false;
    }

    return false;
}

function rsync(fromPath, toPath) {
    execSync(
        `rsync -qcru ${fromPath}/ ${toPath} --delete`,
        { encoding: 'utf-8' }
    );
}

try {
    const cacheDirectory = core.getInput("cacheDirectory", { required: true });
    const namedDirectory = core.getInput("namedDirectory", { required: true });
    var destinationDirectory = core.getInput("destinationDirectory");
    // If the destination directory wasn't specified, default to $GITHUB_WORKSPACE
    if (!destinationDirectory) {
        destinationDirectory = process.env["GITHUB_WORKSPACE"];
    }
    const popAtEnd = core.getInput("popAtEnd");
    const deleteAtEnd = core.getInput("deleteAtEnd");
    // Check that cache and dest exist and are directories.
    isDirSync(cacheDirectory);
    isDirSync(destinationDirectory);
    // If the named directory exists ...
    if (dirExists(`${destinationDirectory}/${namedDirectory}`)) {
        if (popAtEnd === "true") {
            rsync(`${destinationDirectory}/${namedDirectory}`, `${cacheDirectory}/${namedDirectory}`);
            console.log(`Synced ${destinationDirectory}/${namedDirectory} to ${cacheDirectory}`);
        } else {
            console.log("Skipping sync back to cache directory");
        }
        if (deleteAtEnd === "true") {
            fs.rmdirSync(
                `${destinationDirectory}/${namedDirectory}`,
                { recursive: true }
            );
            console.log(`Deleted ${destinationDirectory}/${namedDirectory}`);
        } else {
            console.log("Skipping deletion of named directory");
        }
    } else {
        console.log(`${destinationDirectory}/${namedDirectory} does not exist`);
    }
} catch (error) {
    core.setFailed(error.message);
}
