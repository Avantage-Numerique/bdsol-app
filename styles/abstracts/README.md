# SCSS Abstracts Layer - Bootstrap Bridge

This directory implements a modern **bridge pattern** to wrap Bootstrap 5 behind a clean `@use`/`@forward` API while containing Bootstrap's `@import` deprecation warnings.

## 📁 File Structure

```
styles/abstracts/
├── _index.scss                  → Main entry point (use this in components)
├── _bootstrap-bridge.scss       → Public API for Bootstrap + custom vars
├── _bootstrap-consolidated.scss → Internal: loads Bootstrap in correct order
├── _bootstrap-global.scss       → Bootstrap CSS output (use once globally)
├── _avnu-silent.scss           → AVNU-specific variables
├── _tokens.scss                 → Design tokens reference
├── _mixins.scss                 → Custom mixins
├── _variables.scss              → Additional variables
└── README.md                    → This file
```

## 🎯 Usage

### In Component Modules (`.module.scss`)

```scss
@use "abstracts" as *;

.my-component {
    color: $primary; // ← from custom.scss or Bootstrap
    padding: $spacing-md; // ← from custom.scss
    border-radius: $border-radius; // ← from Bootstrap variables
    background: tint-color($primary, 20%); // ← from Bootstrap functions

    @include media-breakpoint-up(md) {
        // ← from Bootstrap mixins
        padding: $spacing-lg;
    }
}
```

### In Global Stylesheets (NOT in modules)

The global Bootstrap CSS is imported ONCE in `styles/packages/bootstrap.scss`:

```scss
@use "../abstracts/bootstrap-global";
```

This outputs Bootstrap's CSS (grid, buttons, forms, etc.).

## 🔧 How It Works

### The Bootstrap Loading Order Problem

Bootstrap has strict dependency requirements:

1. **Functions** → color functions like `tint-color()`, `shade-color()`
2. **Mixins** → includes `_assert-ascending()` used by variables
3. **Custom Variables** → your overrides, using Bootstrap functions
4. **Variables** → Bootstrap variables, calling mixins for validation
5. **Maps** → color maps, using variables
6. **Utilities** → utility configuration

### The Solution

We use a **consolidated import strategy**:

```
Component Module
    ↓
@use "abstracts"
    ↓
@forward "bootstrap-bridge"
    ↓
@forward "bootstrap-consolidated"
    ↓
@import in correct order:
  1. bootstrap/functions
  2. bootstrap/mixins
  3. custom.scss
  4. bootstrap/variables
  5. bootstrap/maps
  6. bootstrap/utilities
```

## 📋 File Responsibilities

### `_index.scss`

- Main entry point for components
- Forwards the bootstrap-bridge
- Forwards custom mixins and variables

### `_bootstrap-bridge.scss`

- Public API layer
- Forwards the consolidated Bootstrap
- Clean interface for consumers

### `_bootstrap-consolidated.scss` ⚠️ **Internal Use Only**

- **DO NOT** import directly
- Loads Bootstrap in the correct dependency order
- Uses `@import` (old syntax) because Bootstrap isn't fully compatible with `@use`/`@forward`
- Contains all Bootstrap deprecation warnings

### `_bootstrap-global.scss`

- Outputs actual Bootstrap CSS (grid, buttons, forms, etc.)
- Used ONCE in `styles/packages/bootstrap.scss`
- NOT for component modules

### `custom.scss`

- Your color palette and Bootstrap overrides
- Loaded AFTER functions/mixins, BEFORE Bootstrap variables
- Can use Bootstrap functions like `lighten()`, `tint-color()`

## ✅ Benefits

1. **Clean API**: Components use `@use "abstracts" as *` - simple and modern
2. **Contained Warnings**: All `@import` deprecation warnings are in `_bootstrap-consolidated.scss`
3. **Correct Loading Order**: Functions → Mixins → Custom → Variables → Maps
4. **No Duplicate Imports**: Everything flows through one consolidated path
5. **Future-Proof**: Easy to swap Bootstrap when it supports `@use`/`@forward` natively

## 🚫 Common Mistakes to Avoid

### ❌ DON'T import Bootstrap directly

```scss
// BAD - Don't do this!
@import "bootstrap/scss/variables";
@use "bootstrap/scss/mixins";
```

### ❌ DON'T use abstracts in global styles

```scss
// BAD - Use bootstrap-global instead
@use "abstracts" as *; // This won't output CSS
```

### ❌ DON'T import bootstrap-consolidated directly

```scss
// BAD - It's internal use only
@use "abstracts/bootstrap-consolidated";
```

### ✅ DO use abstracts in component modules

```scss
// GOOD
@use "abstracts" as *;

.button {
    @include button-variant($primary, $primary);
}
```

### ✅ DO use bootstrap-global for CSS output

```scss
// GOOD - In global stylesheet only
@use "abstracts/bootstrap-global";
```

## 🔄 Migration Guide

### Old Way (Direct Bootstrap Import)

```scss
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/mixins";

.my-component {
    color: $primary;
}
```

### New Way (Abstracts Bridge)

```scss
@use "abstracts" as *;

.my-component {
    color: $primary;
}
```

## 🐛 Troubleshooting

### Error: "Undefined mixin"

- Make sure you're using `@use "abstracts" as *;` not `@import`
- Check that mixins are defined in the correct order in `bootstrap-consolidated.scss`

### Error: "Undefined variable"

- Verify `custom.scss` is loaded AFTER functions but BEFORE Bootstrap variables
- Check `bootstrap-consolidated.scss` for the correct order

### Deprecation Warnings

- These are expected and contained in `bootstrap-consolidated.scss`
- They'll disappear when Bootstrap fully supports `@use`/`@forward`
- Don't try to eliminate them by refactoring - it breaks Bootstrap's internals

## 📚 Additional Resources

- [Sass @use and @forward](https://sass-lang.com/documentation/at-rules/use)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [Migrating from @import to @use](https://sass-lang.com/documentation/at-rules/import#migrating-to-use)
