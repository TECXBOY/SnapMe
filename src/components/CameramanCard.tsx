/**
 * Cameraman Card Component
 * Displays cameraman information in list/grid views
 */

import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Card, Text, Chip} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CustomerTabParamList} from '@navigation/types';
import {colors, typography, spacing} from '@theme';
import {Cameraman} from '@types/user';
import {formatCurrency, formatDistance} from '@utils/formatters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';

interface CameramanCardProps {
  cameraman: Cameraman & {distance?: number};
  onPress?: () => void;
}

type NavigationProp = NativeStackNavigationProp<CustomerTabParamList>;

const CameramanCard: React.FC<CameramanCardProps> = ({cameraman, onPress}) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('CameramanDetail', {cameramanId: cameraman.id});
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="star" size={16} color={colors.accent} />,
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star-half" size={16} color={colors.accent} />,
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="star-border" size={16} color={colors.disabled} />,
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card style={styles.card} elevation={2}>
        <View style={styles.imageContainer}>
          {cameraman.profileImage ? (
            <FastImage
              source={{uri: cameraman.profileImage}}
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Icon name="photo-camera" size={40} color={colors.disabled} />
            </View>
          )}
          {cameraman.availability === 'available' && (
            <Chip
              style={styles.availabilityChip}
              textStyle={styles.availabilityText}
              mode="flat">
              Available
            </Chip>
          )}
          <TouchableOpacity style={styles.favoriteButton}>
            <Icon name="favorite-border" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <Card.Content style={styles.content}>
          <Text style={styles.brandName} numberOfLines={1}>
            {cameraman.brandName}
          </Text>
          <Text style={styles.location} numberOfLines={1}>
            {cameraman.location.address || 'Location not set'}
          </Text>

          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {renderStars(cameraman.rating)}
            </View>
            <Text style={styles.ratingText}>
              {cameraman.rating.toFixed(1)} ({cameraman.reviewCount})
            </Text>
          </View>

          {cameraman.distance !== undefined && (
            <View style={styles.distanceContainer}>
              <Icon name="location-on" size={16} color={colors.text} />
              <Text style={styles.distanceText}>
                {formatDistance(cameraman.distance)}
              </Text>
            </View>
          )}

          <View style={styles.priceContainer}>
            {cameraman.pricePerHour ? (
              <>
                <Text style={styles.priceLabel}>From</Text>
                <Text style={styles.price}>
                  {formatCurrency(cameraman.pricePerHour)}/hour
                </Text>
              </>
            ) : (
              <Text style={styles.priceLabel}>Price on request</Text>
            )}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  availabilityChip: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.secondary,
  },
  availabilityText: {
    color: colors.white,
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: spacing.md,
  },
  brandName: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  location: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text,
    opacity: 0.7,
    marginBottom: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: spacing.xs,
  },
  ratingText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text,
    opacity: 0.7,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  distanceText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text,
    opacity: 0.7,
    marginLeft: spacing.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: spacing.xs,
  },
  priceLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text,
    opacity: 0.7,
    marginRight: spacing.xs,
  },
  price: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
});

export default CameramanCard;
