async function loginWith(page, username, password) {
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
}

async function createBlogPost(page, { title, author, url, likes }) {
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByLabel('Title').fill(title);
  await page.getByLabel('Author').fill(author);
  await page.getByLabel('Url').fill(url);
  await page.getByLabel('Likes').fill(likes);
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByText(`${title} ${author}`, { exact: true }).waitFor();
}

module.exports = {
  loginWith,
  createBlogPost,
};
