# Directory push/pop action

This action synchronises the contents of the named directory (if it exists) from the specified cache directory to the (optionally specified) destination directory. If the destination is not specified, it defaults to `$GITHUB_WORKSPACE`.

When the job that uses this action ends, the action optionally synchronises the directory back to the cache directory and optionally deletes the directory.

The action is intended to be used as part of a workflow that is run when `push` happens, particularly on self-runners since they can use local storage to act as a cache.

## Inputs

### `cacheDirectory`

**Required** Path to the directory used to store directories

### `namedDirectory`

**Required** Name of the directory to move

### `destinationDirectory`

Where to move the named directory to

### `popAtEnd`

Defaults to `true`. Set to `false` if you do **not** want the named directory to be synced back to the cache directory at the end of the workflow. This might be the case if the workflow is running tests.

### `deleteAtEnd`

Defaults to `true`. Set to `false` if you do **not** want the named directory to be deleted from the destination directory at the end of the workflow.

## Example usage

```yaml
uses: linaro-its/directory-push-pop@v3
with:
    cacheDirectory: /srv/cache
    namedDirectory: $SITE_URL
    popAtEnd: false
```
