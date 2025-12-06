export function fitEmails(emails: string[], maxChars: number) {
  if (!emails || emails.length === 0) return { fitCount: 0 };

  let count = 0;
  let totalLength = 0;

  for (let i = 0; i < emails.length; i++) {
    const emailLen = emails[i].length;
    const sepLen = i > 0 ? 2 : 0;

    if (totalLength + emailLen + sepLen <= maxChars) {
      totalLength += emailLen + sepLen;
      count++;
    } else break;
  }

  if (count === 0) return { fitCount: 1 };

  return { fitCount: count };
}
