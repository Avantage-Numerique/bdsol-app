module.exports = {
    loader: "sass-loader",
    options: {
        sassOptions: {
            quietDeps: true,
            silenceDeprecations: ["mixed-decls", "color-functions", "global-builtin", "import"],
        },
    },
};
