import nextConfig from "@/next.config";

export const paginationConfig = {
    pageSize: nextConfig.publicRuntimeConfig.pagination.limit,
    currentPage: 1,
    sort: nextConfig.publicRuntimeConfig.pagination.sort,
}