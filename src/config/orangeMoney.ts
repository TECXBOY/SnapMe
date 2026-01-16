/**
 * Orange Money configuration
 * API credentials and configuration from environment variables
 */

import Config from 'react-native-config';

export interface OrangeMoneyConfig {
  apiKey: string;
  secretKey: string;
  merchantId: string;
  baseUrl: string;
  sandboxUrl: string;
}

export const orangeMoneyConfig: OrangeMoneyConfig = {
  apiKey: Config.ORANGE_MONEY_API_KEY || '',
  secretKey: Config.ORANGE_MONEY_SECRET_KEY || '',
  merchantId: Config.ORANGE_MONEY_MERCHANT_ID || '',
  baseUrl: Config.ORANGE_MONEY_BASE_URL || '',
  sandboxUrl: Config.ORANGE_MONEY_SANDBOX_URL || '',
};

export const paymentConfig = {
  platformCommissionPercentage: parseInt(
    Config.PLATFORM_COMMISSION_PERCENTAGE || '15',
    10,
  ),
  minimumWithdrawalAmount: parseInt(
    Config.MINIMUM_WITHDRAWAL_AMOUNT || '100000',
    10,
  ),
  paymentTimeoutSeconds: parseInt(Config.PAYMENT_TIMEOUT_SECONDS || '180', 10),
  payoutProcessingTime: Config.PAYOUT_PROCESSING_TIME || 'business_days_1_3',
};

export const isProduction = Config.APP_ENV === 'production';
