# CSS Custom Properties

## Creating themes with custom properties

### Using a Toggle

An example of using custom properties to change between light and dark themes using a toggle.

```html
<head>
  <style>
    :root.dark {
      --border-btn: 1px solid rgb(220, 220, 220);
      --color-base-bg: rgb(18, 18, 18);
      --color-base-text: rgb(240, 240, 240);
      --color-btn-bg: rgb(36, 36, 36);
    }

    :root.light {
      --border-btn: 1px solid rgb(36, 36, 36);
      --color-base-bg: rgb(240, 240, 240);
      --color-base-text: rgb(18, 18, 18);
      --color-btn-bg: rgb(220, 220, 220);
    }

    body,
    .theme-toggle {
      color: var(--color-base-text);
    }

    body {
      background-color: var(--color-base-bg);
      padding: 10px;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    p {
      font-size: 1.5rem;
    }

    .theme-toggle {
      background-color: var(--color-btn-bg);
      border: var(--border-btn);
      font-size: 1.125rem;
      padding: 10px 20px;
    }

    .theme-toggle:hover {
      cursor: pointer;
    }

    .theme-toggle:focus {
      outline: var(--border-btn);
    }
  </style>
</head>
<div class="container">
  <p>
    You're now viewing this example with the
    <span class="theme-name">dark</span> theme!
  </p>
  <button class="theme-toggle">Toggle Theme</button>
</div>
<script>
  function setTheme() {
    const root = document.documentElement;
    const newTheme = root.className === 'dark' ? 'light' : 'dark';
    root.className = newTheme;

    document.querySelector('.theme-name').textContent = newTheme;
  }

  document.querySelector('.theme-toggle').addEventListener('click', setTheme);
</script>
```

### Using Media queries

Giving users the ability to toggle a theme themselves is great, but there’s another option for setting a theme that you may have come across on certain sites or applications: using the user’s theme setting from their operating system or user agent (like a browser). This can be done using the `prefers-color-scheme` media query, which lets you apply different styles based on the user’s device or settings, like screen size or theme preference (light/dark mode).

We first added custom properties on the `:root` element outside of the media query. This gives us a default theme in case a user doesn’t have a preference set on their OS or user agent, or if a browser doesn’t support the media query. In this case, we’re using our “light” theme colors as the default. Then we added a `prefers-color-scheme` media query for when a user has a dark theme set in their preferences.

```html
<head>
  <style>
    :root {
      --border-btn: 1px solid rgb(36, 36, 36);
      --color-base-bg: rgb(240, 240, 240);
      --color-base-text: rgb(18, 18, 18);
      --color-btn-bg: rgb(220, 220, 220);
      --theme-name: 'light';
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --border-btn: 1px solid rgb(220, 220, 220);
        --color-base-bg: rgb(18, 18, 18);
        --color-base-text: rgb(240, 240, 240);
        --color-btn-bg: rgb(36, 36, 36);
        --theme-name: 'dark';
      }
    }

    body {
      background-color: var(--color-base-bg);
      color: var(--color-base-text);
      padding: 10px;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    p {
      font-size: 1.5rem;
    }

    .theme-name::after {
      content: var(--theme-name);
    }
  </style>
</head>
<div class="container">
  <p>
    Based on your theme setting in your OS or user agent, you're now viewing
    this example with the <span class="theme-name"></span> theme!
  </p>
</div>
```
