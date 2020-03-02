# ui-editor

```jsx
this.operations = {};

<UIEditor
    operations={this.operations};
    initialState={initialState}
    stateUpdaters={stateUpdaters}
    stateUpdaterOnUpdate={(type, data) => {}}
    initialStateOnChange={value => {}}
    actions={actions}
    actionOnUpdate={(type, data) => {}}
    components={components}
    componentsOnUpdate={newComponents => {}}
    componentOnSelect={componentData => {}}
/>

interface Operations {
    selectComponent: (componentData: ComponentData) => void,
}
```