// Chuẩn hóa hậu tố của các bản cũ; không thay thành phần hoặc số bộ.
const copySuffix = /(?:\s*\((?:bản chỉnh riêng|bản sao từ giỏ|bản sao)\))+\s*$/u;
export function normalizeGiftName(name) {
  return copySuffix.test(name) ? `${name.replace(copySuffix, '').trim()} (bản sao)` : name;
}
export function getGiftCopyName(name) {
  return `${name.replace(copySuffix, '').trim()} (bản sao)`;
}
