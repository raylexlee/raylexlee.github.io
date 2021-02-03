const imgSrc = c => `http://open-lit.com/mpf/${c.substr(0,1).toLowerCase()}/${c.toUpperCase()}.BMP`;
const imgElement = c => 
  `<img src="${imgSrc(c)}" align=absmiddle border=0>`;
document.querySelector('div').innerHTML = ` <table> <tr>
${ Object.keys(x)
  .map(key => `<td>${key}</td>
  <td>${imgElement(key)}</td>
  <td>${x[key]}</td>`)
  .join('</tr><tr>') }
        </tr></table>`;
