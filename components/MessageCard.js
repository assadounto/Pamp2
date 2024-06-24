<TouchableOpacity
    onPress={() => navigation.navigate('Chat', { userId, vendorId: item.vendor.id, userType })}
>
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
        <Text>{item.vendor.name}</Text>
        {item.unread_count > 0 && (
            <View>
                <Text>{`Unread messages: ${item.unread_count}`}</Text>
                <Text>{`First unread message: ${item.first_unread_message.content}`}</Text>
            </View>
        )}
    </View>
</TouchableOpacity>