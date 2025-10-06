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

## The entity grid
Only used one time in the main template. I use directly the component in the template.
```javascript
    /**
     * Grid of all the simple fetch and set in the consultData.list property.
     * @type {JSX.Element}
     */
    const entityGrid = (
        <div className="py-4 position-relative">
            {currentLoadingState.state === LoadingStates.LOADING.state &&
                <Spinner label={currentLoadingState.label} fixed={false} absolute={false} className={"rounded-2 bg-primary-lighter"} loadingState={currentLoadingState} />
            }
            {
                consultData.list?.length > 0 &&
                <EntitiesGrid
                    className={"row"}
                    columnClass={"col-12 col-sm-6 col-lg-4 col-xl-3 g-4 "}
                    feed={consultData.list.filter(el => el.type !== "Taxonomy")}
                    badgesInfo={props.badgesInfo}
                />
            }
            {currentLoadingState.state === LoadingStates.LOADING_MORE.state &&
                <Spinner label={currentLoadingState.label} fixed={false} absolute={false} className={"rounded-2 bg-primary-lighter"} loadingState={currentLoadingState} />
            }
            {
                (currentLoadingState.state === LoadingStates.LOADING_COMPLETE.state || currentLoadingState.state === LoadingStates.DEFAULT.state) &&
                consultData.list?.length <= 0 &&
                <div className={"alert alert-primary p-4 text-center"}>{lang.listNoResult}</div>
            }
        </div>
    );
```


