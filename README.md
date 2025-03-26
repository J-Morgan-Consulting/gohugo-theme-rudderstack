# Rudderstack Theme for Hugo

This is a reusable **Rudderstack Hugo theme**, designed to give your static site the ability to load and use Rudderstack as well as use a Cookie Consent Manager (if applicable) so that you can easily capture and manage the flow of events that your website users make on your website.  We have chosen ```https://cookieconsentjar.com/``` as our choice in consent manager because of its simplicity, however this can easily be modified for other platforms as well.

It includes:

- **Templates** – A library of templates for the partials required to load Rudderstack as well as your Consent Manager into the base template. 
- **JS** – Modular JavaScript (ES Modules) acting as a wrapper to capture the page load as well as make it easy send future events. 

---

## Prerequisites

- **Hugo extended** ≥ `0.145.0`
- **Node.js + npm** (for building assets with Webpack)
- **Rudderstack License**
- **The Cookie Jar license** (if applicable)

---

## Getting Started
There are a number of steps for you to complete to import this into your hugo website.
### 1. Integrate the repo into your project
```bash
    git submodule add https://github.com/J-Morgan-Consulting/gohugo-theme-rudderstack.git themes/rudderstack
```

### 2. Set Up Webpack Build (from Theme)
Copy build-related files into your project root:
```bash
cp themes/rudderstack/build/webpack.config.js .
cp themes/rudderstack/build/package.template.json .
```
Then:
```bash
# Merge package.template.json into your root package.json
npm install
npm run build
```

### 3 Add site variables for Rudderstack or The Cookie Jar
Once you have an account for each you can add the details in the params.toml file
*Note that if you don't want to use consent then you can just delete the params under [consent].  If you do this then you will also need to modify the webpack to align to the pageLoadedNoConsent.js file as well*

### 6. Build Into Your Templates & Content
- Add the ```head_tracking_bundle.html``` partial into the head of your website.
- Load the pageLoaded dist at the bottom of the page.

---
## Other Notes
- The theme supports theme stacking – you can layer another override theme on top.
- All reusable components are modular and overridable from the root project.