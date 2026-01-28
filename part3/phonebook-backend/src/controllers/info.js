const { readFileSync } = require('node:fs');
const { join } = require('node:path');

function getInfo(req, res) {
  const currentTime = new Date().toString();
  const allPersonsData = readFileSync(join(__dirname, '../../', 'data.json'), {
    encoding: 'utf8',
  });

  const parsedAllPersonsData = JSON.parse(allPersonsData);

  const templateData = `<p>Phonebook has info for ${parsedAllPersonsData.length} people.</p>
                        <p>${currentTime}</p>`;

  res.status(200).send(templateData);
}

module.exports = getInfo;
