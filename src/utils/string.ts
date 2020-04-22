export const getIdFromUrl = (url: string): string => url.replace(/(.+\/)(\d+$)/, '$2');
