export const getDateFormatt = (date: string) => {
  const dt = new Date(date);
  return `${dt.getDate().toString().padStart(2, '0')}-${dt.getMonth().toString().padStart(2, '0')}-${dt.getFullYear()}`
}
export const getTimeFormatt = (date: string) => {
  const dt = new Date(date);
  return `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`
}