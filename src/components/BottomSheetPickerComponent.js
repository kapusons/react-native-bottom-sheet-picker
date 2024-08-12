import React, {useImperativeHandle} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

import BottomSheetPickerOutlinedTitleComponent from './BottomSheetPickerOutlinedTitleComponent';
import BottomSheetPickerBoxComponent from './BottomSheetPickerBoxComponent';
import FormBottomSheetModalComponent from './FormBottomSheetModalComponent';
import BottomSheetPickerListComponent from './BottomSheetPickerListComponent';
import {TITLE_FONT_SIZE} from '../constants/font_size_constant';
import pickerStyleHelper from '../helpers/picker_style_helper';

const BottomSheetPickerComponent = React.forwardRef((props, ref) => {
  let pickerRef = React.createRef();
  let pickerModalRef = React.createRef();

  useImperativeHandle(ref, () => ({
    showPicker: () => {
      showPicker();
    },
    forceDismiss: () => {
      pickerModalRef.current?.dismiss();
    }
  }));

  const onSelectItem = (item) => {
    props.onSelectItem(item);
    pickerModalRef.current?.dismiss();
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const calculatePickerHeight = () => {
    let h = 425
    if (props.snapPoints && props.snapPoints[0]) {
      try {
        percentage = parseInt(props.snapPoints[0].split("%")[0])
        h =  (percentage * windowHeight) / 100
      } catch {
      }
    }
    return h - 40 ; // 40 "padding bottom"
  }

  const showPicker = () => {
    if (props.disabled)
      return

    !!props.onBottomSheetShow && props.onBottomSheetShow();
    const content = !!props.customPickerContent ? props.customPickerContent
                    : <BottomSheetPickerListComponent
                        title={props.bottomSheetTitle}
                        items={props.items}
                        customBottomSheetTitle={props.customBottomSheetTitle}
                        customListItem={props.customListItem}
                        listItemStyle={props.listItemStyle}
                        itemTextStyle={props.itemTextStyle}
                        pickerContentHeight={props.pickerContentHeight || calculatePickerHeight()}
                        primaryColor={props.primaryColor}
                        secondaryColor={props.secondaryColor}
                        onSelectItem={onSelectItem}
                        hideListItemAudio={props.hideListItemAudio}
                        bottomSheetTitleStyle={props.bottomSheetTitleStyle}
                        selectedItem={props.selectedItem}
                        showCheckIcon={props.showCheckIcon}
                        checkIconSize={props.checkIconSize}
                        titleFontFamily={props.titleFontFamily}
                        itemFontFamily={props.itemFontFamily}
                        selectedFieldName={props.selectedFieldName}
                        showRadioStyle={props.showRadioStyle}
                        showLeftCheckIcon={props.showLeftCheckIcon}
                        leftCheckIconColor={props.leftCheckIconColor}
                        showSubtitle={props.showSubtitle}
                        subtitleStyle={props.subtitleStyle}
                        isSearchable={props.isSearchable}
                        searchPlaceholder={props.searchPlaceholder}
                        searchInputStyle={props.searchInputStyle}
                        searchInputContainerStyle={props.searchInputContainerStyle}
                        searchIconColor={props.searchIconColor}
                        clearSearchIconColor={props.clearSearchIconColor}
                        customPreviewItem={props.customPreviewItem}
                        ListEmptyComponent={props.ListEmptyComponent}
                        onAddField={props.onAddField}
                        explanationBox={props.explanationBox}
                      />

    pickerRef.current?.setBodyContent(content);
    pickerModalRef.current?.present();
  }

  const onDismissModal = () => {
    !!props.onDismiss && props.onDismiss();
    pickerRef.current?.setBodyContent(null);
  }

  const renderPickerTitle = () => {
    return props.isOutlined ? <BottomSheetPickerOutlinedTitleComponent title={props.title} required={props.required} requiredColor={props.requiredColor} titleFontFamily={props.titleFontFamily}
                                titleStyle={props.titleStyle} outlinedTitleContainerStyle={props.outlinedTitleContainerStyle} disabled={props.disabled} disabledColor={props.disabledColor} requiredTitleStyle={props.requiredTitleStyle} />
          : <Text style={[styles.titleLabel, props.titleFontFamily && {fontFamily: props.titleFontFamily}, props.titleStyle]}>
              {props.title}
              {props.required && <Text style={[{color: props.requiredColor || "#d50000"}, props.requiredTitleStyle]}> *</Text>}
            </Text>
  }

  return (
    <View style={[{width: '100%'}, props.containerStyle]}>
      { !!props.title && renderPickerTitle()}

      <View style={[pickerStyleHelper.getContainerStyleByType(props.isOutlined, props.disabled, props.disabledColor), props.pickerStyle]}>
        <TouchableOpacity ref={ref} onPress={() => showPicker()} style={{height: '100%'}}>
          { !!props.customPicker ? props.customPicker
            : <BottomSheetPickerBoxComponent
                items={props.items}
                selectedItem={props.selectedItem}
                placeholder={props.placeholder}
                placeholderStyle={props.placeholderStyle}
                pickerBoxStyle={props.pickerBoxStyle}
                primaryColor={props.primaryColor}
                secondaryColor={props.secondaryColor}
                customIcon={props.customIcon}
                pickerUuid={props.pickerUuid}
                placeholderAudio={props.placeholderAudio}
                playingUuid={props.playingUuid}
                updatePlayingUuid={(uuid) => props.updatePlayingUuid(uuid)}
                indicatorLabel={props.indicatorLabel}
                pickerFontSize={props.pickerFontSize}
                indicatorLabelStyle={props.indicatorLabelStyle}
                disabled={props.disabled}
                disabledColor={props.disabledColor}
                selectedFieldName={props.selectedFieldName}
              />
          }
        </TouchableOpacity>
      </View>

      <FormBottomSheetModalComponent ref={pickerRef} formModalRef={pickerModalRef} snapPoints={props.snapPoints || ['60%']} onDismissModal={() => onDismissModal()} />
    </View>
  )
})

const styles = StyleSheet.create({
  titleLabel: {
    color: 'white',
    fontSize: TITLE_FONT_SIZE,
    marginBottom: 10
  },
});

export default BottomSheetPickerComponent;

// How to use the component
{/* <BottomSheetPicker
  title="Your age"   // title on top of the picker box
  placeholder="Select your age"   // placeholder inside the picker box
  bottomSheetTitle="Select you age"   // title on the bottom sheet
  required={boolean} (optional)
  requiredColor={default = '#d50000'} (optional)
  primaryColor={default = 'black'} (optional)
  secondaryColor={deafult = '#b5b5b5'} (optional)
  items={pickerItems}
  selectedItem={selectedAge}
  snapPoints={default = ['60%']} (optional)   // snapPoint of the bottom sheet
  pickerContentHeight={default = 425} (optional)   // height of the content on the bottom sheet
  titleStyle={{}} (optional)   // style the title of the picker
  containerStyle={{}} (optional)   // style of the wrapper
  pickerStyle={{}} (optional)   // style of the picker box container
  pickerBoxStyle={{}} (optional)   // style of the picker box
  placeholderStyle={{}} (optional)   // style of the placeholder label of the picker box
  bottomSheetTitleStyle={{}} (optional)  // style of the bottom sheet title
  listItemStyle={{}} (optional)   // style of the list item on bottom sheet
  itemTextStyle={{}} (optional)   // style of the label of list item on bottom sheet
  customPicker={{}} (optional)   // custom component for the picker box
  customBottomSheetTitle={component} (optional)   // custom component for the bottom sheet title
  customIcon={component} (optional)   // custom component for the icon of the picker box
  customListItem={component} (optional)   // custom component for the bottom sheet list item
  customPickerContent={component} (optional)   // custom component for the whole item on the bottom sheet
  onSelectItem={(item) => setSelectedAge(item)}
  onBottomSheetShow={() => {}} (optional)   // event on bottom sheet show
  onDismiss={() => {}} (optional)   // event on bottom sheet close
  pickerUuid=''
  placeholderAudio={audio}
  playingUuid=''
  updatePlayingUuid={(uuid) => function}
  hideListItemAudio={boolean}
/> */}
