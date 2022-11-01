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

export { contains };
