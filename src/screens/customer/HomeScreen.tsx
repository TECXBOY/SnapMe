/**
 * Customer Home Screen
 * Main discovery interface for customers to find cameramen
 */

import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {Text, Searchbar, Card, Chip} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CustomerTabParamList} from '@navigation/types';
import {colors, typography, spacing} from '@theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAppSelector} from '@store/hooks';

type NavigationProp = NativeStackNavigationProp<CustomerTabParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const {user} = useAppSelector(state => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Villas', 'Hotels', 'Apartments'];

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO: Fetch cameramen data
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.profileCircle}>
            <Icon name="person" size={24} color={colors.white} />
          </View>
          <View style={styles.locationSection}>
            <Text style={styles.userName}>
              {user && 'name' in user ? user.name : 'Customer'}
            </Text>
            <Text style={styles.location}>San Diego, CA</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <Icon
            name="search"
            size={24}
            color={colors.text}
            style={styles.icon}
            onPress={() => navigation.navigate('Search')}
          />
          <Icon
            name="notifications"
            size={24}
            color={colors.text}
            style={styles.icon}
            onPress={() => navigation.navigate('Notifications')}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.locationPrompt}>
          <Card style={styles.locationCard}>
            <Card.Content style={styles.locationCardContent}>
              <Icon name="location-on" size={20} color={colors.primary} />
              <Text style={styles.locationPromptText}>
                You Can Change Your Location to show nearby villas
              </Text>
              <Icon name="arrow-forward" size={20} color={colors.primary} />
            </Card.Content>
          </Card>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Most Popular</Text>
            <Text style={styles.seeAll}>See All</Text>
          </View>
          {/* TODO: Add popular cameramen cards */}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for you</Text>
            <Text style={styles.seeAll}>See All</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}>
            {categories.map(category => (
              <Chip
                key={category}
                selected={selectedCategory === category}
                onPress={() => setSelectedCategory(category)}
                style={styles.categoryChip}
                selectedColor={colors.white}
                mode={selectedCategory === category ? 'flat' : 'outlined'}>
                {category}
              </Chip>
            ))}
          </ScrollView>
          {/* TODO: Add recommended cameramen list */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  locationSection: {
    flex: 1,
  },
  userName: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
  },
  location: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text,
    opacity: 0.7,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  icon: {
    padding: spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  locationPrompt: {
    padding: spacing.md,
  },
  locationCard: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
  },
  locationCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationPromptText: {
    flex: 1,
    marginHorizontal: spacing.sm,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.white,
  },
  section: {
    padding: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.text,
  },
  seeAll: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary,
  },
  categoryScroll: {
    marginBottom: spacing.md,
  },
  categoryChip: {
    marginRight: spacing.sm,
  },
});

export default HomeScreen;
