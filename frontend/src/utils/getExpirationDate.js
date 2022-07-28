export default function getExpirationDate() {
  /**
   * Pega a data de validade
   */
  let date = new Date();
  let day = date.getDate();
  let expirationMonth = date.getMonth() + 2;
  let year = date.getFullYear();

  /**
   * Faz a formatação da data
   */
  if (day < 10) day = "0" + day;
  if (expirationMonth < 10) expirationMonth = "0" + expirationMonth;

  return `${day}/${expirationMonth}/${year}`;
}
