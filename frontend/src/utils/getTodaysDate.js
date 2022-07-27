export default function getTodaysDate() {
  /**
   * Pega a data atual
   */
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  /**
   * Faz a formatação da data
   */
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;

  return `${day}/${month}/${year}`;
}
