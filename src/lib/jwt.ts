export function getJwtRemainTime(token: string): number {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000;
    const now = Date.now();
    return Math.max(0, Math.floor((exp - now) / 1000));
  } catch {
    return 0;
  }
}
