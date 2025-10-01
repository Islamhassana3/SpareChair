#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('\n🚀 Starting ChairShare...\n');

// Check if .env exists
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.log('⚠️  WARNING: .env file not found!');
  console.log('   Run: cp .env.example .env\n');
}

// Check if Prisma client exists
const prismaPath = path.join(__dirname, '..', 'node_modules', '.prisma', 'client');
if (!fs.existsSync(prismaPath)) {
  console.log('⚠️  WARNING: Prisma client not generated!');
  console.log('   Run: npx prisma generate\n');
}

console.log('📍 Application will be available at:');
console.log('   Frontend: http://localhost:3000');
console.log('   Backend:  http://localhost:5000/api/health\n');

console.log('💡 Tip: If you see errors, run ./verify-setup.sh to diagnose issues\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
