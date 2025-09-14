# Deployment Guide: Migrating from Strapi to Sanity

## Current Setup Analysis

Your project structure:
```
zura/
├── studio/          # Sanity CMS Studio
├── frontend/        # Next.js Frontend
└── package.json     # Monorepo configuration
```

## Deployment Strategy Recommendation

### Option 1: Monorepo Deployment (Recommended)
**Push the entire `zura` folder to GitHub**

**Pros:**
- Single repository for both frontend and CMS
- Easier version control and dependency management
- Shared configurations and scripts
- Better for team collaboration

**Cons:**
- Slightly larger repository size
- Need to configure deployment paths

### Option 2: Separate Repositories
**Push only `frontend` to GitHub**

**Pros:**
- Smaller repository size
- Simpler deployment configuration

**Cons:**
- Need to manage two separate repositories
- More complex dependency management
- Harder to keep versions in sync

## Step-by-Step Migration Guide

### Phase 1: Repository Setup

1. **Prepare your repository:**
   ```bash
   cd C:\Users\Admin\zura
   git init
   git add .
   git commit -m "Initial commit: Sanity CMS + Next.js setup"
   ```

2. **Create GitHub repository:**
   - Go to GitHub and create a new repository named `zura-website`
   - Don't initialize with README (you already have one)

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/yourusername/zura-website.git
   git branch -M main
   git push -u origin main
   ```

### Phase 2: Sanity Studio Deployment

1. **Deploy Sanity Studio:**
   ```bash
   cd studio
   npx sanity deploy
   ```
   - Choose a studio hostname (e.g., `zura-cms`)
   - Your studio will be available at `https://zura-cms.sanity.studio`

2. **Update environment variables:**
   - Update `NEXT_PUBLIC_SANITY_STUDIO_URL` in your `.env.local`
   - Use the deployed studio URL

### Phase 3: Vercel Deployment

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - The `vercel.json` configuration will automatically set the correct root directory

2. **Configure Environment Variables in Vercel:**
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=w486ji4p
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-10-28
   NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-studio.sanity.studio
   SANITY_API_READ_TOKEN=your_read_token
   SANITY_API_TOKEN=your_write_token
   ```

3. **Deploy:**
   - Vercel will automatically build and deploy your site
   - Your site will be available at `https://your-project.vercel.app`

### Phase 4: Domain Configuration (Optional)

1. **Custom Domain:**
   - In Vercel dashboard, go to your project settings
   - Add your custom domain
   - Update DNS records as instructed

2. **SSL Certificate:**
   - Vercel automatically provides SSL certificates
   - No additional configuration needed

### Phase 5: Content Migration

1. **Remove Firebase Configuration:**
   - Delete `firebase.json`, `.firebaserc`, `firestore.rules`
   - Remove Firebase dependencies from `package.json`
   - Clean up any Firebase-related code

2. **Update Content:**
   - Use your deployed Sanity Studio to add content
   - Content will automatically appear on your live site

## Environment Variables Checklist

### Required for Production:
- ✅ `NEXT_PUBLIC_SANITY_PROJECT_ID`
- ✅ `NEXT_PUBLIC_SANITY_DATASET`
- ✅ `NEXT_PUBLIC_SANITY_API_VERSION`
- ✅ `NEXT_PUBLIC_SANITY_STUDIO_URL`
- ✅ `SANITY_API_READ_TOKEN`
- ✅ `SANITY_API_TOKEN`

### Optional:
- `NEXT_PUBLIC_GA_ID` (Google Analytics)
- `NEXT_PUBLIC_VERCEL_URL` (Auto-set by Vercel)

## Security Considerations

1. **API Tokens:**
   - Never commit `.env.local` to Git
   - Use Vercel's environment variables dashboard
   - Rotate tokens periodically

2. **Sanity Permissions:**
   - Review your Sanity project permissions
   - Use read-only tokens for frontend
   - Limit write access to authorized users

## Troubleshooting

### Common Issues:

1. **Build Failures:**
   - Check environment variables are set correctly
   - Verify Sanity project ID and dataset
   - Check for TypeScript errors

2. **Content Not Loading:**
   - Verify API tokens have correct permissions
   - Check CORS settings in Sanity
   - Ensure dataset name matches

3. **Studio Access Issues:**
   - Verify studio deployment was successful
   - Check studio URL in environment variables
   - Ensure you're logged into the correct Sanity account

## Next Steps After Deployment

1. **Test thoroughly:**
   - Verify all pages load correctly
   - Test content creation/editing in Studio
   - Check responsive design on mobile

2. **Set up monitoring:**
   - Configure Vercel analytics
   - Set up error tracking (optional)
   - Monitor performance metrics

3. **Content strategy:**
   - Train content editors on Sanity Studio
   - Set up content workflows
   - Plan content migration from old Strapi site

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)