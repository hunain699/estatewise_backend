const QRCode = require('qrcode');

// Function to generate the referral link
const generateReferralLink = (userId, campaignId) => {
  return `https://hcmatrix.com/referral/${userId}/${campaignId}`;
};

// Function to generate QR Code from the referral link
const generateQRCode = async (referralLink) => {
  try {
    const qrCode = await QRCode.toDataURL(referralLink);
    return qrCode;
  } catch (error) {
    console.error('Error generating QR code', error);
    throw new Error('Error generating QR code');
  }
};

module.exports = { generateReferralLink, generateQRCode };
