import { supabase } from '../lib/supabase';

export const emailNotificationService = {
  // Send welcome email after approval
  async sendWelcomeEmail(userEmail, userName, welcomeBonus = 5) {
    try {
      const { data, error } = await supabase.functions.invoke('send-notification-email', {
        body: {
          to: userEmail,
          subject: '🎉 Welcome to PromoHive - Account Approved!',
          htmlContent: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                      <!-- Header -->
                      <tr>
                        <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center;">
                          <h1 style="color: #ffffff; margin: 0; font-size: 32px;">Welcome to PromoHive!</h1>
                        </td>
                      </tr>
                      
                      <!-- Content -->
                      <tr>
                        <td style="padding: 40px 30px;">
                          <p style="font-size: 16px; color: #374151; margin: 0 0 20px;">Hi <strong>${userName}</strong>,</p>
                          <p style="font-size: 16px; color: #374151; margin: 0 0 30px; line-height: 1.6;">
                            Great news! Your account has been <strong style="color: #10b981;">approved</strong> and you're ready to start earning!
                          </p>
                          
                          <!-- Welcome Bonus Box -->
                          <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; margin: 0 0 30px;">
                            <tr>
                              <td style="padding: 30px; text-align: center;">
                                <p style="color: #ffffff; margin: 0 0 10px; font-size: 20px; font-weight: bold;">🎁 Welcome Bonus</p>
                                <p style="color: #ffffff; margin: 0; font-size: 48px; font-weight: bold;">$${welcomeBonus}.00</p>
                                <p style="color: #d1fae5; margin: 10px 0 0; font-size: 14px;">has been added to your account!</p>
                              </td>
                            </tr>
                          </table>
                          
                          <h2 style="font-size: 20px; color: #111827; margin: 0 0 15px;">What's Next?</h2>
                          <ul style="padding-left: 20px; margin: 0 0 30px;">
                            <li style="margin-bottom: 10px; color: #374151; line-height: 1.6;">
                              <strong>Browse Tasks:</strong> Start earning by completing available tasks
                            </li>
                            <li style="margin-bottom: 10px; color: #374151; line-height: 1.6;">
                              <strong>Refer Friends:</strong> Earn bonus rewards for every referral
                            </li>
                            <li style="margin-bottom: 10px; color: #374151; line-height: 1.6;">
                              <strong>Daily Spin:</strong> Spin the wheel every day for extra prizes
                            </li>
                            <li style="margin-bottom: 10px; color: #374151; line-height: 1.6;">
                              <strong>Upgrade Account:</strong> Unlock better rewards with premium levels
                            </li>
                          </ul>
                          
                          <!-- CTA Button -->
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td align="center">
                                <a href="${window.location.origin}/login" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: bold; margin: 0 0 30px;">
                                  Login to Your Account
                                </a>
                              </td>
                            </tr>
                          </table>
                          
                          <h2 style="font-size: 20px; color: #111827; margin: 0 0 15px;">Need Help?</h2>
                          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 0 0 20px;">
                            <tr>
                              <td>
                                <p style="margin: 0 0 10px; color: #374151; font-size: 14px;">
                                  📧 <strong>Email:</strong> promohive@globalpromonetwork.store
                                </p>
                                <p style="margin: 0; color: #374151; font-size: 14px;">
                                  📱 <strong>WhatsApp:</strong> +17253348692
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                          <p style="margin: 0 0 10px; color: #6b7280; font-size: 12px;">
                            This is an automated message from PromoHive.
                          </p>
                          <p style="margin: 0; color: #6b7280; font-size: 12px;">
                            © 2025 PromoHive. All rights reserved.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `
        }
      });

      if (error) throw error;

      return { success: true, error: null };
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error };
    }
  },

  // Send level upgrade confirmation
  async sendLevelUpgradeEmail(userEmail, userName, newLevel) {
    try {
      const benefits = {
        1: ['Higher task rewards', 'Priority support', 'Exclusive Level 1 offers', 'Enhanced referral bonuses'],
        2: ['Premium task rewards', '24/7 VIP support', 'Exclusive Level 2 offers', 'Maximum referral bonuses'],
        3: ['Elite task rewards', 'Dedicated account manager', 'Exclusive Level 3 offers', 'Lifetime premium benefits']
      };

      const levelBenefits = benefits[newLevel] || ['Enhanced features', 'Better rewards'];

      const { data, error } = await supabase.functions.invoke('send-notification-email', {
        body: {
          to: userEmail,
          subject: `🎉 Level ${newLevel} Upgrade Confirmed - PromoHive`,
          htmlContent: `
            <!DOCTYPE html>
            <html>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden;">
                      <tr>
                        <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 60px 30px; text-align: center;">
                          <div style="background-color: rgba(255,255,255,0.2); border-radius: 50%; width: 120px; height: 120px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                            <span style="font-size: 64px; color: #ffffff; font-weight: bold;">L${newLevel}</span>
                          </div>
                          <h1 style="color: #ffffff; margin: 0; font-size: 32px;">Upgrade Confirmed!</h1>
                          <p style="color: #e0e7ff; margin: 10px 0 0; font-size: 18px;">Congratulations ${userName}</p>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 40px 30px; text-align: center;">
                          <p style="font-size: 18px; color: #374151; margin: 0 0 30px;">
                            Your account has been upgraded to <strong style="color: #6366f1;">Level ${newLevel}</strong>!
                          </p>
                          
                          <h2 style="font-size: 20px; color: #111827; margin: 0 0 20px;">Your New Benefits:</h2>
                          <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 30px;">
                            ${levelBenefits.map((benefit, i) => `
                              <tr>
                                <td style="padding: 12px; background-color: ${i % 2 === 0 ? '#f9fafb' : '#ffffff'}; border-radius: 8px;">
                                  <p style="margin: 0; color: #374151; font-size: 14px;">
                                    ✓ <strong>${benefit}</strong>
                                  </p>
                                </td>
                              </tr>
                            `).join('')}
                          </table>
                          
                          <a href="${window.location.origin}/user-dashboard" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: bold;">
                            Go to Dashboard
                          </a>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="background-color: #f9fafb; padding: 30px; text-align: center;">
                          <p style="margin: 0; color: #6b7280; font-size: 12px;">
                            © 2025 PromoHive. All rights reserved.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `
        }
      });

      if (error) throw error;

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Send withdrawal processed notification
  async sendWithdrawalProcessedEmail(userEmail, userName, amount, txHash, network = 'TRC20') {
    try {
      const { data, error } = await supabase.functions.invoke('send-notification-email', {
        body: {
          to: userEmail,
          subject: '✅ Withdrawal Processed - PromoHive',
          htmlContent: `
            <!DOCTYPE html>
            <html>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden;">
                      <tr>
                        <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
                          <div style="font-size: 64px; margin-bottom: 10px;">✅</div>
                          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Withdrawal Processed!</h1>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 40px 30px;">
                          <p style="font-size: 16px; color: #374151; margin: 0 0 30px;">Hi ${userName},</p>
                          <p style="font-size: 16px; color: #374151; margin: 0 0 30px;">
                            Your withdrawal has been processed successfully and the funds are on their way to your wallet.
                          </p>
                          
                          <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 12px; padding: 30px; margin: 0 0 30px;">
                            <tr>
                              <td>
                                <table width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td style="padding: 8px 0; color: #065f46;">
                                      <strong>Amount:</strong>
                                    </td>
                                    <td align="right" style="padding: 8px 0; color: #065f46; font-size: 24px; font-weight: bold;">
                                      $${amount}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="padding: 8px 0; color: #065f46;">
                                      <strong>Network:</strong>
                                    </td>
                                    <td align="right" style="padding: 8px 0; color: #065f46;">
                                      ${network}
                                    </td>
                                  </tr>
                                  ${txHash ? `
                                  <tr>
                                    <td colspan="2" style="padding: 12px 0 0; border-top: 1px solid #a7f3d0;">
                                      <p style="margin: 0 0 5px; color: #065f46; font-size: 12px;">
                                        <strong>Transaction Hash:</strong>
                                      </p>
                                      <p style="margin: 0; color: #065f46; font-size: 11px; word-break: break-all; font-family: monospace;">
                                        ${txHash}
                                      </p>
                                    </td>
                                  </tr>
                                  ` : ''}
                                  <tr>
                                    <td style="padding: 8px 0; color: #065f46;">
                                      <strong>Date:</strong>
                                    </td>
                                    <td align="right" style="padding: 8px 0; color: #065f46;">
                                      ${new Date().toLocaleString()}
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          
                          <p style="font-size: 14px; color: #6b7280; margin: 0 0 20px; line-height: 1.6;">
                            <strong>Important:</strong> Depending on the blockchain network, it may take a few minutes to a few hours for the transaction to be confirmed.
                          </p>
                          
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td align="center">
                                <a href="${window.location.origin}/wallet-overview" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 14px; font-weight: bold;">
                                  View Wallet
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="background-color: #f9fafb; padding: 30px; text-align: center;">
                          <p style="margin: 0 0 10px; color: #6b7280; font-size: 12px;">
                            Need help? Contact us at promohive@globalpromonetwork.store
                          </p>
                          <p style="margin: 0; color: #6b7280; font-size: 12px;">
                            © 2025 PromoHive. All rights reserved.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `
        }
      });

      if (error) throw error;

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Send rejection notification
  async sendRejectionEmail(userEmail, userName, reason) {
    try {
      const { data, error } = await supabase.functions.invoke('send-notification-email', {
        body: {
          to: userEmail,
          subject: 'Account Registration Update - PromoHive',
          htmlContent: `
            <!DOCTYPE html>
            <html>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden;">
                      <tr>
                        <td style="padding: 40px 30px;">
                          <h1 style="color: #111827; margin: 0 0 20px; font-size: 24px;">Account Registration Update</h1>
                          <p style="font-size: 16px; color: #374151; margin: 0 0 20px;">Hi ${userName},</p>
                          <p style="font-size: 16px; color: #374151; margin: 0 0 30px; line-height: 1.6;">
                            Thank you for your interest in PromoHive. Unfortunately, we are unable to approve your account at this time.
                          </p>
                          
                          ${reason ? `
                          <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; margin: 0 0 30px; border-radius: 4px;">
                            <p style="margin: 0; color: #991b1b; font-size: 14px;">
                              <strong>Reason:</strong> ${reason}
                            </p>
                          </div>
                          ` : ''}
                          
                          <p style="font-size: 14px; color: #6b7280; margin: 0;">
                            If you have any questions, please contact us at promohive@globalpromonetwork.store
                          </p>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="background-color: #f9fafb; padding: 30px; text-align: center;">
                          <p style="margin: 0; color: #6b7280; font-size: 12px;">
                            © 2025 PromoHive. All rights reserved.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `
        }
      });

      if (error) throw error;

      return { success: true, error };
    } catch (error) {
      return { success: false, error };
    }
  }
};
