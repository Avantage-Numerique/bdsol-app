export function mapSingleUrl(singleUrl) {
    return {
        label: singleUrl.value.label.value,
        url: singleUrl.value.url.value,
        subMeta: { order: singleUrl.order },
    };
}
