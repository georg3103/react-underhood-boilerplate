export default function createElement(type, attrs, ...children) {
  const props = {
    ...attrs,
    children: children.flat().map(child => {
      return typeof child === "object"
        ? child
        : {
            type: "TEXT ELEMENT",
            props: { nodeValue: child }
          };
    }),
  }
  // functional components
  if (typeof type === "function") {
    if (!type.isClass) {
      return new type(props);
    }
  }

  return {
    type,
    props
  };
}