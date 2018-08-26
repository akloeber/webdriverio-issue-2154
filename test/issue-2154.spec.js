const HTML = `
<table>
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
</table>
`

describe('suite for issue 2154', function() {

  beforeAll(function (done) {

    browser.addCommand('extractDataRow', function (rowIdx) {
      const rows = this.elements('tr');
      return rows.value[rowIdx];
    });

    browser.addCommand('extractContact', function () {
      const contactCell = this.element('td:nth-of-type(2)');

      // try to do something with the cell content
      const contact = contactCell.getText();
      // NOK - prints "CONTACT: { state: 'pending' }" instead of cell content ("Smith")
      console.log('2 - Contact:', contact);

      return contactCell;
    });

  });

  it('test for issue 2154', function() {
    let secondRow;
    let contactCell;

    browser.url('data:text/html,' + HTML);
    const table = browser.element('table');

    // traverse without commands
    secondRow = table.elements('tr').value[1];
    contactCell = secondRow.element('td:nth-of-type(2)');

    // OK - returns content of target cell ("Smith")
    console.log('1 - Text: ', contactCell.getText());

    // traverse with commands
    secondRow = table.extractDataRow(1);
    contactCell = secondRow.extractContact();

    // NOK - throws error "contactEl.getText is not a function"
    console.log('3 - Text: ', contactCell.getText());
  })
});
