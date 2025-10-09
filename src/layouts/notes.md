# Removed

Fonction de gestion des templates supprimer pour éviter d'avoir des re-render trop fréquent :

```javascript
/**
 * @deprecated usefull but trigger a re-render because of the function. And All state a re-render.
 * @param Component
 * @param componentProps
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const TemplateRenderer = ({ Component, componentProps, children }) => {
    return <Component {...componentProps}>{children}</Component>;
};
```
