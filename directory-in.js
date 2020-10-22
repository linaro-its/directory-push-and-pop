// Reverses what directory-out did, namely moving the
// named directory out of the destination directory back
// into the cache directory.
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
    if (dirExists(`${destinationDirectory}/${namedDirectory}`)) {
        fs.renameSync(`${destinationDirectory}/${namedDirectory}`, `${cacheDirectory}/${namedDirectory}`);
        console.log(`Moved ${destinationDirectory}/${namedDirectory} to ${cacheDirectory}`);
    } else {
        console.log(`${destinationDirectory}/${namedDirectory} does not exist`);
    }
} catch (error) {
    core.setFailed(error.message);
}
