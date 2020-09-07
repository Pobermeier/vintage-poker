let templates = require('./index');

templates = Object.values(templates).map((template) => template());

const templateList = ((templates) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vintage Poker | Transactional Mails</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
</head>

<body>
  <div style="text-align:center" class="container">
    <h2 class="my-5">List of transactional mail-templates</h2>  
    <table class="table table-striped">
      <thead class="thead-dark">
        <th>ID</th>
        <th>Template Name</th>
        <th>Template Link</th>
      </thead>
      <tbody style="border-collapse: collapse;">
        ${templates.map(
          (template) => `
        <tr>
          <td><strong>${template.id}</strong></td>
          <td>${template.name}</td>
          <td><a href="/api/mails/${template.id}">Link</a></td>
        </tr>`,
        )}
      </tbody>
    </table>
  </div>
</body>

</html>
`)(templates);

module.exports = { templates, templateList };
