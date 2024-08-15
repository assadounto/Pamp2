import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import BlobUtil from 'react-native-blob-util';
import HTMLParser from 'react-native-html-parser';

const getThumbnail = async (url) => {
    try {
        const response = await BlobUtil.fetch('GET', url);
        const htmlString = response.data;
        const parser = new HTMLParser.DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const metaTags = doc.getElementsByTagName('meta');

        let imageUrl = '';
        for (let i = 0; i < metaTags.length; i++) {
            const tag = metaTags[i];
            if (tag.getAttribute('property') === 'og:image' || tag.getAttribute('name') === 'twitter:image') {
                imageUrl = tag.getAttribute('content');
                break;
            }
        }

        return imageUrl;
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return null;
    }
};

const ThumbnailComponent = ({ url }) => {
    const [thumbnail, setThumbnail] = React.useState('');

    React.useEffect(() => {
        const fetchThumbnail = async () => {
            const imageUrl = await getThumbnail(url);
            setThumbnail(imageUrl);
        };

        fetchThumbnail();
    }, [url]);

    return (
        <View style={styles.container}>
            {thumbnail ? (
                <FastImage
                    style={styles.image}
                    source={{
                        uri: thumbnail,
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    image: {
        width: 100,
        height: 100,
    },
});

export default ThumbnailComponent;
