# Directory push/pop action

This action moves the named directory (if it exists) out of the specified cache directory into the (optionally specified) destination directory. If the destination is not specified, it defaults to `$GITHUB_WORKSPACE`.

When the job that uses this action ends, the action moves the directory back to the cache directory.

## Inputs

### `cacheDirectory`

**Required** Path to the directory used to store directories

### `namedDirectory`

**Required** Name of the directory to move

### `destinationDirectory`

Where to move the named directory to

## Example usage

```yaml
uses: linaro-its/directory-push-pop@v1
with:
    cacheDirectory: /srv/cache
    namedDirectory: $SITE_URL
```
