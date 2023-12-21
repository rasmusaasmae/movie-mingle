import slugify from "slugify";

export function slugifyUrl(value: string) {
  return slugify(value, {
    replacement: "-",
    // remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: true,
    locale: "en",
    trim: true,
  });
}
