import { defaultReplacements } from "./replacements";

function escapeRegExp(str) {
  if (typeof str !== "string") {
    throw new TypeError("Expected a string");
  }
  return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

const slugify = (str, delimiter) => {
  const replacements = defaultReplacements;

  try {
    let processedStr = str.toString().trim();

    replacements.forEach(([from, to]) => {
      processedStr = processedStr.replace(
        new RegExp(escapeRegExp(from), "g"),
        to
      );
    });

    // Ensure delimiter is a non-empty string
    if (typeof delimiter !== "string" || delimiter === "") {
      delimiter = "-";
    }

    const escapedDelimiter = escapeRegExp(delimiter);

    processedStr = processedStr
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/@/g, " at ")
      .replace(/'/g, "")
      .replace(/#+([a-zA-Z0-9_]+)/gi, "hashtag $&")
      .replace(/#([0-9]\d*)/g, "number $&")
      .replace("hashtag number", "number")
      .replace(/--+/g, " ")
      .replace(/[^a-zA-Z0-9_\u3400-\u9FBF\s-]/g, " ")
      .replace(/\s+/g, delimiter)
      .replace(new RegExp(`^${escapedDelimiter}+`), "")
      .replace(new RegExp(`${escapedDelimiter}+$`), "");

    return processedStr;
  } catch (error) {
    console.error(`Error in generate method: ${error.message}`);
    throw error;
  }
};

export default slugify;
