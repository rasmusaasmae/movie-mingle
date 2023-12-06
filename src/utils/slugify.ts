import slugify from "slugify";

export function slugifyTitle(value: string) {
  return slugify(value, {
    replacement: "-",
    // remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: true,
    locale: "en",
    trim: true,
  });
}
