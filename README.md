# react-native-bottom-sheet-picker

<span><img src="https://user-images.githubusercontent.com/18114944/212238041-e05338c8-2c29-48b7-9688-2441e863fe67.png" width="250" height="500" /></span>
<span><img src="https://user-images.githubusercontent.com/18114944/212238131-a0cbbfcd-ef0e-4ded-a79a-626e38bf473b.png" width="250" height="500" /></span>



React native bottom sheet picker is a picker component that uses the bottom sheet to show the list item instead of using the dropdown. This picker allows the user to play the audio of the placeholder and list items of the picker.

## Support
iOS & Android

## Installation

```sh
npm install react-native-bottom-sheet-picker
```

## Installing dependencies
```sh
npm install @gorhom/bottom-sheet@^4 react-native-gesture-handler react-native-reanimated react-native-vector-icons react-native-sound react-native-text-highlighter
```

- [@gorhom/bottom-sheet](https://gorhom.github.io/react-native-bottom-sheet/)
- [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler)
- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
- [react-native-sound](https://github.com/zmxv/react-native-sound)
- [react-native-text-highlighter](https://github.com/limkimsan/react-native-text-hightlight)

## Usage

```js
import {BottomSheetPicker} from 'react-native-bottom-sheet-picker';

// ...
const [playingUuid, setPlayingUuid] = React.useState(null);
let selectedLocation = null;
const locations = [
  {label: 'Siem Reap', value: 1, audio: 'audio1.mp3'},
  {label: 'Phnom Penh', value: 2, audio: 'audio2.mp3'},
  {label: 'Battambang', value: 3, audio: 'audio3.mp3'}
];

<BottomSheetPicker
  title="Your location"
  placeholder="Select your location"
  bottomSheetTitle="Select you location"
  required={true}
  requiredColor='#d50000'
  primaryColor='green'
  secondaryColor='gray'
  items={locations}
  selectedItem={selectedLocation}
  snapPoints={['60%']}
  pickerContentHeight={425}
  titleStyle={{}}
  containerStyle={{}}
  pickerStyle={{}}
  placeholderStyle={{}}
  listItemStyle={{}}
  itemTextStyle={{}}
  customPicker={{}}
  customBottomSheetTitle={component}
  customIcon={component}
  customListItem={component}
  customPickerContent={component}
  onSelectItem={(item) => selectedLocation = item}
  onBottomSheetShow={() => {}}
  onDismiss={() => {}}
  pickerUuid=''
  placeholderAudio={}
  playingUuid={playingUuid}
  updatePlayingUuid={(uuid) => setPlayingUuid(uuid)}
  enableDynamicSizing={false}
/>
```

## Extra step
Add `GestureHandlerRootView` and `BottomSheetModalProvider` on the `App.js`
```
import {BottomSheetPicker} from 'react-native-bottom-sheet-picker';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
...

<GestureHandlerRootView style={{flex: 1}}>
  <BottomSheetModalProvider>
    ...
  </BottomSheetModalProvider>
</GestureHandlerRootView>
```

## Properties

#### Basic
| Prop                 |    Default    |    Type    | Description                                                                                                                                   |
| :------------------- | :-----------: | :--------: | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| title                |       ''      |  `string`  | Title on top of the picker box                                                                                                                |
| placeholder          |       ''      |  `string`  | Placeholder inside the picker box                                                                                                             |
| bottomSheetTitle     |       ''      |  `string`  | Title on the bottom sheet                                                                                                                     |
| required             |     false     |  `boolean` | If true, show the * sign on the title                                                                                                         |
| requiredColor        |   '#d50000'   |  `string`  | The color of the * sign                                                                                                                       |
| primaryColor         |    'black'    |  `string`  | Color for the pressable component                                                                                                             |
| secondaryColor       |   '#b5b5b5'   |  `string`  | Color of the audio button while the audio is playing                                                                                          |
| items                |       []      |  `Array`   | Array of item for selections.(Ex: [{label: 'example', value: 1}])                                                                             |
| selectedItem         |     null      |            | The selected value                                                                                                                            |
| snapPoints           |    ['60%']    |  `Array`   | The height of the bottom sheet                                                                                                                |
| pickerContentHeight  |      425      |  `number`  | The height of the content inside the bottom sheet                                                                                             |
| pickerUuid           |      ''       |  `string`  | The uuid of the picker (for play audio purpose)                                                                                               |
| placeholderAudio     |     null      |  `audio`   | The audio of the placeholder (support .mp3). If null, it will not show play audio botton on the picker box                                    |
| playingUuid          |      ''       |  `string`  | The uuid of the playing auido component (to prevent playing audio overlap each other)                                                         |
| hideListItemAudio    |     false     |  `boolean` | Hide or show the play audio button on the list item                                                                                           |
| showCheckIcon        |     false     |  `boolean` | Hide or show the check icon on the selected item                                                                                              |
| checkIconSize        |      24       |  `number`  | Size of the check icon                                                                                                                        |
| isOutlined           |     false     |  `boolean` | If set to `true`, the picker will render in outlined style                                                                                    |
| pickerFontSize       |      16       |  `number`  | Font size of the label inside the picker box                                                                                                  |
| indicatorLabel       |      ''       |  `string`  | The label on the right side of the picker box                                                                                                 |
| disabled             |     false     |  `boolean` | The status to disable the picker                                                                                                              |
| disabledColor        |   '#cdccc'    |  `string`  | The color of the picker when disabled                                                                                                         |
| titleFontFamily      |      ''       |  `string`  | The font family of the title in the bottom sheet                                                                                              |
| itemFontFamily       |      ''       |  `string`  | The font family of the item in the bottom sheet                                                                                               |
| selectedFieldName    |     null      |  `string`  | The custom field name used to get the selected value of the item (default field name is `value`)                                              |
| showRadioStyle       |     false     |  `boolean` | If `true`, show the radio button style (circle & round icon) on the right side of each list                                                   |
| showLeftCheckIcon    |     false     |  `boolean` | If `true` with showRadioStyle and showCheckIcon are `false`, show the radio button style (circle & check icon) on the left side of each list  |
| leftCheckIconColor   |   '#ffffff'   |  `string`  | The color of the check icon on the left side of the list item                                 |
| showSubtitle         |     false     |  `boolean` | If `true` show the subtitle in the list item (make sure you have subtitle atribute in the items)   |
| isSearchable         |     false     |  `boolean` | If `true` show a search box above the list item   |
| searchPlaceholder    |      ''       |  `string`  | The placeholder of the search text input   |
| searchIconColor      |      ''       |  `string`  | Color of the search icon in the search input box   |
| clearSearchIconColor |      ''       |  `string`  | Color of the clear text icon in the search box   |
| enableDynamicSizing  |     false     |  `boolean` | Allow to expand and minimize the size of the bottom sheet   |

#### Custom styles

| Prop                         |    Default    |   Type    | Description                                                                |
| :--------------------------- | :-----------: | :-------: | :------------------------------------------------------------------------- |
| titleStyle                   |     {...}     |  `style`  | Style of the picker title                                                  |
| containerStyle               |     {...}     |  `style`  | Style of the picker wrapper                                                |
| pickerStyle                  |     {...}     |  `style`  | Style of the picker box container                                          |
| pickerBoxStyle               |     {...}     |  `style`  | Style of the picker box                                                    |
| placeholderStyle             |     {...}     |  `style`  | Style of the placeholder label in the picker box                           |
| bottomSheetTitleStyle        |     {...}     |  `style`  | Style of the bottom sheet title                                            |
| listItemStyle                |     {...}     |  `style`  | Style of the list item on bottom sheet                                     |
| itemTextStyle                |     {...}     |  `style`  | Style of the label of the list item on bottom sheet                        |
| outlinedTitleContainerStyle  |     {...}     |  `style`  | Style of the outlined label container                                      |
| indicatorLabelStyle          |     {...}     |  `style`  | Style of the label on the right side of the picker box                     |
| requiredTitleStyle           |     {...}     |  `style`  | Style of the required sign "*" on the title                                |
| subtitleStyle                |     {...}     |  `style`  | Style of the subtitle in the list item                                     |
| searchInputStyle             |     {...}     |  `style`  | Style of the search text input (if isSearchable is setted to `true`)       |
| searchInputContainerStyle    |     {...}     |  `style`  | Style of the container of the search text input                            |

#### Custom components
| Prop                    |    Default    |  Type  | Description                                                                |
| :---------------------- | :-----------: | :----: | :------------------------------------------------------------------------- |
| customPicker            |     {...}     | `comp` | Custom component of the picker box                                         |
| customBottomSheetTitle  |     {...}     | `comp` | Custom component of the bottom sheet title                                 |
| customIcon              |     {...}     | `comp` | Custom component of the icon on the picker box                             |
| customListItem          |     {...}     | `comp` | Custom component of the list item on the bottom sheet                      |
| customPickerContent     |     {...}     | `comp` | Custom content inside the bottom sheet (whole content)                     |

#### Events

| Prop              |    Default    |   Type    | Description                                                                |
| :---------------- | :-----------: | :-------: | :------------------------------------------------------------------------- |
| onSelectItem      |     {...}     |  `event`  | On selecting an item                                                       |
| onBottomSheetShow |     {...}     |  `event`  | On the bottom sheet show                                                   |
| onDismiss         |     {...}     |  `event`  | On the bottom sheet close                                                  |
| updatePlayingUuid |     {...}     |  `event`  | Mark the component uuid as playingUuid when playing the audio              |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

<!-- ## License

MIT -->

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
