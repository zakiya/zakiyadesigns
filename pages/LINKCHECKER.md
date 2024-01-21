
```bash
cd pages

## This will find mail links
blc https://sandiegosirens.com -rov | grep "BLC_SCHEME" > blc-emails.md 

## This will find and sort all links
blc https://sandiegosirens.com -ro  --exclude="squarespace" --exclude="twitter" | grep "─" | sort --unique  > blc-sorted.md
 
## This will create the full report
blc https://sandiegosirens.com -rov --exclude="squarespace" --exclude="twitter" > blc-full.md
```

-r = recursive
-v = verbose
-o = ordered

-- if you don't use the `--exclude` flag mail links will be excluded

See: https://www.npmjs.com/package/broken-link-checker
