// Syncs the named directory (if it exists) from the cache directory
// to the destination directory.
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
    // Check that cache and dest exist and are directories.
    isDirSync(cacheDirectory);
    isDirSync(destinationDirectory);
    // If the named directory exists, sync it.
    if (dirExists(`${cacheDirectory}/${namedDirectory}`)) {
        rsync(`${cacheDirectory}/${namedDirectory}`, `${destinationDirectory}/${namedDirectory}`);
        console.log(`Synced ${cacheDirectory}/${namedDirectory} to ${destinationDirectory}`);
    } else {
        console.log(`${cacheDirectory}/${namedDirectory} does not exist`);
    }
} catch (error) {
    core.setFailed(error.message);
}
