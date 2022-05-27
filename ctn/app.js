const today = new Date();
const yesterday = new Date(today);
const twodaysbefore = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
twodaysbefore.setDate(twodaysbefore.getDate() - 2);
const yyyyMMdd = oneday => oneday.toLocaleDateString('en-GB').split('/').reverse().join('');
const pdf = oneday => `https://www.chp.gov.hk/files/pdf/ctn_${yyyyMMdd(oneday)}.pdf`;
const url = [pdf(yesterday), pdf(twodaysbefore)];
function handleClick(radio) {
  window.open(url[radio.value]);
}
document.addEventListener("DOMContentLoaded", function(event) {
  window.open(url[0]);
});
  