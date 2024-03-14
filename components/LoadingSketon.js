import { View } from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";
import { SkeletonGroup, Skeleton } from 'react-native-skeleton-loaders'



function LoadingSkeleton(){

    return(
        <ScrollView contentContainerStyle={{alignSelf:'center',width:'90%'}}>
{
    [1,2,3,4].map(()=>{
        return(
            <View style={{marginBottom:10}}>
            <Skeleton bR={20} h={350} />
        </View> 
        )
       
    })
}

        </ScrollView>

    )

}

export default LoadingSkeleton