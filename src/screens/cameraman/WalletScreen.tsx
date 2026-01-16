/**
 * Cameraman Wallet Screen
 * View earnings and manage withdrawals
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CameramanTabParamList} from '@navigation/types';
import {colors, typography, spacing} from '@theme';
import {useAppSelector} from '@store/hooks';
import {formatCurrency} from '@utils/formatters';

type NavigationProp = NativeStackNavigationProp<CameramanTabParamList, 'Wallet'>;

const WalletScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const {user} = useAppSelector(state => state.auth);

  const cameraman = user && user.role === 'cameraman' ? user : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>
      {cameraman && (
        <>
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}>
              {formatCurrency(cameraman.walletBalance)}
            </Text>
          </View>
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Total Earnings</Text>
            <Text style={styles.balanceAmount}>
              {formatCurrency(cameraman.totalEarnings)}
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Withdrawal')}
            style={styles.button}
            disabled={cameraman.walletBalance < 100000}>
            Request Withdrawal
          </Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fontFamily.bold,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  balanceCard: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: 8,
    marginBottom: spacing.md,
    elevation: 2,
  },
  balanceLabel: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text,
    opacity: 0.7,
    marginBottom: spacing.xs,
  },
  balanceAmount: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  button: {
    marginTop: spacing.lg,
  },
});

export default WalletScreen;
