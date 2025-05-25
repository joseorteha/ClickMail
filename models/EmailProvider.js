const mongoose = require('mongoose');
const crypto = require('crypto');

// Para encriptar las claves API
const algorithm = 'aes-256-ctr';
const secretKey = process.env.ENCRYPTION_KEY || 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  };
};

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    algorithm, 
    secretKey, 
    Buffer.from(hash.iv, 'hex')
  );
  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final()
  ]);
  return decrpyted.toString();
};

const emailProviderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  provider: {
    type: String,
    enum: ['mailgun', 'sendgrid', 'smtp'],
    default: 'mailgun'
  },
  domain: {
    type: String,
    required: true
  },
  apiKey: {
    iv: String,
    content: String
  },
  fromEmail: {
    type: String,
    required: true
  },
  fromName: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  dailyLimit: {
    type: Number,
    default: 1000
  },
  monthlyLimit: {
    type: Number,
    default: 10000
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para encriptar la API key antes de guardar
emailProviderSchema.pre('save', function(next) {
  if (this.isModified('apiKey') && typeof this.apiKey === 'string') {
    const encrypted = encrypt(this.apiKey);
    this.apiKey = encrypted;
  }
  this.updatedAt = Date.now();
  next();
});

// Método para descifrar la API key
emailProviderSchema.methods.getDecryptedApiKey = function() {
  if (this.apiKey && this.apiKey.iv && this.apiKey.content) {
    return decrypt(this.apiKey);
  }
  return null;
};

const EmailProvider = mongoose.model('EmailProvider', emailProviderSchema);

module.exports = EmailProvider;
