# Sveltekit - Keycloak

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Starting a project

```bash
# install node modules
npm install
```

## Developing

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn install`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## About keycloak

Follow the instructions here https://www.keycloak.org/getting-started/getting-started-docker#_start_keycloak

With the only difference on the `Create Client` part, instead of adding the urls they suggest use your application url which should be `http://localhost:5173` and make sure to have this url properly set on the `Root URL` field just like the image below.

![create client example](/createClient.png)

Now that you have your docker running in the port 8080, find the file `.env.example` make a copy and rename the copy to `.env` this file will be read to get keycloak configuration.

That should be it, test the connection running this project and going to `hppt:localhost:5173`
