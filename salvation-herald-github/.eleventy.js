module.exports = function (eleventyConfig) {
  // Copia le cartelle statiche (css, immagini) nell'output così com'è.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");

  // Capitalizza l'iniziale di ogni parola (per le date italiane).
  const capWords = (s) => s.replace(/(^|\s)\p{L}/gu, (m) => m.toUpperCase());

  // Filtro data estesa in italiano: 2026-06-02 -> "Martedì 2 Giugno 2026"
  eleventyConfig.addFilter("readableDate", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return capWords(d.toLocaleDateString("it-IT", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
      timeZone: "UTC",
    }));
  });

  // Filtro data breve in italiano per l'archivio: 2026-06-02 -> "2 Giu 2026"
  eleventyConfig.addFilter("shortDate", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return capWords(d.toLocaleDateString("it-IT", {
      year: "numeric", month: "short", day: "numeric", timeZone: "UTC",
    }));
  });

  // Collezione "articles": tutti i post, dal più recente al più vecchio.
  eleventyConfig.addCollection("articles", (collectionApi) => {
    return collectionApi.getFilteredByTag("article").sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
