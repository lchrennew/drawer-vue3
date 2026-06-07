---
name: use-drawer
description: Use this skill when implementing sliding drawers, side panels, overlay windows, or detail panels in Vue 3 using drawer-vue3. Use when the user asks to add, create, show, or open a drawer, display a component in a side panel, or use DrawerProvider, DrawerOpener, DrawerFooter components. Activate even if they use informal terms like "弹出层", "侧边栏", "详情面板" or don't explicitly mention the library name. Do NOT use for modals, dialogs, or non-drawer overlays.
---

# use-drawer

Instructions for implementing drawers with `drawer-vue3`.

## Gotchas
- Do NOT open drawers with `inject('openDrawer')`; use template-based `<drawer-opener>` only.
- `<drawer-opener>` does nothing by itself: its default slot exposes `{ open }`, and the trigger inside that slot MUST call `open`.
- ALWAYS pass `:component-props`; use `:component-props="{}"` when the inner component has no props.
- The relevant parent subtree MUST be wrapped in `<drawer-provider>`.
- `<drawer-opener>` and `inject('closeDrawer')` always bind to the nearest `<drawer-provider>`.
- Reuse the current provider when replacing its drawer; add a nested provider only when a child drawer must open while the parent drawer stays visible.
- One provider manages one visible drawer; without a nested provider, an inner opener replaces the current drawer instead of creating a second layer.
- To render a footer, set `footer` on `<drawer-opener>` and use `<drawer-footer>` inside the dynamic component.
- With nested providers, keep the parent `<drawer-footer>` outside or sibling to the new provider so it stays attached to the parent drawer.
- Use kebab-case component tags, ES6 syntax, `<style lang="less">`, no `key` on `v-for`, keep Vue files under 100 lines, and check project rule files before committing.

## Workflow: Opening a Component in a Drawer
- Ensure the target area is wrapped by `<drawer-provider>`.
- Add `<drawer-opener :component="Comp" :component-props="..." :props="{ title, width, ... }">`.
- In the default slot, destructure `{ open }` and bind the trigger action to `open`.
- Add `footer` on the opener only when the inner component uses `<drawer-footer>`.
- In the drawer content, use `defineProps()`, `inject('closeDrawer')`, and `inject('key')` for `componentContext`.
- Before nesting, decide: which provider is nearest, should the current drawer be reused, and should `closeDrawer` close the current or parent drawer.
- If two drawer levels must coexist, wrap the nested opener with a new `<drawer-provider>` and keep the parent footer outside that nested provider.

## Code Examples
- [basic-usage.md](references/basic-usage.md) - Opening a drawer with props
- [no-props-usage.md](references/no-props-usage.md) - When inner component has no props
- [inner-component.md](references/inner-component.md) - Creating the drawer content with footer
- [multi-level.md](references/multi-level.md) - Nested drawers implementation
- [provider-scope.md](references/provider-scope.md) - Deciding whether to reuse or nest a provider

## Checklist
- [ ] `<drawer-provider>` present in parent tree
- [ ] Using `<drawer-opener>` (NOT `inject('openDrawer')`)
- [ ] Default slot uses `{ open }` and the trigger actually calls `open`
- [ ] `:component="Component"` passed
- [ ] **`:component-props` ALWAYS passed** (use `{}` if no props)
- [ ] `:props="{ title, ... }"` for drawer config
- [ ] `footer` prop set if using `<drawer-footer>`
- [ ] Inner component injects `closeDrawer`
- [ ] Provider scope verified: opener/closeDrawer target the intended nearest provider
- [ ] Multi-level: add a new provider only when two drawer levels must coexist, and keep footer placement correct
- [ ] kebab-case for all custom tags
