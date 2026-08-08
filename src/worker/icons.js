/* Icon-Assets liegen als echte PNG-Dateien in assets/icons/ und werden beim Build
   per esbuild base64-Loader eingebunden. Laufzeitverhalten unveraendert. */
import ICON_180 from "../../assets/icons/icon-180.png";
import ICON_192 from "../../assets/icons/icon-192.png";
import ICON_512 from "../../assets/icons/icon-512.png";
import ICON_32 from "../../assets/icons/icon-32.png";
import ICON_MARK from "../../assets/icons/logo-mark.png";

function iconResponse(b64str) {
  const bin = atob(b64str);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Response(bytes, {
    headers: { "content-type": "image/png", "cache-control": "public, max-age=604800" }
  });
}

export { ICON_180, ICON_192, ICON_512, ICON_32, ICON_MARK, iconResponse };
