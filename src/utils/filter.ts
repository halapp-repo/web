function contains(str: string, sub: string) {
  if (sub === '') return true;
  if (!sub || !str) return false;
  sub = '' + sub;
  if (sub.length > str.length) return false;
  const ascii = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  return ascii(str).includes(ascii(sub));
}

function areStringsEqual(str1: string | undefined, str2: string | undefined): boolean {
  if (!str1 || !str2) {
    return false;
  }
  if (
    str1
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') ===
    str2
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  ) {
    return true;
  }
  return false;
}

export { contains, areStringsEqual };
