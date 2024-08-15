import { useTheme } from '@rneui/themed';
import { makeStyles } from '@rneui/themed';
import { View } from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";
import { SkeletonGroup, Skeleton } from 'react-native-skeleton-loaders'


function LoadingSkeleton() {
      const {theme}=useTheme()
    return (
        <ScrollView contentContainerStyle={{ alignSelf: 'center', width: '90%' }}>
            {
                [1, 2, 3, 4].map(() => {
                    return (
                        <View style={{ marginBottom: 10 ,borderRadius:20}}>
                            <Skeleton  color={theme.mode=='dark'?theme.colors.tabColor:theme.colors.grey5} bR={20} h={350} />
                        </View>
                    )

                })
            }

        </ScrollView>

    )

}

export default LoadingSkeleton