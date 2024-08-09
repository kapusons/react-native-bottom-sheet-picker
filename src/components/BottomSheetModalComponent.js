import React, { useCallback, useState, useEffect } from 'react';
import {BackHandler} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

const BottomSheetModalComponent = (props, ref) => {
  const [currentIndex, setCurrentIndex] = useState(-1);

  const renderBackdrop = useCallback( props => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  ), []);


  const onBackPress = () => {
    if (ref !== null) {
      ref.current?.close();
      return true;
    }
  };

  useEffect(() => {
    if (currentIndex !== -1) {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }
  }, [currentIndex]);

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      snapPoints={props.snapPoints}
      onDismiss={() => !!props.onDismiss && props.onDismiss()}
      onChange={(index) => {setCurrentIndex(index); !!props.onChange && props.onChange(index)}}
    >
      { props.content }
    </BottomSheetModal>
  )
};

export default  React.forwardRef(BottomSheetModalComponent);
