export function validateFile(file) {
  const isJs = file.type === "text/javascript" || file.name.endsWith(".js");
  return isJs;
}
