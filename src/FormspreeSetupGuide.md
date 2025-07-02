# Setting Up Formspree for Your Portfolio Contact Form

Follow these steps to correctly set up your contact form to receive emails:

## Step 1: Create a Formspree Account
1. Go to [Formspree.io](https://formspree.io) and sign up for a free account
2. Use your email address (09patilparesh@gmail.com) to create the account

## Step 2: Create a New Form
1. After logging in, click on "New Form"
2. Name your form (e.g., "Portfolio Contact Form")
3. Select your email (09patilparesh@gmail.com) as the recipient for form submissions
4. Click "Create Form"

## Step 3: Get Your Form ID
1. After creating the form, you'll see a form endpoint URL that looks like this:
   `https://formspree.io/f/xaykdgjv`
2. The last part of this URL is your form ID (e.g., "xaykdgjv")

## Step 4: Update Your Code
1. Open the file `src/components/Contact.jsx`
2. Find this line:
   ```javascript
   const [formState, handleFormspreeSubmit] = useForm("xaykdgjv");
   ```
3. Replace "xaykdgjv" with your actual form ID from Step 3

## Step 5: Test Your Form
1. Run your application (`npm run dev`)
2. Go to the Contact page
3. Fill out the form and submit it
4. You should receive an email at 09patilparesh@gmail.com

## Troubleshooting
If you're not receiving emails:

1. **Check your spam folder** - Formspree emails might end up there initially
2. **Verify your form ID** - Make sure you've copied the correct form ID
3. **Confirm your Formspree account** - You may need to verify your email
4. **Check the Formspree dashboard** - See if submissions are being recorded
5. **Add the sender to your contacts** - To prevent emails going to spam
6. **Whitelist formspree.io domain** - In your email settings

## Additional Settings in Formspree
In your Formspree dashboard, you can also:
- Set up email notifications
- Add spam filtering
- Create autoresponders
- View submission history
- Configure reCAPTCHA (optional)

These settings can be found in your form's settings page after logging in to Formspree. 