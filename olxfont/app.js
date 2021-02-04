const imgSrc = c => `http://open-lit.com/mpf/${c.substr(0,1).toLowerCase()}/${c.toUpperCase()}.BMP`;
const imgElement = c => 
  `<img src="${imgSrc(c)}" align=absmiddle border=0>`;
document.querySelector('div').innerHTML = ` <table> <tr>
${ Object.keys(x)
  .map(key => `<td>${key}</td>
  <td><input type="checkbox" name="${key}" value="${x[key]}"></td>
  <td>${imgElement(key)}</td>
  <td>${x[key]}</td>`)
  .join('</tr><tr>') }
        </tr></table>`;
function CopyCodes() {
  const textHint = document.getElementById('idHint');
  textHint.value = Object.keys(x).filter(e => document.getElementsByName(e)[0].checked)
    .map(e => 
      `.replace(/<[^<]+\\/${e}\\.BMP[^>]+>/gm, '${x[e]}')`)
    .join('\n');
  const r = document.createRange();
  r.selectNode(textHint);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
}
        
