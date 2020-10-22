// Move the named directory (if it exists) out of the cache directory
// into the destination directory.
const core = require('@actions/core');
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
    // If the named directory exists, move it.
    if (dirExists(`${cacheDirectory}/${namedDirectory}`)) {
        fs.renameSync(`${cacheDirectory}/${namedDirectory}`, `${destinationDirectory}/${namedDirectory}`);
    }
} catch (error) {
    core.setFailed(error.message);
}
