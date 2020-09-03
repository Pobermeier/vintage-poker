let templates = require('./index');

templates = Object.values(templates).map((template) => template());

const templateList = ((templates) => `
<style>
table, th, td {
  border: 1px solid black;
}
</style>

<div style="text-align:center">
  <h1>List of all transactional mail templates</h1>  
  <table style="text-align: center; border-collapse: collapse; min-width: 600px; margin:0 auto;">
    <thead style="background-color: cyan; border-collapse: collapse;">
      <th>ID</th>
      <th>Template Name</th>
      <th>Template Link</th>
    </thead>
    <tbody style="border-collapse: collapse;">
      ${templates.map(
        (template) => `
      <tr>
        <td>${template.id}</td>
        <td>${template.name}</td>
        <td><a href="/api/mails/${template.id}">Link</a></td>
      </tr>`,
      )}
    </tbody>
  </table>
</div>
`)(templates);

module.exports = { templates, templateList };
