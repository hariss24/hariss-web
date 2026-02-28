module.exports = function (eleventyConfig) {
    // Copier le dossier assets entier vers _site/assets (les images, js, etc.)
    // On ne copie pas le CSS si Tailwind gère ça, mais ça dépend des fichiers.
    // Faisons un passthrough copy simple pour le dossier assets entier.
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("projet");
    eleventyConfig.addPassthroughCopy("src/admin/config.yml");

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes"
        }
    };
};
