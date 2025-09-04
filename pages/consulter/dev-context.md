in the method : 
```javascript
function updateUrlQueryWithCurrentPage(updatedPaginationMeta) {
    window.history.pushState({ page: currentPage }, '', `/consulter/${filtersUrl.get(consultData.entities[0])}${queryVars.toString() !== "" ? "?" : ""}${queryVars.toString()}`);
}
```

we changed the URI directly with the window method.

## To use the router 
And get SSR data from page change we can trigger the ssr data by pushing the router state.
```javascript
router.push({
    pathname: '/consulter/'+filtersUrl.get(consultData.entities[0]),
    query: currentQuery,
}, undefined, {
    shallow: true,
    scroll: false
});

```


