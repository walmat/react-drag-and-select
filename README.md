A lightweight, fully-tested (unit and e2e test), TypeScript'd, React library (1 component, and 1 hook!) to enable using the cursor to drag and select multiple items.

> The underlying logic for this library was inspired from [React Drag to Select](https://github.com/pablofierro/react-drag-select).

> This project was bootstrapped with [Create React Library](https://github.com/udilia/create-react-library).

## Features

1. **No selected state management** - Unlike [React Drag to Select](https://github.com/pablofierro/react-drag-select], this component does not managed if an item is selected. It's up to you to handle that. It only fires the hook once the item _becomes_ selected.

2. **Supports deeply nested items** - Unlike [React Drag to Select](https://github.com/pablofierro/react-drag-select], the items you are trying to select don't need to be immediate children of the parent HOC. As long as they have the `useSelectableByDragging` inside of them, and the

## Setup

1. Install dependency
2. Add

## API

### DragSelection

This is the [HOC](https://reactjs.org/docs/higher-order-components.html) which is used to create the drag [context](https://reactjs.org/docs/context.html) and draw the drag layer to the screen.

It has no props/configuration.

#### Example

```tsx
<DragSelection>
  {/* Any components you want selected go in here */}
</DragSelection>
```

### useSelectableByDragging

This is the hook used by any component that is a descendant of `<DragSelection>`. It fires every time the selected state of the component changes.

It returns an array with 2 values:

1. An object containing `selected` which indicates if the component is being selected at that moment
2. A [refObject](https://reactjs.org/docs/hooks-reference.html#useref) which needs to be applied as the `ref` to the component you're trying to select

#### Example

```tsx
const MyComponent: React.FC = () => {
  const [{ selected }, ref] = useSelectableByDragging<HTMLDivElement>();

  return <div {...{ ref }} />;
};
```
