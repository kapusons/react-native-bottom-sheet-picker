import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import TextHighlight from 'react-native-text-highlighter';

import {LIST_ITEM_FONT_SIZE, LIST_ITEM_SUBTITLE_FONT_SIZE} from '../constants/font_size_constant';
import PlayAudioComponent from './playAudios/PlayAudioComponent';
import pickerHelper from '../helpers/picker_helper';

const BottomSheetPickerListItemComponent = (props) => {
  const {item} = props;
  const itemColor = (defaultColor) => {
    return (item.disabled && pickerHelper.getSelectedValue(props.selectedFieldName, item) != props.selectedItem) ? '#b5b5b5' : defaultColor;
  }

  const renderAudioBtn = () => {
    return <PlayAudioComponent
              iconSize={24}
              audio={item.audio}
              primaryColor={props.primaryColor}
              secondaryColor={props.secondaryColor}
              btnStyle={{borderWidth: 0, borderRadius: 0}}
              itemUuid={item.uuid}
              playingUuid={props.playingUuid}
              updatePlayingUuid={(uuid) => props.updatePlayingUuid(uuid)}
           />
  }

  const renderRightIcon = () => {
    if (props.showCheckIcon && props.selectedItem == pickerHelper.getSelectedValue(props.selectedFieldName, item))
      return <Icon name='check' size={props.checkIconSize || 24} color={props.secondaryColor} style={{marginLeft: !props.hideListItemAudio ? 24 : 0}}/>
    else if (props.showRadioStyle)
      return <View style={styles.roundContainer}>
              {props.selectedItem == pickerHelper.getSelectedValue(props.selectedFieldName, item) && <View style={{width: 14, height: 14, borderRadius: 14, backgroundColor: props.primaryColor}} />}
            </View>
  }

  const renderLeftCheckIcon = () => {
    const containerStyle = {backgroundColor: props.primaryColor, borderWidth: 0};
    return <View style={[styles.roundContainer, {marginRight: 10, height: 22, width: 22}, item.value == props.selectedItem && containerStyle]}>
              {(item.value == props.selectedItem) && <FontAwesomeIcon name='check' size={13} color={props.leftCheckIconColor || '#ffffff'}/>}
           </View>
  }

  return (
    <React.Fragment>
      <View style={{flex: 1, flexDirection: "row", alignItems: 'center'}}>
      <View>{ props.customPreviewItem ? props.customPreviewItem(item) : null }</View>
      <TouchableOpacity
        onPress={() => props.onSelectItem()}
        style={[styles.container, props.showSubtitle && {height: 64}, (props.showSubtitle && item.subtitle) && {paddingTop: 2}, props.listItemStyle]}
      >

        { props.customListItem ? props.customListItem(item)
          :
          <View style={{flex: 1, flexDirection: "row", alignItems: 'center'}}>
            { (props.showLeftCheckIcon && !props.showCheckIcon && !props.showRadioStyle) && renderLeftCheckIcon()}

            <View style={{flex: 1}}>
              <TextHighlight textToHighlight={item.label} searchWords={[props.searchedText]} numberOfLines={1}
                textStyle={[{ color: itemColor('black'), fontSize: LIST_ITEM_FONT_SIZE }, props.itemFontFamily && {fontFamily: props.itemFontFamily}, props.itemTextStyle]}
              />

              {(props.showSubtitle && item.subtitle) && <Text numberOfLines={1} style={[styles.subtitle, props.itemFontFamily && {fontFamily: props.itemFontFamily}, props.subtitleStyle]}>{item.subtitle}</Text> }
            </View>
          </View>
        }
        {!props.hideListItemAudio ? renderAudioBtn() : renderRightIcon()}
      </TouchableOpacity>
      </View>
      <View style={{ borderColor: '#D3D3D3', borderBottomWidth: props.index == props.items.length - 1 ? 0 : 0.7 }} />
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 56,
    flex: 1,
  },
  roundContainer: {
    alignItems: 'center',
    alignItems: 'center',
    borderColor: '#D3D3D3',
    borderRadius: 20,
    borderWidth: 1.5,
    justifyContent: 'center',
    height: 24,
    width: 24,
  },
  subtitle: {
    color: '#989696',
    fontSize: LIST_ITEM_SUBTITLE_FONT_SIZE,
    marginTop: 4
  }
});

export default BottomSheetPickerListItemComponent;
