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

  // Filtro data per RSS (RFC3339)
  eleventyConfig.addFilter("dateToRfc3339", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return d.toISOString();
  });

  // Collezione "articles": tutti i post, dal più recente al più vecchio.
  eleventyConfig.addCollection("articles", (collectionApi) => {
    return collectionApi.getFilteredByTag("article").sort((a, b) => b.date - a.date);
  });

  // Collezione "frontPageArticles": seleziona il primo articolo valido come lead (escludendo hideFromHome)
  // e restituisce il resto (incluso l'oroscopo) per la colonna di destra e la sezione inferiore.
  eleventyConfig.addCollection("frontPageArticles", (collectionApi) => {
    const all = collectionApi.getFilteredByTag("article").sort((a, b) => b.date - a.date);
    const lead = all.find(item => !item.data.hideFromHome);
    const remaining = all.filter(item => item.url !== (lead ? lead.url : null));
    return { lead, remaining };
  });

  // Collezione "feedAll": unisce gli articoli alle pagine aggiornabili (es. necrologi, avvisi)
  eleventyConfig.addCollection("feedAll", (collectionApi) => {
    const articles = collectionApi.getFilteredByTag("article");
    const updates = collectionApi.getFilteredByTag("feedUpdate");
    return [...articles, ...updates].sort((a, b) => b.date - a.date);
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
