# Directory push/pop action

This action synchronises the contents of the named directory (if it exists) from the specified cache directory to the (optionally specified) destination directory. If the destination is not specified, it defaults to `$GITHUB_WORKSPACE`.

When the job that uses this action ends, the action optionally synchronises the directory back to the cache directory and optionally deletes the directory.

## Inputs

### `cacheDirectory`

**Required** Path to the directory used to store directories

### `namedDirectory`

**Required** Name of the directory to move

### `destinationDirectory`

Where to move the named directory to

### `popAtEnd`

Set to `true` if you want the named directory to be synced back to the cache directory at the end of the workflow.

### `deleteAfterPop`

Set to `true` if you want the named directory to be deleted from the destination directory at the end of the workflow.

## Example usage

```yaml
uses: linaro-its/directory-push-pop@v2
with:
    cacheDirectory: /srv/cache
    namedDirectory: $SITE_URL
    popAtEnd: true
```
