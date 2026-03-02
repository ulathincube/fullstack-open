const { test, describe, beforeEach, expect } = require('@playwright/test');

const { loginWith, createBlogPost } = require('./test-helper');

describe('Blog App', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        username: 'joshcomeau',
        name: 'Josh W. Comeau',
        password: 'https://www.joshwcomeau.com/',
      },
    });
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'robinwieruch',
        name: 'Robin Wieruch',
        password: 'https://www.robinwieruch.de/',
      },
    });
    await page.goto('http://localhost:5173');
  });

  test('Login Form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page.getByLabel('Username')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();

    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
  });

  describe('Login', () => {
    test('Succeeds with the correct credentials', async ({ page }) => {
      await loginWith(page, 'joshcomeau', 'https://www.joshwcomeau.com/');
      await expect(
        page.getByText('joshcomeau  logged in successfully!'),
      ).toBeVisible();
    });

    test('Fails with incorrect login credentials', async ({ page }) => {
      await loginWith(page, 'joshcomeau', 'https://www.robinwieruch.de/');
      await expect(
        page.getByText('joshcomeau  logged in successfully!'),
      ).not.toBeVisible();

      await expect(
        page.getByText('Invalid username or password'),
      ).toBeVisible();
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      // login

      await loginWith(page, 'joshcomeau', 'https://www.joshwcomeau.com/');

      // create note
      const firstBlogPost = {
        title: 'Brand New Layouts with CSS Subgrid',
        author: 'Josh W. Comeau',
        url: 'https://www.joshwcomeau.com/css/subgrid/',
        likes: String(600),
      };
      await createBlogPost(page, firstBlogPost);

      // create note
      const secondBlogPost = {
        title: 'Sprites on the Web',
        author: 'Josh W. Comeau',
        url: 'https://www.joshwcomeau.com/animation/sprites/',
        likes: String(300),
      };

      await createBlogPost(page, secondBlogPost);

      const thirdBlogPost = {
        title: 'The Big Gotcha With @starting-style',
        author: 'Josh W. Comeau',
        url: 'https://www.joshwcomeau.com/css/starting-style/',
        likes: String(1500),
      };

      await createBlogPost(page, thirdBlogPost);
    });

    test('A blog post can be created', async ({ page }) => {
      const blogPost = {
        title: 'Springs and Bounces in Native CSS',
        author: 'Josh W. Comeau',
        url: 'https://www.joshwcomeau.com/animation/linear-timing-function/',
        likes: String(100),
      };
      await createBlogPost(page, blogPost);

      await expect(
        page.getByText('Springs and Bounces in Native CSS Josh W. Comeau', {
          exact: true,
        }),
      ).toBeVisible();
    });

    test('Blog post can be liked', async ({ page }) => {
      const firstBlogElement = page.getByRole('listitem').first();

      await firstBlogElement.getByRole('button', { name: 'View' }).click();

      const likesPostElement = firstBlogElement
        .getByText('Likes')
        .locator('..');

      const likesPostText = await likesPostElement.textContent();

      const regex = /(\d+)/;
      const match = `${likesPostText}`.match(regex);

      await firstBlogElement.getByRole('button', { name: 'Like' }).click();

      const numericalNextValue = parseInt(match[0]) + 1;

      await expect(
        likesPostElement.getByText(`${numericalNextValue}`),
      ).toBeVisible();
    });

    test('Blog post can be deleted by creator', async ({ page }) => {
      // remove post

      page.on('dialog', dialog => dialog.accept());

      await page
        .getByRole('listitem')
        .first()
        .getByRole('button', { name: 'Remove' })
        .click();

      // await page.getByRole('button', { name: 'Remove' }).click();

      await expect(
        page.getByText('The Big Gotcha With @starting-style Josh W. Comeau', {
          exact: true,
        }),
      ).not.toBeVisible();
    });

    test('Only user who created post has option to remove it', async ({
      page,
    }) => {
      const firstBlogElement = page.getByRole('listitem').first();

      await expect(
        firstBlogElement.getByRole('button', { name: 'Remove' }),
      ).toBeVisible();
    });

    test('User who did not create blog post cannot remove it', async ({
      page,
    }) => {
      await page.getByRole('button', { name: 'Log Out' }).click();
      await loginWith(page, 'robinwieruch', 'https://www.robinwieruch.de/');

      await expect(
        page
          .getByRole('listitem')
          .first()
          .getByText('The Big Gotcha With @starting-style Josh W. Comeau', {
            exact: true,
          }),
      ).toBeVisible();

      await expect(
        page
          .getByRole('listitem')
          .first()
          .getByRole('button', { name: 'Remove' }),
      ).not.toBeVisible();
    });

    test('Blogs are arranged in order from highest likes to lowest', async ({
      page,
    }) => {
      const blogList = await page.getByRole('listitem').all();
      // await blogList.getByRole('button', { name: 'View' }).click();

      const regex = /Likes(\d+)/;
      const blogOrderLikes = [];

      for (const row of blogList) {
        const string = await row.textContent();
        const match = string.match(regex);
        blogOrderLikes.push(parseInt(match[1]));
      }

      const sortedBlogOrderLikes = [...blogOrderLikes];
      sortedBlogOrderLikes.sort((current, next) => next - current);

      expect(blogOrderLikes).toEqual(sortedBlogOrderLikes);
    });
  });
});
