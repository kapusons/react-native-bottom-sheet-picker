import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Text,
} from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import DashedLineComponent from "./DashedLineComponent";
import BottomSheetPickerListItemComponent from "./BottomSheetPickerListItemComponent";
import SearchBoxComponent from "./SearchBoxComponent";
import pickerHelper from "../helpers/picker_helper";
import { useKeyboard } from "../utils/keyboard";

const BottomSheetPickerListComponent = (props) => {
  const [selectedItem, setSelectedItem] = useState(props.selectedItem);
  const [playingUuid, setPlayingUuid] = useState(null);
  const [searchedText, setSearchedText] = useState("");
  const keyboardHeight = useKeyboard();

  const renderTitle = () => {
    return (
      <React.Fragment>
        <Text
          style={[
            {
              fontSize: 18,
              marginBottom: 20,
              paddingHorizontal: 16,
              fontWeight: "bold",
              color: "black",
            },
            props.titleFontFamily && { fontFamily: props.titleFontFamily },
            props.bottomSheetTitleStyle,
          ]}
        >
          {props.title}
        </Text>
        <DashedLineComponent />
      </React.Fragment>
    );
  };

  const onSelectItem = (item) => {
    if (item.disabled) return;

    setSelectedItem(
      pickerHelper.getSelectedValue(props.selectedFieldName, item)
    );
    props.onSelectItem(
      pickerHelper.getSelectedValue(props.selectedFieldName, item)
    );
  };

  const renderListItem = (item, index) => {
    return (
      <BottomSheetPickerListItemComponent
        index={index}
        items={props.items.filter((item) =>
          item.label.toLowerCase().includes(searchedText.toLowerCase())
        )}
        item={item}
        searchedText={searchedText}
        selectedItem={selectedItem}
        onSelectItem={() => onSelectItem(item)}
        showConfirmDelete={props.showConfirmDelete}
        isDeletable={props.isDeletable}
        defaultSelectedItem={props.selectedItem}
        customListItem={props.customListItem}
        listItemStyle={props.listItemStyle}
        itemTextStyle={props.itemTextStyle}
        primaryColor={props.primaryColor}
        secondaryColor={props.secondaryColor}
        hideListItemAudio={props.hideListItemAudio}
        playingUuid={playingUuid}
        updatePlayingUuid={(uuid) => setPlayingUuid(uuid)}
        showCheckIcon={props.showCheckIcon}
        checkIconSize={props.checkIconSize}
        itemFontFamily={props.itemFontFamily}
        selectedFieldName={props.selectedFieldName}
        showRadioStyle={props.showRadioStyle}
        showLeftCheckIcon={props.showLeftCheckIcon}
        leftCheckIconColor={props.leftCheckIconColor}
        showSubtitle={props.showSubtitle}
        subtitleStyle={props.subtitleStyle}
        customPreviewItem={props.customPreviewItem}
      />
    );
  };

  const renderList = () => {
    let paddingBottom = keyboardHeight || 20;
    return (
      <BottomSheetFlatList
        contentContainerStyle={[
          {
            flexGrow: 1,
            padding: 16,
            paddingTop: 0,
            paddingBottom: paddingBottom,
          },
          props.scrollViewStyle,
        ]}
        data={props.items.filter((item) =>
          item.label.toLowerCase().includes(searchedText.toLowerCase())
        )}
        keyExtractor={(option, index) => index.toString()}
        ListEmptyComponent={props.ListEmptyComponent}
        renderItem={({ item, index }) => renderListItem(item, index)}
      />
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          backgroundColor: "white",
          height: props.pickerContentHeight || 425,
        }}
      >
        {!!props.customBottomSheetTitle
          ? props.customBottomSheetTitle
          : renderTitle()}
        {props.isSearchable && (
          <SearchBoxComponent
            placeholder={props.searchPlaceholder}
            itemTextStyle={props.itemTextStyle}
            searchInputStyle={props.searchInputStyle}
            searchInputContainerStyle={props.searchInputContainerStyle}
            searchIconColor={props.searchIconColor}
            clearSearchIconColor={props.clearSearchIconColor}
            data={props.items.filter((item) =>
              item.label.toLowerCase().includes(searchedText.toLowerCase())
            )}
            onAddField={props.onAddField}
            onSearchChange={(text) => setSearchedText(text)}
          />
        )}
        {props.errorBox && props.errorBox()}
        {props.explanationBox && props.explanationBox()}
        {renderList()}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BottomSheetPickerListComponent;
