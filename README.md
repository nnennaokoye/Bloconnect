# Bloconnect

A decentralized platform connecting clients with verified artisans through blockchain-based escrow and payment management..

## Overview

Bloconnect is a smart contract system built on Ethereum that facilitates secure job creation, payment escrow, and dispute resolution between clients and artisans. The platform ensures trust through on-chain verification, automated escrow, and fair dispute mechanisms.

## Key Features

### For Artisans
- **Registration & Verification**: Register your profile and get verified by the platform
- **Secure Payments**: Automatic escrow ensures you get paid for completed work
- **Timeout Protection**: Claim payment if client becomes unresponsive after the timeout period
- **Profile Metadata**: Link to off-chain profile data (IPFS/URL) for portfolios and credentials

### For Clients
- **Hire Verified Artisans**: Only work with platform-verified service providers always
- **Escrow Protection**: Funds held securely until job completion
- **Flexible Cancellation**: Cancel jobs anytime and receive full refund
- **Dispute Window**: Challenge artisan claims within a configurable timeframe

### Platform Features
- **Automated Fee Collection**: Configurable platform fee (default 5%, max 50%)
- **Dispute Resolution**: Built-in timeouts and dispute windows
- **Transparent Transactions**: All actions recorded on-chain with events

## Smart Contract Architecture

### Core Components

#### 1. Artisan Registryy
```solidity
struct Artisan {
    bool registered;
    bool verified;
    string metadataURI;
}
```

#### 2. Job Management
```solidity
struct Job {
    address client;
    address artisan;
    uint256 amount;
    JobStatus status;
    uint256 createdAt;
    uint256 claimedAt;
    string description;
}
```

#### 3. Job Status Flow
```
Active → Completed → Withdrawn
   ↓         ↓
Cancelled  ClaimedByArtisan → Disputed
                ↓
           Withdrawn (after dispute window)
```

## How It Works

### For Artisans

1. **Register**
   ```solidity
   registerArtisan("ipfs://your-profile-hash")
   ```

2. **Get Verified**
   - Platform admin verifies your credentials
   - Only verified artisans can receive jobs

3. **Complete Jobs**
   - Wait for client to mark job as completed
   - Withdraw payment (platform fee automatically deducted)

4. **Handle Unresponsive Clients**
   - After timeout period, claim the job
   - Client has dispute window to challenge
   - Finalize payment after dispute window closes

### For Clients

1. **Create Job**
   ```solidity
   createJob(artisanAddress, "Job description") { value: paymentAmount }
   ```

2. **Mark as Complete**
   ```solidity
   completeJob(jobId)
   ```

3. **Cancel if Needed**
   ```solidity
   cancelJob(jobId) // Full refund
   ```

4. **Dispute Claims**
   ```solidity
   disputeClaimedJob(jobId) // Within dispute window
   ```

## Configuration

### Default Settings
- **Platform Fee**: 5% (adjustable, max 50%)
- **Job Timeout**: 7 days
- **Dispute Window**: 2 days

### Admin Functions
```solidity
setPlatformFee(uint256 feePercent)
setJobTimeout(uint256 days_)
setDisputeWindow(uint256 days_)
withdrawPlatformFees()
setArtisanVerified(address artisan, bool verified)
```

## Security Features

### Reentrancy Protection
All functions handling ETH transfers are protected against reentrancy attacks using the nonReentrant modifier.

### Checks-Effects-Interactions Pattern
State changes occur before external calls to prevent exploitation.

### Access Control
- Only platform owner can verify artisans and adjust settings
- Strict validation on all state-changing operations
- Proper balance tracking separates escrow funds from platform fees

### Escrow Safety
- Job funds remain locked until properly released
- Platform fees tracked separately from escrow
- No way to drain user funds through admin functions

## Events

The contract emits events for all major actions, enabling easy frontend integration and transaction tracking:

```solidity
// Artisan Events
event ArtisanRegistered(address indexed artisan, string metadataURI)
event ArtisanVerificationUpdated(address indexed artisan, bool verified)

// Job Events
event JobCreated(uint256 indexed jobId, address indexed client, address indexed artisan, uint256 amount, string description)
event JobCompleted(uint256 indexed jobId)
event JobCancelled(uint256 indexed jobId, address indexed cancelledBy)
event JobWithdrawn(uint256 indexed jobId, address indexed artisan, uint256 amountAfterFee, uint256 platformFee)
event JobClaimedAfterTimeout(uint256 indexed jobId, address indexed artisan, uint256 claimedAt)
event JobDisputedByClient(uint256 indexed jobId, address indexed client)
event JobFinalizedAfterDispute(uint256 indexed jobId, address indexed artisan, uint256 amountAfterFee, uint256 platformFee)
```

## Deployment

### Prerequisites
- Solidity ^0.8.28
- Hardhat or Foundry
- Node.js and npm/yarn

### Compile
```bash
# Using Hardhat
npx hardhat compile

# Using Foundry
forge build
```

### Deploy
```bash
# Using Hardhat
npx hardhat run scripts/deploy.js --network <network-name>

# Using Foundry
forge create Bloconnect --rpc-url <rpc-url> --private-key <private-key>
```

### Verify
```bash
npx hardhat verify --network <network-name> <contract-address>
```

## Usage Example

```javascript
// Client creates a job
const tx = await bloconnect.createJob(
    artisanAddress,
    "Build a custom wooden table",
    { value: ethers.utils.parseEther("1.0") }
);

// Artisan checks job details
const job = await bloconnect.getJob(jobId);

// Client marks job complete after delivery
await bloconnect.completeJob(jobId);

// Artisan withdraws payment
await bloconnect.withdrawJobPayment(jobId);
// Receives: 0.95 ETH (after 5% platform fee)
```

## API Reference

### View Functions
```solidity
getJob(uint256 jobId) → (client, artisan, amount, status, createdAt, claimedAt, description)
getArtisan(address artisan) → (registered, verified, metadataURI)
```

### State-Changing Functions
```solidity
// Artisan
registerArtisan(string metadataURI)

// Jobs
createJob(address artisan, string description) payable → jobId
completeJob(uint256 jobId)
cancelJob(uint256 jobId)
withdrawJobPayment(uint256 jobId)
claimJobAfterTimeout(uint256 jobId)
disputeClaimedJob(uint256 jobId)
finalizeClaimedJob(uint256 jobId)

// Admin
setPlatformFee(uint256 feePercent)
setJobTimeout(uint256 days_)
setDisputeWindow(uint256 days_)
withdrawPlatformFees()
setArtisanVerified(address artisan, bool verified)
transferOwnership(address newOwner)
```

## Testing

```bash
# Run tests
npx hardhat test

# Run with coverage
npx hardhat coverage

# Run gas report
REPORT_GAS=true npx hardhat test
```

## Security Considerations

### Audited Issues
✅ Reentrancy protection implemented
✅ Platform fee withdrawal fixed (only withdraws fees, not escrow)
✅ Self-verification exploit removed
✅ Checks-effects-interactions pattern enforced

### Recommendations for Production
- Conduct professional security audit
- Consider implementing pausable functionality
- Add multi-sig for admin functions
- Consider upgradeable proxy pattern
- Implement comprehensive test suite
- Add gas optimization

## Future Enhancements

- Multi-signature dispute resolution
- Rating and review system
- Milestone-based payments
- Multiple payment tokens (ERC20)
- Automated KYC integration
- Insurance/guarantee pool
- Decentralized governance

## License

MIT License

## Contact & Support

- **Issues**: Open an issue on GitHub
- **Discussions**: Join our community forum
- **Security**: Report vulnerabilities to security@bloconnect.io

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**⚠️ Disclaimer**: This smart contract is provided as-is. Always conduct thorough testing and professional audits before deploying to mainnet with real funds.
